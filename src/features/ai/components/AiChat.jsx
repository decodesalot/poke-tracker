import { useRef, useEffect, useState } from "react"
import { useChat } from "@features/ai/hooks/useChat"

export const AiChat = () => {
	const { messages, isOpen, isLoading, suggestedPrompts, send, toggle, clear } = useChat()
	const [input, setInput] = useState("")
	const bottomRef = useRef(null)

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" })
	}, [messages, isLoading])

	const handleSubmit = async (e) => {
		e.preventDefault()
		if (!input.trim()) return
		setInput("")
		await send(input.trim())
	}

	const handleSuggest = async (prompt) => {
		await send(prompt)
	}

	return (
		<>
			<button
				className="btn btn-primary rounded-circle shadow-lg d-flex align-items-center justify-content-center"
				style={{
					position: "fixed",
					bottom: "2rem",
					right: "2rem",
					width: 52,
					height: 52,
					zIndex: 1050,
				}}
				onClick={toggle}
				aria-label="Toggle AI Chat"
			>
				<i className={`bi ${isOpen ? "bi-x-lg" : "bi-stars"} fs-5`}></i>
			</button>

			{isOpen && (
				<div
					className="card shadow-lg border-0 d-flex flex-column"
					style={{
						position: "fixed",
						bottom: "5.5rem",
						right: "2rem",
						width: 380,
						height: 520,
						zIndex: 1049,
					}}
				>
					<div className="card-header d-flex align-items-center justify-content-between border-bottom py-3">
						<div className="d-flex align-items-center gap-2">
							<i className="bi bi-stars text-primary"></i>
							<strong>PokeAI Assistant</strong>
						</div>
						<div className="dropdown ms-auto me-2">
							<button className="btn" type="button" data-bs-toggle="dropdown" aria-expanded="false">
								<i className="bi bi-three-dots" />
							</button>
							<ul className="dropdown-menu">
								<li>
									<button className="dropdown-item" onClick={clear}>
										Clear
									</button>
								</li>
							</ul>
						</div>
						<button className="btn" onClick={toggle} aria-label="Toggle AI Chat">
							<i className="bi bi-x-lg"></i>
						</button>
					</div>

					<div className="flex-grow-1 overflow-auto p-3 d-flex flex-column gap-2">
						{messages.length === 0 && (
							<div className="d-flex flex-column gap-2 mt-auto">
								<p className="text-muted small text-center mb-2">
									Ask me anything about your collection
								</p>
								{suggestedPrompts.map((prompt) => (
									<button
										key={prompt}
										className="btn btn-outline-secondary btn-sm text-start"
										onClick={() => handleSuggest(prompt)}
									>
										{prompt}
									</button>
								))}
							</div>
						)}

						{messages.map((msg, i) => (
							<div
								key={i}
								className={`d-flex ${msg.role === "user" ? "justify-content-end" : "justify-content-start"}`}
							>
								<div
									className={`px-3 py-2 rounded-3 small ${
										msg.role === "user" ? "bg-primary text-white" : "bg-body-secondary text-body"
									}`}
									style={{ maxWidth: "80%" }}
								>
									{msg.content}
								</div>
							</div>
						))}

						{isLoading && (
							<div className="d-flex justify-content-start">
								<div className="px-3 py-2 rounded-3 small bg-body-secondary text-muted">
									<span className="spinner-grow spinner-grow-sm me-1" />
									Thinking...
								</div>
							</div>
						)}

						<div ref={bottomRef} />
					</div>

					<div className="card-footer border-top p-2">
						<form className="d-flex gap-2" onSubmit={handleSubmit}>
							<input
								type="text"
								className="form-control form-control-sm"
								placeholder="Ask about your collection..."
								value={input}
								onChange={(e) => setInput(e.target.value)}
								disabled={isLoading}
							/>
							<button
								className="btn btn-primary btn-sm px-3"
								type="submit"
								disabled={isLoading || !input.trim()}
							>
								<i className="bi bi-send"></i>
							</button>
						</form>
					</div>
				</div>
			)}
		</>
	)
}
