import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import {
	fetchSetsThunk,
	fetchCards,
	selectSets,
	selectSetsStatus,
	selectSelectedSet,
	selectSearchResults,
	selectSearchStatus,
	setSelectedSet,
	selectTotalPages,
	selectPage,
	nextPage,
	prevPage,
} from "../searchSlice"
import { CARDS_PER_PAGE } from "@shared/constants/binder"

export const useSearch = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const sets = useSelector(selectSets)
	const setsStatus = useSelector(selectSetsStatus)
	const selectedSet = useSelector(selectSelectedSet)
	const results = useSelector(selectSearchResults)
	const status = useSelector(selectSearchStatus)
	const [view, setView] = useState("grid")

	const page = useSelector(selectPage)
	const totalPages = useSelector(selectTotalPages)
	const allCards = results?.cards ?? []
	const visibleCards = allCards.slice(page * CARDS_PER_PAGE, (page + 1) * CARDS_PER_PAGE)

	const handleNext = () => dispatch(nextPage())
	const handlePrev = () => dispatch(prevPage())

	const handleSetChange = (e) => {
		const set = sets.find((s) => s.id === e.target.value)
		dispatch(setSelectedSet(set))
		dispatch(fetchCards(set.id))
	}

	useEffect(() => {
		if (setsStatus === "idle") dispatch(fetchSetsThunk())
	}, [setsStatus, dispatch])

	useEffect(() => {
		if (selectedSet) {
			dispatch(fetchCards(selectedSet.id))
		}
	}, [selectedSet, dispatch])

	const navigateToCard = (card) => navigate(`/card/${card.id}`)

	return {
		sets: { items: sets, status: setsStatus, selected: selectedSet, onChange: handleSetChange },
		cards: { visible: visibleCards, all: allCards, status, results },
		pagination: { page, totalPages, onNext: handleNext, onPrev: handlePrev },
		view: { current: view, onChange: setView },
		navigateToCard,
	}
}
