import { Card, DataTable, CardGrid, Pagination, ViewToggle } from "@shared/components/"
import { useBinder } from "./hooks/useBinder"
import { BinderEmptyState } from "./components/BinderEmptyState"
import { BinderFilters } from "./components/BinderFilters"
import { getBinderColumns } from "./utils/binderColumns"

export default function Binder() {
	const {
		visibleCards,
		totalCount,
		view,
		setView,
		currentPage,
		totalPages,
		handleNext,
		handlePrev,
		navigateToCard,
		filters,
		handleFilterChange,
	} = useBinder()

	const columns = getBinderColumns("USD")

	return (
		<div>
			<header className="mb-4">
				<h1>My Binder</h1>
				<p className="text-muted fs-5 mb-0">Manage and track your collection</p>
			</header>

			<BinderFilters
				view={view}
				setView={setView}
				filters={filters}
				onFilterChange={handleFilterChange}
			/>

			<Card title="Cards">
				{view === "grid" ? (
					<CardGrid cards={visibleCards} emptyState={<BinderEmptyState />} />
				) : (
					<DataTable
						columns={columns}
						data={visibleCards}
						onRowClick={navigateToCard}
						emptyState={<BinderEmptyState />}
					/>
				)}
				<Pagination
					currentPage={currentPage}
					totalPages={totalPages}
					total={totalCount}
					onPrev={handlePrev}
					onNext={handleNext}
				/>
			</Card>
		</div>
	)
}
