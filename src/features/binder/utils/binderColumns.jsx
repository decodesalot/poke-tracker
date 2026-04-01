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
		key: "type",
		label: "Type",
		render: (card) => <span className="badge bg-primary">{card?.types?.[0]}</span>,
	},
	{
		key: "hp",
		label: "HP",
	},
	{
		key: "rarity",
		label: "Rarity",
		render: (card) => <span className="badge bg-secondary">{card?.rarity}</span>,
	},
	{
		key: "set",
		label: "Set",
		render: (card) => <strong>{card?.set.name}</strong>,
	},
	{
		key: "quantity",
		label: "Qty",
		render: () => 1,
	},
	{
		key: "price",
		label: "Price",
		render: (card) => `${card?.pricing?.cardmarket?.avg} ${currency}`,
	},
	{
		key: "total",
		label: "Total",
		render: (card) => `${card?.pricing?.cardmarket?.avg} USD`,
	},
]
