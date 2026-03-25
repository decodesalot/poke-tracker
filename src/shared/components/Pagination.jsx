export default function Pagination({ currentPage, totalPages, total, onPrev, onNext }) {
    if (totalPages <= 1) return null

    return (
        <div className="d-flex justify-content-between align-items-center mt-3">
            <small className="text-muted">
                Page {currentPage + 1} of {totalPages} &middot; {total} cards
            </small>
            <nav>
                <ul className="pagination pagination-sm mb-0">
                    <li className={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
                        <button className="page-link" onClick={onPrev}>
                            <i className="bi bi-chevron-left"></i>
                        </button>
                    </li>
                    <li className={`page-item ${currentPage === totalPages - 1 ? "disabled" : ""}`}>
                        <button className="page-link" onClick={onNext}>
                            <i className="bi bi-chevron-right"></i>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}
