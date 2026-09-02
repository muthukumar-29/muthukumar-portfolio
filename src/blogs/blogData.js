export const blogPosts = [
  {
    slug: 'what-is-an-api',
    title: 'What Is an API? A Simple Explanation',
    excerpt: 'APIs are how apps talk to each other. Here\'s what that actually means — in plain English, no tech background needed.',
    category: 'Guide',
    readTime: '5 min read',
    date: '2025-04-10',
    color: '#A78BFA',
    tags: ['API', 'Basics', 'Integration'],
    content: `# What Is an API? A Simple Explanation

## The Short Answer

An **API (Application Programming Interface)** is a way for two apps to talk to each other.

That's it. Everything else is just details.

---

## A Simple Analogy

Think of a restaurant.

- You are the **customer** (your app)
- The **waiter** is the API
- The **kitchen** is the other app (the server)

You don't walk into the kitchen yourself. You tell the waiter what you want. The waiter takes your order to the kitchen, and brings back your food.

An API works exactly the same way — it carries your request to another system, and brings back the result.

---

## Real-World Examples

You use APIs every day without knowing it:

- **"Login with Google"** — your app asks Google's API to verify who you are
- **Online payments** — your checkout page asks a payment API (like Razorpay or Stripe) to charge the card
- **WhatsApp messages** — businesses send automated WhatsApp messages using WhatsApp's API
- **Weather apps** — they ask a weather API for today's forecast

---

## How It Works (In 3 Steps)

**1. You make a Request**
Your app asks for something — like "get me this user's details"

**2. The API processes it**
The other system receives it, checks if you're allowed, and finds the data

**3. You get a Response**
The result comes back — usually as simple text data (called JSON)

---

## Why APIs Matter for Business

APIs let you **connect tools without building everything from scratch**.

Instead of building your own payment system, SMS service, or map — you just use an API that already does it. This saves months of development time.

---

## FAQ

**Q: Do I need to know how to code to use APIs?**
Not always. Tools like n8n and Zapier let you connect APIs visually — no coding needed.

**Q: Are APIs free?**
Some are free (like Google Maps basic use), some are paid based on how much you use them. Most have a free tier to get started.

**Q: What is a REST API?**
REST is just a popular style of building APIs. Most APIs you encounter today are REST APIs — they use standard web requests (GET, POST, etc.).

**Q: What's the difference between an API and a webhook?**
An API is something you call (you ask, they answer). A webhook is the reverse — the other system calls *you* when something happens, like a new payment or a new message.

**Q: Is an API secure?**
Yes, when used correctly. APIs use API keys or tokens to make sure only authorized apps can access them. Never share your API keys publicly.

**Q: Can I automate things using APIs?**
Absolutely — that's one of the most powerful uses. Tools like n8n let you chain multiple APIs together to automate entire business workflows.
`,
  },
  {
    slug: 'what-is-ai-automation',
    title: 'What Is AI Automation? Explained Simply',
    excerpt: 'AI Automation means letting software handle smart, repetitive tasks for you — automatically. Here\'s how it works and why businesses love it.',
    category: 'Guide',
    readTime: '5 min read',
    date: '2025-04-20',
    color: '#00FFB2',
    tags: ['AI', 'Automation', 'n8n', 'Basics'],
    content: `# What Is AI Automation? Explained Simply

## The Short Answer

**AI Automation** is when software uses artificial intelligence to do tasks that normally need a human — and does them automatically, 24/7.

---

## Regular Automation vs AI Automation

**Regular automation** follows fixed rules.
Example: *"If someone fills out this form, send them a welcome email."*

**AI automation** can understand context and make smart decisions.
Example: *"If someone messages us asking about pricing, read their message, understand what they're asking, write a personalised reply, and send it — instantly."*

The difference is intelligence. AI automation doesn't just follow a script — it understands.

---

## Real-World Examples

**Customer Support**
A customer messages your WhatsApp at 2am asking "Do you have rooms available this weekend?"
An AI automation reads the message, checks availability, and replies instantly — no human needed.

**Lead Qualification**
Someone fills a contact form. AI automation reads their answers, scores the lead as hot or cold, and either books a call automatically or adds them to a follow-up sequence.

**Social Media**
A comment comes in on your Facebook page. AI detects if it's a complaint, inquiry, or compliment — and responds appropriately to each.

**Invoice Processing**
An invoice arrives by email. AI reads it, extracts the amount and vendor name, and logs it to your spreadsheet — no manual data entry.

---

## How It's Built

Most AI automations use three things:

1. **A trigger** — something that starts the process (a new message, a form submit, a schedule)
2. **An AI model** — like OpenAI's GPT, which understands and generates text
3. **An action** — sending a reply, updating a spreadsheet, notifying a team member

Tools like **n8n** connect all three visually, without needing to write complex code.

---

## Why Businesses Use It

- **Saves time** — tasks that took hours happen in seconds
- **Always on** — works nights, weekends, holidays
- **No mistakes from fatigue** — consistent quality every time
- **Scales easily** — handles 10 messages or 10,000 with the same setup

---

## FAQ

**Q: Do I need a tech team to set up AI automation?**
No. Platforms like n8n have drag-and-drop editors. Many automations can be built and deployed without writing a single line of code.

**Q: Is AI automation expensive?**
It depends on the tools used. Most AI models charge per use (very cheaply — fractions of a cent per message). The ROI is usually clear within weeks.

**Q: Will AI automation replace my staff?**
It replaces repetitive tasks, not people. Your team gets freed up to focus on higher-value work — strategy, relationships, creativity.

**Q: How accurate is AI automation?**
Modern AI models (like GPT-4) are very accurate for understanding and generating text. You can also add human review steps for critical decisions.

**Q: Can it work with the tools I already use?**
Almost certainly yes. n8n integrates with 500+ tools — WhatsApp, Gmail, Google Sheets, Notion, HubSpot, Slack, and hundreds more.

**Q: What if the automation makes a mistake?**
You can build in fallback rules — for example, if AI is unsure, it routes the task to a human. You stay in control.
`,
  },
  {
    slug: 'what-is-marketing-automation',
    title: 'What Is Marketing Automation? Made Simple',
    excerpt: 'Marketing automation helps you reach the right people at the right time — without doing it manually every single time.',
    category: 'Guide',
    readTime: '5 min read',
    date: '2025-05-01',
    color: '#F59E0B',
    tags: ['Marketing', 'Automation', 'CRM', 'Basics'],
    content: `# What Is Marketing Automation? Made Simple

## The Short Answer

**Marketing automation** is using software to send the right message, to the right person, at the right time — automatically.

Instead of manually following up with every lead or customer, you set it up once and let it run.

---

## A Simple Example

Imagine someone visits your website and fills out a "Get a Quote" form.

**Without automation:**
You see the email, write a reply, follow up in 3 days, follow up again a week later — all manually. If you're busy, leads go cold.

**With marketing automation:**
The moment they submit, they instantly get a welcome message. In 1 hour they get your pricing. In 2 days they get a case study. In 5 days they get a "still interested?" follow-up. All without you touching anything.

---

## What Marketing Automation Actually Does

**Email Sequences**
A series of emails sent automatically based on what someone does — signing up, clicking a link, or not opening a previous email.

**WhatsApp Follow-ups**
Send personalised WhatsApp messages triggered by actions — a new enquiry, an abandoned booking, a post-purchase thank you.

**Lead Nurturing**
Keep potential customers warm with helpful content until they're ready to buy — fully automated.

**CRM Updates**
When a lead takes an action (opened an email, clicked a link, booked a call), their status in your CRM updates automatically.

**Re-engagement Campaigns**
If a customer hasn't bought in 60 days, automatically send them a "we miss you" offer.

---

## Common Tools Used

- **n8n** — connects everything together with visual workflows
- **WhatsApp Business API** — for automated WhatsApp messaging
- **Facebook Messenger API** — for automated Messenger replies
- **Google Sheets / Airtable** — to store and manage contact data
- **OpenAI** — for personalised, AI-written messages at scale

---

## Why It Matters

**For small businesses:**
You can't manually follow up with 200 leads a week. Automation means no lead is ever forgotten.

**For growing businesses:**
As you scale, your marketing works harder without needing more headcount.

**For customer experience:**
Fast, personalised responses make customers feel valued — even when it's automated.

---

## FAQ

**Q: Is marketing automation only for big companies?**
Not at all. Small businesses benefit the most — it lets a team of one do the work of five.

**Q: Will customers know it's automated?**
Only if it's done poorly. Well-built automations feel personal and timely. Bad ones feel like spam. The difference is in how you write the messages and how you trigger them.

**Q: What's the difference between marketing automation and spam?**
Spam is unsolicited. Marketing automation targets people who have already shown interest — they filled a form, clicked a link, made a purchase. It's relevant communication, not mass blasting.

**Q: How quickly can I set it up?**
A basic WhatsApp follow-up sequence can be live in a day. A full multi-channel nurture system takes a week or two to plan and build properly.

**Q: Do I need a CRM?**
It helps, but it's not always required. Even a Google Sheet can act as a simple contact database to start.

**Q: Can marketing automation work for service businesses like hotels or clinics?**
Yes — and it works extremely well. Booking confirmations, pre-arrival reminders, post-stay reviews, and seasonal offers are all excellent automation use cases for service businesses.
`,
  },
  {
    slug: 'git-branches-explained',
    title: 'Git Branches Explained: Why We Use Them & How They Work',
    excerpt: 'Before diving into branches, what is Git? Here is a simple, no-nonsense guide to Git and why branching is essential for clean code.',
    category: 'Guide',
    readTime: '4 min read',
    date: '2026-05-15',
    color: '#F05033',
    tags: ['Git', 'DevTools', 'Workflow'],
    content: `# Git Branches Explained: Why We Use Them & How They Work

## 1. First: What Is Git?

Before understanding branches, you need to know what **Git** is.

**Git** is a **Version Control System**. Think of it as a time machine for your code:
- It tracks every change you make.
- It lets you save snapshots (called **commits**).
- It allows you to jump back to any previous version if something breaks.

Instead of keeping copies like \`project_v1.zip\` or \`final_final_v2.js\`, Git handles history automatically.

---

## 2. What Is a Git Branch?

A **Branch** is a parallel copy of your project code where you can test new features or fix bugs without affecting the main working project.

Imagine a tree:
- **\`main\` (or \`master\` branch)**: The main trunk of the tree — your working, live code.
- **Feature Branch**: A temporary branch split off from the trunk where you write and test new code safely.

---

## 3. Why Do We Use Git Branches? (Importance)

Here is why branching is indispensable in software development:

### Safe Experimentation
You can write new code or try risky changes without breaking the working live project. If it fails, simply delete the branch.

### Seamless Team Collaboration
Multiple developers can work on different features at the exact same time without overwriting each other's code.

### Clean Code Review & Merging
Once a feature is finished and tested on its branch, it is reviewed and combined (merged) back into the \`main\` branch smoothly.

---

## 4. Quick Command Summary

\`\`\`bash
# Create and switch to a new branch
git checkout -b feature-login

# Switch back to the main branch
git checkout main

# Combine your feature branch into main
git merge feature-login
\`\`\`

---

## Summary

Git keeps your history safe; **branches keep your development isolated and clean**. Always create a new branch for every new feature or bugfix!
`,
  },
]
