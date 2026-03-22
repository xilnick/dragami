import { InlineEditMessage } from "../components/InlineEditMessage";
import { InlineTextEditor } from "../components/InlineTextEditor";
import { TipTapEditor } from "../components/TipTapEditor";
import { useLiveContentStore } from "../store/useLiveContentStore";
import { getContrastColor } from "../utils/colorUtils";

export const ContentBlocks = {
	TextBlock: {
		fields: {
			content: {
				type: "custom" as const,
				render: () => <InlineEditMessage />,
			},
			color: { type: "text" as const },
			fontSize: { type: "number" as const },
			lineHeight: { type: "number" as const },
			letterSpacing: { type: "number" as const },
			fontFamily: {
				type: "select" as const,
				options: [
					{ label: "Arial", value: "Arial, sans-serif" },
					{ label: "Helvetica", value: "Helvetica, sans-serif" },
					{ label: "Times New Roman", value: "'Times New Roman', serif" },
					{ label: "Georgia", value: "Georgia, serif" },
					{ label: "Courier New", value: "'Courier New', monospace" },
				],
			},
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
			content: "<p>Type your text here...</p>",
			color: "#333333",
			fontSize: 16,
			lineHeight: 1.5,
			letterSpacing: 0,
			fontFamily: "Arial, sans-serif",
			align: "left",
			padding: 10,
		},
		render: ({ content, color, fontSize, align, padding, id, puck }: any) => {
			const blockOverrides = useLiveContentStore(
				(state) => state.overrides[id],
			);
			const setOverride = useLiveContentStore((state) => state.setOverride);
			const liveContent = blockOverrides?.content ?? content;

			if (puck.isEditing) {
				return (
					<div
						style={{
							color,
							fontSize: `${fontSize}px`,
							textAlign: align,
							padding: `${padding}px`,
						}}
					>
						<TipTapEditor
							content={liveContent}
							onChange={(c) => setOverride(id, "content", c)}
							isEditing={true}
							inline={true}
						/>
					</div>
				);
			}

			return (
				<div
					style={{
						color,
						fontSize: `${fontSize}px`,
						textAlign: align,
						padding: `${padding}px`,
					}}
					dangerouslySetInnerHTML={{ __html: liveContent }}
				/>
			);
		},
	},
	TitleBlock: {
		fields: {
			text: {
				type: "custom" as const,
				render: () => <InlineEditMessage />,
			},
			color: { type: "text" as const },
			fontSize: { type: "number" as const },
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
			text: "Heading Title",
			color: "#111827",
			fontSize: 24,
			align: "center",
			padding: 10,
		},
		render: ({ text, color, fontSize, align, padding, id, puck }: any) => {
			const blockOverrides = useLiveContentStore(
				(state) => state.overrides[id],
			);
			const setOverride = useLiveContentStore((state) => state.setOverride);
			const liveText = blockOverrides?.text ?? text;

			if (puck.isEditing) {
				return (
					<div
						style={{
							color,
							fontSize: `${fontSize}px`,
							textAlign: align,
							padding: `${padding}px`,
							fontWeight: "bold",
						}}
					>
						<TipTapEditor
							content={liveText}
							onChange={(c) => setOverride(id, "text", c)}
							isEditing={true}
							inline={true}
						/>
					</div>
				);
			}

			return (
				<div
					style={{
						color,
						fontSize: `${fontSize}px`,
						textAlign: align,
						padding: `${padding}px`,
						fontWeight: "bold",
					}}
					dangerouslySetInnerHTML={{ __html: liveText }}
				/>
			);
		},
	},
	ListBlock: {
		fields: {
			items: {
				type: "array" as const,
				getItemSummary: (item: any) => item.text || "List Item",
				arrayFields: {
					text: { type: "text" as const },
				},
			},
			listType: {
				type: "radio" as const,
				options: [
					{ label: "Unordered (Bullets)", value: "ul" },
					{ label: "Ordered (Numbers)", value: "ol" },
				],
			},
			color: { type: "text" as const },
			fontSize: { type: "number" as const },
			padding: { type: "number" as const },
		},
		defaultProps: {
			items: [
				{ text: "First item" },
				{ text: "Second item" },
				{ text: "Third item" },
			],
			listType: "ul",
			color: "#333333",
			fontSize: 16,
			padding: 10,
		},
		render: ({ items, listType, color, fontSize, padding }: any) => {
			const ListTag = listType === "ol" ? "ol" : "ul";
			const listStyleType = listType === "ol" ? "decimal" : "disc";

			return (
				<div style={{ padding: `${padding}px` }}>
					<ListTag
						style={{
							color,
							fontSize: `${fontSize}px`,
							paddingLeft: "20px",
							margin: 0,
							listStyleType,
						}}
					>
						{items.map((item: any, i: number) => (
							<li key={i} style={{ marginBottom: "8px" }}>
								{item.text}
							</li>
						))}
					</ListTag>
				</div>
			);
		},
	},
	CTAButton: {
		fields: {
			text: { type: "text" as const },
			link: { type: "text" as const },
			bgColor: { type: "text" as const },
			borderRadius: { type: "number" as const },
			padding: { type: "number" as const },
			align: {
				type: "radio" as const,
				options: [
					{ label: "Left", value: "left" },
					{ label: "Center", value: "center" },
					{ label: "Right", value: "right" },
				],
			},
		},
		defaultProps: {
			text: "Click Here",
			link: "https://example.com",
			bgColor: "#28a745",
			borderRadius: 4,
			padding: 15,
			align: "center",
		},
		render: ({
			text,
			link,
			bgColor,
			borderRadius,
			padding,
			align,
			id,
			puck,
		}: any) => {
			const blockOverrides = useLiveContentStore(
				(state) => state.overrides[id],
			);
			const setOverride = useLiveContentStore((state) => state.setOverride);
			const liveText = blockOverrides?.text ?? text;
			const liveLink = blockOverrides?.link ?? link;
			const textColor = getContrastColor(bgColor);

			return (
				<div style={{ textAlign: align, padding: `${padding}px` }}>
					<a
						href={puck.isEditing ? undefined : liveLink}
						onClick={(e) => {
							if (puck.isEditing) e.preventDefault();
						}}
						style={{
							display: "inline-block",
							padding: "12px 24px",
							backgroundColor: bgColor,
							color: textColor,
							textDecoration: "none",
							borderRadius: `${borderRadius}px`,
							fontWeight: "bold",
							cursor: "pointer",
						}}
					>
						<InlineTextEditor
							value={liveText}
							onChange={(val) => setOverride(id, "text", val)}
							isEditing={puck.isEditing}
						/>
					</a>
				</div>
			);
		},
	},
	RawHTML: {
		fields: {
			html: { type: "textarea" as const },
			padding: { type: "number" as const },
		},
		defaultProps: {
			html: "<div>Custom HTML here</div>",
			padding: 10,
		},
		render: ({ html, padding, id }: any) => {
			const blockOverrides = useLiveContentStore(
				(state) => state.overrides[id],
			);
			const liveHtml = blockOverrides?.html ?? html;

			return (
				<div
					style={{ padding: `${padding}px` }}
					dangerouslySetInnerHTML={{ __html: liveHtml }}
				/>
			);
		},
	},
	ConversationBlock: {
		fields: {
			messages: {
				type: "array" as const,
				getItemSummary: (item: any) => `${item.role}: ${item.text}`,
				arrayFields: {
					role: {
						type: "radio" as const,
						options: [
							{ label: "User", value: "user" },
							{ label: "Agent", value: "agent" },
						],
					},
					text: { type: "text" as const },
				},
			},
			userColor: { type: "text" as const },
			agentColor: { type: "text" as const },
			padding: { type: "number" as const },
		},
		defaultProps: {
			messages: [
				{ role: "user", text: "Hello, I need some help." },
				{ role: "agent", text: "Sure, I'd be happy to assist you!" },
			],
			userColor: "#007bff",
			agentColor: "#e9ecef",
			padding: 20,
		},
		render: ({ messages, userColor, agentColor, padding, id, puck }: any) => {
			const blockOverrides = useLiveContentStore(
				(state) => state.overrides[id],
			);
			const setOverride = useLiveContentStore((state) => state.setOverride);
			const liveMessages = blockOverrides?.messages ?? messages;

			return (
				<div style={{ padding: `${padding}px` }}>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							gap: "12px",
							maxWidth: "600px",
							margin: "0 auto",
						}}
					>
						{liveMessages.map((msg: any, i: number) => {
							const isUser = msg.role === "user";
							return (
								<div
									key={i}
									style={{
										display: "flex",
										justifyContent: isUser ? "flex-end" : "flex-start",
									}}
								>
									<div
										style={{
											backgroundColor: isUser ? userColor : agentColor,
											color: isUser
												? getContrastColor(userColor)
												: getContrastColor(agentColor),
											padding: "10px 16px",
											borderRadius: "16px",
											borderBottomRightRadius: isUser ? "4px" : "16px",
											borderBottomLeftRadius: !isUser ? "4px" : "16px",
											maxWidth: "80%",
											fontFamily: "Arial, sans-serif",
											fontSize: "14px",
											lineHeight: "1.4",
										}}
									>
										<InlineTextEditor
											value={msg.text}
											onChange={(val) => {
												const newMessages = [...liveMessages];
												newMessages[i] = { ...newMessages[i], text: val };
												setOverride(id, "messages", newMessages);
											}}
											isEditing={puck.isEditing}
										/>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			);
		},
	},
	LegalPreviewBlock: {
		fields: {
			imageSrc: { type: "text" as const },
			altText: { type: "text" as const },
			legalText: { type: "text" as const },
			padding: { type: "number" as const },
		},
		defaultProps: {
			imageSrc: "https://picsum.photos/seed/legal/800/200",
			altText: "Legal Preview",
			legalText: "Confidential & Privileged. For internal review only.",
			padding: 20,
		},
		render: ({ imageSrc, altText, legalText, padding, id, puck }: any) => {
			const blockOverrides = useLiveContentStore(
				(state) => state.overrides[id],
			);
			const setOverride = useLiveContentStore((state) => state.setOverride);
			const liveLegalText = blockOverrides?.legalText ?? legalText;

			return (
				<div
					style={{
						padding: `${padding}px`,
						backgroundColor: "#f8f9fa",
						borderTop: "1px solid #dee2e6",
					}}
				>
					<div
						style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}
					>
						<img
							src={imageSrc}
							alt={altText}
							style={{
								width: "100%",
								maxWidth: "400px",
								borderRadius: "8px",
								border: "1px solid #e9ecef",
								marginBottom: "12px",
							}}
						/>
						<p
							style={{
								fontSize: "11px",
								color: "#6c757d",
								fontFamily: "Arial, sans-serif",
								margin: 0,
							}}
						>
							<InlineTextEditor
								value={liveLegalText}
								onChange={(val) => setOverride(id, "legalText", val)}
								isEditing={puck.isEditing}
							/>
						</p>
					</div>
				</div>
			);
		},
	},
	RatingBlock: {
		fields: {
			question: { type: "text" as const },
			scale: {
				type: "radio" as const,
				options: [
					{ label: "1-5 Stars", value: "5" },
					{ label: "0-10 NPS", value: "10" },
				],
			},
			color: { type: "text" as const },
			bgColor: { type: "text" as const },
			padding: { type: "number" as const },
		},
		defaultProps: {
			question: "How likely are you to recommend us?",
			scale: "10",
			color: "#2563eb",
			bgColor: "#ffffff",
			padding: 20,
		},
		render: ({ question, scale, color, bgColor, padding, id, puck }: any) => {
			const blockOverrides = useLiveContentStore(
				(state) => state.overrides[id],
			);
			const setOverride = useLiveContentStore((state) => state.setOverride);
			const liveQuestion = blockOverrides?.question ?? question;

			const isNPS = scale === "10";
			const items = Array.from({ length: isNPS ? 11 : 5 }).map((_, i) =>
				isNPS ? i : i + 1,
			);

			return (
				<div
					style={{
						padding: `${padding}px`,
						backgroundColor: bgColor,
						textAlign: "center",
						fontFamily: "sans-serif",
					}}
				>
					<h3
						style={{ margin: "0 0 15px 0", color: "#333333", fontSize: "18px" }}
					>
						<InlineTextEditor
							value={liveQuestion}
							onChange={(val) => setOverride(id, "question", val)}
							isEditing={puck.isEditing}
						/>
					</h3>
					<div
						style={{
							display: "inline-flex",
							gap: "8px",
							flexWrap: "wrap",
							justifyContent: "center",
						}}
					>
						{items.map((item) => (
							<a
								key={item}
								href={puck.isEditing ? undefined : "#"}
								onClick={(e) => {
									if (puck.isEditing) e.preventDefault();
								}}
								style={{
									display: "inline-flex",
									alignItems: "center",
									justifyContent: "center",
									width: isNPS ? "36px" : "44px",
									height: isNPS ? "36px" : "44px",
									backgroundColor: isNPS ? "#f1f5f9" : "transparent",
									color: isNPS ? color : "#fbbf24",
									border: isNPS ? `1px solid #cbd5e1` : "none",
									borderRadius: isNPS ? "4px" : "0",
									textDecoration: "none",
									fontSize: isNPS ? "16px" : "32px",
									fontWeight: "bold",
									cursor: puck.isEditing ? "default" : "pointer",
								}}
							>
								{isNPS ? item : "★"}
							</a>
						))}
					</div>
					{isNPS && (
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								maxWidth: "480px",
								margin: "10px auto 0",
								fontSize: "12px",
								color: "#64748b",
							}}
						>
							<span>Not likely</span>
							<span>Very likely</span>
						</div>
					)}
				</div>
			);
		},
	},
	CountdownTimer: {
		fields: {
			endDate: { type: "text" as const, label: "End Date (YYYY-MM-DD HH:MM)" },
			color: { type: "text" as const },
			bgColor: { type: "text" as const },
			padding: { type: "number" as const },
		},
		defaultProps: {
			endDate: "2026-12-31 23:59",
			color: "#ffffff",
			bgColor: "#ef4444",
			padding: 20,
		},
		render: ({ endDate, color, bgColor, padding }: any) => {
			return (
				<div
					style={{
						textAlign: "center",
						padding: `${padding}px`,
						backgroundColor: bgColor,
						color,
						borderRadius: "8px",
						fontFamily: "monospace",
						fontSize: "24px",
						fontWeight: "bold",
					}}
				>
					<div
						style={{
							fontSize: "14px",
							textTransform: "uppercase",
							letterSpacing: "1px",
							marginBottom: "8px",
						}}
					>
						Offer Ends: {endDate}
					</div>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							gap: "15px",
							marginTop: "10px",
						}}
					>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<span>00</span>
							<span style={{ fontSize: "10px", fontWeight: "normal" }}>
								DAYS
							</span>
						</div>
						<span>:</span>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<span>00</span>
							<span style={{ fontSize: "10px", fontWeight: "normal" }}>
								HRS
							</span>
						</div>
						<span>:</span>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<span>00</span>
							<span style={{ fontSize: "10px", fontWeight: "normal" }}>
								MIN
							</span>
						</div>
						<span>:</span>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<span>00</span>
							<span style={{ fontSize: "10px", fontWeight: "normal" }}>
								SEC
							</span>
						</div>
					</div>
				</div>
			);
		},
	},
};
