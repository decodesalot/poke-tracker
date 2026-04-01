export default function ErrorState({ message = "Something went wrong", onRetry }) {
	return (
		<div className="text-center py-5">
			<i className="bi bi-exclamation-circle fs-1 text-danger"></i>
			<p className="h5 mt-3 mb-1">Oops, something went wrong</p>
			<p className="text-muted">{message}</p>
			{onRetry && (
				<button className="btn btn-outline-danger" onClick={onRetry}>
					<i className="bi bi-arrow-clockwise me-2"></i>Try Again
				</button>
			)}
		</div>
	)
}
