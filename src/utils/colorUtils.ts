export function getContrastColor(hexColor: string): string {
	if (!hexColor) return "#000000";

	// Remove hash if present
	const hex = hexColor.replace("#", "");

	// Handle shorthand hex (e.g., #fff)
	const fullHex =
		hex.length === 3
			? hex
					.split("")
					.map((char) => char + char)
					.join("")
			: hex;

	// Parse RGB
	const r = parseInt(fullHex.substr(0, 2), 16);
	const g = parseInt(fullHex.substr(2, 2), 16);
	const b = parseInt(fullHex.substr(4, 2), 16);

	// If parsing failed, return black
	if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) return "#000000";

	// Calculate relative luminance
	// Using the sRGB luminance formula: 0.2126 * R + 0.7152 * G + 0.0722 * B
	// where RGB values are normalized and gamma-corrected
	const rsRGB = r / 255;
	const gsRGB = g / 255;
	const bsRGB = b / 255;

	const rL =
		rsRGB <= 0.03928 ? rsRGB / 12.92 : ((rsRGB + 0.055) / 1.055) ** 2.4;
	const gL =
		gsRGB <= 0.03928 ? gsRGB / 12.92 : ((gsRGB + 0.055) / 1.055) ** 2.4;
	const bL =
		bsRGB <= 0.03928 ? bsRGB / 12.92 : ((bsRGB + 0.055) / 1.055) ** 2.4;

	const luminance = 0.2126 * rL + 0.7152 * gL + 0.0722 * bL;

	// Return black for light backgrounds, white for dark backgrounds
	return luminance > 0.179 ? "#000000" : "#ffffff";
}
