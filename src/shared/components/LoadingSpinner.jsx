export default function LoadingSpinner() {
	return (
		<div
			className="d-flex justify-content-center align-items-center py-5"
			style={{ minHeight: "400px" }}
		>
			<div className="spinner-border text-primary" role="status">
				<span className="visually-hidden">Loading...</span>
			</div>
		</div>
	)
}
