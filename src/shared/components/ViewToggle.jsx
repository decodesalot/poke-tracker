export default function ViewToggle({ view, onChange }) {
	return (
		<div className="btn-group">
			<button
				className={`btn ${view === "grid" ? "btn-primary" : "btn-outline-secondary"}`}
				onClick={() => onChange("grid")}
			>
				<i className="bi bi-grid"></i>
			</button>
			<button
				className={`btn ${view === "table" ? "btn-primary" : "btn-outline-secondary"}`}
				onClick={() => onChange("table")}
			>
				<i className="bi bi-list"></i>
			</button>
		</div>
	)
}
