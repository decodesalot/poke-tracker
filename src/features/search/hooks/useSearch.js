import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setSelectedSet, selectSelectedSet } from "../searchSlice"
import { useGetSetsQuery, useGetSetByIdQuery } from "@features/cards/cardsApi"
import { usePagination } from "@shared/hooks/usePagination"

export const useSearch = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const [view, setView] = useState("grid")

	const selectedSet = useSelector(selectSelectedSet)

	const { data: sets = [], isLoading: setsLoading } = useGetSetsQuery()

	const resolvedSet = selectedSet ?? sets[0] ?? null

	const {
		data: results,
		isLoading: cardsLoading,
		isFetching: cardsFetching,
	} = useGetSetByIdQuery(resolvedSet?.id, { skip: !resolvedSet?.id })

	const allCards = results?.cards ?? []
	const pagination = usePagination(allCards)
	const cardsStatus = cardsLoading || cardsFetching ? "loading" : "succeeded"

	const handleSetChange = (e) => {
		const set = sets.find((s) => s.id === e.target.value)
		if (set) dispatch(setSelectedSet(set))
	}

	const navigateToCard = (card) => navigate(`/card/${card.id}`)

	return {
		sets: {
			items: sets,
			status: setsLoading ? "loading" : "succeeded",
			selected: resolvedSet,
			onChange: handleSetChange,
		},
		cards: {
			visible: pagination.visible,
			all: allCards,
			status: cardsStatus,
			results,
		},
		pagination: {
			page: pagination.page,
			totalPages: pagination.totalPages,
			onNext: pagination.onNext,
			onPrev: pagination.onPrev,
		},
		view: { current: view, onChange: setView },
		navigateToCard,
	}
}
