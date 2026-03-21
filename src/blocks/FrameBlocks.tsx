import { InlineTextEditor } from "../components/InlineTextEditor";
import { useLiveContentStore } from "../store/useLiveContentStore";
import { getContrastColor } from "../utils/colorUtils";

export const FrameBlocks = {
	SocialBlock: {
		fields: {
			iconType: {
				type: "radio" as const,
				options: [
					{ label: "Black & White", value: "bw" },
					{ label: "Colors", value: "colors" },
				],
			},
			networks: { type: "text" as const, label: "Networks (comma separated)" },
			align: {
				type: "radio" as const,
				options: [
					{ label: "Left", value: "left" },
					{ label: "Center", value: "center" },
					{ label: "Right", value: "right" },
				],
			},
			padding: { type: "number" as const },
		},
		defaultProps: {
			iconType: "colors",
			networks: "facebook, twitter, instagram",
			align: "center",
			padding: 20,
		},
		render: ({ iconType, networks, align, padding, id, puck }: any) => {
			const blockOverrides = useLiveContentStore(
				(state) => state.overrides[id],
			);
			const _setOverride = useLiveContentStore((state) => state.setOverride);
			const liveNetworks = blockOverrides?.networks ?? networks;

			const networkList = liveNetworks
				.split(",")
				.map((n: string) => n.trim().toLowerCase());

			const getIconColor = (network: string) => {
				if (iconType === "bw") return "#333333";
				const colors: Record<string, string> = {
					facebook: "#1877f2",
					twitter: "#1da1f2",
					instagram: "#e1306c",
					linkedin: "#0077b5",
					youtube: "#ff0000",
				};
				return colors[network] || "#333333";
			};

			return (
				<div
					style={{
						padding: `${padding}px`,
						textAlign: align,
						backgroundColor: "#ffffff",
					}}
				>
					<div
						style={{
							display: "inline-flex",
							gap: "10px",
							justifyContent:
								align === "center"
									? "center"
									: align === "right"
										? "flex-end"
										: "flex-start",
						}}
					>
						{networkList.map((network: string, i: number) => {
							const bgColor = getIconColor(network);
							const textColor = getContrastColor(bgColor);
							return (
								<a
									key={i}
									href={puck.isEditing ? undefined : "#"}
									onClick={(e) => {
										if (puck.isEditing) e.preventDefault();
									}}
									style={{
										display: "inline-block",
										width: "32px",
										height: "32px",
										backgroundColor: bgColor,
										borderRadius: "50%",
										color: textColor,
										textAlign: "center",
										lineHeight: "32px",
										fontSize: "14px",
										textDecoration: "none",
										fontFamily: "sans-serif",
										cursor: puck.isEditing ? "default" : "pointer",
									}}
								>
									{network.charAt(0).toUpperCase()}
								</a>
							);
						})}
					</div>
				</div>
			);
		},
	},
	FooterBlock: {
		fields: {
			content: { type: "textarea" as const },
			padding: { type: "number" as const },
		},
		defaultProps: {
			content:
				"© 2024 Your Company. All rights reserved.\n123 Business Street, City, Country",
			padding: 20,
		},
		render: ({ content, padding, id, puck }: any) => {
			const blockOverrides = useLiveContentStore(
				(state) => state.overrides[id],
			);
			const setOverride = useLiveContentStore((state) => state.setOverride);
			const liveContent = blockOverrides?.content ?? content;

			return (
				<div
					style={{
						padding: `${padding}px`,
						backgroundColor: "#f8f9fa",
						textAlign: "center",
					}}
				>
					<div
						style={{
							fontSize: "12px",
							color: "#6c757d",
							fontFamily: "Arial, sans-serif",
							whiteSpace: "pre-wrap",
						}}
					>
						<InlineTextEditor
							value={liveContent}
							onChange={(val) => setOverride(id, "content", val)}
							isEditing={puck.isEditing}
						/>
					</div>
				</div>
			);
		},
	},
	PreheaderBlock: {
		fields: {
			previewText: { type: "text" as const },
			webVersionLink: { type: "text" as const },
			unsubscribeLink: { type: "text" as const },
			padding: { type: "number" as const },
		},
		defaultProps: {
			previewText: "View our latest updates and offers inside.",
			webVersionLink: "#",
			unsubscribeLink: "#",
			padding: 10,
		},
		render: ({
			previewText,
			webVersionLink,
			unsubscribeLink,
			padding,
			id,
			puck,
		}: any) => {
			const blockOverrides = useLiveContentStore(
				(state) => state.overrides[id],
			);
			const setOverride = useLiveContentStore((state) => state.setOverride);
			const livePreviewText = blockOverrides?.previewText ?? previewText;

			return (
				<div
					style={{
						padding: `${padding}px`,
						backgroundColor: "#f8f9fa",
						textAlign: "center",
					}}
				>
					<div
						style={{
							fontSize: "11px",
							color: "#6c757d",
							fontFamily: "Arial, sans-serif",
							marginBottom: "5px",
						}}
					>
						<InlineTextEditor
							value={livePreviewText}
							onChange={(val) => setOverride(id, "previewText", val)}
							isEditing={puck.isEditing}
						/>
					</div>
					<div
						style={{
							fontSize: "11px",
							color: "#6c757d",
							fontFamily: "Arial, sans-serif",
						}}
					>
						<a
							href={puck.isEditing ? undefined : webVersionLink}
							style={{
								color: "#6c757d",
								textDecoration: "underline",
								cursor: puck.isEditing ? "default" : "pointer",
							}}
							onClick={(e) => {
								if (puck.isEditing) e.preventDefault();
							}}
						>
							View in browser
						</a>
						{" | "}
						<a
							href={puck.isEditing ? undefined : unsubscribeLink}
							style={{
								color: "#6c757d",
								textDecoration: "underline",
								cursor: puck.isEditing ? "default" : "pointer",
							}}
							onClick={(e) => {
								if (puck.isEditing) e.preventDefault();
							}}
						>
							Unsubscribe
						</a>
					</div>
				</div>
			);
		},
	},
};
