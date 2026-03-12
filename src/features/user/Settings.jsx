import { useSelector } from "react-redux"
import { selectUser } from "@features/user/userSlice"
import { ROLES } from "@constants/roles"
import { Card } from '@shared/components'

export default function Settings() {
    const user = useSelector(selectUser)
    return (
        <div>
            <h1>Settings</h1>
            <p className="text-muted fs-5 mb-0">Manage your preferences and data</p>
            <div className="row mt-4 row-cols-1 g-4">
                <div className="col">
                    <Card
                        title="Profile"
                        children={<>
                            <form>
                                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
                                    <div className="col">
                                        <label className="form-label">Display Name</label>
                                        <input type="text" className="form-control" name="name" value={user.name} />
                                    </div>
                                    <div className="col">
                                        <label className="form-label">Role</label>
                                        <select class="form-select" name="role" value={user.role} aria-label="User Role" disabled>
                                            {ROLES.map(role => <option key={role.id} value={role.type}>{role.label}</option>)}
                                        </select>
                                        <p class="text-muted small mt-3 mb-0"><i class="bi bi-info-circle me-1"></i>Contact management to update your role</p>
                                    </div>
                                </div>
                            </form>
                        </>}
                    />
                </div>
                <div className="col">
                    <Card
                        title="Display Preferences"
                        children={<>
                            <form>
                                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
                                    <div className="col">
                                        <label className="form-label">Languages</label>
                                        <select class="form-select" name="languages" value={user.languages} aria-label="Languages">
                                            <option value="english">English</option>
                                            <option value="spanish">Spanish</option>
                                            <option value="japenese">Japenese</option>
                                            <option value="french">French</option>
                                        </select>
                                    </div>
                                    <div className="col">
                                        <label className="form-label">Binder Default View</label>
                                        <select class="form-select" name="binder-view" aria-label="Languages">
                                            <option value="grid">Grid</option>
                                            <option value="table">Table</option>
                                        </select>
                                    </div>
                                    <div className="col">
                                        <label className="form-label">Search Default View</label>
                                        <select class="form-select" name="search-view" aria-label="Search Default View">
                                            <option value="grid">Grid</option>
                                            <option value="table">Table</option>
                                        </select>
                                    </div>
                                    <div className="col">
                                        <label className="form-label">Theme</label>
                                        <select class="form-select" name="search-view" aria-label="Theme">
                                            <option value="grid">Light</option>
                                            <option value="table">Dark</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </>}
                    />
                </div>
                <div className="col">
                    <Card
                        title="Data Management"
                        children={<>
                            <form>
                                <div className="row row-cols-4 g-4">
                                    <div className="col">
                                        <label className="form-label">Currency</label>
                                        <select class="form-select" name="currency" value={user.currency} aria-label="Currency">
                                            <option value="USD">USD ($)</option>
                                            <option value="EUR">EUR (€)</option>
                                            <option value="GBP">GBP (£)</option>
                                            <option value="JPY">JPY (¥)</option>
                                        </select>
                                    </div>
                                    <div className="col">
                                        <label className="form-label">Market</label>
                                        <select class="form-select" name="binder-view" value={user.market} aria-label="Market">
                                            <option value="all">View All</option>
                                            <option value="tcgplayer">TCGPlayer (US)</option>
                                            <option value="cardmarket">Cardmarket (EU)</option>
                                            <option value="ebay">eBay (Recent Sales)</option>
                                            <option value="pwcc">PWCC (Vault/Auction)</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </>}
                    />
                </div>
            </div>
        </div>
    )
}