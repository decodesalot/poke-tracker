import { useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { selectUser } from "@features/user/userSlice"
import {
    selectTotalCards,
    selectUniqueSets,
    selectTotalValue,
    selectRecentCards,
} from "@features/binder/binderSlice"
import { Card, DataTable, StatCard } from "@shared/components"

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
            <h1>Dashboard</h1>
            <p className="text-muted fs-5 mb-4">Welcome back, {user.name}</p>

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
                                <div className="text-center py-5">
                                    <i className="bi bi-collection fs-1 text-muted"></i>
                                    <p className="h5 mt-3 mb-1">Your binder is empty</p>
                                    <p className="text-muted">Start building your collection</p>
                                    <Link to="/search" className="btn btn-primary">
                                        <i className="bi bi-search me-2"></i>Search Cards
                                    </Link>
                                </div>
                            }
                        />
                    </Card>
                </div>
            </div>
        </>
    )
}
