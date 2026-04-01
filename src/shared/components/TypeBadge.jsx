const typeColorMap = {
	Fire: "danger",
	Water: "info",
	Grass: "success",
	Psychic: "purple",
	Electric: "warning",
	Colorless: "secondary",
	Fighting: "orange",
	Darkness: "dark",
	Metal: "secondary",
	Dragon: "info",
	Fairy: "pink",
}
export default function TypeBadge({ type }) {
	const color = typeColorMap[type] || "secondary"
	return <span className={`badge bg-${color} me-1`}>{type}</span>
}
