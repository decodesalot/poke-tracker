import { useState } from "react"
import { CARDS_PER_PAGE } from "@shared/constants/binder"

export const usePagination = (items = [], perPage = CARDS_PER_PAGE) => {
	const [page, setPage] = useState(0)
	const totalPages = Math.ceil(items.length / perPage)
	const visible = items.slice(page * perPage, (page + 1) * perPage)

	return {
		visible,
		page,
		totalPages,
		onNext: () => setPage((p) => Math.min(p + 1, totalPages - 1)),
		onPrev: () => setPage((p) => Math.max(p - 1, 0)),
	}
}
