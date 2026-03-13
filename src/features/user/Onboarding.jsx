import { useState } from "react"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ROLES } from "@constants/roles"
import { setOnboarded } from "@features/user/userSlice"
import { Card } from '@shared/components'

export default function Onboarding() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [step, setStep] = useState(1)
    const [formData, setFormData] = useState({
        name: 'Ash Ketchum',
        role: 'collector',
        market: 'tcgplayer',
        currency: 'USD'
    })

    const updateField = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleFormSubmission = (e) => {
        e.preventDefault()
        dispatch(setOnboarded(formData))
        navigate('/')
    }

    return (
        <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <Card className="onboarding" children={<>
                            <div className="mb-4">
                                <div className="d-flex justify-content-between mb-2">
                                    <small className="text-muted">Step {step} of 3</small>
                                    <small className="text-muted">{Math.round((step / 3) * 100)}%</small>
                                </div>
                                <div className="progress" style={{ height: '6px' }}>
                                    <div className="progress-bar bg-success" style={{ width: `${(step / 3) * 100}%` }}></div>
                                </div>
                            </div>
                            {step === 1 && (
                                <div className="text-center">
                                    <i className="bi bi-lightning-charge-fill text-warning fs-4 mb-3 bg-light rounded-circle d-inline-block px-4 py-3"></i>
                                    <h2 className="mb-3">Welcome to PokeTracker!</h2>
                                    <p className="text-muted mb-5">
                                        The ultimate Pokemon card collection manager. Track your cards, connect with friends, and build your dream collection.
                                    </p>
                                    <div className="row g-3 gy-4 text-start mb-4">
                                        <div className="col-12">
                                            <div className="d-flex gap-3 align-items-start">
                                                <div className="bg-primary bg-opacity-10 p-3 py-2 rounded">
                                                    <i className="bi bi-search fs-4 text-primary"></i>
                                                </div>
                                                <div>
                                                    <h6 className="mb-1">Search & Discover</h6>
                                                    <small className="text-muted">Browse thousands of Pokemon cards from all sets</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="d-flex gap-3 align-items-start">
                                                <div className="bg-success bg-opacity-10 p-3 py-2 rounded">
                                                    <i className="bi bi-book fs-4 text-success"></i>
                                                </div>
                                                <div>
                                                    <h6 className="mb-1">Manage Your Binder</h6>
                                                    <small className="text-muted">Track quantities, values, and organize your collection</small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="d-flex gap-3 align-items-start">
                                                <div className="bg-warning bg-opacity-10 p-3 py-2 rounded">
                                                    <i className="bi bi-people fs-4 text-warning"></i>
                                                </div>
                                                <div>
                                                    <h6 className="mb-1">Connect with Friends</h6>
                                                    <small className="text-muted">View friends' collections and discover new cards</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="btn btn-primary btn-lg w-100 mt-4" onClick={() => setStep(2)}>
                                        Get Started
                                        <i className="bi bi-arrow-right ms-2"></i>
                                    </button>
                                </div>
                            )}
                            {step === 2 && (
                                <div className="animate-fade-in">
                                    <div className="text-center mb-4">
                                        <h3>Profile Setup</h3>
                                        <p className="text-muted">Configure your data preferences for real-time analytics.</p>
                                    </div>
                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Enter your name or store name"
                                            value={formData.name}
                                            onChange={(e) => updateField('name', e.target.value)}
                                            autoFocus
                                        />
                                        <label className="form-label fw-medium">Trainer Identity</label>
                                    </div>
                                    <p className="text-muted small mt-2 mb-3"><i className="bi bi-info-circle me-1"></i>This will be the name displayed on your dashboard.</p>
                                    <div className="row g-3 mb-5">
                                        <div className="col-md-12">
                                            <div className="form-floating">
                                                <select
                                                    className="form-select"
                                                    value={formData.market}
                                                    onChange={(e) => updateField('market', e.target.value)}
                                                >
                                                    <option value="tcgplayer">TCGPlayer (US)</option>
                                                    <option value="cardmarket">Cardmarket (EU)</option>
                                                    <option value="ebay">eBay (Recent Sales)</option>
                                                    <option value="pwcc">PWCC (Vault/Auction)</option>
                                                </select>
                                                <label className="form-label fw-medium">Primary Market</label>
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-floating">
                                                <select
                                                    className="form-select"
                                                    value={formData.currency}
                                                    onChange={(e) => updateField('currency', e.target.value)}
                                                >
                                                    <option value="USD">USD ($)</option>
                                                    <option value="EUR">EUR (€)</option>
                                                    <option value="GBP">GBP (£)</option>
                                                    <option value="JPY">JPY (¥)</option>
                                                </select>
                                                <label className="form-label fw-medium">Display Currency</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="d-flex gap-2">
                                        <button className="btn btn-outline-secondary btn-lg flex-grow-1" onClick={() => setStep(1)}>
                                            Back
                                        </button>
                                        <button
                                            className="btn btn-primary btn-lg flex-grow-1"
                                            onClick={() => setStep(3)}
                                            disabled={!formData.name.trim()}
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            )}
                            {step === 3 && (
                                <div>
                                    <div className="text-center mb-4">
                                        <h3 className="mb-2">Choose your role</h3>
                                        <p className="text-muted">You can change this later in settings</p>
                                    </div>
                                    <div className="d-grid gap-3 mb-5">
                                        {ROLES.map(({ id, type, label, icon, description }) =>
                                            <div
                                                key={id}
                                                role="button"
                                                tabIndex="0"
                                                className={`card ${type === formData.role ? 'border-primary' : ''}`}
                                                onClick={() => updateField('role', type)}
                                            >
                                                <div className="card-body p-3">
                                                    <div className="d-flex align-items-center gap-3">
                                                        <div className="bg-primary bg-opacity-10 p-3 py-2 rounded">
                                                            <i className={`bi ${icon} fs-4 text-primary`}></i>
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <h6 className="mb-1">{label}</h6>
                                                            <small className="text-muted">{description}</small>
                                                        </div>
                                                        {type === formData.role && (
                                                            <i className="bi bi-check-circle-fill text-primary fs-5"></i>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="d-flex gap-2">
                                        <button className="btn btn-outline-secondary btn-lg flex-grow-1" onClick={() => setStep(2)}>
                                            Back
                                        </button>
                                        <button className="btn btn-primary btn-lg flex-grow-1" onClick={handleFormSubmission}>
                                            Complete Setup
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>} />
                    </div>
                </div>
            </div>
        </div>
    )
}
