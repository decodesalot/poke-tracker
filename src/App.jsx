import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUser } from "@features/user/userSlice"
import { Layout } from "@shared/components"
import "bootstrap/dist/js/bootstrap.bundle.min.js"

const Onboarding = lazy(() => import("@features/user/Onboarding"))
const Settings = lazy(() => import("@features/user/Settings"))
const Binder = lazy(() => import("@features/binder/Binder"))
const Dashboard = lazy(() => import("@features/dashboard/Dashboard"))
const Search = lazy(() => import("@features/search/Search"))
const CardDetail = lazy(() => import("@features/cards/CardDetail"))

function ProtectedLayout() {
	const user = useSelector(selectUser)

	if (!user) return null

	if (!user.onboarded) {
		return <Navigate to="/onboarding" replace />
	}

	return (
		<Layout>
			<Suspense
				fallback={
					<div
						className="d-flex justify-content-center align-items-center"
						style={{ minHeight: "400px" }}
					>
						<div className="spinner-border text-primary"></div>
					</div>
				}
			>
				<Outlet />
			</Suspense>
		</Layout>
	)
}

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/onboarding" element={<Onboarding />} />
				<Route element={<ProtectedLayout />}>
					<Route path="/" element={<Dashboard />} />
					<Route path="/settings" element={<Settings />} />
					<Route path="/search" element={<Search />} />
					<Route path="/binder" element={<Binder />} />
					<Route path="/card/:id" element={<CardDetail />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
