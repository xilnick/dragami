import { DropZone } from "@measured/puck";

export const LayoutBlocks = {
	Section: {
		fields: {
			backgroundColor: { type: "text" as const },
			padding: { type: "number" as const },
		},
		defaultProps: {
			backgroundColor: "#ffffff",
			padding: 20,
		},
		render: ({ backgroundColor, padding }: any) => (
			<div style={{ backgroundColor, padding: `${padding}px` }}>
				<DropZone zone="content" />
			</div>
		),
	},
	Columns: {
		fields: {
			columnCount: { type: "number" as const },
			gutter: { type: "number" as const },
			backgroundColor: { type: "text" as const },
			padding: { type: "number" as const },
		},
		defaultProps: {
			columnCount: 2,
			gutter: 20,
			backgroundColor: "transparent",
			padding: 10,
		},
		render: ({ columnCount, gutter, backgroundColor, padding }: any) => {
			return (
				<div
					style={{
						display: "flex",
						gap: `${gutter}px`,
						padding: `${padding}px`,
						backgroundColor,
					}}
				>
					{Array.from({ length: columnCount }).map((_, i) => (
						<div key={i} style={{ flex: 1, minWidth: 0 }}>
							<DropZone zone={`column-${i}`} />
						</div>
					))}
				</div>
			);
		},
	},
	HeroLayout: {
		fields: {
			bgImage: { type: "text" as const, label: "Background Image URL" },
			bgColor: { type: "text" as const },
			padding: { type: "number" as const },
			minHeight: { type: "number" as const },
		},
		defaultProps: {
			bgImage: "",
			bgColor: "#f4f4f4",
			padding: 40,
			minHeight: 300,
		},
		render: ({ bgImage, bgColor, padding, minHeight }: any) => (
			<div
				style={{
					backgroundColor: bgColor,
					backgroundImage: bgImage ? `url(${bgImage})` : "none",
					backgroundSize: "cover",
					backgroundPosition: "center",
					padding: `${padding}px`,
					minHeight: `${minHeight}px`,
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
				}}
			>
				<DropZone zone="hero-content" />
			</div>
		),
	},
	SpacerBlock: {
		fields: {
			size: { type: "number" as const },
			transparentBg: {
				type: "radio" as const,
				options: [
					{ label: "Yes", value: true },
					{ label: "No", value: false },
				],
			},
		},
		defaultProps: {
			size: 20,
			transparentBg: true,
		},
		render: ({ size, transparentBg }: any) => (
			<div
				style={{
					height: `${size}px`,
					backgroundColor: transparentBg ? "transparent" : "#ffffff",
					width: "100%",
				}}
			/>
		),
	},
	Divider: {
		fields: {
			color: { type: "text" as const },
			thickness: { type: "number" as const },
			padding: { type: "number" as const },
		},
		defaultProps: {
			color: "#e5e7eb",
			thickness: 1,
			padding: 20,
		},
		render: ({ color, thickness, padding }: any) => (
			<div style={{ padding: `${padding}px` }}>
				<hr
					style={{
						border: "none",
						borderTop: `${thickness}px solid ${color}`,
						margin: 0,
					}}
				/>
			</div>
		),
	},
};
