---
title: "Git for Everyone: Traveling Through Time — Checkout, Reset, and Revert"
description: "Git gives you three different ways to interact with your commit history — each with very different consequences. Let's break down checkout, reset, and revert using simple analogies."
date: "2026-06-08"
tags: ["git", "versioncontrol", "programming", "beginners"]
---

> **Series: Git for Everyone** · Part 2 of 6 — Traveling Through Time: Checkout, Reset, and Revert
>
> 🕐 ~7 min read · Beginner friendly
>
> **📝 A note on this article** · This post is based on my personal study notes on version control and Git collaboration. To make these notes more readable and useful — for myself and for others — I worked with AI to help expand and structure them into a proper blog format. The ideas, learning journey, and understanding are mine; the AI helped with the writing and presentation.

---

## Git's Time Machine

One of the most powerful things about Git is that it never forgets. Every commit you've made is stored in history. And Git gives you three different commands to interact with that history:

| Command | What it does |
|---|---|
| `git checkout` | Temporarily *visit* a past commit |
| `git reset` | Go back to a past commit and *erase* what came after |
| `git revert` | Undo a past commit by *creating a new one* |

Each one handles time differently. Let's break them down.

---

## `git checkout` — The Time Traveler's Visitor Pass

Imagine you wrote a novel. You finished chapter 10, but you want to revisit chapter 3 to re-read how things were back then — without tearing out the later chapters.

That's `git checkout`. It lets you **visit** a past commit without changing or destroying anything that came after it. It's **temporary** — more like a read-only visit.

```bash
# First, find the commit you want to visit
git log --oneline
# Output example:
# a1b2c3d Add dark mode support
# 9f8e7d6 Fix login bug
# 3c4d5e6 Initial setup

# Visit a past commit
git checkout 9f8e7d6
```

You'll enter what Git calls a **"detached HEAD"** state. Don't be alarmed by the name — it just means you're not on any branch, you're floating freely in history.

```bash
# Go back to where you were
git checkout main
```

### Using Checkout to Explore and Branch Off

The real power of `git checkout` is when you want to say: *"I like how things were at this point — let me start a new story from here."*

```bash
# Visit an old commit AND create a new branch from it
git checkout -b new-feature 9f8e7d6
```

> **Analogy for kids:** Imagine reading a choose-your-own-adventure book. Checkout lets you flip back to page 12 and choose a different path — without ripping out the pages that already exist.

### Checkout for Branches

`git checkout` is also how you switch between branches (we'll cover branches in detail in Part 3):

```bash
# Switch to an existing branch
git checkout development

# Create and switch to a new branch
git checkout -b my-new-feature
```

> Modern Git also has `git switch` for branch switching, which is cleaner:
> ```bash
> git switch development
> git switch -c my-new-feature  # -c = create
> ```

---

## `git reset` — The Eraser

Now imagine you've been writing your novel and you realize the last three chapters were a mistake. You don't just want to revisit them — you want them **gone**. That's `git reset`.

`git reset` moves your project back to a past commit and **removes the commits that came after it** from the history.

> ⚠️ **Warning:** This is considered a "dangerous" command. Once you erase history, those commits are gone. Use it with care — especially if you've already shared (pushed) those commits to a remote repository.

### The Three Modes of Reset

```bash
# --soft: Go back, but keep your changes staged (ready to recommit)
git reset --soft 9f8e7d6

# --mixed (default): Go back, keep changes in your files but unstage them
git reset 9f8e7d6
git reset --mixed 9f8e7d6

# --hard: Go back and WIPE everything — files revert too
git reset --hard 9f8e7d6
```

| Mode | Commits removed? | Changes staged? | Files affected? |
|---|---|---|---|
| `--soft` | ✅ Yes | ✅ Yes | ❌ No |
| `--mixed` | ✅ Yes | ❌ No | ❌ No |
| `--hard` | ✅ Yes | ❌ No | ✅ Yes |

### Common Use Case

```bash
# Undo the very last commit (but keep the changes in your files)
git reset --soft HEAD~1

# HEAD~1 means "one commit before the current position"
# HEAD~2 means "two commits back", and so on
```

> **Analogy for kids:** Reset is like using a permanent eraser on your notebook. The words are gone — you can't get them back. So think twice before erasing!

---

## `git revert` — The Safer Undo

`git revert` is like the polite, professional version of `git reset`. Instead of erasing history, it says: *"That commit was a mistake — let me create a brand new commit that undoes it."*

The history stays intact. Nothing gets erased. This makes it the **safe choice** when you're working with a team or when you've already pushed your commits to a shared remote repository.

```bash
# Undo a specific commit by creating a new one that reverses it
git revert 9f8e7d6

# Git will open a text editor asking you to write a commit message
# (or you can skip with --no-edit)
git revert 9f8e7d6 --no-edit
```

### Revert vs Reset: A Side-by-Side

```
Before:
A → B → C → D  (current)

After git reset --hard B:
A → B            (C and D are gone)

After git revert D:
A → B → C → D → D'  (D' is a new commit that undoes D's changes)
```

> **Analogy for kids:** Revert is like writing a new chapter in your book that says "actually, forget what I wrote in chapter 7 — here's the corrected version." The mistake is still in the book, but now so is the fix. Reset is like taking a pair of scissors and cutting chapter 7 out entirely.

### When to Use Which?

| Situation | Use |
|---|---|
| You haven't pushed yet and want to clean up | `git reset` |
| You've already pushed and need to undo safely | `git revert` |
| You want to explore old code temporarily | `git checkout` |
| You want to start fresh from an old commit | `git checkout -b` |

---

## Quick Reference

```bash
# Visit a past commit temporarily
git checkout <commit-hash>

# Go back to your branch
git checkout main

# Create a branch from an old commit
git checkout -b new-branch <commit-hash>

# Undo last commit (keep changes staged)
git reset --soft HEAD~1

# Undo last commit (keep changes, unstaged)
git reset HEAD~1

# Undo last commit (delete changes too)
git reset --hard HEAD~1

# Safely undo a specific commit (creates new commit)
git revert <commit-hash>

# View history to find commit hashes
git log --oneline
```

---

## What's Next?

Now that you know how to save checkpoints and undo mistakes, it's time to learn how to work on **multiple things at once** — without chaos.

**→ [Part 3: Branches, Stash, and Git Workflow](./git-for-everyone__part-3-branches-stash-workflow)**

---

> 📌 **Series overview:**
> - [Part 1: What Is Git, Repository, and Commit](./git-for-everyone__part-1-what-is-git-repository-commit)
> - **Part 2: Traveling Through Time — Checkout, Reset, and Revert** ← you are here
> - Part 3: Branches, Stash, and Git Workflow
> - Part 4: Merge, Pull Requests, and Code Reviews
> - Part 5: Fork, Clone, and Open Source Collaboration
> - Part 6: Git GUI Apps — You Don't Have to Use the Terminal