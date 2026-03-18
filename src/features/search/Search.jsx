import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { addCard, addCards, removeCard, selectBinder } from "@features/binder/binderSlice"
import { Card, DataTable } from "@shared/components"
// faking it for now..
const cards = [
    {
        id: "base1-4",
        name: "Charizard",
        type: "Fire",
        hp: 120,
        set: "Base Set",
        rarity: "Rare Holo",
        image: "https://assets.tcgdex.net/en/base/base1/4/low.png",
        quantity: 1,
        condition: "Near Mint",
        price: 149.99,
        total: 299.98,
    },
    {
        id: "base1-58",
        name: "Pikachu",
        type: "Electric",
        hp: 40,
        set: "Base Set",
        rarity: "Common",
        image: "https://assets.tcgdex.net/en/base/base1/58/low.png",
        quantity: 1,
        condition: "Excellent",
        price: 20.99,
        total: 20.99,
    },
    {
        id: "base1-2",
        name: "Blastoise",
        type: "Water",
        hp: 100,
        set: "Base Set",
        rarity: "Rare Holo",
        image: "https://assets.tcgdex.net/en/base/base1/2/low.png",
        quantity: 1,
        condition: "Good",
        price: 10.99,
        total: 32.97,
    },
    {
        id: "base1-44",
        name: "Bulbasaur",
        type: "Grass",
        hp: 45,
        set: "Base Set",
        rarity: "Common",
        image: "https://assets.tcgdex.net/en/base/base1/44/low.png",
        quantity: 1,
        condition: "Near Mint",
        price: 5.99,
        total: 5.99,
    },
]
const set = [
    {
        "id": "base1",
        "name": "Base Set",
        "logo": "https://assets.tcgdex.net/en/base/base1/logo",
        "cardCount": {
            "total": 102,
            "official": 102
        }
    },
    {
        "id": "base2",
        "name": "Jungle",
        "logo": "https://assets.tcgdex.net/en/base/base2/logo",
        "symbol": "https://assets.tcgdex.net/univ/base/base2/symbol",
        "cardCount": {
            "total": 64,
            "official": 64
        }
    }
]

export default function Search() {
    const cardsInBinder = useSelector(selectBinder) || []
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleRowClick = (card) => {
        navigate(`/card/${card.id}`)
    }

    const handleAddCard = (card) => {
        const index = cardsInBinder.findIndex((c) => c.id === card.id)
        if (index !== -1) {
            dispatch(removeCard(index))
        } else {
            dispatch(addCard(card))
        }
    }

    const handleAddCards = (cards) => dispatch(addCards(cards))


    const columns = [
        {
            key: "image",
            label: "",
            className: "w-1",
            render: (card) => <img src={card.image} alt={card.name} style={{ width: 40 }} />,
        },
        {
            key: "name",
            label: "Name",
            render: (card) => <strong>{card.name}</strong>,
        },
        {
            key: "type",
            label: "Type",
            render: (card) => <span className="badge bg-primary">{card.type}</span>,
        },
        {
            key: "hp",
            label: "HP",
        },
        {
            key: "rarity",
            label: "Rarity",
            render: (card) => <span className="badge bg-secondary">{card.rarity}</span>,
        },
        {
            key: "price",
            label: "Price",
        },
        {
            key: "actions",
            label: "",
            className: "text-end",
            render: (card) => {
                const inBinder = cardsInBinder.some((c) => c.id === card.id)
                return (
                    <button
                        onClick={() => handleAddCard(card)}
                        className={`btn ${inBinder ? "btn-outline-danger" : "btn-primary"}`}
                    >
                        {inBinder ? "Remove" : "Add"}
                    </button>
                )
            },
        },
    ]

    return (
        <>
            <h1>Search</h1>
            <p className="text-muted fs-5 mb-0">Add a card or set to build your collection</p>
            <div className="row mt-5">
                <div className="col-md-3">
                    <Card children={
                        <>
                            <h3 className="fs-5">Filters</h3>
                            <div className="row row-cols-1 g-3">
                                <div className="col">
                                    <label className="form-label">Set</label>
                                    <select
                                        className="form-select"
                                        name="sets"
                                        aria-label="Sets"
                                    >
                                        <option value="base-1">Base Set</option>
                                        <option value="jungle">Jungle</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <label className="form-label">Rarity</label>
                                    <select
                                        className="form-select"
                                        name="rarity"
                                        aria-label="Rarity"
                                    >
                                        <option value="all">All</option>
                                        <option value="common">Common</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <label className="form-label">Sort By</label>
                                    <select
                                        className="form-select"
                                        name="rarity"
                                        aria-label="Rarity"
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

                        </>
                    } />
                </div>
                <div className="col-md-9">
                    <div className="row row-cols-1 g-4">
                        <div className="col">
                            <Card
                                children={
                                    <>
                                        <div className="row align-items-center row-cols-2">
                                            <div className="col">
                                                <div className="d-flex gap-3 align-items-center">
                                                    <span>
                                                        <img src={set[0].logo + '.webp'} alt="" className="img-fluid img-thumbnail p-3" style={{ maxWidth: '120px', minHeight: '80px' }} />
                                                    </span>
                                                    <span>
                                                        <h2 className="mb-2">Base Set</h2>
                                                        <ul className="list-group list-group-horizontal">
                                                            <li className="list-group-item border-0 ps-0 py-0">
                                                                <i className="bi bi-collection me-1"></i>XY
                                                            </li>
                                                            <li className="list-group-item border-0 py-0">
                                                                <i className="bi bi-calendar me-1"></i>2015-08-12
                                                            </li>
                                                            <li className="list-group-item border-0 py-0">
                                                                <i className="bi bi-stack me-1"></i>101 cards
                                                            </li>
                                                        </ul>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="col text-md-end">
                                                <p className="h3">$876.09</p>
                                                <p className="text-muted small mb-0">Current Total Value</p>
                                            </div>
                                        </div>
                                    </>
                                }
                            />
                        </div>
                        <div className="col">
                            <Card
                                children={
                                    <>
                                        <div className="row row-cols-md-4">
                                            <div className="col">
                                                <input
                                                    type="search"
                                                    name="search"
                                                    id=""
                                                    placeholder="search cards by name"
                                                    className="form-control"
                                                />
                                            </div>
                                            <div className="col ms-auto text-end">
                                                <div className="btn-group">
                                                    <button className="btn btn-outline-secondary">
                                                        <i className="bi bi-grid"></i>
                                                    </button>
                                                    <button className="btn btn-primary">
                                                        <i className="bi bi-list"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                }
                            />
                        </div>
                        <div className="col">
                            <Card
                                title={
                                    <>
                                        <div className="row align-items-center">
                                            <div className="col">
                                                Cards
                                            </div>
                                            <div className="col text-end">
                                                <button onClick={() => handleAddCards(cards)} className="btn btn-outline-primary">Add Set to Collection</button>
                                            </div>
                                        </div>
                                    </>
                                }
                                children={
                                    <div className="row">
                                        <div className="col">
                                            <DataTable
                                                columns={columns}
                                                className="table-hover"
                                                data={cards}
                                                onRowClick={handleRowClick}
                                                emptyState={
                                                    <div className="text-center py-5">
                                                        <i className="bi bi-book fs-1"></i>
                                                        <p className="h5 mb-0">Your Binder is Empty</p>
                                                        <p>Start building your collection by adding cards</p>
                                                        <a href="#" className="btn btn-primary">
                                                            {" "}
                                                            <i className="bi bi-search"></i> Search Cards
                                                        </a>
                                                    </div>
                                                }
                                            />
                                        </div>
                                    </div>
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}