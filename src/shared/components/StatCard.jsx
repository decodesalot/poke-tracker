import Card from "./Card"

export default function StatCard({ label, icon, value }) {
	return (
		<div className="col">
			<Card>
				<div className="d-flex align-items-center gap-3">
					<div className="bg-primary bg-opacity-10 p-3 rounded">
						<i className={`bi ${icon} fs-4 text-primary`}></i>
					</div>
					<div>
						<p className="text-muted small mb-0">{label}</p>
						<p className="h4 mb-0 fw-bold">{value}</p>
					</div>
				</div>
			</Card>
		</div>
	)
}
