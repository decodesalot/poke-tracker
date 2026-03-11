import { useSelector } from "react-redux"
import { selectUser } from "@features/user/userSlice"

export default function Dashboard() {
    const user = useSelector(selectUser)
    return (
        <>
            <h1>Dashboard</h1>
            <h2 className="mt-4">Welcome, {user.name}</h2>
        </>
    )
}