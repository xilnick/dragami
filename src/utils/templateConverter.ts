import type { Data } from "@measured/puck";
import { parseHtmlToPuck } from "./htmlToPuck";

export interface UnifiedTemplate {
	id: string;
	name: string;
	createdAt: string;
	updatedAt: string;
	type: "email" | "web";
	content: Data;
}

export function htmlToUnified(
	html: string,
	name: string = "Imported HTML",
): UnifiedTemplate {
	return {
		id: crypto.randomUUID(),
		name,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		type: "email",
		content: parseHtmlToPuck(html),
	};
}

export function mosaicoToUnified(
	mosaicoJson: any,
	name: string = "Imported Mosaico",
): UnifiedTemplate {
	const data: Data = {
		content: [],
		root: {},
		zones: {},
	};

	let idCounter = 0;
	const generateId = () => `mosaico-${idCounter++}`;

	// Process preheader
	if (mosaicoJson.preheaderBlock) {
		data.content.push({
			type: "PreheaderBlock",
			props: {
				id: generateId(),
				preheaderText: mosaicoJson.preheaderBlock.preheaderText || "",
				webversionText:
					mosaicoJson.preheaderBlock.webversionText || "View in your browser",
			},
		});
	}

	// Process main blocks
	if (mosaicoJson.mainBlocks && Array.isArray(mosaicoJson.mainBlocks.blocks)) {
		mosaicoJson.mainBlocks.blocks.forEach((block: any) => {
			switch (block.type) {
				case "logoBlock":
					data.content.push({
						type: "LogoBlock",
						props: {
							id: generateId(),
							src: block.image?.src || "https://picsum.photos/seed/logo/200/50",
							alt: block.image?.alt || "Logo",
							width: parseInt(block.imageWidth, 10) || 200,
							align: "center",
							bgColor: block.backgroundColor || "#ffffff",
						},
					});
					break;
				case "bigSocialBlock":
				case "socialBlock":
					data.content.push({
						type: "SocialBlock",
						props: {
							id: generateId(),
							align: "center",
							iconSize: parseInt(block.bigSocialIconSize, 10) || 32,
							bgColor: block.backgroundColor || "#ffffff",
							facebook: block.fbUrl || "https://facebook.com",
							twitter: block.twUrl || "https://twitter.com",
							instagram: block.instUrl || "https://instagram.com",
							linkedin: block.inUrl || "https://linkedin.com",
						},
					});
					break;
				case "sideArticleBlock":
					data.content.push({
						type: "SideArticleBlock",
						props: {
							id: generateId(),
							title: block.titleText || "Article Title",
							content: block.longText || "<p>Article content</p>",
							imageSrc:
								block.image?.src ||
								"https://picsum.photos/seed/article/300/200",
							imageAlt: block.image?.alt || "Article image",
							buttonText: block.buttonLink?.text || "Read More",
							buttonLink: block.buttonLink?.url || "#",
							imagePosition: block.imagePos || "left",
							bgColor: block.backgroundColor || "#ffffff",
						},
					});
					break;
				case "singleArticleBlock":
				case "articleBlock":
					data.content.push({
						type: "SingleArticleBlock",
						props: {
							id: generateId(),
							title: block.titleText || "Article Title",
							content: block.longText || "<p>Article content</p>",
							imageSrc:
								block.image?.src ||
								"https://picsum.photos/seed/article/600/300",
							imageAlt: block.image?.alt || "Article image",
							buttonText: block.buttonLink?.text || "Read More",
							buttonLink: block.buttonLink?.url || "#",
							bgColor: block.backgroundColor || "#ffffff",
						},
					});
					break;
				case "titleBlock":
					data.content.push({
						type: "TitleBlock",
						props: {
							id: generateId(),
							title: block.titleText || "Title",
							subtitle: block.subtitleText || "",
							align: "center",
							bgColor: block.backgroundColor || "#ffffff",
						},
					});
					break;
				case "textBlock":
					data.content.push({
						type: "TextBlock",
						props: {
							id: generateId(),
							content: block.longText || "<p>Text content</p>",
							align: "left",
							padding: 20,
						},
					});
					break;
				case "imageBlock":
					data.content.push({
						type: "Image",
						props: {
							id: generateId(),
							src:
								block.image?.src || "https://picsum.photos/seed/image/600/300",
							alt: block.image?.alt || "Image",
							width: 600,
							align: "center",
							padding: 0,
						},
					});
					break;
				case "spacerBlock":
					data.content.push({
						type: "SpacerBlock",
						props: {
							id: generateId(),
							height: parseInt(block.height, 10) || 20,
							bgColor: block.backgroundColor || "transparent",
						},
					});
					break;
				case "dividerBlock":
					data.content.push({
						type: "Divider",
						props: {
							id: generateId(),
							color: block.hrStyle?.color || "#cccccc",
							thickness: parseInt(block.hrStyle?.hrHeight, 10) || 1,
							padding: 20,
						},
					});
					break;
				default:
					// Fallback for unknown blocks
					console.warn(`Unknown Mosaico block type: ${block.type}`);
					break;
			}
		});
	}

	// Process footer
	if (mosaicoJson.footerBlock) {
		data.content.push({
			type: "FooterBlock",
			props: {
				id: generateId(),
				content: mosaicoJson.footerBlock.longText || "<p>Footer content</p>",
				unsubscribeText:
					mosaicoJson.footerBlock.disiscrivitiText || "Unsubscribe",
				bgColor: mosaicoJson.footerBlock.backgroundColor || "#333333",
				textColor: "#ffffff",
			},
		});
	}

	return {
		id: crypto.randomUUID(),
		name,
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString(),
		type: "email",
		content: data,
	};
}
