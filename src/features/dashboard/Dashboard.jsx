import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectUser } from "@features/user/userSlice"
import {
	selectTotalCards,
	selectUniqueSets,
	selectTotalValue,
	selectRecentCards,
} from "@features/binder/binderSlice"
import { Card, DataTable, StatCard, EmptyState, PageHeader } from "@shared/components"

const columns = [
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
		key: "rarity",
		label: "Rarity",
		render: (card) => <span className="badge bg-secondary">{card?.rarity}</span>,
	},
	{
		key: "set",
		label: "Set",
		render: (card) => <strong>{card?.set?.name}</strong>,
	},
	{
		key: "price",
		label: "Est. Value",
		render: (card) => `$${card?.pricing?.cardmarket?.avg ?? "—"}`,
	},
]

const STATS = [
	{ label: "Total Cards", icon: "bi-collection", format: (v) => v },
	{ label: "Unique Sets", icon: "bi-grid", format: (v) => v },
	{ label: "Est. Value", icon: "bi-currency-dollar", format: (v) => `$${v.toFixed(2)}` },
]

export default function Dashboard() {
	const navigate = useNavigate()
	const user = useSelector(selectUser)

	const totalCards = useSelector(selectTotalCards)
	const uniqueSets = useSelector(selectUniqueSets)
	const totalValue = useSelector(selectTotalValue)
	const recentCards = useSelector(selectRecentCards)

	const statValues = [totalCards, uniqueSets, totalValue]

	return (
		<>
			<PageHeader title="Dashboard" className="text-capitalize">
				Welcome back, {user.name}
			</PageHeader>

			<div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
				{STATS.map((stat, i) => (
					<StatCard
						key={stat.label}
						label={stat.label}
						icon={stat.icon}
						value={stat.format(statValues[i])}
					/>
				))}
			</div>

			<div className="row g-4">
				<div className="col-12">
					<Card title="Recently Added">
						<DataTable
							columns={columns}
							className="table-hover"
							data={recentCards}
							onRowClick={(card) => navigate(`/card/${card.id}`)}
							emptyState={
								<EmptyState
									icon="bi-book"
									title="Your binder is empty"
									message="Start building your collection"
									cta={{ to: "/search", icon: "bi-search", label: "Search Cards" }}
								/>
							}
						/>
					</Card>
				</div>
			</div>
		</>
	)
}
