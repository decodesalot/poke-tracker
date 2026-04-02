import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectBinder } from "../binderSlice"
import { usePagination } from "@shared/hooks/usePagination"

export const useBinder = () => {
	const navigate = useNavigate()
	const [view, setView] = useState("table")
	const [filters, setFilters] = useState({ search: "", sortBy: "name" })

	const cardsInBinder = useSelector(selectBinder) || []
	const pagination = usePagination(cardsInBinder)

	const handleFilterChange = (key, value) => {
		setFilters((prev) => ({ ...prev, [key]: value }))
	}
	const navigateToCard = (card) => navigate(`/card/${card.id}`)

	return {
		cards: { visible: pagination.visible, total: cardsInBinder.length },
		pagination: {
			currentPage: pagination.page,
			totalPages: pagination.totalPages,
			onNext: pagination.onNext,
			onPrev: pagination.onPrev,
		},
		filters: { values: filters, onChange: handleFilterChange },
		view: { current: view, onChange: setView },
		navigateToCard,
	}
}
