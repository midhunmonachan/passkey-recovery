# Technical findings and limits

This describes Midhun's completed recovery on Windows using Microsoft Edge 153.0.4234.32 and Microsoft Password Manager. It is a case report, not a tested recovery utility. The browser build was recorded during the failed-run diagnosis.

## Original loss of access

Midhun says the passkeys were originally saved using the laptop he later returned. The Microsoft Password Manager credential recovered in this investigation had synced to the replacement laptop before the password-data cleanup. The historical source used for recovery was on the replacement laptop; no profile or recovery-key file was retrieved from the returned machine.

Midhun reports clearing data to remove saved passwords from both Google Password Manager and Microsoft Password Manager during his periodic cleanup on September 10. The cleanup also removed his OpenAI passkeys, which he had not intended to delete. He had not realized their importance for Advanced Account Security or that his separate recovery-key file was lost with the formatted laptop returned to Best Buy.

The deletion propagated across his connected devices, leaving no surviving usable passkey in either live password manager to retrieve by ordinary synchronization. This describes deletion from the password managers; it does not establish that OpenAI revoked the registered credential. Successful use of a preserved historical copy should not be presented as reversing server-side revocation.

## Data restoration

Historical Edge data, including the previously synced credential, was available from a Windows shadow copy on the replacement laptop. We preserved it separately and restored a working copy outside AppData, where earlier path-redirection behavior had complicated verification. Physical file paths and hashes were checked; the successful baseline contained 4,806 matching files.

The relevant backup included encrypted passkey records and supporting provider state. Those observations alone did not prove the credential was usable. The decisive evidence was the later successful authentication through the real provider and relying party.

## Failed and successful startup observations

This was a second problem encountered during recovery, distinct from the original synchronized deletion. During a failed restored startup, Edge reported that the Microsoft account was not signed in. Its active account association and sync consent were lost, and local passkey records were cleared. The proxy recorded zero upstream connections in that run. This rules out a deletion downloaded through that proxy during the observed interval; it does not establish that every Windows component was isolated from the network.

Windows account-broker activity outside the Edge proxy was not comprehensively monitored. The exact trigger for account detachment remains unknown. Account detachment and local cleanup are observations; a definitive Microsoft cloud-deletion explanation would go beyond the evidence.

Chromium's passkey sync bridge includes a path that clears its local store when sync is disabled. That is useful architectural context, but it does not prove the exact code path or trigger in this Edge build. [Chromium source](https://raw.githubusercontent.com/chromium/chromium/main/components/webauthn/core/browser/passkey_sync_bridge.cc)

In the successful attempt, Midhun launched a fresh restored profile while Wi-Fi was physically off. The same browser process stayed open when Wi-Fi returned. Before permitting proxy traffic, we observed that the Microsoft account association and passkey records were still present. The subsequent sign-in succeeded in that process.

Several conditions changed across the investigation. This is evidence for a successful sequence, not a controlled experiment isolating one necessary or sufficient cause.

## Network control and provider verification

The recovery proxy allowed HTTPS CONNECT tunnels to a narrow set of OpenAI login and asset hosts and to `edgepasskeysenclave.microsoft.com`. Ordinary Edge sync endpoints remained blocked. TLS remained encrypted end to end; the proxy did not decrypt traffic or log cookies, authorization headers, or request bodies.

Microsoft lists `wss://edgepasskeysenclave.microsoft.com` as its passkey cloud authenticator, separately from Edge sync services such as `https://edge.microsoft.com`. This separation informed the connection policy. The published endpoint list can change. [Microsoft endpoint documentation](https://learn.microsoft.com/en-us/deployedge/microsoft-edge-security-endpoints)

Microsoft describes passkey assertions and recovery validation as protected service operations, with device authorization and PIN-based activation/recovery. That architecture supports why preserving a local record was only part of the task. It does not independently establish precisely which internal provider operation occurred in our session. [Microsoft architecture description](https://blogs.windows.com/msedgedev/2026/04/22/engineering-secure-passkey-sync-in-microsoft-password-manager/)

Edge offered the recovered OpenAI passkey through Microsoft Password Manager during normal OpenAI sign-in. Midhun completed the required user verification locally, and the browser returned to authenticated ChatGPT. Private recovery records corroborate the successful sign-in.

## What this result establishes

- A preserved copy of Midhun's credential remained usable in this environment.
- Restoring data, retaining the account association across the offline-to-online transition, and allowing provider authentication formed a successful sequence.
- Midhun's existing PIN and the normal authentication flow were still required.
- The recovery succeeded on the current laptop without rolling Windows back.

## What remains unresolved

- The exact cause of account-state loss on earlier launches.
- Which parts of the successful sequence are essential on other builds or machines.
- Whether any comparable Chrome backup exists and remains usable. No Chrome recovery is claimed here.
- How the result generalizes to other deletion mechanisms, providers, or credentials revoked at the relying party. This case does not demonstrate reversing server-side revocation.

Raw browser profiles, passkey/provider data, authenticated session stores, and private correspondence are not included.

## Existing access and the replacement laptop

Midhun’s already-authenticated ChatGPT app session still allowed him to use Astra. It did not let him bypass the verification required to disable Advanced Account Security, manage passkeys, or download recovery keys. The lockout described here concerns fresh sign-in and protected account changes, not the invalidation of every existing session.

The returned laptop had itself been brand new. Midhun used it for a couple of days, decided it was not right for his workflows, and returned it before moving to the more suitable replacement.

He also paid for X Premium on September 11, hoping his support-seeking posts and replies would gain attention. That purchase did not lead to a useful recovery route; its motivation and outcome are included from his account.

Midhun forgot the recovery-key file in Downloads before resetting the device. He also could not manage billing during the lockout. Astra through the already-authenticated ChatGPT app was the usable route he retained, with no known guarantee of how much longer that access would last.

