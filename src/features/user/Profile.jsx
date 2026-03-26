import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useNavigate, Link } from "react-router-dom"
import { selectUser, selectUserId } from "@features/user/userSlice"
import { selectBinder, selectTotalCards, selectUniqueSets, selectTotalValue } from "@features/binder/binderSlice"
import { selectFriendById, removeFriend } from "@features/friends/friendsSlice"
import { Card, DataTable, Pagination, StatCard } from "@shared/components"
import { CARDS_PER_PAGE } from "@constants/binder"

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


export default function Profile() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentUserId = useSelector(selectUserId)
    const currentUser = useSelector(selectUser)
    const isOwnProfile = id === currentUserId

    const friend = useSelector(selectFriendById(id))

    const ownBinder = useSelector(selectBinder)
    const ownTotalCards = useSelector(selectTotalCards)
    const ownUniqueSets = useSelector(selectUniqueSets)
    const ownTotalValue = useSelector(selectTotalValue)

    const [currentPage, setCurrentPage] = useState(0)

    if (!isOwnProfile && !friend) {
        return (
            <div className="text-center py-5">
                <i className="bi bi-person-x fs-1 text-muted"></i>
                <p className="h5 mt-3 mb-1">Trainer not found</p>
                <Link to="/friends" className="btn btn-primary mt-2">Back to Friends</Link>
            </div>
        )
    }

    const profile = isOwnProfile ? currentUser : friend
    const binder = isOwnProfile ? ownBinder : friend.binder

    const totalCards = isOwnProfile ? ownTotalCards : binder.length
    const uniqueSets = isOwnProfile ? ownUniqueSets : new Set(binder.map((c) => c.set?.id)).size
    const totalValue = isOwnProfile
        ? ownTotalValue
        : binder.reduce((sum, c) => sum + (c.pricing?.cardmarket?.avg ?? 0), 0)

    const totalPages = Math.ceil(binder.length / CARDS_PER_PAGE)
    const visibleCards = binder.slice(currentPage * CARDS_PER_PAGE, (currentPage + 1) * CARDS_PER_PAGE)
    const statValues = [totalCards, uniqueSets, totalValue]

    const handleRemoveFriend = () => {
        dispatch(removeFriend(id))
        navigate("/friends")
    }

    return (
        <>
            <div className="row mb-4">
                <div className="col-md-4">
                    <button className="btn btn-light" onClick={() => navigate(-1)}>
                        <i className="bi bi-arrow-left me-1"></i>Back
                    </button>
                </div>
            </div>
            <div className="row g-4 mb-4">
                <div className="col-12">
                    <Card title className="card-profile">
                        <span className="badge bg-secondary text-capitalize position-absolute top-0 end-0 mt-2 me-2">{profile.role}</span>
                        <div className="d-flex align-items-center gap-3 cover">
                            <div
                                className="avatar-lg border border-4 rounded border-white d-flex align-items-center justify-content-center"

                            >
                                {profile.avatar ? <img src={profile.avatar} alt={profile.name} className="img-fluid" /> : <i className="bi bi-person"></i>}
                            </div>
                            <div className="flex-grow-1">
                                <h1 className="h3 mb-0">{profile.name}</h1>
                                <p className="text-muted mb-0">{profile.email}</p>
                            </div>
                            <div>
                                {isOwnProfile ? (
                                    <Link to="/settings" className="btn btn-outline-primary mt-4">
                                        <i className="bi bi-pencil me-2"></i>Edit Profile
                                    </Link>
                                ) : (
                                    <button className="btn btn-outline-danger mt-4" onClick={handleRemoveFriend}>
                                        <i className="bi bi-person-dash me-2"></i>Remove Friend
                                    </button>
                                )}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
                {STATS.map((stat, i) => (
                    <StatCard key={stat.label} label={stat.label} icon={stat.icon} value={stat.format(statValues[i])} />
                ))}
            </div>

            <div className="row">
                <div className="col-md-8">
                    <Card title="Collection">
                        <DataTable
                            columns={columns}
                            className="table-hover"
                            data={visibleCards}
                            onRowClick={isOwnProfile ? (card) => navigate(`/card/${card.id}`) : undefined}
                            emptyState={
                                <div className="text-center py-5">
                                    <i className="bi bi-collection fs-1 text-muted"></i>
                                    <p className="h5 mt-3 mb-1">No cards in collection</p>
                                </div>
                            }
                        />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            total={binder.length}
                            onPrev={() => setCurrentPage((p) => p - 1)}
                            onNext={() => setCurrentPage((p) => p + 1)}
                        />
                    </Card>
                </div>
                <div className="col-md-4">
                    <Card title="Recent Activity">
                        <div className="text-center py-5">
                            <i className="bi bi-clock fs-1 text-muted"></i>
                            <p className="h5 mt-3 mb-1">No activity within last 30 days</p>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    )
}
