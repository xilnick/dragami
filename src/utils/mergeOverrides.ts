import type { Data } from "@measured/puck";

export function mergeOverrides(
	data: Data,
	overrides: Record<string, any>,
): Data {
	if (!overrides || Object.keys(overrides).length === 0) return data;

	const newData = JSON.parse(JSON.stringify(data));

	const applyToItems = (items: any[]) => {
		for (let i = 0; i < items.length; i++) {
			const id = items[i].props?.id;
			if (id && overrides[id]) {
				items[i].props = { ...items[i].props, ...overrides[id] };
			}
		}
	};

	if (newData.content) applyToItems(newData.content);
	if (newData.zones) {
		for (const zone in newData.zones) {
			applyToItems(newData.zones[zone]);
		}
	}

	return newData;
}
