const STORAGE_KEY = "poke-tracker"
const PERSIST_KEYS = ["user", "binder"]

export function loadState() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY)
		return raw ? JSON.parse(raw) : undefined
	} catch {
		return undefined
	}
}

export function saveState(state) {
	try {
		const partial = Object.fromEntries(PERSIST_KEYS.map((key) => [key, state[key]]))
		localStorage.setItem(STORAGE_KEY, JSON.stringify(partial))
	} catch {
		console.error("failed saving state in local storage")
	}
}
