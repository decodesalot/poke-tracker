import { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchCard, selectCard, selectCardStatus, selectCardError } from "./cardSlice"
import { addCard, removeCard, selectBinder } from "@features/binder/binderSlice"
import { Card } from "@shared/components"

const typeColorMap = {
	Fire: "danger",
	Water: "info",
	Grass: "success",
	Psychic: "purple",
	Electric: "warning",
	Colorless: "secondary",
	Fighting: "orange",
	Darkness: "dark",
	Metal: "secondary",
	Dragon: "info",
	Fairy: "pink",
}

const getTypeBadge = (type) => {
	const color = typeColorMap[type] || "secondary"
	return (
		<span key={type} className={`badge bg-${color} me-1`}>
			{type}
		</span>
	)
}

const StatItem = ({ label, value }) => (
	<div className="col">
		<p className="text-muted small mb-1">{label}</p>
		<p className="fw-semibold mb-0">{value ?? "—"}</p>
	</div>
)

export default function CardDetail() {
	const { id } = useParams()
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const cardsInBinder = useSelector(selectBinder) || []
	const card = useSelector(selectCard)
	const status = useSelector(selectCardStatus)
	const error = useSelector(selectCardError)

	useEffect(() => {
		dispatch(fetchCard(id))
	}, [id, dispatch])

	if (status === "loading") return <div className="spinner-border text-primary"></div>
	if (status === "failed") return <p className="text-danger">{error}</p>
	if (!card) return null

	const cm = card.pricing?.cardmarket
	const inBinder = cardsInBinder.some((c) => c.id === card?.id)

	const handleAddCard = (card) => {
		if (inBinder) {
			dispatch(removeCard(card.id))
		} else {
			dispatch(addCard(card))
		}
	}

	return (
		<>
			<div className="row mb-4">
				<div className="col-md-4">
					<button className="btn btn-light" onClick={() => navigate(-1)}>
						<i className="bi bi-arrow-left me-1"></i>Back
					</button>
				</div>
				<div className="col-md-8">
					<div className="d-flex gap-2 justify-content-end">
						<button className="btn btn-primary float-end" disabled>
							Compare
						</button>
						<button className="btn btn-primary float-end" disabled>
							Add to Wishlist
						</button>
						<button
							className={`btn ${inBinder ? "btn-outline-danger" : "btn-primary"}`}
							onClick={() => handleAddCard(card)}
						>
							{inBinder ? (
								<>
									<i className="bi bi-x-lg"></i> Remove from Binder
								</>
							) : (
								<>
									<i className="bi bi-plus-lg"></i> Add to Binder
								</>
							)}
						</button>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-md-4">
					<Card>
						<img src={`${card.image}/high.webp`} alt={card.name} className="img-fluid w-100" />
					</Card>
				</div>
				<div className="col-md-8">
					<div className="row row-cols-1 g-4">
						<div className="col">
							<Card>
								<h1>
									{card.name} &middot;{" "}
									<small>
										#{card.localId} / {card.set.cardCount.total} &middot; {card.category}
									</small>{" "}
								</h1>

								<div className="row row-cols-2 row-cols-md-4 g-3 mt-3">
									<StatItem label="HP" value={card.hp} />
									<StatItem label="Stage" value={card.stage} />
									<StatItem
										label="Retreat Cost"
										value={card.retreat === 0 ? "Free" : card.retreat}
									/>
									<StatItem label="Set" value={card.set?.name} />
									<StatItem label="Illustrator" value={card.illustrator} />
									<StatItem label="Rarity" value={card.rarity} />
									<StatItem label="Type" value={card.types?.map(getTypeBadge)} />

									<div className="col">
										<p className="text-muted small mb-1">Format Legality</p>
										<div className="d-flex gap-2">
											{card.legal?.standard && <span className="badge bg-success">Standard</span>}
											{card.legal?.expanded && <span className="badge bg-info">Expanded</span>}
										</div>
									</div>
								</div>
							</Card>
						</div>

						{card.abilities?.length > 0 && (
							<div className="col">
								<Card title="Abilities">
									<div className="d-flex flex-column gap-3">
										{card.abilities.map((ability, i) => (
											<div key={i} className="d-flex gap-3">
												<span className="badge bg-success-subtle text-success-emphasis align-self-start mt-1">
													{ability.type}
												</span>
												<div>
													<p className="fw-semibold mb-1">{ability.name}</p>
													<p className="text-muted small mb-0">{ability.effect}</p>
												</div>
											</div>
										))}
									</div>
								</Card>
							</div>
						)}
						{card.attacks?.length > 0 && (
							<div className="col">
								<Card title="Attacks">
									<div className="d-flex flex-column gap-3">
										{card.attacks.map((attack, i) => (
											<div key={i}>
												<div className="d-flex gap-2">
													{attack.cost?.map((c, j) => (
														<span
															key={j}
															className="badge bg-secondary-subtle text-secondary-emphasis"
														>
															{c}
														</span>
													))}
												</div>
												<div className="d-flex justify-content-between mt-2">
													<p className="fw-semibold mb-1">{attack.name}</p>
													{attack.damage && <span className="fw-bold">{attack.damage}</span>}
												</div>
												<p className="text-muted small mb-0">{attack.effect}</p>
											</div>
										))}
									</div>
								</Card>
							</div>
						)}
						{cm && (
							<div className="col">
								<Card title="Market Data">
									<div className="row row-cols-2 row-cols-md-5 g-3 mb-4">
										<StatItem
											label="Current Trend"
											value={`${cm.unit} ${cm["trend-holo"] ?? cm.trend}`}
										/>
										<StatItem label="Low" value={`${cm.unit} ${cm["low-holo"] ?? cm.low}`} />
										<StatItem
											label="Avg (1 day)"
											value={`${cm.unit} ${cm["avg1-holo"] ?? cm.avg1}`}
										/>
										<StatItem
											label="Avg (7 day)"
											value={`${cm.unit} ${cm["avg7-holo"] ?? cm.avg7}`}
										/>
										<StatItem
											label="Avg (30 day)"
											value={`${cm.unit} ${cm["avg30-holo"] ?? cm.avg30}`}
										/>
									</div>
									<div className="row">
										<div className="col">
											<p className="text-muted small">
												<i className="bi bi-info-circle me-1"></i> Updated{" "}
												{new Date(cm.updated).toLocaleDateString()}
											</p>
										</div>
									</div>
								</Card>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	)
}
