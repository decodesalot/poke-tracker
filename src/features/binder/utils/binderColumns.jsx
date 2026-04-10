import { formatCurrency } from "@shared/utils/formatCurrency"

function getRandomQty(min, max) {
	const minCeiled = Math.ceil(min)
	const maxFloored = Math.floor(max)
	return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
}
const usersQty = getRandomQty(2, 150) // just for now..
export const getBinderColumns = (currency = "USD") => [
	{
		key: "image",
		label: "",
		className: "w-1",
		render: (card) => <img src={`${card.image}/low.webp`} alt={card.name} style={{ width: 40 }} />,
	},
	{
		key: "name",
		label: "Name",
		render: (card) => <strong>{card.name}</strong>,
	},
	{
		key: "set",
		label: "Set",
		render: (card) => <strong>{card?.set.name}</strong>,
	},
	{
		key: "rarity",
		label: "Rarity",
		render: (card) => <span className="badge bg-secondary">{card?.rarity}</span>,
	},
	{
		key: "condition",
		label: "Condition",
		render: (card) => (
			<select
				className="form-select form-select-sm"
				style={{ width: "120px" }}
				value={card.condition}
				onClick={(e) => e.stopPropagation()}
			>
				<option>Mint</option>
				<option>Near Mint</option>
				<option>Excellent</option>
				<option>Good</option>
				<option>Played</option>
			</select>
		),
	},
	{
		key: "quantity",
		label: "Qty",
		render: () => usersQty,
	},
	{
		key: "price",
		label: "Price",
		render: (card) => formatCurrency(card?.pricing?.cardmarket?.avg, card?.pricing?.cardmarket?.unit),
	},
	{
		key: "total",
		label: "Total",
		render: (card) =>
			formatCurrency(
				card?.pricing?.cardmarket?.avg ? card?.pricing?.cardmarket?.avg * usersQty : null, card?.pricing?.cardmarket?.unit
			),
	},
]
