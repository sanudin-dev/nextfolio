---
title: "SOLID: 5 Rules That Will Change How You Write Code Forever"
description: "SOLID is a set of five principles that help you write code that's easy to change, easy to understand, and easy to reuse. This post breaks down each principle with simple analogies — from robot chefs to Swiss Army knives — so they actually stick."
date: "2026-05-24"
tags: ["oop", "solid", "programming", "beginners"]
---

> **Series: Clean Code from the Ground Up** · Part 4 of 4 — SOLID Principles
>
> 🕐 ~10 min read · Beginner friendly
>
> **📝 A note on this article** · This post is based on my personal study notes. The ideas, learning journey, and understanding are mine — I used AI to help structure and expand them into a proper blog format form.

---

We've come a long way.

In [Part 1](./oop-solid__part-1-what-is-oop) we built our mental model of objects and classes.
In [Part 2](./oop-solid__part-2-how-objects-relate) we learned how objects connect and relate.
In [Part 3](./oop-solid__part-3-why-bad-design-hurts) we saw what happens when those connections go wrong — rigid, fragile, immobile code that nobody wants to touch.

Now it's time for the solution.

**SOLID** is a set of five principles, each targeting a specific failure mode in software design. Together, they act as a practical guide for writing code that remains healthy as it grows — code that's tolerant of change, easy to understand, and built from parts that can be reused.

Let's go through each one.

---

## A Quick Map Before We Dive In

| Letter | Principle | One-line summary |
|--------|-----------|-----------------|
| **S** | Single Responsibility | One class, one job |
| **O** | Open/Closed | Add new behavior without changing old code |
| **L** | Liskov Substitution | Children must keep their parent's promises |
| **I** | Interface Segregation | Don't force classes to implement what they don't need |
| **D** | Dependency Inversion | Depend on abstractions, not on specifics |

---

## S — Single Responsibility Principle (SRP)

> *"A module should be responsible to one, and only one, actor."*
> — Robert C. Martin, 2017

### The idea

Every class should have exactly one reason to change. Not two. Not five. One.

"Responsibility" here doesn't just mean "one task" — it means being responsible to **one actor**: a specific person, team, or group of stakeholders whose needs that class serves.

### The analogy

> 👨‍🍳 Imagine a restaurant where one person is the chef, the cashier, the security guard, *and* the delivery driver — all at once. When the menu changes, you have to retrain all four roles simultaneously. When the cash register breaks, it affects the kitchen too. Everything is tangled together.

In code, a class with multiple responsibilities is exactly this. A change requested by the finance team (for the invoicing logic) shouldn't force a change in code that the engineering team relies on (for the API response format) — even if both live in the same class.

### Why it matters

When a class has multiple responsibilities, those responsibilities become *coupled*. A change to serve one actor risks breaking behavior that another actor depends on. The class becomes a bottleneck — fragile, hard to test, and difficult for any single person to fully understand.

**The fix:** split the class. One responsibility per class, one reason to change.

---

## O — Open/Closed Principle (OCP)

> *"A software artifact should be open for extension but closed for modification."*
> — Bertrand Meyer, 1988

### The idea

Your code should be **open** to having new behavior added, but **closed** to having its existing code modified to do so.

In other words: when requirements change, you should be able to *add* new code rather than *edit* existing code.

### The analogy

> 🔌 Think of a power strip. You can plug in new devices — a lamp, a fan, a phone charger — without modifying the strip itself. The strip is open to new connections, but its core design doesn't change. Now imagine if every new device required you to crack open the power strip and rewire it. That's a violation of OCP.

### Why it matters

Every time you modify existing, working code to add a feature, you risk breaking what was already working. Tests might pass in isolation but fail in integration. Edge cases get missed.

OCP pushes you toward designs where new features are *extensions* — new classes, new modules — that slot in alongside existing ones rather than replacing them. The existing code stays stable. The new code carries all the newness.

---

## L — Liskov Substitution Principle (LSP)

> *"If for each object o1 of type S there is an object o2 of type T such that for all programs P defined in terms of T, the behaviour of P is unchanged when o1 is substituted for o2 then S is a subtype of T."*
> — Barbara Liskov, 1988

### The idea

That quote is a mouthful. Here's what it actually means:

**If you have a class and a subclass, you should be able to use the subclass anywhere you use the parent class — and everything should still work correctly.**

A child class must keep every promise its parent class makes.

### The analogy

> 🤖 Imagine a parent robot that can cook, clean, and wave. You build a child robot that inherits all of those behaviors. If the child robot breaks down every time it tries to cook — something the parent robot could do fine — then the child has broken its parent's promise. You can no longer safely swap one for the other.

### The rules LSP requires

LSP isn't just a vague guideline — it comes with specific technical requirements:

- **Contravariance of parameters:** a subclass method must accept the same types (or broader types) as the parent. It can't suddenly reject inputs the parent accepted.
- **Covariance of return types:** a subclass method must return the same type (or a more specific type) as the parent. It can't return something unexpected.
- **Preconditions:** a subclass can't add *stricter* requirements before running a method than the parent had. If the parent's method works without needing a database connection, the child's version can't suddenly require one.
- **Postconditions:** a subclass must guarantee *at least* what the parent promised after running a method. It can do more, but never less.
- **Invariants:** conditions that are true before and after a method in the parent must remain true in the subclass.

### Why it matters

LSP violations are sneaky. The code compiles. The tests might even pass. But at runtime, something breaks in a way that's hard to trace — because the caller *assumed* the subclass behaved like the parent, and it didn't.

Getting LSP right means your inheritance hierarchies are genuinely trustworthy.

---

## I — Interface Segregation Principle (ISP)

> *"Clients should not be forced to depend upon interfaces that they do not use."*
> — Robert C. Martin

### The idea

Don't bundle unrelated methods into one big interface and force every class that implements it to deal with all of them. Instead, split interfaces into smaller, focused ones — and let classes pick only the ones they need.

### The analogy

> 🍴 Imagine a restaurant that gives every customer the same enormous toolkit: a steak knife, a soup spoon, chopsticks, a seafood fork, a dessert spoon, and a fondue skewer — regardless of what they ordered. A customer who just wants soup shouldn't have to manage seven utensils they'll never use.

In code, a class forced to implement an interface it doesn't fully need ends up with empty methods, stub implementations, or methods that throw "not supported" errors. That's a design smell.

### Why it matters

Large, bloated interfaces create unnecessary coupling. If you change one method in a fat interface, every class that implements that interface is affected — even the ones that never used that method.

Smaller, focused interfaces mean each class only depends on what it actually uses. Changes stay localized. The blast radius of any modification shrinks.

---

## D — Dependency Inversion Principle (DIP)

> *"High-level modules should not depend on low-level modules. Both should depend on abstractions."*
> — Robert C. Martin

### The idea

There are two rules here:

1. High-level modules (the ones that contain your business logic) should not depend directly on low-level modules (the ones that handle details like databases, file systems, or APIs). Both should depend on an *abstraction* — an interface or abstract class.
2. Abstractions should not depend on details. Details should depend on abstractions.

### The analogy

> 🤖 Our robot again. Imagine the robot is *hardwired* to use a spatula for cooking — the spatula is soldered directly into its arm. If you want the robot to use a knife instead, you have to rebuild the arm from scratch.

Now imagine the robot's arm has a *standard connector* — an interface. You can plug in a spatula, a knife, a ladle, or tongs, and the robot works with any of them. The robot depends on the *connector standard* (the abstraction), not on any specific tool (the detail).

### Why it matters

When high-level code depends directly on low-level code, you're locked in. Want to swap your MySQL database for PostgreSQL? You have to change the business logic — the part that should never need to know what database you're using.

DIP flips this around. Your business logic talks to an interface: "give me a database that can do X." The actual database implementation fulfills that interface. Swapping it out requires changing the low-level module, not the high-level one.

This is also closely related to the concept of **layering** in software architecture — where high-level layers express intent and low-level layers handle implementation details.

---

## SOLID as a Whole

Each principle addresses a different dimension of design:

- **SRP** keeps each class focused and changes localized
- **OCP** lets your system grow without disturbing what already works
- **LSP** makes inheritance trustworthy and predictable
- **ISP** keeps interfaces lean so dependencies stay tight and intentional
- **DIP** decouples your business logic from implementation details

None of them is about writing *more* code. They're about writing code that costs *less* to maintain over time — code that new team members can understand, that survives requirement changes, and that can be tested in isolation.

---

## Where to Go From Here

Learning these principles is one thing. Applying them to real code — especially existing code that wasn't written with them in mind — is a different challenge entirely.

A few practical starting points:

- **Start with SRP.** It's the most immediately useful and the easiest to spot violations of. Find your "doing too much" classes and split them.
- **Look for OCP opportunities when adding features.** Before modifying an existing class, ask: "could I extend this instead?"
- **Check your inheritance hierarchies for LSP violations.** If a subclass has an empty method or throws "not implemented," that's a warning sign.
- **Review your interfaces.** If a class implements an interface but leaves some methods as stubs, the interface probably needs to be split.
- **Introduce abstractions at boundaries.** Anywhere your business logic touches infrastructure (a database, an API, a file system), add an interface in between.

---

## Wrapping Up the Series

If you've read all four parts, you now have a complete foundation:

- You understand how to model the world with **objects and classes**
- You know how to express the **relationships** between them accurately
- You can recognize the **warning signs** of a design going wrong
- And you have **five concrete principles** to guide you toward code that lasts

Good design isn't a destination. It's a habit — a set of questions you learn to ask every time you sit down to write code.

Thanks for reading. Now go build something clean.

---

> 📌 **Series: Clean Code from the Ground Up**
> - Part 1: [What is OOP?](./oop-solid__part-1-what-is-oop) — classes, objects, and the 4 pillars
> - Part 2: [When Objects Meet](./oop-solid__part-2-how-objects-relate) — relationships in OOP
> - Part 3: [Why Bad Design Hurts](./oop-solid__part-3-why-bad-design-hurts) — Software Design Principles
> - **Part 4: SOLID** ← you are here
