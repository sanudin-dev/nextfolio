---
title: "Git for Everyone: Branches, Stash, and Git Workflow"
description: "Branches let your team work in parallel without stepping on each other. Stash lets you pause mid-task without losing your work. Together, they're the backbone of a productive Git workflow."
date: "2026-06-08"
tags: ["git", "versioncontrol", "programming", "beginners"]
---

> **Series: Git for Everyone** · Part 3 of 6 — Branches, Stash, and Git Workflow
>
> 🕐 ~8 min read · Beginner friendly
>
> **📝 A note on this article** · This post is based on my personal study notes. The ideas, learning journey, and understanding are mine — I used AI to help structure and expand them into a proper blog format form.

---

## The Problem Branches Solve

Imagine a restaurant kitchen. There's one head chef managing the main menu — the dishes that customers are ordering right now. A junior chef comes up with an idea for a new dish. Should they experiment with it on the same pan while orders are flying out?

Of course not. They'd use a separate station, test the dish, perfect it — and only when it's ready, add it to the main menu.

That's exactly what **Git branches** do for code.

---

## What Is a Branch?

A branch is an **independent line of development**. By default, every Git repository starts with one branch, usually called `main` (or `master` in older projects).

You can create new branches off of `main` to work on features, bug fixes, or experiments — without touching the stable, working version.

> **Analogy for kids:** Imagine a river. The main river flows steadily. But sometimes, part of the river splits off into a smaller stream — it goes a different way, explores new territory. Later, it might rejoin the main river. Branches are those streams.

---

## Working with Branches

```bash
# See all branches (the current one is marked with *)
git branch

# Create a new branch
git branch feature/user-login

# Switch to that branch
git checkout feature/user-login
# or with modern Git:
git switch feature/user-login

# Create AND switch in one step
git checkout -b feature/user-login
# or:
git switch -c feature/user-login

# Delete a branch (after it's been merged)
git branch -d feature/user-login

# Force delete (even if not merged)
git branch -D feature/user-login

# See all branches including remote ones
git branch -a
```

---

## A Real-World Branching Setup

In most development teams, you'll see something like this:

```
main          → The stable version users are using
│
├── staging   → Testing environment before going live
│
└── development → Active development branch
    │
    ├── feature/dark-mode       → One dev working on dark mode
    ├── feature/user-profile    → Another dev on user profile
    └── fix/login-bug           → Someone fixing a bug
```

Each developer works on their own branch. When they're done, their work gets reviewed and merged back.

---

## Git Workflow: The Big Picture

Understanding branches is one thing — but understanding **when** to create them, **how** to name them, and **when** to merge them is what we call the **Git workflow**.

Here's a simple workflow that works well for most teams:

### 1. Start from the latest version

```bash
git switch main
git pull origin main          # Get the latest code from remote
```

### 2. Create a branch for your task

```bash
git switch -c feature/add-search-bar
```

### 3. Make changes, commit often

```bash
# ... edit your files ...
git add .
git commit -m "Add search bar component"

# ... more edits ...
git commit -m "Connect search bar to API"
```

### 4. Push your branch to remote

```bash
git push origin feature/add-search-bar
```

### 5. Open a Pull Request and get it reviewed

(We'll cover this in detail in Part 4.)

### 6. Merge into main

Once approved, your branch gets merged. The search bar is now in production.

---

## Naming Branches Consistently

Good branch names make teamwork much easier. A common convention:

| Type | Prefix | Example |
|---|---|---|
| New feature | `feature/` | `feature/dark-mode` |
| Bug fix | `fix/` or `bugfix/` | `fix/login-redirect` |
| Hotfix (urgent) | `hotfix/` | `hotfix/payment-crash` |
| Release | `release/` | `release/v2.1.0` |
| Experiment | `experiment/` | `experiment/new-ui` |

---

## Syncing Your Branch With Main

When you're working on a long-running branch, `main` might have received new commits while you were busy. You'll want to bring those updates into your branch — this is called **rebasing** or **merging from main**.

```bash
# While on your feature branch:
git fetch origin
git merge origin/main        # Merge main's latest into your branch

# Or using rebase (cleaner history, but more advanced):
git rebase origin/main
```

---

## Git Flow: A Popular Workflow Pattern

One widely used workflow is called **Git Flow**. It defines specific roles for different branches:

- `main` — only ever contains production-ready, stable code
- `develop` — the integration branch where features come together
- `feature/*` — individual features, branched from `develop`
- `release/*` — preparation for a new release
- `hotfix/*` — urgent fixes that go directly from `main`

You can read more about it at [Atlassian's Git Flow guide](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow).

---

## Git Stash: The "Pause Button" for Your Work

Here's a scenario you'll run into constantly as a developer:

You're halfway through building a feature. The code is messy, not ready to commit. Then suddenly your team lead says: *"Hey, can you quickly fix that login bug on the main branch?"*

You can't switch branches with uncommitted changes — Git won't allow it (or it'll make a mess). But you're also not ready to commit. What do you do?

You **stash** your work.

> **Analogy for kids:** Imagine you're drawing a picture but haven't finished it. Someone asks you to use that same table for something else right now. You carefully put your drawing and pencils into a drawer to keep them safe. Later, you open the drawer and continue exactly where you left off. That drawer is `git stash`.

### Basic Stash Usage

```bash
# Save your uncommitted work to the stash
git stash

# Your working directory is now clean — safe to switch branches
git switch fix/login-bug

# ... fix the bug, commit, switch back to your feature branch ...
git switch feature/add-search-bar

# Bring your stashed work back
git stash pop
```

`git stash pop` restores your changes **and** removes them from the stash. It's the most common way to retrieve stashed work.

### Managing Multiple Stashes

You can stash multiple times. Each stash gets an index number.

```bash
# Stash with a descriptive name (highly recommended)
git stash push -m "WIP: search bar half-done"

# List all stashes
git stash list
# Output:
# stash@{0}: On feature/search-bar: WIP: search bar half-done
# stash@{1}: On feature/dark-mode: dark mode palette experiment

# Apply a specific stash (without removing it from the list)
git stash apply stash@{1}

# Remove a specific stash from the list
git stash drop stash@{1}

# Apply AND remove in one step (same as pop, but for a specific stash)
git stash pop stash@{1}

# Throw away ALL stashes at once
git stash clear
```

### Stash Including Untracked Files

By default, `git stash` only saves files Git is already tracking. If you've created brand new files that haven't been `git add`-ed yet, use the `-u` flag:

```bash
# Include untracked (new) files in the stash
git stash -u

# Or the long form:
git stash push -u -m "WIP: search bar with new components"
```

### A Typical Stash Workflow

```bash
# 1. You're working on a feature — changes not ready to commit
git stash push -m "WIP: search bar half-done"

# 2. Switch to another branch and handle the urgent thing
git switch main
git pull origin main
git switch -c fix/login-bug
# ... fix bug ...
git add . && git commit -m "Fix login redirect on mobile"
git push origin fix/login-bug

# 3. Come back to your feature and restore your work
git switch feature/add-search-bar
git stash pop

# 4. Continue exactly where you left off
```

---

## Git Worktree: No Stash Needed

Stash works well for quick interruptions. But what if the other task is going to take longer? Or what if you simply don't want to touch your current work at all?

That's where **Git Worktree** comes in.

Normally, one Git repo = one working directory. You can only have one branch checked out at a time, which is why stashing exists in the first place.

Worktree breaks that limitation. It lets you **check out a second branch in a separate folder**, simultaneously, without touching your current work at all.

```
/home/user/
├── my-project/              ← your original folder (feature branch)
└── my-project-hotfix/       ← new folder created by worktree (hotfix branch)
```

Both folders point to the **same Git repository** — same history, same commits, same remote. There's no duplication, no separate clone. It's one repo, two windows into it.

> **Analogy for kids:** One book, two bookmarks. The book is your Git repository. Each bookmark is a worktree — a different place you're reading at the same time. The book itself is still one book.

### Basic Worktree Commands

```bash
# Add a new worktree for an existing branch
git worktree add ../my-project-hotfix hotfix/login-bug

# Add a new worktree AND create a new branch at the same time
git worktree add -b hotfix/login-bug ../my-project-hotfix origin/main

# List all active worktrees
git worktree list
# Output:
# /home/user/my-project          abc1234 [feature/add-search-bar]
# /home/user/my-project-hotfix   def5678 [hotfix/login-bug]

# Remove a worktree when you're done
git worktree remove ../my-project-hotfix
```

### A Typical Worktree Workflow

```bash
# You're deep in feature work — no need to stash anything
git worktree add -b hotfix/login-bug ../my-project-hotfix origin/main

# Open the hotfix folder in a new editor window
code ../my-project-hotfix   # or: zed ../my-project-hotfix

# Fix the bug, commit, push — all in that separate folder
cd ../my-project-hotfix
git add . && git commit -m "Fix login redirect on mobile"
git push origin hotfix/login-bug

# Done. Remove the worktree.
git worktree remove ../my-project-hotfix

# Back in your original folder — nothing has changed, continue your feature
cd ../my-project
```

Your feature branch was never touched. No stash, no pop, no risk of forgetting to restore.

### One Rule to Know

You **cannot check out the same branch in two worktrees at the same time**. Each worktree must be on a different branch — which makes sense, since the whole point is parallel isolation.

### Worktree vs Stash: When to Use Which

| | Stash | Worktree |
|---|---|---|
| Your current work | Saved and hidden | Stays exactly where it is |
| Switch branch | In the same folder | Open a different folder |
| Multiple branches at once | ❌ | ✅ |
| Ideal for | Quick, short interruptions | Longer parallel work |
| Editor/IDE | Reopen files in same window | Open a separate editor window |

> **Do GUI tools like GitHub Desktop or GitKraken still see it as one repo?** Yes — they read from the `.git` directory, which is shared. All branches, commits, and history appear exactly the same. Some tools like GitKraken and Fork even show active worktrees explicitly. GitHub Desktop is more basic but will still recognize the repo correctly.

---

## Quick Reference

```bash
git branch                        # List local branches
git branch -a                     # List all branches (including remote)
git switch -c <branch-name>       # Create and switch to new branch
git switch <branch-name>          # Switch to existing branch
git branch -d <branch-name>       # Delete a merged branch
git push origin <branch-name>     # Push branch to remote
git fetch origin                  # Fetch latest remote info
git merge origin/main             # Merge main into current branch
git stash                         # Save uncommitted work temporarily
git stash push -m "description"   # Stash with a label
git stash list                    # See all stashes
git stash pop                     # Restore latest stash and remove it
git stash apply stash@{N}         # Restore specific stash (keep in list)
git stash drop stash@{N}          # Remove a specific stash
git stash clear                   # Remove all stashes
git stash -u                      # Stash including untracked files
git worktree add <path> <branch>  # Check out a branch in a new folder
git worktree add -b <branch> <path> origin/main  # Create branch + worktree
git worktree list                 # List all active worktrees
git worktree remove <path>        # Remove a worktree when done
```

---

## What's Next?

Now that you know how to create branches, follow a workflow, and pause your work safely — the next step is learning what happens when those branches come back together.

**→ [Part 4: Merge, Pull Requests, and Code Reviews](./git-for-everyone__part-4-merge-pull-request-code-review)**

---

> 📌 **Series overview:**
> - [Part 1: What Is Git, Repository, and Commit](./git-for-everyone__part-1-what-is-git-repository-commit)
> - [Part 2: Traveling Through Time — Checkout, Reset, and Revert](./git-for-everyone__part-2-checkout-reset-revert)
> - **Part 3: Branches, Stash, and Git Workflow** ← you are here
> - Part 4: Merge, Pull Requests, and Code Reviews
> - Part 5: Fork, Clone, and Open Source Collaboration
> - Part 6: Git GUI Apps — You Don't Have to Use the Terminal
