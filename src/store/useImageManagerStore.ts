import { create } from "zustand";

interface ImageManagerStore {
	isOpen: boolean;
	currentId: string | null;
	currentField: string | null;
	currentValue: string;
	openManager: (id: string, field: string, currentValue: string) => void;
	closeManager: () => void;
}

export const useImageManagerStore = create<ImageManagerStore>((set) => ({
	isOpen: false,
	currentId: null,
	currentField: null,
	currentValue: "",
	openManager: (id, field, currentValue) =>
		set({ isOpen: true, currentId: id, currentField: field, currentValue }),
	closeManager: () =>
		set({
			isOpen: false,
			currentId: null,
			currentField: null,
			currentValue: "",
		}),
}));
