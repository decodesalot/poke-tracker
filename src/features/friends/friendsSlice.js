import { createSlice } from "@reduxjs/toolkit"

const MOCK_FRIENDS = [
    {
        id: "a3f1c2d4-1111-4b5e-9c6f-111111111111",
        username: "misty",
        name: "Misty Waterflower",
        email: "misty@cerulean.gym",
        avatar: "https://i.pravatar.cc/150?img=1",
        role: "collector",
        bio: "Water-type specialist and rare card collector.",
        location: "Cerulean City",
        joinedAt: "2023-01-15T10:00:00Z",
        lastActive: "2026-03-20T14:12:00Z",
        isOnline: true,
        stats: {
            totalCards: 3,
            totalValue: 14.8,
            tradesCompleted: 12,
        },
        preferences: {
            favoriteType: "Water",
            lookingFor: ["Gyarados", "Blastoise"],
        },
        binder: [
            {
                id: "swsh1-1",
                name: "Celebi V",
                image: "https://assets.tcgdex.net/en/swsh/swsh1/1",
                set: { id: "swsh1", name: "Sword & Shield" },
                types: ["Grass"],
                rarity: "Ultra Rare",
                condition: "Near Mint",
                quantity: 1,
                pricing: { cardmarket: { avg: 4.5 } },
            },
            {
                id: "swsh1-2",
                name: "Lapras VMAX",
                image: "https://assets.tcgdex.net/en/swsh/swsh1/2",
                set: { id: "swsh1", name: "Sword & Shield" },
                types: ["Water"],
                rarity: "Ultra Rare",
                condition: "Mint",
                quantity: 1,
                pricing: { cardmarket: { avg: 8.2 } },
            },
            {
                id: "swsh2-5",
                name: "Boltund V",
                image: "https://assets.tcgdex.net/en/swsh/swsh2/5",
                set: { id: "swsh2", name: "Rebel Clash" },
                types: ["Lightning"],
                rarity: "Rare",
                condition: "Good",
                quantity: 2,
                pricing: { cardmarket: { avg: 2.1 } },
            },
        ],
    },
    {
        id: "b7e2d3f5-2222-4c6f-ad70-222222222222",
        username: "brock",
        name: "Brock Slate",
        email: "brock@pewter.gym",
        avatar: "https://i.pravatar.cc/150?img=2",
        role: "trader",
        bio: "Rock-solid trades only.",
        location: "Pewter City",
        joinedAt: "2022-11-10T08:30:00Z",
        lastActive: "2026-03-18T09:00:00Z",
        isOnline: false,
        stats: {
            totalCards: 2,
            totalValue: 3.5,
            tradesCompleted: 34,
        },
        preferences: {
            favoriteType: "Fighting",
            lookingFor: ["Onix", "Steelix"],
        },
        binder: [
            {
                id: "swsh3-10",
                name: "Conkeldurr V",
                image: "https://assets.tcgdex.net/en/swsh/swsh3/10",
                set: { id: "swsh3", name: "Darkness Ablaze" },
                types: ["Fighting"],
                rarity: "Ultra Rare",
                condition: "Near Mint",
                quantity: 1,
                pricing: { cardmarket: { avg: 3.0 } },
            },
            {
                id: "swsh3-11",
                name: "Rockruff",
                image: "https://assets.tcgdex.net/en/swsh/swsh3/11",
                set: { id: "swsh3", name: "Darkness Ablaze" },
                types: ["Fighting"],
                rarity: "Common",
                condition: "Played",
                quantity: 3,
                pricing: { cardmarket: { avg: 0.5 } },
            },
        ],
    },
    {
        id: "c9f4e5a6-3333-4d7a-be81-333333333333",
        username: "gary",
        name: "Gary Oak",
        email: "gary@pallet.town",
        avatar: "https://i.pravatar.cc/150?img=3",
        role: "owner",
        bio: "Top-tier collector. Don’t waste my time.",
        location: "Pallet Town",
        joinedAt: "2021-06-01T12:00:00Z",
        lastActive: "2026-03-25T21:45:00Z",
        isOnline: true,
        stats: {
            totalCards: 4,
            totalValue: 67.7,
            tradesCompleted: 5,
        },
        preferences: {
            favoriteType: "Fire",
            lookingFor: ["Legendary", "Promo cards"],
        },
        binder: [
            {
                id: "swsh4-25",
                name: "Charizard VMAX",
                image: "https://assets.tcgdex.net/en/swsh/swsh4/25",
                set: { id: "swsh4", name: "Vivid Voltage" },
                types: ["Fire"],
                rarity: "Ultra Rare",
                condition: "Mint",
                quantity: 1,
                pricing: { cardmarket: { avg: 42.0 } },
            },
        ],
    },

    // NEW USERS

    {
        id: "d1a2b3c4-4444-4e8b-af92-444444444444",
        username: "ash",
        name: "Ash Ketchum",
        email: "ash@pallet.town",
        avatar: "",
        role: "collector",
        bio: "Gotta collect 'em all.",
        location: "Kanto",
        joinedAt: "2023-05-20T11:00:00Z",
        lastActive: "2026-03-26T10:00:00Z",
        isOnline: true,
        stats: {
            totalCards: 2,
            totalValue: 9.0,
            tradesCompleted: 20,
        },
        preferences: {
            favoriteType: "Electric",
            lookingFor: ["Pikachu"],
        },
        binder: [
            {
                id: "swsh4-26",
                name: "Pikachu V",
                image: "https://assets.tcgdex.net/en/swsh/swsh4/26",
                set: { id: "swsh4", name: "Vivid Voltage" },
                types: ["Lightning"],
                rarity: "Ultra Rare",
                condition: "Near Mint",
                quantity: 1,
                pricing: { cardmarket: { avg: 6.5 } },
            },
        ],
    },
    {
        id: "e5f6g7h8-5555-4f9c-b0a3-555555555555",
        username: "sabrina",
        name: "Sabrina",
        email: "sabrina@saffron.gym",
        avatar: "https://i.pravatar.cc/150?img=5",
        role: "collector",
        bio: "Psychic cards only.",
        location: "Saffron City",
        joinedAt: "2022-02-14T14:00:00Z",
        lastActive: "2026-03-22T08:30:00Z",
        isOnline: false,
        stats: {
            totalCards: 1,
            totalValue: 12.0,
            tradesCompleted: 8,
        },
        preferences: {
            favoriteType: "Psychic",
            lookingFor: ["Mewtwo"],
        },
        binder: [],
    },
    {
        id: "f9g8h7i6-6666-4a0d-c1b4-666666666666",
        username: "erika",
        name: "Erika",
        email: "erika@celadon.gym",
        avatar: "",
        role: "collector",
        bio: "Grass-type enthusiast.",
        location: "Celadon City",
        joinedAt: "2024-01-01T09:00:00Z",
        lastActive: "2026-03-19T16:00:00Z",
        isOnline: false,
        stats: {
            totalCards: 2,
            totalValue: 5.5,
            tradesCompleted: 3,
        },
        preferences: {
            favoriteType: "Grass",
            lookingFor: ["Venusaur"],
        },
        binder: [],
    },
    {
        id: "z1x2c3v4-7777-4b1e-d2c5-777777777777",
        username: "lt_surge",
        name: "Lt. Surge",
        email: "surge@vermilion.gym",
        avatar: "https://i.pravatar.cc/150?img=7",
        role: "trader",
        bio: "High-voltage trades.",
        location: "Vermilion City",
        joinedAt: "2023-07-07T07:00:00Z",
        lastActive: "2026-03-23T19:00:00Z",
        isOnline: true,
        stats: {
            totalCards: 0,
            totalValue: 0,
            tradesCompleted: 50,
        },
        preferences: {
            favoriteType: "Lightning",
            lookingFor: ["Raichu"],
        },
        binder: [],
    },
];

const friendsSlice = createSlice({
    name: "friends",
    initialState: {
        friends: MOCK_FRIENDS,
    },
    reducers: {
        addFriend: (state, action) => {
            if (!state.friends.some((f) => f.id === action.payload.id)) {
                state.friends.push(action.payload)
            }
        },

        removeFriend: (state, action) => {
            state.friends = state.friends.filter((f) => f.id !== action.payload)
        },
    },
})

export const { addFriend, removeFriend } = friendsSlice.actions

export const selectFriends = (state) => state.friends.friends
export const selectFriendById = (id) => (state) => state.friends.friends.find((f) => f.id === id)

export default friendsSlice.reducer
