---
title: "Git for Everyone: Merge, Pull Requests, and Code Reviews"
description: "Branches are useful, but eventually they need to come back together. Here's how merge, pull requests, and code reviews work — and why each one matters for a healthy team workflow."
date: "2026-06-08"
tags: ["git", "versioncontrol", "programming", "beginners"]
---

> **Series: Git for Everyone** · Part 4 of 6 — Merge, Pull Requests, and Code Reviews
>
> 🕐 ~8 min read · Beginner friendly
>
> **📝 A note on this article** · This post is based on my personal study notes. The ideas, learning journey, and understanding are mine — I used AI to help structure and expand them into a proper blog format form.

---

## Bringing the Work Back Together

In the last part, we learned how branches let developers work in parallel, each on their own stream. But eventually, those streams need to **rejoin the river**.

That's where **merge** and **pull requests** come in.

---

## What Is a Merge?

A **merge** is the process of taking the work from one branch and combining it into another.

```
Before merge:
main:    A → B → C
                  \
feature:           D → E
```

```
After merging feature into main:
main:    A → B → C → D → E → M (merge commit)
```

The merge commit `M` records that a merge happened. The history of both branches becomes unified.

> **Analogy for kids:** You and a friend are writing a story together. You wrote chapters 4 and 5 while they wrote chapters 6 and 7 — at the same time. When you're done, you sit together, combine your chapters into the right order, and now you have one complete story. That combining step is a merge.

---

## Merging in Practice

```bash
# Switch to the branch you want to merge INTO (the destination)
git switch main

# Merge another branch into current branch
git merge feature/add-search-bar

# Push the updated main to remote
git push origin main
```

### The Three Merge Options

When merging through GitHub or GitLab, you'll typically see three options:

**1. Create a merge commit** (most common)
```
A → B → C ──────────────── M
                \          /
                 D → E → F
```
Every commit is preserved. A new merge commit `M` is added.

**2. Squash and merge**
```
A → B → C → S
```
All commits from the feature branch (D, E, F) are squashed into a single commit `S` on main. Cleaner history, but you lose the individual steps.

**3. Rebase and merge**
```
A → B → C → D' → E' → F'
```
The feature commits are replayed on top of main, one by one — no merge commit created. Very clean history, but rewrites commit identities.

> **Which should you use?** For most teams: *merge commit* (full transparency) or *squash and merge* (clean main branch). Rebase is best left for experienced teams with clear conventions.

---

## Git Rebase: Rewriting Where Your Branch Started

When you're working on a feature branch, `main` keeps moving forward while you're busy:

```
main:    A → B → C → D → E
                  \
feature:           F → G → H
```

You branched off at `C`, but now `main` is at `E`. Your branch is "behind."

**Merge** brings `main` into your branch by creating a new merge commit — history is preserved but gets busier over time.

**Rebase** does something different — it picks up your commits (F, G, H) and *replays* them on top of the latest `main`, as if you had branched off from `E` all along:

```
main:    A → B → C → D → E
                           \
feature:                    F' → G' → H'
```

The result is a perfectly straight, clean line. No merge commit. No branching noise in the history.

> **Analogy for kids:** Imagine you started writing a report based on last week's data. While you were writing, someone updated the data. Instead of writing a note saying "oh and also here's the old data I used" (merge), you go back and rewrite the report as if you had the new data from the beginning (rebase). The report itself doesn't change — just where it starts from.

### The Golden Rule of Rebase

> ⚠️ **Never rebase a branch that other people are also working on.** Rebase rewrites commit history — if a teammate has those commits locally, their history will conflict with yours after a rebase. It gets messy fast.

**Solo feature branch → rebase freely. Shared branch → stick with merge.**

### A Typical Rebase Workflow

```bash
# You're on your feature branch
git switch feature/add-search-bar

# Fetch the latest from remote
git fetch origin

# Rebase your branch on top of the latest main
git rebase origin/main
```

If there are conflicts during rebase, Git pauses at each conflicting commit and lets you fix them one at a time:

```bash
# Fix the conflict in the file, then stage it
git add <file>

# Continue to the next commit
git rebase --continue

# Or abort entirely and go back to before
git rebase --abort
```

After rebasing, your local branch history has been rewritten — so you need to force push:

```bash
# Force push after rebase (never use plain --force on a shared branch)
git push origin feature/add-search-bar --force-with-lease
```

`--force-with-lease` is safer than `--force` — it checks that nobody else has pushed to the branch since you last fetched, protecting you from accidentally overwriting someone else's work.

### Rebase vs Merge: When to Use Which

| Situation | Use |
|---|---|
| Solo feature branch, want clean history | `rebase` |
| Shared branch or already merged to main | `merge` |
| Keeping a long-running branch up to date | `rebase` (stay fresh) |
| Already pushed and others might have pulled | `merge` (safe) |
| Preparing a clean PR before review | `rebase` first, then open PR |

---

## What Is a Pull Request?

A **Pull Request** (PR) — called a **Merge Request** on GitLab — is a formal way of saying:

> *"Hey team, I've finished my work on this branch. Can someone review it and merge it into main?"*

It's not just a merge button. It's a **conversation hub**:

- Reviewers can leave comments on specific lines of code
- You can discuss design decisions, ask questions, suggest improvements
- The author can push new commits to address feedback
- Once everyone's happy, the PR gets merged

```bash
# Typical flow before opening a PR:

# 1. Make sure your branch is up to date
git fetch origin
git rebase origin/main

# 2. Push your branch
git push origin feature/add-search-bar

# 3. Open GitHub/GitLab in your browser and click "Open Pull Request"
```

---

## Merge Conflicts: When Two Branches Disagree

Sometimes Git can't automatically merge two branches. This happens when **both branches edited the same line in the same file**. This is called a **conflict**.

```bash
# When you run git merge and there's a conflict:
git merge feature/add-search-bar
# Output: CONFLICT (content): Merge conflict in src/app.ts
# Automatic merge failed; fix conflicts and then commit the result.
```

Inside the conflicting file, Git marks the problem like this:

```
<<<<<<< HEAD (your branch / main)
const greeting = "Hello, world!";
=======
const greeting = "Hi there, everyone!";
>>>>>>> feature/add-search-bar
```

You need to **manually choose** which version to keep (or combine them), then:

```bash
# After resolving all conflicts:
git add src/app.ts
git commit -m "Resolve merge conflict in greeting"
```

> **Analogy for kids:** Two kids are filling in the same blank on a worksheet — one wrote "dog" and one wrote "cat." A teacher can't choose automatically, so they ask the kids to sort it out themselves. That's a conflict resolution.

### Preventing Conflicts

- Pull and rebase from `main` frequently
- Keep branches short-lived (merge often)
- Avoid multiple people editing the same file at the same time

---

## Code Reviews: The Quality Gate

Before a PR gets merged, someone (usually a senior developer or teammate) reviews the code. This process is called a **code review**.

### What Reviewers Look For

- ✅ Does the code actually do what it claims to do?
- ✅ Are there any obvious bugs or logical errors?
- ✅ Is the code readable and well-named?
- ✅ Is it more complex than it needs to be?
- ✅ Are there tests? Are they good tests?
- ✅ Does it follow the team's style guidelines?
- ✅ Are there helpful comments where needed?

### The Spirit of Code Reviews

Code reviews aren't about finding fault — they're about **raising quality and sharing knowledge**.

A good reviewer also gives praise when something is done well. Don't just hunt for problems; acknowledge what's written cleanly.

> A senior reviewing a junior's code isn't just gatekeeping — they're teaching. The PR becomes a small, focused lesson.

### When to Review

There are two common times to do a code review:

1. **Before merging** — the most common. Review the PR before it hits `main`.
2. **After merging** — sometimes used for fast-moving teams, but less ideal since feedback comes too late.

---

## Squash Commits Before Merging

When you've been working on a feature for a while, your commit history might look messy:

```
fix typo
fix typo again
WIP
actually fix it this time
final fix
```

**Squashing** combines all of these into one clean, meaningful commit before merging:

```
Add user search feature with debounced input
```

```bash
# Interactively squash your last 5 commits
git rebase -i HEAD~5
# In the editor, change "pick" to "squash" (or "s") for commits you want to combine
```

> ⚠️ **Note:** After squashing and merging a branch, it's best practice to **delete the branch and start fresh** for future work rather than continuing on it. Squashing rewrites history, and continuing on a squashed branch can create confusing merge conflicts later.

---

## Quick Reference

```bash
# Merge a branch into current branch
git merge <branch-name>

# Abort a merge in progress
git merge --abort

# After resolving conflicts
git add <file>
git commit

# Rebase current branch on top of latest main
git fetch origin
git rebase origin/main

# Handle rebase conflicts
git add <file>                         # Stage resolved conflict
git rebase --continue                  # Move to next commit
git rebase --abort                     # Cancel rebase entirely

# Force push after rebase (safer than --force)
git push origin <branch-name> --force-with-lease

# Squash last N commits interactively
git rebase -i HEAD~N

# Delete a branch after it's merged
git branch -d feature/add-search-bar

# Delete from remote too
git push origin --delete feature/add-search-bar
```

---

## What's Next?

You've now learned the full inner cycle of Git: create a branch → make commits → open a PR → review → merge.

But what about contributing to a project you **don't own**? That's where forking comes in.

**→ [Part 5: Fork, Clone, and Open Source Collaboration](./git-for-everyone__part-5-fork-clone-open-source)**

---

> 📌 **Series overview:**
> - [Part 1: What Is Git, Repository, and Commit](./git-for-everyone__part-1-what-is-git-repository-commit)
> - [Part 2: Traveling Through Time — Checkout, Reset, and Revert](./git-for-everyone__part-2-checkout-reset-revert)
> - [Part 3: Branches, Stash, and Git Workflow](./git-for-everyone__part-3-branches-stash-workflow)
> - **Part 4: Merge, Pull Requests, and Code Reviews** ← you are here
> - Part 5: Fork, Clone, and Open Source Collaboration
> - Part 6: Git GUI Apps — You Don't Have to Use the Terminal
