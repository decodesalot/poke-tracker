import { Card } from "@shared/components/"
export const SearchFilters = ({ sets, selectedSet, setsStatus, handleSetChange }) => {
	return (
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
	)
}
