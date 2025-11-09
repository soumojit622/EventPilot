export const runtime = "nodejs";

import { NextResponse } from "next/server";

type Body = {
    title?: string;
    tone?: "friendly" | "formal" | "concise";
};

export async function POST(req: Request) {
    try {
        const body: Body = await req.json();
        const { title, tone = "friendly" } = body || {};

        if (!title || title.trim().length === 0) {
            return NextResponse.json(
                { error: "Missing title" },
                { status: 400 }
            );
        }

        const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY;
        if (!OPENROUTER_KEY) {
            return NextResponse.json(
                { error: "Missing OPENROUTER_API_KEY" },
                { status: 500 }
            );
        }

        const systemPrompt =
            "You write grammatically correct event descriptions in plain text. No markdown, no emojis, no symbols. Maximum 400 characters.";

        const userPrompt = `Write a ${tone} event description for the event titled: "${title}". Only plain text, no bullets or markdown.`;

        const payload = {
            model: "openai/gpt-4o",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt },
            ],
            max_tokens: 200,
            temperature: 0.7,
        };

        const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${OPENROUTER_KEY}`,
            },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const text = await res.text();
            console.error("OpenRouter error:", res.status, text);
            return NextResponse.json(
                { error: `OpenRouter returned ${res.status}`, detail: text },
                { status: 502 }
            );
        }

        const data = await res.json();
        let output = "";

        if (Array.isArray(data.choices) && data.choices.length > 0) {
            const choice = data.choices[0];
            output =
                choice.message?.content ||
                choice.text ||
                JSON.stringify(choice);
        }

        // Clean plain text
        let clean = output
            .replace(/\*/g, "")
            .replace(/_/g, "")
            .replace(/#/g, "")
            .replace(/\n/g, " ")
            .trim();

        if (clean.length > 400) {
            clean = clean.slice(0, 400);
        }

        return NextResponse.json({ description: clean });

    } catch (err: any) {
        console.error("API error:", err);
        return NextResponse.json(
            { error: err?.message || "Unknown server error" },
            { status: 500 }
        );
    }
}
