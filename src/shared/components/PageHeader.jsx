export default function PageHeader({ title, children, className = "" }) {
	return (
		<header className={`mb-4 ${className}`}>
			<h1>{title}</h1>
			{children && <div className="text-muted fs-5 mb-0">{children}</div>}
		</header>
	)
}
