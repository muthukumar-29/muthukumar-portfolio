export const blogPosts = [
  {
    slug: 'building-ai-automations-n8n',
    title: 'How I Built AI Automations with n8n',
    excerpt: 'A deep dive into creating production-ready AI workflows using n8n, from simple API calls to complex multi-step agent pipelines.',
    category: 'Tutorial',
    readTime: '8 min read',
    date: '2024-12-15',
    color: '#00FFB2',
    tags: ['n8n', 'AI', 'Automation', 'Tutorial'],
    content: `# How I Built AI Automations with n8n

## Introduction

n8n is one of the most powerful open-source workflow automation tools available today. Combined with AI APIs like OpenAI, it becomes a game-changer for building intelligent business automations without writing complex backend code.

In this post, I'll walk you through how I approach building production-ready AI automations at Automaitee.

## Why n8n for AI Automation?

n8n offers several advantages that make it ideal for AI workflows:

- **Visual workflow editor** — See the entire pipeline at a glance
- **200+ integrations** — Connect to any service via HTTP or native nodes
- **Self-hostable** — Keep sensitive data in-house
- **JavaScript/Python execution** — Add custom logic when needed

## Setting Up Your First AI Workflow

### Step 1: Install n8n

\`\`\`bash
npm install n8n -g
n8n start
\`\`\`

Or use Docker for production:

\`\`\`bash
docker run -it --rm \\
  --name n8n \\
  -p 5678:5678 \\
  -v ~/.n8n:/home/node/.n8n \\
  docker.n8n.io/n8nio/n8n
\`\`\`

### Step 2: Create an OpenAI Node

1. Add a **Webhook** trigger node
2. Connect an **OpenAI** node
3. Configure with your system prompt
4. Add a **Respond to Webhook** node

### Step 3: Build the System Prompt

\`\`\`javascript
const systemPrompt = \`You are a helpful customer support agent.
Be concise, friendly, and always offer to escalate to a human if needed.
Context: {{$json.customerHistory}}\`
\`\`\`

## Real-World Pattern: Lead Qualification

Here's a workflow I built that automatically qualifies leads from form submissions:

1. **Webhook** receives form data
2. **OpenAI** analyses lead quality based on answers
3. **IF node** routes based on score
4. **CRM** updates with AI-generated notes
5. **Slack** notifies the team for high-value leads

## Performance Tips

- Use **batch processing** for high-volume workflows
- Cache repeated API calls with Redis nodes
- Set appropriate **timeouts** on OpenAI calls
- Use **error workflows** to handle failures gracefully

## Conclusion

n8n + AI is a powerful combination that can automate complex business processes. Start simple, iterate fast, and always monitor your workflows in production.

*Questions? Connect with me on [LinkedIn](https://www.linkedin.com/in/muthukumar29) or check out [Automaitee](https://automaitee.com).*
`,
  },
  {
    slug: 'facebook-automation-n8n',
    title: 'Facebook Automation with n8n',
    excerpt: 'How to automate Facebook Page posts, Messenger replies, and lead generation using n8n workflows connected to the Meta Graph API.',
    category: 'Tutorial',
    readTime: '9 min read',
    date: '2025-02-10',
    color: '#1877F2',
    tags: ['Facebook', 'Meta API', 'n8n', 'Automation'],
    content: `# Facebook Automation with n8n

## Why Automate Facebook?

Facebook remains the world's largest social platform with over 3 billion monthly active users. For businesses, automating page management, lead responses, and content publishing saves hours every week and ensures no lead goes cold.

## What We'll Cover

- Automatically posting content to your Facebook Page on a schedule
- Responding to Facebook Messenger inquiries with AI
- Capturing Facebook Lead Ads into your CRM via n8n

## Prerequisites

- n8n instance (self-hosted or cloud)
- Meta Developer account with a Facebook App
- A Facebook Page you manage
- OpenAI API key (for AI responses)

## Step 1: Create a Meta App

1. Go to [developers.facebook.com](https://developers.facebook.com)
2. Create a new App → choose **Business** type
3. Add the **Messenger** and **Pages** products
4. Generate a **Page Access Token** for your page

## Step 2: Auto-Post to Facebook Page

Create an n8n workflow with a **Schedule Trigger** (e.g., every day at 10AM):

1. **Schedule Trigger** → fires at your chosen time
2. **Code Node** → generate or fetch your post content
3. **HTTP Request Node** → POST to the Graph API

\`\`\`javascript
// HTTP Request node config
Method: POST
URL: https://graph.facebook.com/v18.0/{PAGE_ID}/feed
Body (JSON):
{
  "message": "{{$json.content}}",
  "access_token": "{{$env.FB_PAGE_ACCESS_TOKEN}}"
}
\`\`\`

## Step 3: AI-Powered Messenger Replies

Set up a webhook to receive Messenger messages and reply with AI:

### 3a — Webhook Setup

In n8n, add a **Webhook** node:
\`\`\`
Method: POST
Path: /facebook-messenger
\`\`\`

In Meta App dashboard → Messenger → Webhooks, subscribe to **messages** events.

### 3b — Parse Incoming Message

\`\`\`javascript
const entry = $input.first().json.body.entry?.[0];
const messaging = entry?.messaging?.[0];

return [{
  json: {
    senderId: messaging?.sender?.id,
    text: messaging?.message?.text || '',
    pageId: entry?.id,
  }
}];
\`\`\`

### 3c — Generate AI Reply

Add an **OpenAI** node with a system prompt tailored to your business:

\`\`\`
System: You are a friendly customer support agent for [Your Business].
Answer questions about products, pricing, and availability. Keep responses under 150 words.
\`\`\`

### 3d — Send Reply via Messenger API

\`\`\`json
POST https://graph.facebook.com/v18.0/me/messages
{
  "recipient": { "id": "{{$json.senderId}}" },
  "message": { "text": "{{$('OpenAI').first().json.choices[0].message.content}}" },
  "access_token": "{{$env.FB_PAGE_ACCESS_TOKEN}}"
}
\`\`\`

## Step 4: Capture Facebook Lead Ads

When someone fills your Lead Ad form, send that data directly to your CRM:

1. **Facebook Trigger** (n8n native node) — subscribe to \`leadgen\` events
2. **HTTP Request** — fetch lead details from Graph API
3. **HubSpot / Google Sheets / Airtable** — create a contact record
4. **Gmail / Slack** — notify your sales team instantly

\`\`\`javascript
// Fetch lead form data
GET https://graph.facebook.com/v18.0/{LEAD_ID}?fields=field_data&access_token={TOKEN}
\`\`\`

## Handling Verification

Meta requires your webhook URL to respond to a GET verification challenge:

In n8n, add an **IF** node that checks for \`hub.mode === 'subscribe'\` and returns \`hub.challenge\`.

## Production Tips

- Store your Page Access Token in n8n **Credentials**, never hardcode it
- Set up a **long-lived token** (valid 60 days) for production
- Use **error workflows** to alert you if automation fails
- Test with Meta's **Graph API Explorer** before deploying

## Conclusion

Facebook automation with n8n unlocks hands-free page management, instant lead capture, and 24/7 customer support. Start with one workflow and expand from there.

*Need a custom Facebook automation? Reach out at [muthukumarm.2903@gmail.com](mailto:muthukumarm.2903@gmail.com)*
`,
  },
  {
    slug: 'api-integrations-explained',
    title: 'How APIs Work — A Practical Guide',
    excerpt: 'Demystifying REST APIs: how requests and responses work, authentication methods, and how to integrate any API into your n8n workflows.',
    category: 'Guide',
    readTime: '7 min read',
    date: '2025-03-05',
    color: '#A78BFA',
    tags: ['API', 'REST', 'n8n', 'Integration'],
    content: `# How APIs Work — A Practical Guide

## What Is an API?

An **API (Application Programming Interface)** is a contract between two software systems — it defines how they communicate. When you use n8n to connect to WhatsApp, Google Sheets, or OpenAI, you're using their APIs.

Think of it like ordering at a restaurant: you (the client) tell the waiter (the API) what you want, the kitchen (the server) prepares it, and the waiter brings it back to you.

## The Request-Response Cycle

Every API interaction follows this pattern:

\`\`\`
Client → Request → API Server → Response → Client
\`\`\`

A **request** has four key parts:

| Part | Purpose | Example |
|------|---------|---------|
| **URL** | Where to send it | \`https://api.example.com/users\` |
| **Method** | What to do | GET, POST, PUT, DELETE |
| **Headers** | Metadata | \`Authorization: Bearer token\` |
| **Body** | Data to send | \`{ "name": "John" }\` |

## HTTP Methods (CRUD)

| Method | Action | Example |
|--------|--------|---------|
| **GET** | Read data | Fetch user profile |
| **POST** | Create data | Submit a form |
| **PUT/PATCH** | Update data | Edit a record |
| **DELETE** | Remove data | Delete a contact |

## Authentication Types

APIs use different auth methods to verify identity:

### 1. API Key (simplest)
\`\`\`http
GET /data
X-API-Key: abc123yourkeyhere
\`\`\`

### 2. Bearer Token (OAuth 2.0)
\`\`\`http
GET /data
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
\`\`\`

### 3. Basic Auth
\`\`\`http
Authorization: Basic base64(username:password)
\`\`\`

## REST API Response Codes

| Code | Meaning |
|------|---------|
| 200 | OK — success |
| 201 | Created — new record made |
| 400 | Bad Request — check your payload |
| 401 | Unauthorized — check your token |
| 403 | Forbidden — no permission |
| 404 | Not Found — wrong endpoint |
| 429 | Rate Limited — slow down |
| 500 | Server Error — their problem |

## Using APIs in n8n

n8n's **HTTP Request** node can call any REST API:

\`\`\`
Method: POST
URL: https://api.yourtool.com/v1/contacts
Headers:
  Authorization: Bearer {{$env.API_TOKEN}}
  Content-Type: application/json
Body:
{
  "email": "{{$json.email}}",
  "name": "{{$json.name}}"
}
\`\`\`

## Pagination — Handling Large Data Sets

Most APIs return data in pages. Common patterns:

### Offset Pagination
\`\`\`
GET /users?limit=100&offset=0
GET /users?limit=100&offset=100
\`\`\`

### Cursor Pagination
\`\`\`
GET /users?cursor=eyJpZCI6MTAwfQ==
\`\`\`

In n8n, use a **Loop** workflow with a **While** condition to keep fetching until no \`next_cursor\` is returned.

## Webhooks vs Polling

| | Webhook | Polling |
|--|---------|---------|
| **How** | Server pushes to you | You ask server repeatedly |
| **Speed** | Instant | Delayed (by interval) |
| **Cost** | Low | Higher (many requests) |
| **Best for** | Real-time events | When webhooks aren't available |

Always prefer webhooks when the API supports them.

## Rate Limits

Every API limits how many requests you can make per minute/hour. Strategy:

1. Read the API docs — know your limits
2. Add a **Wait** node in n8n between batches
3. Handle **429 errors** with retry logic
4. Use bulk endpoints where available

## Real Example: Calling OpenAI API

\`\`\`javascript
// HTTP Request node
Method: POST
URL: https://api.openai.com/v1/chat/completions
Headers:
  Authorization: Bearer sk-...
  Content-Type: application/json

Body:
{
  "model": "gpt-4o-mini",
  "messages": [
    { "role": "system", "content": "You are a helpful assistant." },
    { "role": "user", "content": "{{$json.userMessage}}" }
  ],
  "max_tokens": 500
}
\`\`\`

Response:
\`\`\`json
{
  "choices": [{
    "message": {
      "role": "assistant",
      "content": "Here is my response..."
    }
  }]
}
\`\`\`

Access the reply in n8n: \`{{$json.choices[0].message.content}}\`

## Conclusion

APIs are the backbone of automation. Once you understand the request-response pattern, authentication, and status codes, you can integrate virtually any tool into your workflows.

*Follow me on [LinkedIn](https://www.linkedin.com/in/muthukumar29) for more automation guides.*
`,
  },
  {
    slug: 'whatsapp-automation-n8n',
    title: 'WhatsApp Automation with n8n',
    excerpt: 'Step-by-step guide to building a WhatsApp chatbot and automation system using n8n, the WhatsApp Business API, and OpenAI.',
    category: 'Tutorial',
    readTime: '10 min read',
    date: '2025-01-20',
    color: '#25D366',
    tags: ['WhatsApp', 'n8n', 'Automation', 'Chatbot'],
    content: `# WhatsApp Automation with n8n

## Why WhatsApp Automation?

WhatsApp has over 2 billion active users. For businesses, it's the highest-engagement channel available — open rates above 90%, instant delivery, and a platform your customers already use daily.

Automating it with n8n means you can respond instantly, 24/7, without a human in the loop.

## What We're Building

By the end of this guide you'll have:

- A WhatsApp webhook that receives messages in n8n
- AI-powered response generation with OpenAI
- Session memory so conversations feel natural
- A fallback to notify a human agent when needed

## Prerequisites

- n8n instance (self-hosted or cloud)
- WhatsApp Business API access (via Meta or a provider like 360dialog, Twilio)
- OpenAI API key

## Step 1: Set Up the WhatsApp Webhook

In n8n, create a new workflow and add a **Webhook** trigger node:

\`\`\`
Method: POST
Path: /whatsapp-incoming
Response Mode: Last Node
\`\`\`

In your WhatsApp Business API dashboard, set the webhook URL to:
\`\`\`
https://your-n8n-domain.com/webhook/whatsapp-incoming
\`\`\`

Verify the webhook with the token provided by Meta.

## Step 2: Parse the Incoming Message

Add a **Code** node to extract the message:

\`\`\`javascript
const body = $input.first().json.body;
const entry = body.entry?.[0];
const change = entry?.changes?.[0];
const message = change?.value?.messages?.[0];

return [{
  json: {
    from: message?.from,
    text: message?.text?.body || '',
    messageId: message?.id,
    timestamp: message?.timestamp,
    phoneNumberId: change?.value?.metadata?.phone_number_id,
  }
}];
\`\`\`

## Step 3: Add Session Memory with Google Sheets

To keep conversation context, store session data in Google Sheets:

1. **Google Sheets Read** — fetch last N messages for this user
2. Build conversation history array
3. Pass to OpenAI as \`messages\` context

\`\`\`javascript
// Build OpenAI messages array
const history = $('Fetch History').all().map(row => ({
  role: row.json.role,
  content: row.json.content,
}));

const messages = [
  { role: 'system', content: 'You are a helpful assistant for our business...' },
  ...history,
  { role: 'user', content: $json.text }
];
\`\`\`

## Step 4: Generate AI Response

Add an **OpenAI** node:

- **Resource:** Chat
- **Model:** gpt-4o-mini (cost-effective)
- **Messages:** Pass the array from Step 3
- **Max Tokens:** 300

## Step 5: Send the Reply

Add an **HTTP Request** node to send the reply via WhatsApp API:

\`\`\`json
{
  "messaging_product": "whatsapp",
  "to": "{{$json.from}}",
  "type": "text",
  "text": {
    "body": "{{$('OpenAI').first().json.choices[0].message.content}}"
  }
}
\`\`\`

## Step 6: Human Escalation

Add an **IF** node that checks the AI response for escalation keywords like "speak to human", "agent", "help me" — then route to a Slack notification node.

## Advanced Tips

- **Rate limiting:** Add a delay node to avoid API throttling
- **Media handling:** Use the WhatsApp API to process images and documents
- **Button messages:** Send interactive buttons for menu-driven flows
- **Broadcast lists:** Use n8n schedules to send proactive updates

## Production Checklist

- ✅ Webhook verified with Meta
- ✅ Error workflow configured (notify on failure)
- ✅ Session data cleaned up after 24h inactivity
- ✅ OpenAI token usage monitored
- ✅ Human fallback tested

## Conclusion

WhatsApp automation with n8n is one of the highest-ROI projects you can build. Start with a simple FAQ bot and gradually add intelligence, memory, and escalation logic.

*Reach out at [muthukumarm.2903@gmail.com](mailto:muthukumarm.2903@gmail.com) if you need help setting this up for your business.*
`,
  },
]
