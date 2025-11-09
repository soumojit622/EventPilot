export const runtime = "nodejs";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message?.trim()) {
      return NextResponse.json({ reply: "Please enter a message." });
    }

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      },
      body: JSON.stringify({
        model: "mistralai/mistral-nemo:free",
        messages: [
          {
            role: "system",
            content: `
You are a professional customer support assistant for EventPilot. 
Respond only to queries related to EventPilot. Politely ignore or redirect unrelated questions.
Provide clear, concise answers in 2-4 sentences.
Maintain a professional tone. Avoid markdown, bullet points, stars, or lengthy explanations.
            `,
          },
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    const data = await response.json();

    const reply =
      data?.choices?.[0]?.message?.content ||
      "Apologies, I’m unable to provide an answer at this time.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chatbot Error:", error);
    return NextResponse.json({
      reply: "There was a technical issue. Please try again later.",
    });
  }
}
