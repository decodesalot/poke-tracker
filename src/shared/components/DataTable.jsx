export default function DataTable({ columns, data, onRowClick, className = "", emptyState }) {
	if (data.length === 0 && emptyState) {
		return emptyState
	}

	return (
		<div className="table-responsive">
			<table className={`table data-table mb-0 ${className}`}>
				<thead>
					<tr>
						{columns.map((col) => (
							<th key={col.key} className={col.headerClassName || col.className}>
								{col.label}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((row, idx) => (
						<tr
							key={row.id || idx}
							className={onRowClick ? "cursor-pointer hover-lift-row align-middle" : ""}
							onClick={() => onRowClick?.(row)}
						>
							{columns.map((col) => (
								<td key={col.key} className={col.className}>
									{col.render ? col.render(row) : row[col.key]}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
