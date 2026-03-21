import { create } from "zustand";

interface LiveContentState {
	overrides: Record<string, Record<string, any>>;
	setOverride: (id: string, key: string, value: any) => void;
	clearOverrides: () => void;
}

export const useLiveContentStore = create<LiveContentState>((set) => ({
	overrides: {},
	setOverride: (id, key, value) =>
		set((state) => ({
			overrides: {
				...state.overrides,
				[id]: {
					...(state.overrides[id] || {}),
					[key]: value,
				},
			},
		})),
	clearOverrides: () => set({ overrides: {} }),
}));
