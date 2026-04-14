import { useDispatch, useSelector } from "react-redux"
import { useSelector as useReduxSelector } from "react-redux"
import { selectBinder, selectTotalValue } from "@features/binder/binderSlice"
import { selectUser } from "@features/user/userSlice"
import { addMessage, clearMessages, toggleChat, selectMessages, selectIsOpen } from "../aiSlice"
import { useSendMessageMutation } from "../aiApi"

const SUGGESTED_PROMPTS = [
	"What's the most valuable card in my collection?",
	"What does holo rare mean?",
	"How do I grade a Pokemon card?",
	"What sets are worth investing in right now?",
]

export const useChat = () => {
	const dispatch = useDispatch()
	const messages = useSelector(selectMessages)
	const isOpen = useSelector(selectIsOpen)
	const binder = useSelector(selectBinder)
	const totalValue = useSelector(selectTotalValue)
	const user = useSelector(selectUser)

	const [sendMessage, { isLoading }] = useSendMessageMutation()

	const buildContext = () => ({
		userName: user.name,
		totalCards: binder.length,
		totalValue,
		recentCards: binder.slice(-5).map((c) => ({
			name: c.name,
			set: c.set?.name,
			rarity: c.rarity,
			price: c.pricing?.cardmarket?.avg,
		})),
	})

	const send = async (content) => {
		const userMessage = { role: "user", content }
		dispatch(addMessage(userMessage))

		try {
			const { reply } = await sendMessage({
				message: content,
				context: buildContext(),
				history: messages,
			}).unwrap()

			dispatch(addMessage({ role: "assistant", content: reply }))
		} catch {
			dispatch(
				addMessage({
					role: "assistant",
					content: "Sorry, I couldn't process that. Please try again.",
				})
			)
		}
	}

	return {
		messages,
		isOpen,
		isLoading,
		suggestedPrompts: SUGGESTED_PROMPTS,
		send,
		toggle: () => dispatch(toggleChat()),
		clear: () => dispatch(clearMessages()),
	}
}
