import { ViewToggle, Card } from "@shared/components/"

export const BinderFilters = ({ view, setView, filters, onFilterChange }) => {
	return (
		<Card className="mb-4">
			<div className="row row-cols-1 row-cols-md-5 g-3 align-items-center">
				<div className="col">
					<input
						type="search"
						className="form-control"
						placeholder="Search cards..."
						value={filters.search}
						onChange={(e) => onFilterChange("search", e.target.value)}
					/>
				</div>
				<div className="col">
					<select
						className="form-select"
						value={filters.sortBy}
						onChange={(e) => onFilterChange("sortBy", e.target.value)}
					>
						<option value="name">Sort by Name</option>
						<option value="value-high">Value (High)</option>
					</select>
				</div>
				<div className="col">
					<select className="form-select">
						<option value="all">All Rarities</option>
					</select>
				</div>
				<div className="col text-end ms-auto">
					<ViewToggle view={view} onChange={setView} />
				</div>
			</div>
		</Card>
	)
}
