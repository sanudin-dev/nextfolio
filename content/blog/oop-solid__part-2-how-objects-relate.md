---
title: "When Objects Meet: A Friendly Guide to Relationships in OOP"
description: "Objects don't live in isolation — they talk, depend on, and sometimes can't exist without each other. This post explores the different types of relationships in OOP: association, aggregation, composition, dependency, and generalization, with analogies that make each one click."
date: "2026-05-24"
---

> **Series: Clean Code from the Ground Up**
> Part 2 of 4 — Relations in OOP
> 🕐 ~6 min read · Beginner friendly

> **📝 A note on this article**
> This post is based on my personal study notes on OOP and SOLID principles. To make these notes more readable and useful — for myself and for others — I worked with AI to help expand and structure them into a proper blog format. The ideas, learning journey, and understanding are mine; the AI helped with the writing and presentation.

---

In [Part 1](./oop-solid__part-1-what-is-oop), we learned what objects and classes are. We built our robot from a blueprint, gave it properties and behaviors, and understood the four pillars of OOP.

But here's the thing — in the real world, nothing works in isolation.

Your robot needs a factory. The factory needs workers. The workers need tools. Everything is *connected*.

The same is true in code. Objects relate to each other in very specific ways, and understanding those relationships is what separates code that's easy to grow from code that collapses the moment you try to change it.

Let's map them out.

---

## Why Relationships Matter

Imagine building a school app. You have a `Student`, a `Classroom`, a `Teacher`, and a `Course`. These aren't independent islands — they interact constantly:

- A `Student` *enrolls in* a `Course`
- A `Teacher` *teaches* a `Course`
- A `Classroom` *hosts* the lesson
- A `Course` *cannot exist* without being part of a school

Each of those connections is a different *type* of relationship. Getting them right means your system mirrors reality — and broken, inconsistent relationships mean bugs that are hard to even explain.

---

## The Three Categories

OOP relationships fall into three broad categories:

1. **Association** — objects are connected to each other
2. **Dependency** — one object temporarily uses another
3. **Generalization** — one class is a specialized version of another

Let's go through each one.

---

## 1. Association — "They Know Each Other"

Association is the most general type of relationship. It means two objects are structurally connected — one has a reference to the other, and they can interact.

> 🏫 A `Teacher` and a `Student` are associated. They know each other exists, they interact during class, but one can live independently of the other.

Association comes in three flavors based on *how many* objects are involved on each side. This is called **cardinality**:

### One-to-one
One object connects to exactly one other.

> 🪪 One person has one passport. One passport belongs to one person.

### One-to-many
One object connects to multiple others, but those others each connect to only one.

> 🏫 One teacher teaches many students, but each student (in this class) has one teacher.

### Many-to-many
Both sides can connect to multiple objects on the other side.

> 📚 A student enrolls in many courses. A course has many students.

---

### Inside Association: Aggregation vs. Composition

When two objects are associated in a "whole–part" way — where one *contains* or *owns* the other — we need to be more specific. There are two sub-types:

---

#### Aggregation — "Has, but can let go"

Aggregation is a *loose* ownership. The child object can exist independently — it just happens to belong to the parent right now.

> 🎒 A `Backpack` contains `Books`. But if you throw the backpack away, the books still exist. They're independent.

In code: if the parent object is destroyed, the child lives on.

---

#### Composition — "Has, and cannot let go"

Composition is a *tight* ownership. The child object is *born with* the parent and *dies with* it. It has no meaning outside of the parent.

> 🏠 A `House` has `Rooms`. If you demolish the house, the rooms cease to exist. They were never independent.

In code: if the parent object is destroyed, all its composed children are destroyed too.

---

**Quick way to remember the difference:**

| | Aggregation | Composition |
|---|---|---|
| Child lives without parent? | ✅ Yes | ❌ No |
| Bond strength | Loose ("has a") | Tight ("is made of") |
| Example | Backpack & Books | House & Rooms |

---

## 2. Dependency — "I Need You, But Just for a Moment"

Dependency is a weaker, more temporary relationship. One class uses another to get something done, but doesn't hold onto it permanently.

> 🚗 A `Driver` depends on a `Car` to get somewhere. But when the trip is done, the driver doesn't own or store the car — the relationship ends.

In code, this often looks like one class receiving another as a method parameter or creating it temporarily inside a function — not storing it as a property.

The key distinction from association: **association is persistent, dependency is temporary**.

If `ClassA` stores a reference to `ClassB` as a field → association.
If `ClassA` only uses `ClassB` inside one method → dependency.

---

## 3. Generalization — "I'm a More Specific Version of You"

We touched on inheritance in Part 1. Generalization is the formal term for that same concept, viewed from a design perspective.

> 🐾 `Animal` is a general concept. `Dog` is a more specific version of `Animal`. `Poodle` is an even more specific version of `Dog`.

- **Generalization** = taking two similar classes and pulling their shared traits *up* into a common superclass
- **Specialization** = the reverse — starting from a general class and creating more specific subclasses

---

### Realization — "I Promise to Fulfill This Contract"

Closely related to generalization is **realization**. This is when a class *implements* an interface — it's promising to fulfill a contract defined elsewhere.

> 📋 An `Interface` is like a job description: "whoever takes this role must be able to do X, Y, and Z." A class that *realizes* that interface is like an employee who agrees to fulfill those responsibilities.

The interface defines *what* must be done. The implementing class defines *how*.

---

## Putting It All Together

Here's the full picture of OOP relationships:

```
Relationships in OOP
│
├── Association (structural, persistent)
│   ├── One-to-one
│   ├── One-to-many
│   ├── Many-to-many
│   │
│   └── Whole–Part relationships
│       ├── Aggregation  (loose: child survives without parent)
│       └── Composition  (tight: child dies with parent)
│
├── Dependency (temporary, usage-based)
│
└── Generalization (hierarchy-based)
    ├── Inheritance   (class extends class)
    └── Realization   (class implements interface)
```

---

## Why Getting This Right Matters

Each relationship type carries *design intent*. When you pick the wrong one, you send the wrong signal to every developer who reads your code after you.

- Using composition when you mean aggregation means objects get destroyed when they shouldn't.
- Using association when you mean dependency means you're creating unnecessary long-term coupling.
- Skipping generalization when two classes share logic means you're writing the same thing twice.

The goal of modeling relationships correctly isn't academic. It's practical: it makes your system easier to read, change, and extend without surprises.

---

## What's Next?

Now that we understand how to structure objects and their relationships, the next question is: what makes a *design* good or bad? Before we get to SOLID, we need to understand the common failure modes that SOLID was created to prevent.

**→ [Part 3: Why Bad Design Hurts — Rigidity, Fragility, and the Cost of Messy Code](./oop-solid__part-3-why-bad-design-hurts)**

---

> 📌 **Series overview:**
> - Part 1: [What is OOP?](./oop-solid__part-1-what-is-oop) — classes, objects, and the 4 pillars
> - **Part 2: When Objects Meet** ← you are here
> - Part 3: Why Bad Design Hurts — Software Design Principles
> - Part 4: SOLID — 5 Rules for Writing Clean, Maintainable Code
