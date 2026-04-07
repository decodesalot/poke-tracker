import { Card, DataTable, CardGrid, Pagination, PageHeader } from "@shared/components/"
import { useBinder } from "./hooks/useBinder"
import { BinderEmptyState } from "./components/BinderEmptyState"
import { BinderFilters } from "./components/BinderFilters"
import { getBinderColumns } from "./utils/binderColumns"

export default function Binder() {
	const { cards, pagination, filters, view, navigateToCard } = useBinder()
	const columns = getBinderColumns("USD")

	return (
		<>
			<PageHeader title="My Binder">Manage and track your collection</PageHeader>

			<BinderFilters
				view={view.current}
				setView={view.onChange}
				filters={filters.values}
				onFilterChange={filters.onChange}
			/>

			<Card title="Cards">
				{view.current === "grid" ? (
					<CardGrid cards={cards.visible} emptyState={<BinderEmptyState />} />
				) : (
					<DataTable
						columns={columns}
						data={cards.visible}
						onRowClick={navigateToCard}
						emptyState={<BinderEmptyState />}
					/>
				)}
				<Pagination
					currentPage={pagination.currentPage}
					totalPages={pagination.totalPages}
					total={cards.total}
					onPrev={pagination.onPrev}
					onNext={pagination.onNext}
				/>
			</Card>
		</>
	)
}
