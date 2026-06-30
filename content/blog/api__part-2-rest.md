---
title: "REST: The API Style Everyone Uses"
description: "REST is everywhere, but most \"REST APIs\" quietly break its own rules. This article breaks down what REST really requires (including the HATEOAS rule almost everyone skips), the difference between safe and idempotent HTTP methods, why idempotency is what saves you from double-charging a customer on a flaky connection, resource naming conventions, statelessness, and the status codes worth actually knowing."
date: "2026-06-30"
tags: ["api", "webdev", "backend", "beginners"]
---

> **Series: API** · Part 2 of 6 — REST: The API Style Everyone Uses
>
> 🕐 ~10 min read · Beginner friendly
>
> **📝 A note on this article** · This post is based on my personal study notes. The ideas, learning journey, and understanding are mine — I used AI to help structure and expand them into a proper blog format form.

---

In [Part 1](./api__part-1-what-is-api), we covered what an API actually is, the client-server request-response cycle, and the basics of HTTP. We also briefly mentioned REST as one of several API styles. This time, we go deep on REST specifically — because it's the style you'll use most, and also the style most people quietly get wrong.

If you think any API that returns JSON over HTTP counts as a REST API, you're not alone — but you're in the wrong universe. If your API has an endpoint like `POST /api/v1/update-product/67` or `GET /api/v1/users/delete/67`, it's not REST, no matter how many people call it that. If your API always returns a `200` status code even when the response body says `"error": true`, that's a sign something's off too.

REST has real rules. Most production APIs only follow some of them — and understanding which rules matter, and why, will make you a sharper API consumer and a much better API designer.

---

## What REST Actually Means

**REST** stands for **Representational State Transfer**. It's an architectural style — not a protocol, not a format — built around a few core ideas:

- **Standard HTTP methods** — GET, POST, PUT, PATCH, DELETE, each with a specific meaning
- **Client-server separation** — the client and server evolve independently
- **Statelessness** — every request is self-contained (we'll cover this in detail below)
- **Resource-based design** — URLs represent *things* (nouns), not actions (verbs)

REST is the default API style today because it's simple, works natively with HTTP, and is supported everywhere — every language, every framework, every tool.

But here's where it gets interesting: REST, as originally defined, asks for more than most of us actually build.

---

## The HATEOAS Problem — Are You Really Building REST?

REST was defined by Roy Fielding in his 2000 doctoral dissertation. One requirement from that definition gets dropped from almost every API calling itself "RESTful" today: **HATEOAS** (Hypermedia As The Engine Of Application State).

Fielding's argument was that a true REST API shouldn't just return data — it should return data *plus* the actions the client is currently allowed to take next.

Compare these two responses for the same bank account:

**Without HATEOAS** (what most "REST" APIs actually return):
```json
{
  "account_id": "9876",
  "balance": 50.00,
  "status": "active"
}
```

**With HATEOAS** (what Fielding's REST actually asks for):
```json
{
  "account_id": "9876",
  "balance": 50.00,
  "status": "active",
  "_links": {
    "self": { "href": "/accounts/9876" },
    "deposit": { "href": "/accounts/9876/deposit" },
    "withdraw": { "href": "/accounts/9876/withdraw" }
  }
}
```

Without HATEOAS, the frontend has to hardcode business logic: *"if balance is low, hide the withdraw button."* If that rule changes on the backend, the frontend has to be updated and redeployed to match.

With HATEOAS, the server controls what's possible. If the account goes into debt, the server simply stops including the `withdraw` link in the response. The frontend doesn't need to know the rule — it just follows whatever links are present. The client never goes out of sync with the server's actual business logic.

### So why doesn't everyone do this?

Two honest reasons:

1. **Hardcoding is faster.** When the same team owns both frontend and backend, it's often quicker to agree on a JSON shape in Slack and hardcode the URLs than to build a system that generates links dynamically for every response.
2. **Pragmatism wins.** Using HTTP methods correctly and keeping URLs clean (often called *Pragmatic REST*) gets you most of REST's real benefits without the overhead of full hypermedia compliance.

There's actually a model for this — the **Richardson Maturity Model**, which maps how close an API gets to "true" REST:

- **Level 0 — Swamp of POX:** HTTP is just a transport tunnel. Everything is POST, RPC-style.
- **Level 1 — Resources:** URLs are broken into individual paths, like `/users`.
- **Level 2 — HTTP Verbs:** GET, POST, PUT, DELETE and status codes are used correctly.
- **Level 3 — Hypermedia Controls:** Full HATEOAS compliance.

Most modern tech companies sit comfortably at **Level 2**. They call it REST. A purist might argue it isn't — but it's functional, scalable, and gets the job done. For the rest of this article, "REST" means Level 2, because that's what you'll actually be building and consuming in production.

---

## HTTP Methods: Safety and Idempotency

In [Part 1](./api__part-1-what-is-api), we covered what each HTTP method generally does. Here, we go one level deeper — into the two properties that actually make REST predictable: **safety** and **idempotency**.

- **Safe** means the method never changes server state. It's read-only.
- **Idempotent** means making the same request multiple times produces the exact same server state as making it once. No matter how many times you hit it, the data ends up identical.

These aren't academic distinctions. They directly determine what your client is allowed to safely retry on a flaky network — which matters enormously in production.

### GET — Retrieve

**Safe:** Yes. **Idempotent:** Yes.

`GET /products/123` called once or a thousand times returns the same data and changes nothing. Because it's safe and read-only, browsers and proxies are allowed to cache it aggressively.

One trap worth knowing: never pass sensitive data — passwords, tokens — as URL query parameters (`/login?password=123`). URLs get logged by routers, browser history, and server access logs. That data is effectively public the moment it's in a URL.

### POST — Create

**Safe:** No. **Idempotent:** No.

`POST /orders` creates a new resource. Call it three times with an identical payload, and you get three separate orders with three separate IDs. This is the method most prone to accidental duplication — which is exactly why payment endpoints need special handling (more on this below).

POST is also HTTP's general-purpose fallback: any operation that doesn't map cleanly to CRUD (a complex search, a calculation) often ends up as POST. A successful POST should return `201 Created`, along with a `Location` header pointing to the new resource (`Location: /api/v1/users/583`).

### PUT — Replace

**Safe:** No. **Idempotent:** Yes.

This trips people up, because PUT *changes* data but is still idempotent. Send `PUT /users/67` with `{"name": "John Doe", "role": "admin"}`, and the result is the same whether you send that request once or fifty times — user 67 ends up with that exact name and role each time. The state doesn't change *further* after the first call.

The catch: PUT expects the **entire resource**. If a user has `name`, `email`, and `bio`, and you PUT with only `{"name": "John Doe"}`, a strict implementation will wipe `email` and `bio` to null. PUT is also allowed to *create* a resource if it doesn't exist yet at that ID — this is called an upsert.

### PATCH — Partially Modify

**Safe:** No. **Idempotent:** Officially, no — though it's nuanced.

PATCH only touches the fields you send. `{"name": "John Doe"}` sent to a PATCH endpoint leaves `email` and `bio` untouched. Most basic field updates behave idempotently in practice. But PATCH is classified as non-idempotent because of instructions like `{"views": "+1"}` — an increment. Run that five times, and the state changes five times.

### DELETE — Remove

**Safe:** No. **Idempotent:** Yes.

The first `DELETE /posts/99` removes the post. Every call after that returns `404 Not Found` since the post is already gone — but the server's state doesn't change any further. That's still idempotent. Note that "deleted" doesn't always mean physically erased; many systems perform a soft delete (`is_deleted = true`), which still satisfies REST semantics as long as the resource is no longer reachable through the public API.

### Why This Actually Matters

Picture a mobile user on a flaky connection. They tap "Update Profile." The request goes out, but the connection drops before the response comes back.

If the endpoint correctly uses PUT, the client's networking layer can safely auto-retry — the end state is identical no matter how many times it retries.

If the endpoint wrongly uses POST for that same update, an automatic retry could create duplicate records or corrupt data. The method you choose isn't a style preference. It's a contract about what's safe to retry.

| Method | Idempotent? | What happens on retry |
|--------|-------------|------------------------|
| GET | Yes | Read-only — nothing changes. |
| PUT | Yes | Replaces the resource. Repeating it leaves the same end state. |
| DELETE | Yes | First call deletes it; later calls find nothing left to delete. |
| POST | No | Creates a new resource every time — repeats create duplicates. |
| PATCH | Usually, with exceptions | Direct field updates are idempotent; increments (`+1`) are not. |

---

## Idempotency in the Real World: Payments

This is where idempotency stops being theoretical.

Picture buying something online. You tap checkout. Your connection drops right after the request leaves your device. You don't know if the server received it. So you tap checkout again.

If the endpoint isn't idempotent, there's a real chance you've now been charged twice for the same order — because the server has no way to know your second request was a retry, not a new purchase.

This is solved with an **`Idempotency-Key`** header. The client generates a unique key once — typically a UUID, generated the moment the user taps "Pay" — and sends that same key on every attempt to complete that specific transaction, including retries. The server stores the result against that key. If it sees the same key again, it returns the original result instead of processing the payment a second time.

Here's a minimal example:

```javascript
const express = require('express');
const app = express().use(express.json());

const cache = new Map(); // Idempotency key storage
const db = new Map();    // Payment storage

// POST: Create Payment (protected with an Idempotency Key)
app.post('/api/v1/payments', (req, res) => {
  const key = req.headers['idempotency-key'];
  const { amount, currency, orderId } = req.body;

  if (!amount || amount <= 0 || !currency || !orderId) {
    return res.status(422).json({ error: "Validation Failed" });
  }
  if (!key) {
    return res.status(400).json({ error: "Missing 'Idempotency-Key' header" });
  }
  if (cache.has(key)) {
    return res.status(201).json(cache.get(key)); // Already processed — return the original result
  }

  const payment = { id: `pay_${Date.now()}`, orderId, amount, currency, status: "succeeded" };
  db.set(payment.id, payment);
  cache.set(key, payment);

  res.status(201).json(payment);
});

// GET: Fetch Payment
app.get('/api/v1/payments/:id', (req, res) => {
  const payment = db.get(req.params.id);
  payment ? res.status(200).json(payment) : res.status(404).json({ error: "Not Found" });
});

app.listen(3000, () => console.log('API running on port 3000'));
```

POST is inherently non-idempotent — that's correct REST behavior. The Idempotency-Key pattern is how you add safety to an operation that genuinely needs to be a POST (creating a payment) without changing what POST means.

---

## Naming: Use Nouns, Not Verbs

A REST URL should describe a **resource** — a thing — not an action. The action is already expressed by the HTTP method.

Think of your backend as a filing cabinet. The folders are nouns (`customers`, `invoices`, `products`). What you *do* to those folders — look, add, replace, throw away — is entirely the job of the HTTP method. Put a verb in the URL and you're duplicating that job and creating an inconsistent API.

| Operation | ❌ Wrong | ✅ Right |
|-----------|---------|---------|
| Get all users | `GET /getAllUsers` | `GET /users` |
| Create a user | `POST /createUser` | `POST /users` |
| View a specific user | `GET /viewUser?id=42` | `GET /users/42` |
| Update a user | `POST /updateUser/42` | `PATCH /users/42` |
| Delete a user | `GET /users/delete/42` | `DELETE /users/42` |

A couple of conventions worth following consistently:

- **Use plural nouns for collections.** `/users`, not `/user`. `GET /users` queries the whole collection; `GET /users/42` points to one specific item inside it.
- **Nest sparingly to express ownership.** `GET /users/42/orders` reads naturally as "inside user 42's collection, give me their orders." Keep nesting to two levels max — `/users/42/orders/1001/items/3` is painful to maintain.

### When an action genuinely doesn't fit a noun

Sometimes you need to do something that doesn't map cleanly to CRUD — logging in, cancelling an order, resending an email. Two acceptable options:

1. **Turn the action into a resource (preferred).** Instead of `POST /users/42/checkout`, use `POST /users/42/transactions` — you're creating a transaction record. Instead of `POST /login`, use `POST /sessions` — you're creating a session.
2. **Use a controller-style suffix (the pragmatic escape hatch).** `POST /orders/123/cancel` or `POST /emails/55/resend`. A REST purist might object, but this pattern is widely used in production because it's clear and pragmatic.

---

## Statelessness: The Server Has No Memory

Statelessness means every request must carry everything the server needs to understand it. The server doesn't remember anything about a client between requests — not who they are, not what they asked for last.

Think of it like a vending machine, not a cashier at a café. At a café, the cashier remembers "I want a cola," then "large," and combines both into your order — they're holding context across two sentences. A vending machine has no such memory: you select the drink and the size in one interaction, and the moment it drops your can, it has no idea you exist.

REST APIs work like the vending machine.

A stateful approach (not how REST works) might look like: client sends credentials, server validates and *remembers* "this user is logged in" in its own memory. Next request, server checks its memory and responds accordingly.

The stateless REST approach: client sends credentials, server validates and hands back a token (typically a JWT) — and forgets everything immediately. Every subsequent request must include that token in the `Authorization` header. The server decodes it fresh, on every single call, with zero memory of anything before.

This sounds like more work for the client — and it is — but it's the single feature that lets REST APIs scale to millions of users:

- **Horizontal scalability.** If a load balancer routes your second request to a different server than your first, it doesn't matter — every server can validate your token independently. No server has to "know" about your session.
- **Resilient failure recovery.** If one server crashes, the load balancer just shifts traffic elsewhere. Because every request is self-contained, no one's session gets wiped out with it.
- **Lower server overhead.** No server has to hold open memory for sessions of users who may have closed their laptop an hour ago.

Statelessness shifts the burden of "remembering" from the server to the client. That trade is what makes REST backends lean, resilient, and easy to scale horizontally.

---

## Status Codes Worth Actually Knowing

You can group most status codes by their first digit:

**2xx — Success.** Your request worked.
- `200 OK` — standard success, here's your data.
- `201 Created` — a POST succeeded, the resource now exists.
- `204 No Content` — succeeded, but there's nothing to return in the body.

**4xx — Client error.** You, the caller, did something wrong.
- `400 Bad Request` — malformed request syntax.
- `401 Unauthorized` — missing or invalid authentication.
- `403 Forbidden` — you're authenticated, but not allowed to do this.
- `404 Not Found` — the resource doesn't exist.
- `409 Conflict` — e.g. a duplicate email on registration.
- `422 Unprocessable Entity` — syntactically valid, but fails business-logic validation.
- `429 Too Many Requests` — you've hit a rate limit.

**5xx — Server error.** The server, not the caller, is at fault.
- `500 Internal Server Error` — unhandled exception on the backend.
- `503 Service Unavailable` — server overloaded or down for maintenance.

A `200` with `{"success": false, "error": "..."}` in the body is a common anti-pattern — it makes the client parse the body just to find out something the status code already exists to communicate. Match your status code to what actually happened.

---

## What's Next

This series will go deeper on each piece we touched on here. Next up: **GraphQL — When REST Gets Messy** — where we'll look at what happens when a single REST endpoint can't cleanly serve a complex frontend, how GraphQL lets the client ask for exactly the data it needs, and where that flexibility starts to cost you.

**→ [Part 3: GraphQL: When REST Gets Messy (coming soon)]() **

---

> 📌 **Series overview:**
> - [Part 1: What Is an API, Really?](./api__part-1-what-is-api)
> - **Part 2: REST — The API Style Everyone Uses** ← you are here
> - Part 3: GraphQL: When REST Gets Messy (coming soon)
> - Part 4: gRPC: APIs Built for Speed (coming soon)
> - Part 5: API Patterns You'll Actually Use in Production (coming soon)
> - Part 6: REST, GraphQL, or gRPC: How to Pick (coming soon)
