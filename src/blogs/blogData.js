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
