import type { Data } from "@measured/puck";

export function parseHtmlToPuck(html: string): Data {
	const parser = new DOMParser();
	const doc = parser.parseFromString(html, "text/html");

	const data: Data = {
		content: [],
		root: {},
		zones: {},
	};

	let idCounter = 0;
	const generateId = () => `imported-${idCounter++}`;

	const processNode = (node: Element) => {
		if (node.tagName === "IMG") {
			data.content.push({
				type: "Image",
				props: {
					id: generateId(),
					src: (node as HTMLImageElement).src,
					alt: (node as HTMLImageElement).alt || "Imported image",
					width: 100,
					align: "center",
					padding: 10,
				},
			});
		} else if (
			node.tagName === "A" &&
			(node.classList.contains("button") ||
				(node.getAttribute("style") || "").includes("background"))
		) {
			data.content.push({
				type: "CTAButton",
				props: {
					id: generateId(),
					text: node.textContent || "Button",
					link: (node as HTMLAnchorElement).href,
					bgColor: "#007bff",
					textColor: "#ffffff",
					borderRadius: 4,
					padding: 15,
					align: "center",
				},
			});
		} else if (node.tagName === "DIV" || node.tagName === "SECTION") {
			// Just extract inner content for now to avoid complex nesting
			Array.from(node.children).forEach(processNode);
		} else if (node.tagName === "HR") {
			data.content.push({
				type: "Divider",
				props: {
					id: generateId(),
					color: "#cccccc",
					thickness: 1,
					padding: 10,
				},
			});
		} else {
			// Treat as text block if it has text content
			if (node.textContent?.trim()) {
				data.content.push({
					type: "TextBlock",
					props: {
						id: generateId(),
						content: node.outerHTML,
						color: "#333333",
						fontSize: 16,
						align: "left",
						padding: 10,
					},
				});
			}
		}
	};

	Array.from(doc.body.children).forEach(processNode);

	return data;
}
