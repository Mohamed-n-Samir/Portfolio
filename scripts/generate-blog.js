import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOGS_DIR = path.resolve(__dirname, "../src/data/blogs");

// Sample fallback topics if running without an API key locally
const SAMPLE_TOPICS = [
  {
    title: "Building Resilient Distributed Systems in 2026",
    tags: ["SYSTEM DESIGN", "DEVOPS", "CLOUD"],
    desc: "Key principles and practical patterns for architecting resilient, fault-tolerant distributed systems in modern cloud environments.",
    content: `# Introduction

Designing distributed systems today requires embracing failure as a routine event rather than an anomaly. As software systems grow across regions and microservices, resilience becomes a foundational requirement.

# Core Principles of Resilient Architecture

Building modern distributed applications relies on several proven patterns:

1. **Circuit Breakers**: Prevent cascading failures when a downstream service becomes unresponsive.
2. **Graceful Degradation**: Fallback to cached or simplified functionality when non-critical dependencies fail.
3. **Idempotency**: Ensure that retrying failed operations does not produce duplicate side effects.

# Implementation Strategy

Here is a simple example of a retry with exponential backoff strategy:

\`\`\`python
import time
import random

def execute_with_retry(action, max_retries=3):
    for attempt in range(max_retries):
        try:
            return action()
        except Exception as err:
            if attempt == max_retries - 1:
                raise err
            sleep_time = (2 ** attempt) + random.uniform(0, 1)
            time.sleep(sleep_time)
\`\`\`

# Conclusion

Resilience is not achieved by avoiding failures, but by anticipating them and designing systems that recover quickly and automatically.`,
  },
  {
    title: "The Shift Toward Edge Computing and Serverless Architecture",
    tags: ["EDGE", "SERVERLESS", "WEB DEV"],
    desc: "Why compute at the edge is revolutionizing latency-sensitive applications and changing how web engineers deploy code.",
    content: `# Introduction

Edge computing brings data processing closer to the location where it is needed, drastically lowering round-trip latency for global users.

# Benefits of Edge Execution

Deploying serverless functions to edge nodes provides distinct performance advantages:

- **Sub-millisecond Latency**: Responses are served from the closest CDN point of presence.
- **Reduced Server Load**: Static assets and API routing are handled near the client.
- **Instant Scaling**: Zero cold start overhead for lightweight JavaScript engines.

# Looking Ahead

As edge runtimes gain support for broader Web Standard APIs, web architectures will increasingly default to edge-first execution.`,
  },
];

// Helper to format date as "MMM DD, YYYY" (e.g. "Jul 26, 2026")
function formatDate(date = new Date()) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

// Convert title to kebab-case filename slug
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}

// Validate that generated markdown adheres to src/lib/markdown.tsx parser requirements
function parseAndValidateMarkdown(rawContent) {
  const match = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) {
    throw new Error("Missing valid frontmatter delimiter ('---').");
  }

  const frontmatterBlock = match[1];
  const content = rawContent.slice(match[0].length).trim();

  const metadata = {};
  frontmatterBlock.split("\n").forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) return;
    const key = line.slice(0, colonIndex).trim();
    const val = line.slice(colonIndex + 1).trim();

    if (val.startsWith("[") && val.endsWith("]")) {
      metadata[key] = val
        .slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^['"]|['"]$/g, ""));
    } else if (val === "true") {
      metadata[key] = true;
    } else if (val === "false") {
      metadata[key] = false;
    } else {
      metadata[key] = val.replace(/^['"]|['"]$/g, "");
    }
  });

  if (!metadata.title) throw new Error("Missing 'title' in frontmatter.");
  if (!metadata.date) throw new Error("Missing 'date' in frontmatter.");
  if (!metadata.desc) throw new Error("Missing 'desc' in frontmatter.");
  if (!content) throw new Error("Missing body content in markdown.");

  return { metadata, content };
}

// Build AI prompt
function getPrompt() {
  const todayStr = formatDate(new Date());
  return `You are a tech blog post writer for a software engineer portfolio website.
Generate a high-quality technical blog post about modern software engineering, AI, DevOps, web development, cloud computing, or system architecture.
Select a fresh, engaging, and relevant technical topic.

IMPORTANT: Return ONLY the raw markdown content with YAML frontmatter. Do NOT wrap in \`\`\`markdown code block ticks.

Format strictly as follows:
---
title: <Engaging and concise post title>
date: ${todayStr}
readTime: <Estimated read time, e.g. "4 min read">
pinned: false
tags: [<2-3 uppercase tags in brackets, e.g. [AI, SOFTWARE ENGINEERING, DEVOPS]>]
desc: <1-2 sentence compelling summary for article card>
image: /blogs/keyboard_setup.png
---
# Introduction
<Engaging introductory section>

# <Subheading 1>
<Main content section with explanation>

- <Key point or takeaway 1>
- <Key point or takeaway 2>

\`\`\`python
# Optional clean code example if relevant to topic
\`\`\`

# <Subheading 2 or Conclusion>
<Concluding section summarizing key takeaways>
`;
}

// Call OpenRouter API (supports Free Models)
async function generateWithOpenRouter(apiKey) {
  console.log("Generating blog post via OpenRouter API...");
  const prompt = getPrompt();

  const models = [
    "google/gemini-2.0-flash-lite-preview-02-05:free",
    "meta-llama/llama-3.3-70b-instruct:free",
    "deepseek/deepseek-r1:free",
    "qwen/qwen-2.5-coder-32b-instruct:free",
    "mistralai/mistral-7b-instruct:free",
  ];

  //   for (const model of models) {
  try {
    console.log(`Trying OpenRouter model: ${model}...`);
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        "HTTP-Referer": "https://github.com/portfolio-blog-generator",
        "X-Title": "Portfolio Blog Generator",
      },
      body: JSON.stringify({
        //   model: model,
        model: "openrouter/free",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn(`OpenRouter model ${model} returned HTTP ${response.status}: ${errText}`);
      // continue;
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content;
    if (text) {
      return text
        .replace(/^```markdown\r?\n/i, "")
        .replace(/```\s*$/i, "")
        .trim();
    }
  } catch (err) {
    console.warn(`Failed with OpenRouter model ${model}:`, err.message);
  }
  //   }

  throw new Error("All OpenRouter free model attempts failed.");
}

// Call Google Gemini API
async function generateWithGemini(apiKey) {
  console.log("Generating blog post via Gemini API...");
  const prompt = getPrompt();
  const models = ["gemini-2.5-flash", "gemini-1.5-flash", "gemini-2.0-flash"];

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.warn(`Model ${model} returned HTTP ${response.status}: ${errorText}`);
        continue;
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        return text
          .replace(/^```markdown\r?\n/i, "")
          .replace(/```\s*$/i, "")
          .trim();
      }
    } catch (err) {
      console.warn(`Failed with model ${model}:`, err.message);
    }
  }

  throw new Error("All Gemini model attempts failed.");
}

// Call OpenAI API
async function generateWithOpenAI(apiKey) {
  console.log("Generating blog post via OpenAI API...");
  const prompt = getPrompt();
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`OpenAI API error (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content;
  if (!text) {
    throw new Error("OpenAI returned an empty response.");
  }
  return text
    .replace(/^```markdown\r?\n/i, "")
    .replace(/```\s*$/i, "")
    .trim();
}

// Generate fallback post when no API key is present
function generateFallback() {
  console.log(
    "No API key provided (OPENROUTER_API_KEY / GEMINI_API_KEY / OPENAI_API_KEY missing). Generating fallback sample post...",
  );
  const sample = SAMPLE_TOPICS[Math.floor(Math.random() * SAMPLE_TOPICS.length)];
  const dateStr = formatDate(new Date());

  return `---
title: ${sample.title}
date: ${dateStr}
readTime: 4 min read
pinned: false
tags: [${sample.tags.join(", ")}]
desc: ${sample.desc}
image: /blogs/keyboard_setup.png
---
${sample.content}`;
}

async function main() {
  const openRouterKey = process.env.OPENROUTER_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;
  const openAiKey = process.env.OPENAI_API_KEY;

  let rawMarkdown = "";

  if (openRouterKey) {
    try {
      rawMarkdown = await generateWithOpenRouter(openRouterKey);
    } catch (err) {
      console.error("OpenRouter generation error:", err.message);
      if (geminiKey) {
        rawMarkdown = await generateWithGemini(geminiKey);
      } else if (openAiKey) {
        rawMarkdown = await generateWithOpenAI(openAiKey);
      } else {
        rawMarkdown = generateFallback();
      }
    }
  } else if (geminiKey) {
    try {
      rawMarkdown = await generateWithGemini(geminiKey);
    } catch (err) {
      console.error("Gemini generation error:", err.message);
      if (openAiKey) {
        rawMarkdown = await generateWithOpenAI(openAiKey);
      } else {
        rawMarkdown = generateFallback();
      }
    }
  } else if (openAiKey) {
    try {
      rawMarkdown = await generateWithOpenAI(openAiKey);
    } catch (err) {
      console.error("OpenAI generation error:", err.message);
      rawMarkdown = generateFallback();
    }
  } else {
    rawMarkdown = generateFallback();
  }

  // Parse and validate using portfolio parser logic
  const { metadata } = parseAndValidateMarkdown(rawMarkdown);

  // Generate unique slug
  const slug = slugify(metadata.title);
  if (!slug) {
    throw new Error("Could not derive a valid slug from title: " + metadata.title);
  }

  // Ensure output directory exists
  if (!fs.existsSync(BLOGS_DIR)) {
    fs.mkdirSync(BLOGS_DIR, { recursive: true });
  }

  const targetFilePath = path.join(BLOGS_DIR, `${slug}.md`);

  // Write markdown file
  fs.writeFileSync(targetFilePath, rawMarkdown, "utf-8");

  console.log(`\n✅ Blog post successfully generated!`);
  console.log(`📄 Title: "${metadata.title}"`);
  console.log(
    `🏷️ Tags: ${Array.isArray(metadata.tags) ? metadata.tags.join(", ") : metadata.tags}`,
  );
  console.log(`📁 File Saved: ${targetFilePath}`);
}

main().catch((err) => {
  console.error("❌ Fatal Error during blog generation:", err.message);
  process.exit(1);
});
