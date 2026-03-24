import { useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import { Card, DataTable } from "@shared/components/"
import { selectBinder } from "./binderSlice"

const columns = [
	{
		key: "image",
		label: "",
		className: "w-1",
		render: (card) => <img src={`${card.image}/low.webp`} alt={card.name} style={{ width: 40 }} />,
	},
	{
		key: "name",
		label: "Name",
		render: (card) => <strong>{card.name}</strong>,
	},
	{
		key: "type",
		label: "Type",
		render: (card) => <span className="badge bg-primary">{card?.types?.[0]}</span>,
	},
	{
		key: "hp",
		label: "HP",
	},
	{
		key: "rarity",
		label: "Rarity",
		render: (card) => <span className="badge bg-secondary">{card?.rarity}</span>,
	},
	{
		key: "set",
		label: "Set",
		render: (card) => <strong>{card?.set.name}</strong>,
	},
	{
		key: "quantity",
		label: "Qty",
		render: () => 1,
	},
	{
		key: "price",
		label: "Price",
		render: (card) => `${card?.pricing?.cardmarket.avg} USD`, // !TODO: pull in users preference for src & currency type
	},
	{
		key: "total",
		label: "Total",
		render: (card) => `${card?.pricing?.cardmarket.avg} USD`,
	},
]

export default function Binder() {
	const cardsInBinder = useSelector(selectBinder) || []
	const navigate = useNavigate()

	const handleRowClick = (card) => {
		navigate(`/card/${card.id}`)
	}
	return (
		<div>
			<h1>My Binder</h1>
			<p className="text-muted fs-5 mb-0">Manage and track your collection</p>
			<div className="row mt-4 row-cols-1 g-4">
				<div className="col">
					<Card
						children={
							<>
								<div className="row row-cols-md-5">
									<div className="col">
										<input
											type="search"
											name="search"
											id=""
											placeholder="search cards by set or name"
											className="form-control"
										/>
									</div>
									<div className="col">
										<select className="form-select">
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
							</>
						}
					/>
				</div>
				<div className="col">
					<Card
						title="Cards"
						children={
							<div className="row">
								<div className="col">
									<DataTable
										columns={columns}
										className="table-hover"
										data={cardsInBinder}
										onRowClick={handleRowClick}
										emptyState={
											<div className="text-center py-5">
												<i className="bi bi-book fs-1"></i>
												<p className="h5 mb-0">Your Binder is Empty</p>
												<p>Start building your collection by adding cards</p>
												<Link to="/search" className="btn btn-primary">
													<i className="bi bi-search"></i> Search Cards
												</Link>
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
