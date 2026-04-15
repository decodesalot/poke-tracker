import { Router } from "express"
import OpenAI from "openai"

const router = Router()

const client = new OpenAI({ apiKey: process.env.AI_API_KEY })

const SYSTEM_PROMPT = `You are PokeAI, an expert Pokemon card assistant built into PokeTracker.
You help users understand their card collection, card values, rarities, sets, and investment potential.
Keep responses concise and friendly. When the user's collection context is provided, use it to give personalized insights.`

router.post("/", async (req, res, next) => {
    try {
        const { message, context, history = [] } = req.body

        const contextMessage = context
            ? `User context: ${context.userName} has ${context.totalCards} cards worth ~$${context.totalValue?.toFixed(2)}. ` +
            `Recent cards: ${context.recentCards?.map((c) => `${c.name} (${c.set})`).join(", ")}.`
            : null

        const messages = [
            { role: "system", content: SYSTEM_PROMPT },
            ...(contextMessage ? [{ role: "system", content: contextMessage }] : []),
            ...history.slice(-10),
            { role: "user", content: message },
        ]

        const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages,
            max_tokens: 500,
        })

        res.json({ reply: completion.choices[0].message.content })
    } catch (err) {
        next(err)
    }
})

export default router
