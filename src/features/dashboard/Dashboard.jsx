import { useSelector } from "react-redux"
import { selectUser } from "@features/user/userSlice"

export default function Dashboard() {
	const user = useSelector(selectUser)
	return (
		<>
			<h1>Dashboard</h1>
			<p className="text-muted fs-5 mb-0">Welcome, {user.name}</p>
		</>
	)
}
