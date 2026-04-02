export const getSearchColumns = () => [
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
]
