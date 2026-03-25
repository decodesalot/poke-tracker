import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { selectUser } from "@features/user/userSlice"
import { Card } from "@shared/components"

export default function Profile() {
    const { id } = useParams()
    const user = useSelector(selectUser)

    const isCurrentUser = user.id === id

    return (
        <div>
            <div className="row">
                <div className="col">
                    <Card title={true} className="mt-4 card-profile">
                        <div className="d-flex align-items-center justify-content-between cover">
                            <div className="d-flex align-items-center gap-3 flex-fill">
                                <div className="avatar-lg border border-4 rounded border-white d-flex align-items-center justify-content-center">
                                    <i className="bi bi-person text-white"></i>
                                </div>
                                <div>
                                    <h1 className="mb-0 h3">{user.name}</h1>
                                    <p className="text-muted mb-0">{user.email}</p>
                                </div>
                                <div className="text-end flex-fill">
                                    {isCurrentUser ? <button className="btn btn-primary mt-4"><i className="bi bi-pencil"></i> Edit Profile</button> : <button className="btn btn-primary"><i className="bi bi-person-plus"></i> Add Friend</button> }
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}
