---
title: "Git for Everyone: Fork, Clone, and Open Source Collaboration"
description: "What if you want to contribute to a project you don't own? That's what forking is for. Let's break down the difference between fork and clone, and walk through the full open source contribution flow."
date: "2026-06-08"
tags: ["git", "versioncontrol", "opensource", "beginners"]
---

> **Series: Git for Everyone** · Part 5 of 6 — Fork, Clone, and Open Source Collaboration
>
> 🕐 ~7 min read · Beginner friendly
>
> **📝 A note on this article** · This post is based on my personal study notes. The ideas, learning journey, and understanding are mine — I used AI to help structure and expand them into a proper blog format form.

---

## Contributing Without an Invitation

Let's say you're using an open-source library and you notice a bug. You'd like to fix it. But it's not your project — you don't have write access to it.

Does that mean you can't help?

Not at all. This is where **forking** comes in — one of the most important concepts in open source collaboration.

---

## What Is a Fork?

**Forking** means making a copy of someone else's repository into your own GitHub account. It's like making a photocopy of a book — you can write all over your copy without touching the original.

> **Analogy for kids:** Your friend has a LEGO set they built. You want to try building it differently. You ask for your own copy of the instructions, build your own version, and if yours is better, you show your friend and say "want to try this?"

---

## Fork vs Clone: What's the Difference?

Both operations copy a repository, but the destination is different:

| | Fork | Clone |
|---|---|---|
| **Where does the copy go?** | Your GitHub account (remote) | Your local computer |
| **Who owns the copy?** | You (on GitHub) | You (locally) |
| **Can you push changes?** | Yes, to your fork | Only if you have access to the original |
| **Affects original repo?** | No | No |

```bash
# Cloning: copies a repo to your local machine
git clone https://github.com/some-user/some-project.git

# Forking: done through GitHub's UI (click the "Fork" button)
# Then clone YOUR fork locally
git clone https://github.com/YOUR-USERNAME/some-project.git
```

---

## The Open Source Contribution Flow

Here's the typical flow for contributing to a public project you don't own:

### Step 1: Fork the repository

Click the **Fork** button on GitHub. This creates a copy at `github.com/your-username/the-project`.

### Step 2: Clone your fork locally

```bash
git clone https://github.com/your-username/the-project.git
cd the-project
```

### Step 3: Add the original repo as a remote (called "upstream")

```bash
git remote add upstream https://github.com/original-owner/the-project.git

# Verify your remotes
git remote -v
# Output:
# origin    https://github.com/your-username/the-project.git (fetch)
# origin    https://github.com/your-username/the-project.git (push)
# upstream  https://github.com/original-owner/the-project.git (fetch)
# upstream  https://github.com/original-owner/the-project.git (push)
```

### Step 4: Create a branch and make your changes

```bash
git switch -c fix/typo-in-readme
# ... edit files ...
git add .
git commit -m "Fix typo in README installation section"
```

### Step 5: Push to your fork

```bash
git push origin fix/typo-in-readme
```

### Step 6: Open a Pull Request to the original repo

On GitHub, you'll see a prompt: *"Compare & pull request."* Click it, write a clear description of your change, and submit.

The original project's maintainers will review your PR. They can:
- **Approve and merge** — your contribution becomes part of the project 🎉
- **Request changes** — they give you feedback and you update your branch
- **Close without merging** — the change wasn't a good fit (that's okay, it happens)

---

## Keeping Your Fork Up to Date

The original project doesn't stop moving while you're working. To stay in sync:

```bash
# Fetch the latest from the original repo
git fetch upstream

# Merge upstream's main into your local main
git switch main
git merge upstream/main

# Push to keep your fork's main updated too
git push origin main
```

---

## Public vs Private Repositories

| | Public Repository | Private Repository |
|---|---|---|
| **Who can see it?** | Everyone | Only collaborators |
| **Who can fork it?** | Anyone | No one (forking is disabled) |
| **Who can contribute?** | Anyone via fork + PR | Only invited collaborators |
| **Common use case** | Open source | Team/internal projects |

### Collaborators vs Contributors

These two words sound similar but mean different things:

- A **collaborator** is someone the repo owner has explicitly invited. They can push directly.
- A **contributor** is anyone who has had a commit merged — including via a fork + PR.

You can be a contributor without ever being a collaborator.

---

## Tips for Starting to Contribute

If you're new to open source and don't know where to start:

### 1. Start small

Don't try to fix the biggest bug in a complex project on day one. Start with:
- Fixing a typo in documentation
- Improving a confusing README section
- Adding a missing code comment

> The value of starting small isn't just the contribution itself — it's building the confidence and understanding to contribute more over time.

### 2. Read the project's ecosystem

Before touching any code, read:
- `README.md` — what the project does
- `CONTRIBUTING.md` — how they expect contributions
- Open issues — what needs work
- Existing PRs — what style and format looks like

```bash
# Read the commit history to understand the project's tone and style
git log --oneline
```

### 3. Follow the project's conventions

Every project has its own style:
- Commit message format
- Code style (indentation, naming)
- Branch naming conventions
- PR description template

If you ignore these, your PR will likely be sent back for changes.

---

## Quick Reference

```bash
# Clone a repo (or your fork) locally
git clone <url>

# Add upstream remote (original repo)
git remote add upstream <original-repo-url>

# Fetch latest from upstream
git fetch upstream

# Sync your local main with upstream
git switch main
git merge upstream/main

# Push your synced main to your fork
git push origin main

# List all remotes
git remote -v
```

---

## What's Next?

You've now learned the complete Git collaboration flow — from your first commit all the way to contributing to open source projects.

In the final part, we'll look at tools that make all of this easier: **GUI apps that let you do Git without typing a single command**.

**→ [Part 6: Git GUI Apps — You Don't Have to Use the Terminal](./git-for-everyone__part-6-git-gui-apps)**

---

> 📌 **Series overview:**
> - [Part 1: What Is Git, Repository, and Commit](./git-for-everyone__part-1-what-is-git-repository-commit)
> - [Part 2: Traveling Through Time — Checkout, Reset, and Revert](./git-for-everyone__part-2-checkout-reset-revert)
> - [Part 3: Branches, Stash, and Git Workflow](./git-for-everyone__part-3-branches-stash-workflow)
> - [Part 4: Merge, Pull Requests, and Code Reviews](./git-for-everyone__part-4-merge-pull-request-code-review)
> - **Part 5: Fork, Clone, and Open Source Collaboration** ← you are here
> - Part 6: Git GUI Apps — You Don't Have to Use the Terminal
