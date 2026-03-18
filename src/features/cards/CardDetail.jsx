import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Card } from "@shared/components"

export default function CardDetail() {
    const { id } = useParams()
    const [card, setCard] = useState(null)

    useEffect(() => {
        // !TODO: Call endpoint to pull card data, faking it for now..
        setCard({
            id: "base1-4",
            name: "Charizard",
            type: "Fire",
            hp: 120,
            set: "Base Set",
            rarity: "Rare Holo",
            image: "https://assets.tcgdex.net/en/base/base1/4/high.png",
            quantity: 1,
            condition: "Near Mint",
            price: 149.99,
            total: 299.98,
        })
    }, [id])

    if (!card) {
        return <div>Card not found</div>
    }

    return (
        <>
            <div className="row">
                <div className="col-md-4">
                    <Card children={<img src={card.image} alt={card.name} className="img-fluid w-100" />} />
                </div>
                <div className="col-md-8">
                    <div className="row row-cols-1 g-4">
                        <div className="col">
                            <Card children={
                                <>
                                    <h1>{card.name}</h1>
                                    <p className="text-muted fs-5 mb-0"></p>
                                    <div className="row">
                                        <div className="col">
                                            <h3 className="h5">Rarity</h3>
                                            <span className="badge bg-secondary ms-1">{card.rarity}</span>
                                        </div>
                                        <div className="col">

                                        </div>
                                    </div>
                                </>
                            } />
                        </div>
                        <div className="col">
                            <Card title="Market Data" />
                        </div>
                        <div className="col">
                            <Card title="Set Details" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}