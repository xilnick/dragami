import { DropZone } from "@measured/puck";
import { InlineEditMessage } from "../components/InlineEditMessage";
import { InlineTextEditor } from "../components/InlineTextEditor";
import { TipTapEditor } from "../components/TipTapEditor";
import { useImageManagerStore } from "../store/useImageManagerStore";
import { useLiveContentStore } from "../store/useLiveContentStore";
import { getContrastColor } from "../utils/colorUtils";

export const ArticleBlocks = {
	SingleArticleBlock: {
		fields: {
			imageSrc: { type: "text" as const },
			imageWidth: {
				type: "radio" as const,
				options: [
					{ label: "Small", value: "S" },
					{ label: "Medium", value: "M" },
					{ label: "Large", value: "L" },
					{ label: "Full", value: "Full" },
				],
			},
			title: {
				type: "custom" as const,
				render: () => <InlineEditMessage />,
			},
			text: {
				type: "custom" as const,
				render: () => <InlineEditMessage />,
			},
			buttonText: { type: "text" as const },
			buttonLink: { type: "text" as const },
			buttonBgColor: { type: "text" as const },
			padding: { type: "number" as const },
		},
		defaultProps: {
			imageSrc: "",
			imageWidth: "Full",
			title: "Article Title",
			text: "This is a brief summary of the article. It should be engaging and encourage the reader to click through to read more.",
			buttonText: "Read More",
			buttonLink: "#",
			buttonBgColor: "#2563eb",
			padding: 20,
		},
		render: ({
			imageSrc,
			imageWidth,
			title,
			text,
			buttonText,
			buttonLink,
			buttonBgColor,
			padding,
			id,
			puck,
		}: any) => {
			const blockOverrides = useLiveContentStore(
				(state) => state.overrides[id],
			);
			const setOverride = useLiveContentStore((state) => state.setOverride);
			const openManager = useImageManagerStore((state) => state.openManager);
			const liveImageSrc = blockOverrides?.imageSrc ?? imageSrc;
			const liveTitle = blockOverrides?.title ?? title;
			const liveText = blockOverrides?.text ?? text;
			const liveButtonText = blockOverrides?.buttonText ?? buttonText;
			const liveButtonLink = blockOverrides?.buttonLink ?? buttonLink;
			const liveButtonBgColor = blockOverrides?.buttonBgColor ?? buttonBgColor;
			const buttonTextColor = getContrastColor(liveButtonBgColor);

			const widthMap: Record<string, string> = {
				S: "25%",
				M: "50%",
				L: "75%",
				Full: "100%",
			};

			const handleImageClick = (e: React.MouseEvent) => {
				if (puck.isEditing) {
					e.preventDefault();
					openManager(id, "imageSrc", liveImageSrc);
				}
			};

			const handleImageKeyDown = (e: React.KeyboardEvent) => {
				if (puck.isEditing && (e.key === "Enter" || e.key === " ")) {
					e.preventDefault();
					openManager(id, "imageSrc", liveImageSrc);
				}
			};

			const imageElement = liveImageSrc ? (
				<img
					src={liveImageSrc}
					alt={liveTitle.replace(/<[^>]*>?/gm, "")}
					style={{
						width: widthMap[imageWidth],
						height: "auto",
						display: "block",
						margin: "0 auto",
						cursor: puck.isEditing ? "pointer" : "default",
					}}
					onClick={handleImageClick}
					onKeyDown={handleImageKeyDown}
					tabIndex={puck.isEditing ? 0 : undefined}
				/>
			) : (
				<div
					style={{
						width: widthMap[imageWidth],
						height: "200px",
						margin: "0 auto",
						backgroundColor: "#f3f4f6",
						border: "2px dashed #cbd5e1",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						color: "#64748b",
						borderRadius: "4px",
						cursor: puck.isEditing ? "pointer" : "default",
					}}
					onClick={handleImageClick}
					onKeyDown={handleImageKeyDown}
					tabIndex={puck.isEditing ? 0 : undefined}
					role="button"
				>
					<span>🖼️ Add Image</span>
				</div>
			);

			return (
				<div style={{ padding: `${padding}px`, backgroundColor: "#ffffff" }}>
					{imageElement}
					<div style={{ padding: "15px 0 0 0", textAlign: "center" }}>
						{puck.isEditing ? (
							<div
								style={{
									fontSize: "24px",
									color: "#111827",
									marginBottom: "10px",
									fontWeight: "bold",
								}}
							>
								<TipTapEditor
									content={liveTitle}
									onChange={(c) => setOverride(id, "title", c)}
									isEditing={true}
									inline={true}
								/>
							</div>
						) : (
							<h2
								style={{
									fontSize: "24px",
									color: "#111827",
									margin: "0 0 10px 0",
								}}
								dangerouslySetInnerHTML={{ __html: liveTitle }}
							/>
						)}

						{puck.isEditing ? (
							<div
								style={{
									fontSize: "16px",
									color: "#4b5563",
									lineHeight: "1.5",
									marginBottom: "15px",
								}}
							>
								<TipTapEditor
									content={liveText}
									onChange={(c) => setOverride(id, "text", c)}
									isEditing={true}
									inline={true}
								/>
							</div>
						) : (
							<p
								style={{
									fontSize: "16px",
									color: "#4b5563",
									lineHeight: "1.5",
									margin: "0 0 15px 0",
								}}
								dangerouslySetInnerHTML={{ __html: liveText }}
							/>
						)}

						<a
							href={puck.isEditing ? undefined : liveButtonLink}
							style={{
								display: "inline-block",
								padding: "10px 20px",
								backgroundColor: liveButtonBgColor,
								color: buttonTextColor,
								textDecoration: "none",
								borderRadius: "4px",
								fontWeight: "bold",
								cursor: "pointer",
							}}
							onClick={(e) => {
								if (puck.isEditing) e.preventDefault();
							}}
						>
							<InlineTextEditor
								value={liveButtonText}
								onChange={(val) => setOverride(id, "buttonText", val)}
								isEditing={puck.isEditing}
							/>
						</a>
					</div>
				</div>
			);
		},
	},
	SideArticleBlock: {
		fields: {
			imageSrc: { type: "text" as const },
			imagePos: {
				type: "radio" as const,
				options: [
					{ label: "Left", value: "left" },
					{ label: "Right", value: "right" },
				],
			},
			imageWidth: {
				type: "radio" as const,
				options: [
					{ label: "Small (25%)", value: "S" },
					{ label: "Medium (33%)", value: "M" },
					{ label: "Large (50%)", value: "L" },
				],
			},
			title: {
				type: "custom" as const,
				render: () => <InlineEditMessage />,
			},
			text: {
				type: "custom" as const,
				render: () => <InlineEditMessage />,
			},
			buttonText: { type: "text" as const },
			buttonLink: { type: "text" as const },
			buttonBgColor: { type: "text" as const },
			padding: { type: "number" as const },
		},
		defaultProps: {
			imageSrc: "",
			imagePos: "left",
			imageWidth: "M",
			title: "Article Title",
			text: "This is a brief summary of the article. It should be engaging and encourage the reader to click through to read more.",
			buttonText: "Read More",
			buttonLink: "#",
			buttonBgColor: "#2563eb",
			padding: 20,
		},
		render: ({
			imageSrc,
			imagePos,
			imageWidth,
			title,
			text,
			buttonText,
			buttonLink,
			buttonBgColor,
			padding,
			id,
			puck,
		}: any) => {
			const blockOverrides = useLiveContentStore(
				(state) => state.overrides[id],
			);
			const setOverride = useLiveContentStore((state) => state.setOverride);
			const openManager = useImageManagerStore((state) => state.openManager);
			const liveImageSrc = blockOverrides?.imageSrc ?? imageSrc;
			const liveTitle = blockOverrides?.title ?? title;
			const liveText = blockOverrides?.text ?? text;
			const liveButtonText = blockOverrides?.buttonText ?? buttonText;
			const liveButtonLink = blockOverrides?.buttonLink ?? buttonLink;
			const liveButtonBgColor = blockOverrides?.buttonBgColor ?? buttonBgColor;
			const buttonTextColor = getContrastColor(liveButtonBgColor);

			const widthMap: Record<string, string> = {
				S: "25%",
				M: "33.33%",
				L: "50%",
			};
			const textWidthMap: Record<string, string> = {
				S: "75%",
				M: "66.66%",
				L: "50%",
			};

			const handleImageClick = (e: React.MouseEvent) => {
				if (puck.isEditing) {
					e.preventDefault();
					openManager(id, "imageSrc", liveImageSrc);
				}
			};

			const imageElement = liveImageSrc ? (
				<img
					src={liveImageSrc}
					alt={liveTitle.replace(/<[^>]*>?/gm, "")}
					style={{
						width: "100%",
						height: "auto",
						display: "block",
						cursor: puck.isEditing ? "pointer" : "default",
					}}
					onClick={handleImageClick}
				/>
			) : (
				<div
					style={{
						width: "100%",
						height: "150px",
						backgroundColor: "#f3f4f6",
						border: "2px dashed #cbd5e1",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						color: "#64748b",
						borderRadius: "4px",
						cursor: puck.isEditing ? "pointer" : "default",
					}}
					onClick={handleImageClick}
				>
					<span>🖼️ Add Image</span>
				</div>
			);

			const textContent = (
				<div style={{ padding: "0 15px" }}>
					{puck.isEditing ? (
						<div
							style={{
								fontSize: "18px",
								color: "#111827",
								marginBottom: "8px",
								fontWeight: "bold",
							}}
						>
							<TipTapEditor
								content={liveTitle}
								onChange={(c) => setOverride(id, "title", c)}
								isEditing={true}
								inline={true}
							/>
						</div>
					) : (
						<h3
							style={{
								fontSize: "18px",
								color: "#111827",
								margin: "0 0 8px 0",
							}}
							dangerouslySetInnerHTML={{ __html: liveTitle }}
						/>
					)}

					{puck.isEditing ? (
						<div
							style={{
								fontSize: "14px",
								color: "#4b5563",
								lineHeight: "1.5",
								marginBottom: "12px",
							}}
						>
							<TipTapEditor
								content={liveText}
								onChange={(c) => setOverride(id, "text", c)}
								isEditing={true}
								inline={true}
							/>
						</div>
					) : (
						<p
							style={{
								fontSize: "14px",
								color: "#4b5563",
								lineHeight: "1.5",
								margin: "0 0 12px 0",
							}}
							dangerouslySetInnerHTML={{ __html: liveText }}
						/>
					)}

					<a
						href={puck.isEditing ? undefined : liveButtonLink}
						style={{
							display: "inline-block",
							padding: "8px 16px",
							backgroundColor: liveButtonBgColor,
							color: buttonTextColor,
							textDecoration: "none",
							borderRadius: "4px",
							fontWeight: "bold",
							fontSize: "14px",
							cursor: "pointer",
						}}
						onClick={(e) => {
							if (puck.isEditing) e.preventDefault();
						}}
					>
						<InlineTextEditor
							value={liveButtonText}
							onChange={(val) => setOverride(id, "buttonText", val)}
							isEditing={puck.isEditing}
						/>
					</a>
				</div>
			);

			return (
				<div style={{ padding: `${padding}px`, backgroundColor: "#ffffff" }}>
					<table width="100%" cellPadding="0" cellSpacing="0" border={0}>
						<tbody>
							<tr>
								{imagePos === "left" ? (
									<>
										<td width={widthMap[imageWidth]} valign="top">
											{imageElement}
										</td>
										<td width={textWidthMap[imageWidth]} valign="top">
											{textContent}
										</td>
									</>
								) : (
									<>
										<td width={textWidthMap[imageWidth]} valign="top">
											{textContent}
										</td>
										<td width={widthMap[imageWidth]} valign="top">
											{imageElement}
										</td>
									</>
								)}
							</tr>
						</tbody>
					</table>
				</div>
			);
		},
	},
	DoubleArticleBlock: {
		fields: {
			padding: { type: "number" as const },
		},
		defaultProps: {
			padding: 20,
		},
		render: ({ padding }: any) => (
			<div style={{ padding: `${padding}px`, backgroundColor: "#ffffff" }}>
				<table width="100%" cellPadding="0" cellSpacing="0" border={0}>
					<tbody>
						<tr>
							<td width="50%" valign="top" style={{ paddingRight: "10px" }}>
								<DropZone zone="left-article" />
							</td>
							<td width="50%" valign="top" style={{ paddingLeft: "10px" }}>
								<DropZone zone="right-article" />
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		),
	},
	TripleArticleBlock: {
		fields: {
			padding: { type: "number" as const },
		},
		defaultProps: {
			padding: 20,
		},
		render: ({ padding }: any) => (
			<div style={{ padding: `${padding}px`, backgroundColor: "#ffffff" }}>
				<table width="100%" cellPadding="0" cellSpacing="0" border={0}>
					<tbody>
						<tr>
							<td width="33.33%" valign="top" style={{ paddingRight: "10px" }}>
								<DropZone zone="left-article" />
							</td>
							<td width="33.33%" valign="top" style={{ padding: "0 5px" }}>
								<DropZone zone="middle-article" />
							</td>
							<td width="33.33%" valign="top" style={{ paddingLeft: "10px" }}>
								<DropZone zone="right-article" />
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		),
	},
};
