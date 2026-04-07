import {
	Card,
	CardGrid,
	DataTable,
	Pagination,
	ViewToggle,
	LoadingSpinner,
	PageHeader,
} from "@shared/components"
import { useSearch } from "./hooks/useSearch"
import { SearchEmptyState } from "./components/SearchEmptyState"
import { SearchFilters } from "./components/SearchFilters"
import { SearchSetHeader } from "./components/SearchSetHeader"
import { getSearchColumns } from "./utils/searchColumns"

export default function Search() {
	const { sets, cards, pagination, view, navigateToCard } = useSearch()
	const columns = getSearchColumns()

	return (
		<>
			<PageHeader title="Search">Add a card or set to build your collection</PageHeader>

			<div className="row mt-5">
				<div className="col-md-3">
					<SearchFilters
						sets={sets.items}
						selectedSet={sets.selected}
						setsStatus={sets.status}
						handleSetChange={sets.onChange}
					/>
				</div>
				<div className="col-md-9">
					<div className="row row-cols-1 g-4">
						<div className="col">
							<SearchSetHeader results={cards.results} />
						</div>
						<div className="col">
							<Card>
								<div className="row row-cols-md-4">
									<div className="col">
										<input
											type="search"
											name="search"
											placeholder="search cards by name"
											className="form-control"
										/>
									</div>
									<div className="col ms-auto text-end">
										<ViewToggle view={view.current} onChange={view.onChange} />
									</div>
								</div>
							</Card>
						</div>
						<div className="col">
							<Card title="Cards">
								{cards.status === "loading" ? (
									<LoadingSpinner />
								) : view.current === "grid" ? (
									<CardGrid cards={cards.visible} emptyState={<SearchEmptyState />} />
								) : (
									<DataTable
										columns={columns}
										data={cards.visible}
										onRowClick={navigateToCard}
										emptyState={<SearchEmptyState />}
									/>
								)}
								<Pagination
									currentPage={pagination.page}
									totalPages={pagination.totalPages}
									total={cards.all.length}
									onPrev={pagination.onPrev}
									onNext={pagination.onNext}
								/>
							</Card>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
