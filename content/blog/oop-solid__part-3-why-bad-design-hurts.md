---
title: "Why Bad Design Hurts: The Three Code Smells Every Developer Should Know"
description: "Before learning the rules of good design, you need to understand what bad design actually looks like — and why it's so painful. This post introduces Software Design Principles and the three warning signs that your codebase is heading in the wrong direction: rigidity, fragility, and immobility."
date: "2026-05-24"
---

> **Series: Clean Code from the Ground Up**
> Part 3 of 4 — Software Design Principles
> 🕐 ~5 min read · Beginner friendly

> **📝 A note on this article**
> This post is based on my personal study notes on OOP and SOLID principles. To make these notes more readable and useful — for myself and for others — I worked with AI to help expand and structure them into a proper blog format. The ideas, learning journey, and understanding are mine; the AI helped with the writing and presentation.

---

In [Part 1](./oop-solid__part-1-what-is-oop) we learned how to model the world with objects.
In [Part 2](./oop-solid__part-2-how-objects-relate) we learned how those objects connect.

But here's a truth that every developer eventually learns the hard way:

> You can use OOP perfectly — proper classes, clean relationships, all of it — and still end up with a codebase that's a nightmare to work with.

Why? Because *structure* alone doesn't guarantee *good design*. You need principles on top of the structure.

That's what Software Design Principles are for. And before we get to the famous ones, we need to understand the problem they're solving.

---

## Architecture vs. Design

First, a quick distinction that often gets blurred:

- **Architecture** defines the *structure* of your system — what the major components are and how they're divided.
- **Design** defines the *relationships* between components — how they talk to each other, depend on each other, and change together.

You can have good architecture and bad design. A well-organized folder structure with clean module names means nothing if the internal dependencies are tangled spaghetti.

Software Design Principles are specifically about the *design* layer — the connections and dependencies between your components.

---

## The Three Signs of Bad Design

Robert C. Martin — the engineer behind SOLID, which we'll cover in Part 4 — identified three specific patterns that signal a codebase is heading in the wrong direction.

He called them the three symptoms of bad design. Think of them like warning lights on a dashboard. Each one tells you something specific is wrong.

---

### 1. Rigidity — "I'm afraid to touch it"

Rigidity is when a system is **hard to change** — even for the simplest modification.

> 🪨 Imagine a pile of blocks stacked carefully. To move one block at the bottom, you have to move every block above it. A simple change becomes a huge operation.

In code, this happens when components are so tightly coupled that a change in one place forces changes in many others. You touch one file and suddenly three other files need updating. Then those files need updates somewhere else. The change ripples endlessly.

The result? Developers become *afraid* to make changes. They work around the problem instead of fixing it. The code gets worse over time.

**The signal:** "I just need to change one small thing, but I have to touch half the codebase to do it."

---

### 2. Fragility — "It breaks in places I didn't even touch"

Fragility is when the software **breaks in unexpected places** every time you make a change.

> 🍪 Imagine a crumbly cookie. You try to pick it up from one end, and the other end breaks off. You weren't even touching that part.

This is worse than rigidity in a way — at least with rigid code, you know what you have to change. With fragile code, you don't even know what you're breaking until it's already broken. Often in production.

Fragile code has hidden dependencies — things that *seem* unrelated but are actually connected in non-obvious ways. You fix a bug in the payment module, and somehow the email notification breaks.

**The signal:** "We fixed a bug in X, but now Y is broken — and we have no idea why."

---

### 3. Immobility — "I can't reuse anything"

Immobility is when components of your system **can't be reused** in other projects or even other parts of the same project.

> 🏗️ Imagine dismantling a building to reuse its bricks — but the bricks were glued together with wires and plumbing running through them. You can't take one brick without dragging everything else along.

This happens when a component that does something useful is so entangled with its surrounding context that you can't extract it without bringing half the system with it.

You want to reuse the authentication logic from Project A in Project B. But the auth module depends on the database module, which depends on the config module, which depends on... everything. It's not reusable. You end up rewriting it from scratch.

**The signal:** "I know we solved this exact problem before, but reusing that code would take longer than writing it again."

---

## What All Three Have in Common

Rigidity, fragility, and immobility all come from the same root cause: **poor management of dependencies**.

When components know too much about each other — when they reach into each other's internals, depend on each other's implementation details, or are wired together in hidden ways — the whole system becomes fragile, rigid, and immobile.

The fix isn't to avoid connecting components. You can't build useful software without connections. The fix is to be *intentional* about the type, direction, and strength of those connections.

That's exactly what the next set of principles addresses.

---

## Enter: Design Principles

Software Design Principles are a set of guidelines that help you avoid these three failure modes. They tell you *how* to structure the connections between your components so that:

- Changing one thing doesn't cascade into changing everything else (anti-rigidity)
- A fix in one place doesn't silently break another (anti-fragility)
- Components can be lifted out and used elsewhere without drama (anti-immobility)

The most famous collection of these principles has a catchy acronym: **SOLID**.

And that's where we're going next.

---

## What's Next?

We've seen the problem. Now let's learn the solution — five principles that, when applied together, produce code that's genuinely a pleasure to work with.

**→ [Part 4: SOLID — 5 Rules for Writing Clean, Maintainable Code](./oop-solid__part-4-solid)**

---

> 📌 **Series overview:**
> - Part 1: [What is OOP?](./oop-solid__part-1-what-is-oop) — classes, objects, and the 4 pillars
> - Part 2: [When Objects Meet](./oop-solid__part-2-how-objects-relate) — relationships in OOP
> - **Part 3: Why Bad Design Hurts** ← you are here
> - Part 4: SOLID — 5 Rules for Writing Clean, Maintainable Code
