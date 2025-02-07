import { create } from "zustand";

export const useAdvertStore = create((set) => ({
	adverts: [],
	setAdverts: (adverts) => set({ adverts }),
	createAdvert: async (newAdvert) => {
		if (!newAdvert.name || !newAdvert.image || !newAdvert.price || !newAdvert.category) {
			return { success: false, message: "Please fill in all fields." };
		}
		const res = await fetch("/api/adverts", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newAdvert),
		});
		const data = await res.json();
		set((state) => ({ adverts: [...state.adverts, data.data] }));
		return { success: true, message: "Advert created successfully" };
	},
	fetchAdverts: async () => {
		const res = await fetch("/api/adverts");
		const data = await res.json();
		set({ adverts: data.data });
	},
	searchAdverts: async (advertParams) => {
		const res = await fetch ("/api/adverts/search", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(advertParams),
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		set({ adverts: data.data});
		return { success: true, message: data.message };
	},
	deleteAdvert: async (pid) => {
		const res = await fetch(`/api/adverts/${pid}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({ adverts: state.adverts.filter((advert) => advert._id !== pid) }));
		return { success: true, message: data.message };
	},
	updateAdvert: async (pid, updatedAdvert) => {
		if (!updatedAdvert.name || !updatedAdvert.image || !updatedAdvert.price || !updatedAdvert.category) {
			return { success: false, message: "Please fill in all fields." };
		}
		const res = await fetch(`/api/adverts/${pid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedAdvert),
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({
			adverts: state.adverts.map((advert) => (advert._id === pid ? data.data : advert)),
		}));

		return { success: true, message: data.message };
	},
}));
