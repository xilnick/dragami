import type { Data } from "@measured/puck";
import { create } from "zustand";

interface BuilderState {
	emailData: Data;
	webData: Data;
	setEmailData: (data: Data) => void;
	setWebData: (data: Data) => void;
	clearEmailData: () => void;
	clearWebData: () => void;
}

const initialData: Data = {
	content: [],
	root: {},
	zones: {},
};

export const useBuilderStore = create<BuilderState>()((set) => ({
	emailData: initialData,
	webData: initialData,
	setEmailData: (data) => set({ emailData: data }),
	setWebData: (data) => set({ webData: data }),
	clearEmailData: () => set({ emailData: initialData }),
	clearWebData: () => set({ webData: initialData }),
}));
