import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectUser, updateSettings } from "@features/user/userSlice"
import { ROLES } from "@constants/roles"
import { Card } from "@shared/components"

export default function Settings() {
	const user = useSelector(selectUser)
	const dispatch = useDispatch()
	const [name, setName] = useState(user.name)

	return (
		<div>
			<h1>Settings</h1>
			<p className="text-muted fs-5 mb-0">Manage your preferences and data</p>
			<div className="row mt-4 row-cols-1 g-4">
				<div className="col">
					<Card title="Profile">
						<div className="row row-cols-1 row-cols-md-2 row-cols-lg-4">
							<div className="col">
								<label className="form-label">Display Name</label>
								<input
									type="text"
									className="form-control"
									value={name}
									onChange={(e) => setName(e.target.value)}
									onBlur={() => dispatch(updateSettings({ name }))}
								/>
							</div>
							<div className="col">
								<label className="form-label">Role</label>
								<select
									className="form-select"
									value={user.role}
									aria-label="User Role"
									onChange={(e) => dispatch(updateSettings({ role: e.target.value }))}
								>
									{ROLES.map((role) => (
										<option key={role.id} value={role.type}>
											{role.label}
										</option>
									))}
								</select>
							</div>
						</div>
					</Card>
				</div>
				<div className="col">
					<Card title="Display Preferences">
						<div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
							<div className="col">
								<label className="form-label">Theme</label>
								<select
									className="form-select"
									value={user.theme}
									aria-label="Theme"
									onChange={(e) => dispatch(updateSettings({ theme: e.target.value }))}
								>
									<option value="light">Light</option>
									<option value="dark">Dark</option>
								</select>
							</div>
							<div className="col">
								<label className="form-label">Language</label>
								<select
									className="form-select"
									value={user.language}
									aria-label="Language"
									onChange={(e) => dispatch(updateSettings({ language: e.target.value }))}
								>
									<option value="english">English</option>
									<option value="spanish">Spanish</option>
									<option value="japanese">Japanese</option>
									<option value="french">French</option>
								</select>
							</div>
						</div>
					</Card>
				</div>
				<div className="col">
					<Card title="Data Management">
						<div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
							<div className="col">
								<label className="form-label">Currency</label>
								<select
									className="form-select"
									value={user.currency}
									aria-label="Currency"
									onChange={(e) => dispatch(updateSettings({ currency: e.target.value }))}
								>
									<option value="USD">USD ($)</option>
									<option value="EUR">EUR (€)</option>
									<option value="GBP">GBP (£)</option>
									<option value="JPY">JPY (¥)</option>
								</select>
							</div>
							<div className="col">
								<label className="form-label">Market</label>
								<select
									className="form-select"
									value={user.market}
									aria-label="Market"
									onChange={(e) => dispatch(updateSettings({ market: e.target.value }))}
								>
									<option value="tcgplayer">TCGPlayer (US)</option>
									<option value="cardmarket">Cardmarket (EU)</option>
									<option value="ebay">eBay (Recent Sales)</option>
									<option value="pwcc">PWCC (Vault/Auction)</option>
								</select>
							</div>
						</div>
					</Card>
				</div>
			</div>
		</div>
	)
}
