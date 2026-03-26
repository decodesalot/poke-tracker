import { useNavigate } from "react-router-dom"

export default function CardGrid({ cards, emptyState }) {
	const navigate = useNavigate()

	if (cards.length === 0 && emptyState) return emptyState

	return (
		<div className="row row-cols-2 row-cols-md-4 row-cols-lg-6 g-3">
			{cards.map((card) => (
				<div className="col" key={card.id}>
					<div
						role="button"
						className="text-center cursor-pointer"
						onClick={() => navigate(`/card/${card.id}`)}
					>
						<img
							src={`${card.image}/low.webp`}
							alt={card.name}
							className="img-fluid rounded mb-1"
						/>
						<p className="small fw-medium mb-0 text-truncate">{card.name}</p>
						<p className="small text-muted mb-0">{card.set?.name}</p>
					</div>
				</div>
			))}
		</div>
	)
}
