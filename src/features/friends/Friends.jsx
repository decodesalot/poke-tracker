import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { selectFriends } from "./friendsSlice"
import { Card } from "@shared/components"

export default function Friends() {
	const navigate = useNavigate()
	const friends = useSelector(selectFriends)

	return (
		<>
			<h1>Friends</h1>
			<p className="text-muted fs-5 mb-4">View and manage your friends</p>
			<div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 g-4">
				{friends.map((f, idx) => (
					<div key={f.name + idx} className="col">
						<Card title className="card-profile card-profile-md">
							<span className="badge bg-secondary text-capitalize position-absolute top-0 end-0 mt-2 me-2">
								{f.role}
							</span>
							<div className="d-flex align-items-center gap-3 cover">
								<div className="avatar-md border border-4 rounded border-white d-flex align-items-center justify-content-center">
									{f.avatar ? (
										<img src={f.avatar} alt={f.name} className="img-fluid" />
									) : (
										<i className="bi bi-person"></i>
									)}
								</div>
								<div>
									<h3 className="h5 mt-4 mb-0">{f.name}</h3>
									<p className="text-muted mb-0">
										{f.binder.length} {f.binder.length === 1 ? "card" : "cards"} in collection
									</p>
								</div>
							</div>
							<button
								className="btn btn-light w-100 mt-3"
								onClick={() => navigate(`/profile/${f.id}`)}
							>
								View Profile
							</button>
						</Card>
					</div>
				))}
			</div>
		</>
	)
}
