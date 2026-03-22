import { useImageManagerStore } from "../store/useImageManagerStore";
import { useLiveContentStore } from "../store/useLiveContentStore";

export const MediaBlocks = {
	Image: {
		fields: {
			src: { type: "text" as const, label: "Image URL" },
			alt: { type: "text" as const },
			width: { type: "number" as const },
			link: { type: "text" as const },
			borderRadius: { type: "number" as const },
			caption: { type: "text" as const },
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
			src: "",
			alt: "Image description",
			width: 100,
			link: "",
			borderRadius: 0,
			caption: "",
			align: "center",
			padding: 10,
		},
		render: ({ src, alt, width, link, align, padding, id, puck }: any) => {
			const blockOverrides = useLiveContentStore(
				(state) => state.overrides[id],
			);
			const _setOverride = useLiveContentStore((state) => state.setOverride);
			const openManager = useImageManagerStore((state) => state.openManager);
			const liveSrc = blockOverrides?.src ?? src;
			const liveLink = blockOverrides?.link ?? link;

			const margin =
				align === "center" ? "0 auto" : align === "right" ? "0 0 0 auto" : "0";

			const handleClick = (e: React.MouseEvent) => {
				if (puck.isEditing) {
					e.preventDefault();
					openManager(id, "src", liveSrc);
				}
			};

			if (!liveSrc) {
				return (
					<div style={{ padding: `${padding}px` }} onClick={handleClick}>
						<div
							style={{
								width: `${width}%`,
								height: "150px",
								margin,
								backgroundColor: "#f3f4f6",
								border: "2px dashed #cbd5e1",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								color: "#64748b",
								borderRadius: "8px",
								fontFamily: "sans-serif",
								fontSize: "14px",
								cursor: puck.isEditing ? "pointer" : "default",
							}}
						>
							<span>🖼️ Click to add Image URL</span>
						</div>
					</div>
				);
			}

			const img = (
				<img
					src={liveSrc}
					alt={alt}
					style={{
						width: `${width}%`,
						height: "auto",
						display: "block",
						margin,
						cursor: puck.isEditing ? "pointer" : "default",
					}}
					onClick={handleClick}
				/>
			);
			return (
				<div style={{ padding: `${padding}px` }}>
					{liveLink && !puck.isEditing ? <a href={liveLink}>{img}</a> : img}
				</div>
			);
		},
	},
	VideoBlock: {
		fields: {
			src: { type: "text" as const, label: "Video Thumbnail URL" },
			alt: { type: "text" as const },
			width: { type: "number" as const },
			link: { type: "text" as const, label: "Video Link" },
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
			src: "",
			alt: "Video thumbnail",
			width: 100,
			link: "",
			align: "center",
			padding: 10,
		},
		render: ({ src, alt, width, link, align, padding, id, puck }: any) => {
			const blockOverrides = useLiveContentStore(
				(state) => state.overrides[id],
			);
			const openManager = useImageManagerStore((state) => state.openManager);
			const liveSrc = blockOverrides?.src ?? src;
			const liveLink = blockOverrides?.link ?? link;

			const margin =
				align === "center" ? "0 auto" : align === "right" ? "0 0 0 auto" : "0";

			const handleClick = (e: React.MouseEvent) => {
				if (puck.isEditing) {
					e.preventDefault();
					openManager(id, "src", liveSrc);
				}
			};

			if (!liveSrc) {
				return (
					<div style={{ padding: `${padding}px` }} onClick={handleClick}>
						<div
							style={{
								width: `${width}%`,
								height: "150px",
								margin,
								backgroundColor: "#f3f4f6",
								border: "2px dashed #cbd5e1",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								color: "#64748b",
								borderRadius: "8px",
								fontFamily: "sans-serif",
								fontSize: "14px",
								cursor: puck.isEditing ? "pointer" : "default",
							}}
						>
							<span>🎥 Click to add Video Thumbnail</span>
						</div>
					</div>
				);
			}

			const img = (
				<div style={{ position: "relative", width: `${width}%`, margin }}>
					<img
						src={liveSrc}
						alt={alt}
						style={{
							width: "100%",
							height: "auto",
							display: "block",
							cursor: puck.isEditing ? "pointer" : "default",
						}}
						onClick={handleClick}
					/>
					<div
						style={{
							position: "absolute",
							top: "50%",
							left: "50%",
							transform: "translate(-50%, -50%)",
							width: "60px",
							height: "60px",
							backgroundColor: "rgba(0, 0, 0, 0.6)",
							borderRadius: "50%",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							pointerEvents: "none",
						}}
					>
						<div
							style={{
								width: 0,
								height: 0,
								borderTop: "15px solid transparent",
								borderBottom: "15px solid transparent",
								borderLeft: "25px solid white",
								marginLeft: "5px",
							}}
						/>
					</div>
				</div>
			);
			return (
				<div style={{ padding: `${padding}px` }}>
					{liveLink && !puck.isEditing ? <a href={liveLink}>{img}</a> : img}
				</div>
			);
		},
	},
	LogoBlock: {
		fields: {
			src: { type: "text" as const, label: "Logo URL" },
			alt: { type: "text" as const },
			width: {
				type: "radio" as const,
				options: [
					{ label: "Small", value: "S" },
					{ label: "Medium", value: "M" },
					{ label: "Large", value: "L" },
				],
			},
			link: { type: "text" as const },
			transparentBg: {
				type: "radio" as const,
				options: [
					{ label: "Yes", value: true },
					{ label: "No", value: false },
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
			src: "",
			alt: "Logo",
			width: "M",
			link: "",
			transparentBg: true,
			align: "center",
			padding: 20,
		},
		render: ({
			src,
			alt,
			width,
			link,
			transparentBg,
			align,
			padding,
			id,
			puck,
		}: any) => {
			const blockOverrides = useLiveContentStore(
				(state) => state.overrides[id],
			);
			const _setOverride = useLiveContentStore((state) => state.setOverride);
			const openManager = useImageManagerStore((state) => state.openManager);
			const liveSrc = blockOverrides?.src ?? src;
			const liveLink = blockOverrides?.link ?? link;

			const widthMap: Record<string, string> = {
				S: "100px",
				M: "150px",
				L: "200px",
			};
			const margin =
				align === "center" ? "0 auto" : align === "right" ? "0 0 0 auto" : "0";
			const bgColor = transparentBg ? "transparent" : "#ffffff";

			const handleClick = (e: React.MouseEvent) => {
				if (puck.isEditing) {
					e.preventDefault();
					openManager(id, "src", liveSrc);
				}
			};

			if (!liveSrc) {
				return (
					<div
						style={{ padding: `${padding}px`, backgroundColor: bgColor }}
						onClick={handleClick}
					>
						<div
							style={{
								width: widthMap[width],
								height: "60px",
								margin,
								backgroundColor: "#f3f4f6",
								border: "2px dashed #cbd5e1",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								color: "#64748b",
								borderRadius: "4px",
								fontFamily: "sans-serif",
								fontSize: "12px",
								cursor: puck.isEditing ? "pointer" : "default",
							}}
						>
							<span>🖼️ Add Logo</span>
						</div>
					</div>
				);
			}

			const img = (
				<img
					src={liveSrc}
					alt={alt}
					style={{
						width: widthMap[width],
						height: "auto",
						display: "block",
						margin,
						cursor: puck.isEditing ? "pointer" : "default",
					}}
					onClick={handleClick}
				/>
			);
			return (
				<div style={{ padding: `${padding}px`, backgroundColor: bgColor }}>
					{liveLink && !puck.isEditing ? <a href={liveLink}>{img}</a> : img}
				</div>
			);
		},
	},
	DoubleImageBlock: {
		fields: {
			img1Src: { type: "text" as const },
			img1Link: { type: "text" as const },
			img2Src: { type: "text" as const },
			img2Link: { type: "text" as const },
			gutterVisible: {
				type: "radio" as const,
				options: [
					{ label: "Yes", value: true },
					{ label: "No", value: false },
				],
			},
			fixedHeight: { type: "number" as const },
			padding: { type: "number" as const },
		},
		defaultProps: {
			img1Src: "",
			img1Link: "",
			img2Src: "",
			img2Link: "",
			gutterVisible: true,
			fixedHeight: 0,
			padding: 20,
		},
		render: ({
			img1Src,
			img2Src,
			gutterVisible,
			fixedHeight,
			padding,
			id,
			puck,
		}: any) => {
			const blockOverrides = useLiveContentStore(
				(state) => state.overrides[id],
			);
			const _setOverride = useLiveContentStore((state) => state.setOverride);
			const openManager = useImageManagerStore((state) => state.openManager);
			const liveImg1Src = blockOverrides?.img1Src ?? img1Src;
			const liveImg2Src = blockOverrides?.img2Src ?? img2Src;

			const renderImage = (src: string, index: number) => {
				const handleClick = (e: React.MouseEvent) => {
					if (puck.isEditing) {
						e.preventDefault();
						openManager(id, `img${index}Src`, src);
					}
				};

				if (!src) {
					return (
						<div
							style={{
								width: "100%",
								height: fixedHeight || "150px",
								backgroundColor: "#f3f4f6",
								border: "2px dashed #cbd5e1",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								color: "#64748b",
								borderRadius: "4px",
								cursor: puck.isEditing ? "pointer" : "default",
							}}
							onClick={handleClick}
						>
							<span>🖼️ Add Image {index}</span>
						</div>
					);
				}

				return (
					<img
						src={src}
						alt={`Image ${index}`}
						style={{
							width: "100%",
							height: fixedHeight ? `${fixedHeight}px` : "auto",
							objectFit: fixedHeight ? "cover" : "initial",
							display: "block",
							cursor: puck.isEditing ? "pointer" : "default",
						}}
						onClick={handleClick}
					/>
				);
			};

			return (
				<div style={{ padding: `${padding}px`, backgroundColor: "#ffffff" }}>
					<table width="100%" cellPadding="0" cellSpacing="0" border={0}>
						<tbody>
							<tr>
								<td
									width="50%"
									valign="top"
									style={{ paddingRight: gutterVisible ? "5px" : "0" }}
								>
									{renderImage(liveImg1Src, 1)}
								</td>
								<td
									width="50%"
									valign="top"
									style={{ paddingLeft: gutterVisible ? "5px" : "0" }}
								>
									{renderImage(liveImg2Src, 2)}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			);
		},
	},
	TripleImageBlock: {
		fields: {
			img1Src: { type: "text" as const },
			img1Link: { type: "text" as const },
			img2Src: { type: "text" as const },
			img2Link: { type: "text" as const },
			img3Src: { type: "text" as const },
			img3Link: { type: "text" as const },
			gutterVisible: {
				type: "radio" as const,
				options: [
					{ label: "Yes", value: true },
					{ label: "No", value: false },
				],
			},
			fixedHeight: { type: "number" as const },
			padding: { type: "number" as const },
		},
		defaultProps: {
			img1Src: "",
			img1Link: "",
			img2Src: "",
			img2Link: "",
			img3Src: "",
			img3Link: "",
			gutterVisible: true,
			fixedHeight: 0,
			padding: 20,
		},
		render: ({
			img1Src,
			img2Src,
			img3Src,
			gutterVisible,
			fixedHeight,
			padding,
			id,
			puck,
		}: any) => {
			const blockOverrides = useLiveContentStore(
				(state) => state.overrides[id],
			);
			const _setOverride = useLiveContentStore((state) => state.setOverride);
			const openManager = useImageManagerStore((state) => state.openManager);
			const liveImg1Src = blockOverrides?.img1Src ?? img1Src;
			const liveImg2Src = blockOverrides?.img2Src ?? img2Src;
			const liveImg3Src = blockOverrides?.img3Src ?? img3Src;

			const renderImage = (src: string, index: number) => {
				const handleClick = (e: React.MouseEvent) => {
					if (puck.isEditing) {
						e.preventDefault();
						openManager(id, `img${index}Src`, src);
					}
				};

				if (!src) {
					return (
						<div
							style={{
								width: "100%",
								height: fixedHeight || "100px",
								backgroundColor: "#f3f4f6",
								border: "2px dashed #cbd5e1",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								color: "#64748b",
								borderRadius: "4px",
								cursor: puck.isEditing ? "pointer" : "default",
								fontSize: "12px",
							}}
							onClick={handleClick}
						>
							<span>🖼️ Add Image</span>
						</div>
					);
				}

				return (
					<img
						src={src}
						alt={`Image ${index}`}
						style={{
							width: "100%",
							height: fixedHeight ? `${fixedHeight}px` : "auto",
							objectFit: fixedHeight ? "cover" : "initial",
							display: "block",
							cursor: puck.isEditing ? "pointer" : "default",
						}}
						onClick={handleClick}
					/>
				);
			};

			return (
				<div style={{ padding: `${padding}px`, backgroundColor: "#ffffff" }}>
					<table width="100%" cellPadding="0" cellSpacing="0" border={0}>
						<tbody>
							<tr>
								<td
									width="33.33%"
									valign="top"
									style={{ paddingRight: gutterVisible ? "5px" : "0" }}
								>
									{renderImage(liveImg1Src, 1)}
								</td>
								<td
									width="33.33%"
									valign="top"
									style={{ padding: gutterVisible ? "0 2.5px" : "0" }}
								>
									{renderImage(liveImg2Src, 2)}
								</td>
								<td
									width="33.33%"
									valign="top"
									style={{ paddingLeft: gutterVisible ? "5px" : "0" }}
								>
									{renderImage(liveImg3Src, 3)}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			);
		},
	},
	Video: {
		fields: {
			src: { type: "text" as const, label: "Video URL (MP4 or YouTube embed)" },
			width: { type: "number" as const },
			padding: { type: "number" as const },
		},
		defaultProps: {
			src: "",
			width: 100,
			padding: 10,
		},
		render: ({ src, width, padding, id }: any) => {
			const blockOverrides = useLiveContentStore(
				(state) => state.overrides[id],
			);
			const liveSrc = blockOverrides?.src ?? src;

			if (!liveSrc) {
				return (
					<div style={{ padding: `${padding}px` }}>
						<div
							style={{
								width: `${width}%`,
								height: "200px",
								margin: "0 auto",
								backgroundColor: "#f3f4f6",
								border: "2px dashed #cbd5e1",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								color: "#64748b",
								borderRadius: "8px",
								fontFamily: "sans-serif",
								fontSize: "14px",
							}}
						>
							<span>🎥 Use sidebar to add Video URL</span>
						</div>
					</div>
				);
			}

			return (
				<div style={{ padding: `${padding}px`, textAlign: "center" }}>
					<iframe
						src={liveSrc}
						style={{
							width: `${width}%`,
							height: "300px",
							border: "none",
							borderRadius: "8px",
						}}
						allowFullScreen
					/>
				</div>
			);
		},
	},
};
