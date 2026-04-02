import { Card } from "@shared/components/"
export const SearchSetHeader = ({ results }) => {
	return (
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
	)
}
