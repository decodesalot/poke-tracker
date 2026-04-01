import { useState, useMemo } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
	selectBinder,
	selectCurrentPage,
	selectTotalPages,
	nextPage,
	prevPage,
} from "../binderSlice"
import { CARDS_PER_PAGE } from "@shared/constants/binder"

export const useBinder = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [view, setView] = useState("table")
	const [filters, setFilters] = useState({ search: "", sortBy: "name" })

	const cardsInBinder = useSelector(selectBinder) || []
	const currentPage = useSelector(selectCurrentPage)
	const totalPages = useSelector(selectTotalPages)

	const visibleCards = useMemo(() => {
		const start = currentPage * CARDS_PER_PAGE
		return cardsInBinder.slice(start, start + CARDS_PER_PAGE)
	}, [cardsInBinder, currentPage])

	const handleNext = () => dispatch(nextPage())
	const handlePrev = () => dispatch(prevPage())
	const handleFilterChange = (key, value) => {
		setFilters((prev) => ({ ...prev, [key]: value }))
		// !TODO: Add filter in Redux:
		// dispatch(setBinderFilters({ [key]: value }));
	}
	const navigateToCard = (card) => navigate(`/card/${card.id}`)

	return {
		visibleCards,
		totalCount: cardsInBinder.length,
		view,
		setView,
		currentPage,
		totalPages,
		handleNext,
		handlePrev,
		filters,
		handleFilterChange,
		navigateToCard,
	}
}
