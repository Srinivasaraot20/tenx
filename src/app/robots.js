import { SITE_URL } from "@/lib/blog";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "OAI-SearchBot",
          "Google-Extended",
          "GoogleOther",
          "PerplexityBot",
          "ClaudeBot",
          "Claude-Web",
          "Anthropic-ai",
          "bingbot",
          "meta-externalagent",
          "DeepSeekBot",
          "Bytespider",
          "Applebot-Extended",
          "Cohere-ai",
          "Amazonbot",
        ],
        allow: ["/", "/llms.txt"],
        disallow: ["/admin", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

