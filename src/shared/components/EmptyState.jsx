import { Link } from "react-router-dom"

export default function EmptyState({ icon = "bi-inbox", title, message, cta }) {
	return (
		<div className="text-center py-5">
			<i className={`bi ${icon} fs-1 text-muted`}></i>
			{title && <p className="h5 mt-3 mb-1">{title}</p>}
			{message && <p className="text-muted">{message}</p>}
			{cta && (
				<Link to={cta.to} className="btn btn-primary">
					{cta.icon && <i className={`bi ${cta.icon} me-2`}></i>}
					{cta.label}
				</Link>
			)}
		</div>
	)
}
