const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
const progress = document.querySelector('.reading-progress span');
const chapters = [...document.querySelectorAll('.chapter')];
const indexLinks = [...document.querySelectorAll('.story-index a')];

// Scrolling never hides content or intercepts touch, keyboard, or native navigation.
let frame = 0;
function updateScroll() {
  frame = 0;
  const available = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${available > 0 ? Math.min(1, Math.max(0, window.scrollY / available)) : 0})`;
  if (!motion.matches) {
    document.documentElement.style.setProperty('--hero-shift', `${Math.min(window.scrollY * .09, 48)}px`);
  }
}
window.addEventListener('scroll', () => { if (!frame) frame = requestAnimationFrame(updateScroll); }, { passive: true });
window.addEventListener('resize', () => { if (!frame) frame = requestAnimationFrame(updateScroll); });
updateScroll();

if ('IntersectionObserver' in window) {
  const entered = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('has-entered');
      entered.unobserve(entry.target);
    });
  }, { threshold: .08 });
  document.querySelectorAll('.chapter, .recovery-sequence li, .success-moment, .finding, .rating-preview, .brief-resolution').forEach(el => entered.observe(el));
  const active = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      indexLinks.forEach(link => {
        if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-15% 0px -60% 0px' });
  chapters.filter(chapter => indexLinks.some(link => link.hash === `#${chapter.id}`)).forEach(chapter => active.observe(chapter));
}

// Deep links to an appendix open the native disclosure instead of landing on hidden text.
function openHashTarget() {
  let id;
  try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
  const target = document.getElementById(id);
  if (!target) return;
  const disclosure = target.closest('details');
  if (disclosure) {
    disclosure.open = true;
    requestAnimationFrame(() => target.scrollIntoView({ behavior: motion.matches ? 'instant' : 'smooth', block: 'start' }));
  }
}
window.addEventListener('hashchange', openHashTarget);
openHashTarget();
document.querySelectorAll('details').forEach(detail => detail.addEventListener('toggle', updateScroll));
motion.addEventListener('change', () => {
  if (motion.matches) document.documentElement.style.setProperty('--hero-shift', '0px');
});

// Subtle staggered entrances, respecting motion preferences and static readability.
if ('IntersectionObserver' in window) {
 const reveal = new IntersectionObserver(entries => {
  for (const entry of entries) {
   if (!entry.isIntersecting) continue;
   reveal.unobserve(entry.target);
   if (motion.matches || !entry.target.animate) continue;
   const siblings = entry.target.parentElement.children;
   const i = Array.prototype.indexOf.call(siblings, entry.target);
   entry.target.animate([{opacity:.55,transform:'translateY(18px)'},{opacity:1,transform:'translateY(0)'}],{duration:800,delay:Math.min(i*65,195),easing:'cubic-bezier(.16,1,.3,1)'});
  }
 },{threshold:.12});
 document.querySelectorAll('.brief-timeline li,.rating-mini>div,.review-scores>div,.prose>.pull-line').forEach(el=>reveal.observe(el));
 motion.addEventListener('change',()=>{if(motion.matches)document.getAnimations().forEach(a=>a.cancel());});
}

const storyAudio=document.getElementById('story-audio');
document.getElementById('audio-speed')?.addEventListener('change',event=>{if(storyAudio)storyAudio.playbackRate=Number(event.target.value);});

// Accessible custom narration controls. Playback starts only on a user action.
{
 const a=document.getElementById('story-audio'), play=document.getElementById('audio-play'), position=document.getElementById('audio-position'),status=document.getElementById('audio-status');
 const time=n=>`${Math.floor(n/60)}:${String(Math.floor(n%60)).padStart(2,'0')}`;
 const refresh=()=>{document.getElementById('audio-play-icon').textContent=a.paused?'▶':'Ⅱ';document.getElementById('audio-play-label').textContent=a.paused?'Listen':'Pause';play.setAttribute('aria-label',a.paused?'Play narration':'Pause narration');};
 play.addEventListener('click',async()=>{if(!a.paused){a.pause();return;}status.textContent='Loading narration…';try{await a.play();status.textContent='';}catch{status.textContent='Audio could not start. Please try again.';}});
 a.addEventListener('play',refresh);a.addEventListener('pause',refresh);a.addEventListener('ended',refresh);
 a.addEventListener('loadedmetadata',()=>{position.disabled=false;position.max=a.duration;document.getElementById('audio-duration').textContent=time(a.duration);});
 a.addEventListener('timeupdate',()=>{position.value=a.currentTime;document.getElementById('audio-elapsed').textContent=time(a.currentTime);position.setAttribute('aria-valuetext',time(a.currentTime));});
 position.addEventListener('input',()=>{a.currentTime=Number(position.value);});
 document.getElementById('audio-back').addEventListener('click',()=>{a.currentTime=Math.max(0,a.currentTime-15);});
 document.getElementById('audio-forward').addEventListener('click',()=>{if(Number.isFinite(a.duration))a.currentTime=Math.min(a.duration,a.currentTime+15);});
 a.addEventListener('error',()=>{status.textContent='Audio is unavailable. Please try again or read the transcript.';});
}
