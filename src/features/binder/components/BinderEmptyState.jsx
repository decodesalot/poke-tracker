import { EmptyState } from "@shared/components/"

export const BinderEmptyState = () => (
	<EmptyState
		icon="bi-book"
		title="Your binder is empty"
		message="Start building your collection"
		cta={{ to: "/search", icon: "bi-search", label: "Search Cards" }}
	/>
)
