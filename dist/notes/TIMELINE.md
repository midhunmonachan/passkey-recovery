# Technical timeline

Dates use Toronto local time. Midhun's account of the original cleanup is distinguished from the recorded recovery observations. Account identifiers, correspondence, and exact sign-in times remain private.

| Date | Technical event |
| --- | --- |
| September 7, 2026 | Advanced Account Security was enabled, according to a privately checked confirmation dated in Toronto local time. |
| Before the cleanup; exact times unconfirmed | Midhun originally saved the passkeys using his previous laptop. The Microsoft Password Manager passkey later recovered had synced to the new laptop before it was removed during cleanup. |
| September 10, 2026 | A historical Edge profile on the new laptop was captured in the Windows shadow copy that ultimately supplied the working recovery data. It contained the previously synced Microsoft Password Manager credential. |
| September 10, 2026 | Midhun cleared data to remove saved passwords from Google Password Manager and Microsoft Password Manager. He had not realized that this also removed his OpenAI passkeys. He reports that the deletion synced across his connected devices, leaving no usable passkey in either live password manager. |
| September 10–13 | Available recovery options and historical profiles were investigated. Backups were preserved, restored copies were compared, and unsuccessful attempts were recorded. |
| September 11–12 | Repeated OpenAI support exchanges addressed the missing credentials. One response suggested security changes from an active session; Midhun explained that these still required the missing credential. A duplicate case was closed and he followed up in the original thread. |
| During the incident; contact dates unconfirmed | Midhun reports interacting with both AI and human OpenAI support agents, with some delayed replies and no useful recovery step. He also contacted Google Support and says Microsoft escalated his case; neither provided a recovery procedure. |
| September 13 | Microsoft emailed its final position that no supported procedure existed for recovering the deleted passkey from the listed historical backup sources. |
| September 13 | A fresh restored baseline was verified: 4,806 files matched the source archive and the expected physical filesystem paths. |
| September 13 | A failed launch showed account detachment and local passkey cleanup while the recovery proxy allowed no upstream connections. |
| September 13 | A fresh offline launch retained its account association and passkeys when the same browser process remained open as Wi-Fi returned. |
| September 13 | Restricted provider connectivity was enabled, Midhun completed user verification, and OpenAI sign-in succeeded with the recovered passkey. |

The original cleanup and its propagation across devices are Midhun's account of what happened; propagation was not independently observed on every device. The exact timing of the cleanup relative to the snapshot is not established here. The snapshot retained historical credential data that later proved usable.

His separate OpenAI recovery-key file had been in the Downloads folder of the previous laptop, which was formatted and returned to Best Buy. That file was not recovered. The eventual success used historical data on the new laptop, where the passkey had synced before cleanup.

Recovery dates and the dated OpenAI/Microsoft email exchanges were checked against private records. Google Support contact, human-agent interactions, and the Microsoft escalation are included from Midhun's account, without inventing dates or escalation tiers. The private correspondence is not part of the public report.

## Existing access and the replacement laptop

Midhun’s already-authenticated ChatGPT app session still allowed him to use Astra. It did not let him bypass the verification required to disable Advanced Account Security, manage passkeys, or download recovery keys. The lockout described here concerns fresh sign-in and protected account changes, not the invalidation of every existing session.

The returned laptop had itself been brand new. Midhun used it for a couple of days, decided it was not right for his workflows, and returned it before moving to the more suitable replacement.

He also paid for X Premium on September 11, hoping his support-seeking posts and replies would gain attention. That purchase did not lead to a useful recovery route; its motivation and outcome are included from his account.

Midhun forgot the recovery-key file in Downloads before resetting the device. He also could not manage billing during the lockout. Astra through the already-authenticated ChatGPT app was the usable route he retained, with no known guarantee of how much longer that access would last.


Midhun clarifies that OpenAI Support clearly explained its recovery restrictions. His unresolved concerns also included a running paid subscription he could not manage, usage statistics, banked resets, and the inability to obtain the same 20x plan on a new account during the new-subscription pause. He reports no reply to a further escalation request. This does not establish that the account data was deleted, or that cancellation assistance was unavailable under published policy.


### Support email sequence verified September 13
The September 11 support reply explained the recovery restriction. Midhun subsequently raised remaining Pro time, stats, banked resets, personalization and billing history; later that day he raised inaccessible billing and requested escalation or transfer. On September 12 an AI-assisted reply explicitly refused transferring Pro, usage/resets and lifetime stats, and suggested protected settings changes from a live session. He explained why those steps were blocked and requested human review. The duplicate was closed; he returned to the original thread. No further incoming support reply appears in the reviewed threads before his September 13 message reporting recovery and requesting closure. His initial request is not fully reconstructed from these email threads.

Midhun also reports unsuccessful Google Password Manager recovery work through Astra on a dying laptop. Exact dates and token records for those attempts are unconfirmed. This device is not assumed to be the returned laptop.



Midhun realized the recovery-key file had been in the reset and returned laptop’s Downloads folder only after the lockout presented passkeys or recovery keys as the two remaining sign-in options. He did not recognize the loss at the time of the return.

## Account-data export

- September 11, 06:37 Toronto: OpenAI emailed that export preparation had started.
- September 12, 06:37 Toronto: OpenAI emailed that the export was ready, with a download link.
- Midhun reports the link did not work when he attempted the download. The reviewed emails establish the export notifications, not the error or its cause.

Midhun clarified that he tried the export link immediately after receiving the ready email and saw a JSON response: `{"detail":"Not found."}`. This is his report of the browser result, not an error independently established by the email.
