export default function Card({ title, children, className = "" }) {
    return (
        <div className={`card shadow-sm ${className}`}>
            <div className="card-header">
                {title && <h2 className="card-title h4 m-0">{title}</h2>}
            </div>
            <div className="card-body">
                {children}
            </div>
        </div>
    )
}