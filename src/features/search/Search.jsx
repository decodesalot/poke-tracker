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
} from "./searchSlice"
import { Card, CardGrid, DataTable, Pagination } from "@shared/components"
import { CARDS_PER_PAGE } from "@shared/constants/binder"

export default function Search() {
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

    useEffect(() => {
        if (setsStatus === "idle") dispatch(fetchSetsThunk())
    }, [setsStatus, dispatch])

    useEffect(() => {
        if (selectedSet) {
            dispatch(fetchCards(selectedSet.id))
        }
    }, [selectedSet, dispatch])

    const handleSetChange = (e) => {
        const set = sets.find((s) => s.id === e.target.value)
        dispatch(setSelectedSet(set))
        dispatch(fetchCards(set.id))
    }

    const columns = [
        {
            key: "image",
            label: "",
            className: "w-1",
            render: (card) => (
                <img src={`${card.image}/low.webp`} alt={card.name} style={{ width: 40 }} />
            ),
        },
        {
            key: "name",
            label: "Name",
            render: (card) => <strong>{card.name}</strong>,
        },
    ]

    return (
        <>
            <h1>Search</h1>
            <p className="text-muted fs-5 mb-0">Add a card or set to build your collection</p>
            <div className="row mt-5">
                <div className="col-md-3">
                    <Card>
                        <h3 className="fs-5">Filters</h3>
                        <div className="row row-cols-1 g-3">
                            <div className="col">
                                <label className="form-label">Set</label>
                                <select
                                    className="form-select"
                                    name="sets"
                                    aria-label="Sets"
                                    value={selectedSet?.id}
                                    onChange={handleSetChange}
                                    disabled={setsStatus === "loading"}
                                >
                                    {sets.map((s) => (
                                        <option key={s.id} value={s.id}>
                                            {s.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="col">
                                <label className="form-label">Rarity</label>
                                <select
                                    className="form-select"
                                    name="rarity"
                                    aria-label="Rarity"
                                    disabled={setsStatus === "loading"}
                                >
                                    <option value="all">All</option>
                                    <option value="common">Common</option>
                                </select>
                            </div>
                            <div className="col">
                                <label className="form-label">Sort By</label>
                                <select
                                    className="form-select"
                                    name="sortBy"
                                    aria-label="SortBy"
                                    disabled={setsStatus === "loading"}
                                >
                                    <option value="name">Name (A-Z)</option>
                                    <option value="price-high">Price (High to Low)</option>
                                    <option value="price-low">Price (Low to High)</option>
                                    <option value="number">Card Number</option>
                                </select>
                            </div>
                            <div className="col">
                                <button className="btn btn-light w-100 mt-4">Clear Filters</button>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="col-md-9">
                    <div className="row row-cols-1 g-4">
                        <div className="col">
                            <Card>
                                <div className="row align-items-center row-cols-2">
                                    <div className="col">
                                        <div className="d-flex gap-3 align-items-center">
                                            {results?.logo && (
                                                <img
                                                    src={`${results.logo}.webp`}
                                                    alt=""
                                                    className="img-fluid img-thumbnail p-3"
                                                    style={{ maxWidth: "120px" }}
                                                />
                                            )}
                                            <span>
                                                <h2 className="mb-2">{results?.name}</h2>
                                                <ul className="list-group list-group-horizontal">
                                                    <li className="list-group-item border-0 ps-0 py-0">
                                                        <i className="bi bi-collection me-1"></i>
                                                        {results?.serie?.name}
                                                    </li>
                                                    <li className="list-group-item border-0 py-0">
                                                        <i className="bi bi-calendar me-1"></i>
                                                        {results?.releaseDate}
                                                    </li>
                                                    <li className="list-group-item border-0 py-0">
                                                        <i className="bi bi-stack me-1"></i>
                                                        {results?.cardCount?.total} cards
                                                    </li>
                                                </ul>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col text-md-end">
                                        <p className="h3">$876.09</p>
                                        <p className="text-muted mb-0">Current Total Value</p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="col">
                            <Card>
                                <div className="row row-cols-md-4">
                                    <div className="col">
                                        <input
                                            type="search"
                                            name="search"
                                            placeholder="search cards by name"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="col ms-auto text-end">
                                        <div className="btn-group">
                                            <button
                                                className={`btn ${view === "grid" ? "btn-primary" : "btn-outline-secondary"}`}
                                                onClick={() => setView("grid")}
                                            >
                                                <i className="bi bi-grid"></i>
                                            </button>
                                            <button
                                                className={`btn ${view === "table" ? "btn-primary" : "btn-outline-secondary"}`}
                                                onClick={() => setView("table")}
                                            >
                                                <i className="bi bi-list"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                        <div className="col">
                            <Card title="Cards">
                                {status === "loading" ? (
                                    <div className="text-center py-5">
                                        <div className="spinner-border text-primary"></div>
                                    </div>
                                ) : view === "grid" ? (
                                    <>
                                        <CardGrid
                                            cards={visibleCards}
                                            emptyState={
                                                <div className="text-center py-5">
                                                    <i className="bi bi-search fs-1"></i>
                                                    <p className="h5 mb-0">No cards found</p>
                                                    <p>Try selecting a different set</p>
                                                </div>
                                            }
                                        />
                                    </>
                                ) : (
                                    <>
                                        <DataTable
                                            columns={columns}
                                            className="table-hover"
                                            data={visibleCards ?? []}
                                            onRowClick={(card) => navigate(`/card/${card.id}`)}
                                            emptyState={
                                                <div className="text-center py-5">
                                                    <i className="bi bi-search fs-1"></i>
                                                    <p className="h5 mb-0">No cards found</p>
                                                    <p>Try selecting a different set</p>
                                                </div>
                                            }
                                        />
                                    </>
                                )}
                                <Pagination
                                    currentPage={page}
                                    totalPages={totalPages}
                                    total={allCards.length}
                                    onPrev={() => dispatch(prevPage())}
                                    onNext={() => dispatch(nextPage())}
                                />
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
