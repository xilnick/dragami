import type { Config } from "@measured/puck";
import { ArticleBlocks } from "../blocks/ArticleBlocks";
import { ContentBlocks } from "../blocks/ContentBlocks";
import { FrameBlocks } from "../blocks/FrameBlocks";
import { LayoutBlocks } from "../blocks/LayoutBlocks";
import { MediaBlocks } from "../blocks/MediaBlocks";
import { PresetBlocks } from "../blocks/PresetBlocks";

export type UnifiedProps = {
	Section: { backgroundColor: string; padding: number };
	Columns: {
		columnCount: number;
		gutter: number;
		backgroundColor: string;
		padding: number;
	};
	HeroLayout: {
		bgImage: string;
		bgColor: string;
		padding: number;
		minHeight: number;
	};
	TextBlock: {
		content: string;
		color: string;
		fontSize: number;
		align: "left" | "center" | "right";
		padding: number;
		lineHeight: number;
		letterSpacing: number;
		fontFamily: string;
	};
	Image: {
		src: string;
		alt: string;
		width: number;
		link: string;
		align: "left" | "center" | "right";
		padding: number;
		borderRadius: number;
		caption: string;
	};
	CTAButton: {
		text: string;
		link: string;
		bgColor: string;
		borderRadius: number;
		padding: number;
		align: "left" | "center" | "right";
	};
	Divider: { color: string; thickness: number; padding: number };
	RawHTML: { html: string; padding: number };
	ConversationBlock: {
		messages: { role: "user" | "agent"; text: string }[];
		userColor: string;
		agentColor: string;
		padding: number;
	};
	LegalPreviewBlock: {
		imageSrc: string;
		altText: string;
		legalText: string;
		padding: number;
	};
	RatingBlock: {
		question: string;
		scale: "5" | "10";
		color: string;
		bgColor: string;
		padding: number;
	};

	// New Content Blocks
	LogoBlock: {
		src: string;
		alt: string;
		width: "S" | "M" | "L";
		link: string;
		transparentBg: boolean;
		align: "left" | "center" | "right";
		padding: number;
	};
	TitleBlock: {
		text: string;
		color: string;
		fontSize: number;
		align: "left" | "center" | "right";
		padding: number;
	};
	SingleArticleBlock: {
		imageSrc: string;
		imageWidth: "S" | "M" | "L" | "Full";
		title: string;
		text: string;
		buttonText: string;
		buttonLink: string;
		buttonBgColor: string;
		padding: number;
	};
	SideArticleBlock: {
		imageSrc: string;
		imagePos: "left" | "right";
		imageWidth: "S" | "M" | "L";
		title: string;
		text: string;
		buttonText: string;
		buttonLink: string;
		buttonBgColor: string;
		padding: number;
	};
	DoubleArticleBlock: { padding: number };
	TripleArticleBlock: { padding: number };
	DoubleImageBlock: {
		img1Src: string;
		img1Link: string;
		img2Src: string;
		img2Link: string;
		gutterVisible: boolean;
		fixedHeight: number;
		padding: number;
	};
	TripleImageBlock: {
		img1Src: string;
		img1Link: string;
		img2Src: string;
		img2Link: string;
		img3Src: string;
		img3Link: string;
		gutterVisible: boolean;
		fixedHeight: number;
		padding: number;
	};
	SpacerBlock: { size: number; transparentBg: boolean };

	// Frame Blocks
	SocialBlock: {
		iconType: "bw" | "colors";
		networks: string;
		align: "left" | "center" | "right";
		padding: number;
	};
	FooterBlock: { content: string; padding: number };
	PreheaderBlock: {
		previewText: string;
		webVersionLink: string;
		unsubscribeLink: string;
		padding: number;
	};

	// High-Level Presets
	EventInvitePreset: {
		eventName: string;
		date: string;
		time: string;
		location: string;
		description: string;
		buttonText: string;
		buttonLink: string;
		buttonBgColor: string;
		bgColor: string;
		padding: number;
	};
	PromoBannerPreset: {
		title: string;
		subtitle: string;
		discount: string;
		buttonText: string;
		buttonLink: string;
		bgColor: string;
		textColor: string;
		padding: number;
	};
	TestimonialPreset: {
		quote: string;
		authorName: string;
		authorRole: string;
		avatarSrc: string;
		rating: number;
		bgColor: string;
		padding: number;
	};
	FeatureAnnouncementPreset: {
		badgeText: string;
		title: string;
		description: string;
		imageSrc: string;
		buttonText: string;
		buttonLink: string;
		buttonBgColor: string;
		bgColor: string;
		padding: number;
	};
	GamifiedPopupPreset: {
		title: string;
		subtitle: string;
		buttonText: string;
		bgColor: string;
		textColor: string;
		padding: number;
	};

	// Web Only
	Video?: { src: string; width: number; padding: number };
	CountdownTimer?: {
		endDate: string;
		color: string;
		bgColor: string;
		padding: number;
	};
};

const commonComponentsList: (keyof UnifiedProps)[] = [
	"Section",
	"Columns",
	"SpacerBlock",
	"TitleBlock",
	"TextBlock",
	"Image",
	"LogoBlock",
	"DoubleImageBlock",
	"TripleImageBlock",
	"CTAButton",
	"Divider",
	"RawHTML",
	"PreheaderBlock",
	"FooterBlock",
	"SocialBlock",
	"LegalPreviewBlock",
	"RatingBlock",
	"CountdownTimer",
];

const emailPresetsList: (keyof UnifiedProps)[] = [
	"SingleArticleBlock",
	"SideArticleBlock",
	"DoubleArticleBlock",
	"TripleArticleBlock",
	"EventInvitePreset",
	"FeatureAnnouncementPreset",
];

const webPresetsList: (keyof UnifiedProps)[] = [
	"HeroLayout",
	"ConversationBlock",
	"PromoBannerPreset",
	"TestimonialPreset",
	"GamifiedPopupPreset",
];

const commonComponents = {
	...LayoutBlocks,
	...ContentBlocks,
	...MediaBlocks,
	...ArticleBlocks,
	...FrameBlocks,
	...PresetBlocks,
};

export const emailConfig: Config<UnifiedProps> = {
	root: {
		fields: {
			title: { type: "text" as const },
			backgroundColor: { type: "text" as const },
			fontFamily: {
				type: "select" as const,
				options: [
					{ label: "Arial", value: "Arial, sans-serif" },
					{ label: "Helvetica", value: "Helvetica, sans-serif" },
					{ label: "Georgia", value: "Georgia, serif" },
					{
						label: "Times New Roman",
						value: "'Times New Roman', Times, serif",
					},
					{ label: "Courier New", value: "'Courier New', Courier, monospace" },
				],
			},
			textColor: { type: "text" as const },
			utmSource: { type: "text" as const },
			utmMedium: { type: "text" as const },
			utmCampaign: { type: "text" as const },
		},
		defaultProps: {
			title: "Email Campaign",
			backgroundColor: "#f4f4f4",
			fontFamily: "Arial, sans-serif",
			textColor: "#333333",
			utmSource: "newsletter",
			utmMedium: "email",
			utmCampaign: "spring_sale",
		},
		render: ({ children, backgroundColor, fontFamily, textColor }) => {
			return (
				<div
					style={{
						backgroundColor,
						minHeight: "100%",
						padding: "20px 0",
						fontFamily,
						color: textColor,
					}}
				>
					<div
						style={{
							maxWidth: "600px",
							margin: "0 auto",
							backgroundColor: "#ffffff",
						}}
					>
						{children}
					</div>
				</div>
			);
		},
	},
	categories: {
		components: {
			components: commonComponentsList,
			title: "Components",
		},
		presets: {
			components: emailPresetsList,
			title: "Email Presets",
		},
	},
	components: commonComponents as any,
};

export const webConfig: Config<UnifiedProps> = {
	root: {
		fields: {
			title: { type: "text" as const },
			backgroundColor: { type: "text" as const },
			fontFamily: {
				type: "select" as const,
				options: [
					{ label: "Arial", value: "Arial, sans-serif" },
					{ label: "Helvetica", value: "Helvetica, sans-serif" },
					{ label: "Georgia", value: "Georgia, serif" },
					{
						label: "Times New Roman",
						value: "'Times New Roman', Times, serif",
					},
					{ label: "Courier New", value: "'Courier New', Courier, monospace" },
				],
			},
			textColor: { type: "text" as const },
			displayFormat: {
				type: "select" as const,
				options: [
					{ label: "Inline Embed", value: "inline" },
					{ label: "Lightbox Popup", value: "lightbox" },
					{ label: "Floating Bar", value: "floatingBar" },
					{ label: "Slide-in Sidebar", value: "slideIn" },
				],
			},
			triggerType: {
				type: "select" as const,
				options: [
					{ label: "Immediately", value: "immediate" },
					{ label: "Time Delay", value: "timeDelay" },
					{ label: "Exit Intent", value: "exitIntent" },
					{ label: "Scroll Depth", value: "scrollDepth" },
				],
			},
			triggerValue: {
				type: "number" as const,
				label: "Trigger Value (Seconds or %)",
			},
			utmSource: { type: "text" as const },
			utmMedium: { type: "text" as const },
			utmCampaign: { type: "text" as const },
		},
		defaultProps: {
			title: "On-Site Notification",
			backgroundColor: "transparent",
			fontFamily: "Arial, sans-serif",
			textColor: "#333333",
			displayFormat: "inline",
			triggerType: "immediate",
			triggerValue: 0,
			utmSource: "website",
			utmMedium: "onsite",
			utmCampaign: "promo",
		},
		render: ({
			children,
			backgroundColor,
			displayFormat,
			fontFamily,
			textColor,
		}) => {
			// In the editor, we just render it inline with a preview wrapper
			const isPopup =
				displayFormat === "lightbox" ||
				displayFormat === "slideIn" ||
				displayFormat === "floatingBar";

			return (
				<div
					style={{
						backgroundColor: isPopup ? "rgba(0,0,0,0.05)" : backgroundColor,
						minHeight: "100%",
						padding: "20px",
						fontFamily,
						color: textColor,
					}}
				>
					{isPopup && (
						<div
							style={{
								marginBottom: "10px",
								fontSize: "12px",
								color: "#666",
								textAlign: "center",
							}}
						>
							Previewing as {displayFormat}
						</div>
					)}
					<div
						style={{
							maxWidth: displayFormat === "slideIn" ? "350px" : "600px",
							margin: displayFormat === "slideIn" ? "0 0 0 auto" : "0 auto",
							backgroundColor: isPopup ? "#ffffff" : "transparent",
							boxShadow: isPopup
								? "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
								: "none",
							borderRadius: isPopup ? "12px" : "0",
							overflow: "hidden",
						}}
					>
						{children}
					</div>
				</div>
			);
		},
	},
	categories: {
		components: {
			components: [...commonComponentsList, "Video"] as (keyof UnifiedProps)[],
			title: "Components",
		},
		presets: {
			components: webPresetsList,
			title: "On-Site Presets",
		},
	},
	components: commonComponents as any,
};
