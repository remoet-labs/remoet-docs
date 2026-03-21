# X (Twitter) Jobs Support — Discussion Summary

Brainstorm and design notes for a daily “jobs support” feature on X to drive signups and build a lead list. Remoet has ~315 users; at this scale, ~1 extra signup per day is meaningful growth.

---

## 1. Remoet-specific X API ideas (earlier brainstorm)

- **Company listing page:** “Latest from [Company] on X” using `listing.urls.twitter`.
- **“Actively hiring on X” badge:** Cron checks company tweets for hiring language; show badge on listing card/detail.
- **Suggestions:** Enrich `createSuggestion(twitterHandle)` with X API (name, bio, URL) for faster listing creation.
- **Share to X:** After starring or on listing page — “Share that you’re exploring [Company]” (uses existing OAuth).
- **Digest enrichment:** In digest email, one line “Recently on X” for starred companies that have `urls.twitter`.

---

## 2. Mirroring Reddit on X (same events, shorter format)

**Current Reddit flow:** Post to r/remoet (and Discord) for:

- Job of the Day (daily)
- Weekly top-10 highest-paying remote jobs
- New listing added
- New blog post

**Idea:** Post the same events to X as tweets (≤280 chars):

| Event            | X tweet example                                                                 |
|------------------|-----------------------------------------------------------------------------------|
| Job of the Day   | “Job of the day: {title} at {company} — {salary} 🔗 {link}”                        |
| Weekly roundup   | “Top 10 highest-paying remote jobs this week 🔗 {link}”                           |
| New listing      | “New remote listing: {name} added 🚀 {link}”                                     |
| New blog post    | “New post: {title} — {url}”                                                       |

**Assessment:** Low effort, could drive some traffic, but by itself reach is limited without an existing X following. Kind of “meh” as a standalone growth lever.

---

## 3. Daily “Jobs Support” on X (chosen direction)

**Concept:**

- Once a day we post a “jobs support” tweet.
- People **reply** with what they’re looking for (role, remote, location, etc.).
- We **reply** to each person with an active link to a matching job from our DB.
- **Timebox:** Open for 10 hours only (keeps volume manageable and creates urgency).

**Why it’s stronger than one-way posts:**

- Replies = engagement = algorithm can surface the thread more.
- Clear value: “Reply with what you want → we send a real job link.”
- Daily + 10h window builds habit and a reason to follow.
- Uses Remoet’s real job data and drives clicks to remoet.dev.

**Rough flow:**

1. **Daily tweet (cron):** e.g. “Jobs support is open for the next 10h. Reply with what you’re looking for (role, remote, location, etc.) and we’ll reply with a matching job link from remoet.dev.”
2. **Reply bot:** During (or after) the 10h window: fetch replies to that tweet → for each reply, parse intent (keywords or Gemini), find a matching job in our DB → reply with the job link.
3. **Matching:** Start with keyword/role + remote filter on existing job fields; add Gemini if we need fuzzy or long-form descriptions.

---

## 4. Abuse prevention (DB)

**Rule:** One reply per user per run.

**Schema (e.g. `XJobsSupportRecipient`):**

- `xUserId` (string) — X author id
- `xUsername` (string) — handle
- `tweetId` (string) — id of the daily jobs-support tweet
- `matchedUserId` (ObjectId, optional) — Remoet user if we cross-ref (see below)
- `createdAt` (date)

**Unique index:** `(tweetId, xUserId)` so we only insert once per user per tweet. Before replying: try insert; if duplicate → skip (already served).

---

## 5. Cross-ref with Remoet users + “Potential new customers”

**Cross-ref:**

- Reply author from X: `xUserId`, `xUsername`.
- Our DB: `UserProfile.twitterUrl` (e.g. `https://x.com/username`).
- Match: normalize X username and compare to `twitterUrl`; if match, set `matchedUserId` to that profile’s `userId`.

**Potential new customers:**

- Recipients where **`matchedUserId` is null** = used jobs support but not (or not linked as) a Remoet user = leads.
- Query: e.g. all `XJobsSupportRecipient` for that tweet (or day) with `matchedUserId` null.
- Use: admin list, export for follow-up, or simple “jobs support leads” view. Optional: store `replyText` for segmentation.

---

## 6. Growth engine assessment

- **As a tactic:** Strong. Differentiated (1:1 help), mostly automated after setup, builds a warm lead list.
- **Ceiling:** Depends on X account reach and what we do with the list. At ~315 users, **~1 extra signup per day is already worth it** (~30/month, ~10% growth).
- **To make it an engine:** Use the “potential new customers” list — follow-up (email, in-app, etc.) so “used jobs support but not a user” turns into signups. Optionally grow the X account (engagement, light promotion) so the daily tweet reaches more people.

**Bottom line:** Low bar for “worth doing”; once built it’s fairly auto-running. Go for it.
