import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Sidebar } from "@shared/components"
import { selectUser } from "@features/user/userSlice"

export default function Layout({ children }) {
	const { theme } = useSelector(selectUser)

	useEffect(() => {
		if (!theme) return
		document.documentElement.setAttribute("data-bs-theme", theme)
	}, [theme])

	return (
		<div className="container-fluid p-0">
			<div className="d-flex min-vh-100">
				<div
					className="offcanvas-lg offcanvas-start sidebar d-lg-flex align-items-stretch border-end vh-100 flex-column"
					tabindex="-1"
					id="mobileSidebar"
					style={{ width: "280px" }}
				>
					<div className="offcanvas-header border-bottom d-flex">
						<h5 className="offcanvas-title">
							<a
								href="/"
								className="d-flex align-items-center me-md-auto text-decoration-none text-dark"
							>
								<i className="bi bi-lightning-charge-fill text-warning fs-4 me-2"></i>
								<span className={`fs-4 fw-bold ${theme === "light" ? "text-dark" : "text-white"}`}>
									PokeTracker
								</span>
							</a>
						</h5>
						<button
							type="button"
							className="btn-close d-flex d-lg-none"
							data-bs-dismiss="offcanvas"
							data-bs-target="#mobileSidebar"
							aria-label="Close"
						></button>
					</div>
					<div className="offcanvas-body p-0 w-100 h-100">
						<Sidebar />
					</div>
				</div>
				<div className="flex-grow-1 d-flex flex-column">
					<nav className="navbar navbar-expand-lg navbar-light border-bottom sticky-top py-3">
						<div className="container-fluid">
							<div className="row flex-grow-1">
								<div className="col-9 col-lg-3">
									<input
										className="form-control"
										type="text"
										placeholder="Search for a card or set"
										aria-label="default input example"
									/>
								</div>
								<div className="col-3 col-lg-9">
									<button
										className="btn btn-outline-primary ms-auto d-block d-lg-none"
										type="button"
										data-bs-toggle="offcanvas"
										data-bs-target="#mobileSidebar"
									>
										<i className="bi bi-list"></i>
									</button>
								</div>
							</div>
						</div>
					</nav>
					<div className="p-3 p-md-4 bg-light-subtle flex-grow-1">{children}</div>
				</div>
			</div>
		</div>
	)
}
