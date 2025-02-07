import { create } from "zustand";

export const useAccountStore = create((set)=> ({
    registerAccount: async (newAccount) => {
		if (!newAccount.username || !newAccount.email || !newAccount.password) {
			return { success: false, message: "Please fill in all fields." };
		}
		const res = await fetch("/api/accounts/register", {
			method: "POST",
            headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newAccount),
		});

        const data = await res.json();
		if (!data.success) return { success: data.success, message: data.message };

		return { success: true, message: "Account created successfully" };
    },

    loginAccount: async (newAccount) => {
		if (!newAccount.email || !newAccount.password) {
			return { success: false, message: "Please fill in all fields." };
		}
		const res = await fetch("/api/accounts/login", {
			method: "POST",
            headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newAccount),
		});
        const data = await res.json();
		if (!data.success) return { success: data.success, message: data.message };

		return { success: true, message: "Logged in Succesfully" };
    },

	logoutAccount: async () => {
		const res = await fetch ("/api/accounts/logout", {
			method: "POST",
            headers: {
				"Content-Type": "application/json",
			},
		});
		const data = await res.json();
		if (!data.success) return { success: data.success, message: data.message };

		return { success: true, message: "Logged out Succesfully" };
	},

	refreshTokens: async (account) => {
		await fetch("/api/accounts/protected");
	},	
}));