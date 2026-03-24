const API_BASE = import.meta.env.VITE_POKEMON_API_BASE

export const fetchCardById = async (id) => {
	const res = await fetch(`${API_BASE}/cards/${id}`)
	if (!res.ok) throw new Error("Card not found")
	return res.json()
}
export const fetchCardsBySet = async (setId) => {
	const res = await fetch(`${API_BASE}/sets/${setId}`)
	if (!res.ok) throw new Error("Failed to fetch cards")
	return res.json()
}

export const fetchSets = async () => {
	const res = await fetch(`${API_BASE}/sets`)
	if (!res.ok) throw new Error("Failed to fetch sets")
	return res.json()
}
