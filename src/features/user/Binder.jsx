import { Card, DataTable } from "@shared/components/"
// faking it for now..
const cards = [
    {
        id: 'base1-4',
        name: 'Charizard',
        type: 'Fire',
        hp: 120,
        set: 'Base Set',
        rarity: 'Rare Holo',
        image: 'https://assets.tcgdex.net/en/base/base1/4/low.png',
        quantity: 2,
        condition: 'Near Mint',
        price: 149.99,
        total: 300.00
    },
    {
        id: 'base1-58',
        name: 'Pikachu',
        type: 'Electric',
        hp: 40,
        set: 'Base Set',
        rarity: 'Common',
        image: 'https://assets.tcgdex.net/en/base/base1/58/low.png',
        quantity: 1,
        condition: 'Excellent',
        price: 20.99,
        total: 20.99
    },
    {
        id: 'base1-2',
        name: 'Blastoise',
        type: 'Water',
        hp: 100,
        set: 'Base Set',
        rarity: 'Rare Holo',
        image: 'https://assets.tcgdex.net/en/base/base1/2/low.png',
        quantity: 3,
        condition: 'Good',
        price: 10.99,
        total: 32.97
    },
    {
        id: 'base1-44',
        name: 'Bulbasaur',
        type: 'Grass',
        hp: 45,
        set: 'Base Set',
        rarity: 'Common',
        image: 'https://assets.tcgdex.net/en/base/base1/44/low.png',
        quantity: 1,
        condition: 'Near Mint',
        price: 5.99,
        total: 5.99
    }
]

const columns = [
    {
        key: 'image',
        label: '',
        className: 'w-1',
        render: card => (
            <img
                src={card.image}
                alt={card.name}
                style={{ width: 40 }}
            />
        )
    },
    {
        key: 'name',
        label: 'Name',
        render: card => <strong>{card.name}</strong>
    },
    {
        key: 'set',
        label: 'Set'
    },
    {
        key: 'type',
        label: 'Type',
        render: card => (
            <span className="badge bg-primary">
                {card.type}
            </span>
        )
    },
    {
        key: 'hp',
        label: 'HP'
    },
    {
        key: 'rarity',
        label: 'Rarity',
        render: card => (
            <span className="badge bg-secondary">
                {card.rarity}
            </span>
        )
    },
    {
        key: 'quantity',
        label: 'Qty'
    },
    {
        key: 'price',
        label: 'Price'
    },
    {
        key: 'total',
        label: 'Total'
    }
]

export default function Binder() {
    // !TODO: add functionality and pull in real data.
    const handleRowClick = (card) => {
        console.log('Selected card:', card)
    }
    return (
        <div>
            <h1>My Binder</h1>
            <p className="text-muted fs-5 mb-0">Manage and Track your cards</p>
            <div className="row mt-4 row-cols-1 g-4">
                <div className="col">
                    <Card
                        children={<>
                            <div className="row row-cols-md-5">
                                <div className="col">
                                    <input type="search" name="search" id="" placeholder="search cards by set or name" className="form-control" />
                                </div>
                                <div className="col">
                                    <select class="form-select">
                                        <option value="name">Sort by Name</option>
                                        <option value="type">Sort by Type</option>
                                        <option value="rarity">Rarity</option>
                                        <option value="hp">HP</option>
                                        <option value="set">Set</option>
                                        <option value="value-high">Value (High)</option>
                                        <option value="value-low">Value (Low)</option>
                                        <option value="quantity">Quantity</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <select className="form-select">
                                        <option value="all">All Rarities</option>
                                        <option value="common">Common</option>
                                    </select>
                                </div>
                                <div className="col">
                                    <select className="form-select">
                                        <option value="all">All Conditions</option>
                                    </select>
                                </div>
                                <div className="col text-end">
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
                        </>}
                    />
                </div>
                <div className="col">
                    <Card
                        title="Collection"
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
                                                <a href="#" className="btn btn-primary"> <i className="bi bi-search"></i> Search Cards</a>
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
    )
}