import { useLiveContentStore } from "../store/useLiveContentStore";
import { getContrastColor } from "../utils/colorUtils";

export const PresetBlocks = {
	EventInvitePreset: {
		fields: {
			eventName: { type: "text" as const },
			date: { type: "text" as const },
			time: { type: "text" as const },
			location: { type: "text" as const },
			description: { type: "textarea" as const },
			buttonText: { type: "text" as const },
			buttonLink: { type: "text" as const },
			buttonBgColor: { type: "text" as const },
			bgColor: { type: "text" as const },
			padding: { type: "number" as const },
		},
		defaultProps: {
			eventName: "Join Our Exclusive Webinar",
			date: "October 15, 2026",
			time: "10:00 AM PST",
			location: "Online (Zoom)",
			description:
				"Learn the latest strategies for maximizing your outreach and engagement. Reserve your spot today!",
			buttonText: "RSVP Now",
			buttonLink: "#",
			buttonBgColor: "#000000",
			bgColor: "#f8fafc",
			padding: 30,
		},
		render: ({
			eventName,
			date,
			time,
			location,
			description,
			buttonText,
			buttonLink,
			buttonBgColor,
			bgColor,
			padding,
			id,
			puck,
		}: any) => {
			const blockOverrides = useLiveContentStore(
				(state) => state.overrides[id],
			);
			const _setOverride = useLiveContentStore((state) => state.setOverride);
			const liveEventName = blockOverrides?.eventName ?? eventName;
			const liveDescription = blockOverrides?.description ?? description;
			const liveButtonText = blockOverrides?.buttonText ?? buttonText;
			const buttonTextColor = getContrastColor(buttonBgColor);

			return (
				<div
					style={{
						padding: `${padding}px`,
						backgroundColor: bgColor,
						borderRadius: "8px",
						textAlign: "center",
						fontFamily: "sans-serif",
					}}
				>
					<h2
						style={{ fontSize: "24px", color: "#0f172a", margin: "0 0 15px 0" }}
					>
						{liveEventName}
					</h2>

					<div
						style={{
							display: "inline-block",
							textAlign: "left",
							backgroundColor: "#ffffff",
							padding: "15px 25px",
							borderRadius: "6px",
							border: "1px solid #e2e8f0",
							marginBottom: "20px",
						}}
					>
						<p
							style={{
								margin: "0 0 8px 0",
								fontSize: "15px",
								color: "#334155",
							}}
						>
							📅 <strong>Date:</strong> {date}
						</p>
						<p
							style={{
								margin: "0 0 8px 0",
								fontSize: "15px",
								color: "#334155",
							}}
						>
							⏰ <strong>Time:</strong> {time}
						</p>
						<p style={{ margin: "0", fontSize: "15px", color: "#334155" }}>
							📍 <strong>Location:</strong> {location}
						</p>
					</div>

					<p
						style={{
							fontSize: "16px",
							color: "#475569",
							lineHeight: "1.5",
							margin: "0 0 20px 0",
							maxWidth: "500px",
							marginLeft: "auto",
							marginRight: "auto",
						}}
					>
						{liveDescription}
					</p>

					<a
						href={puck.isEditing ? undefined : buttonLink}
						style={{
							display: "inline-block",
							padding: "12px 24px",
							backgroundColor: buttonBgColor,
							color: buttonTextColor,
							textDecoration: "none",
							borderRadius: "4px",
							fontWeight: "bold",
							fontSize: "16px",
							cursor: "pointer",
						}}
						onClick={(e) => {
							if (puck.isEditing) e.preventDefault();
						}}
					>
						{liveButtonText}
					</a>
				</div>
			);
		},
	},

	PromoBannerPreset: {
		fields: {
			title: { type: "text" as const },
			subtitle: { type: "text" as const },
			discount: { type: "text" as const },
			buttonText: { type: "text" as const },
			buttonLink: { type: "text" as const },
			bgColor: { type: "text" as const },
			textColor: { type: "text" as const },
			padding: { type: "number" as const },
		},
		defaultProps: {
			title: "Summer Sale is Here!",
			subtitle: "Use code SUMMER26 at checkout",
			discount: "20% OFF",
			buttonText: "Shop Now",
			buttonLink: "#",
			bgColor: "#ef4444",
			textColor: "#ffffff",
			padding: 30,
		},
		render: ({
			title,
			subtitle,
			discount,
			buttonText,
			buttonLink,
			bgColor,
			textColor,
			padding,
			id,
			puck,
		}: any) => {
			const blockOverrides = useLiveContentStore(
				(state) => state.overrides[id],
			);
			const _setOverride = useLiveContentStore((state) => state.setOverride);
			const liveTitle = blockOverrides?.title ?? title;
			const liveSubtitle = blockOverrides?.subtitle ?? subtitle;
			const liveButtonText = blockOverrides?.buttonText ?? buttonText;
			const buttonBgColor = textColor;
			const buttonTextColor = bgColor;

			return (
				<div
					style={{
						padding: `${padding}px`,
						backgroundColor: bgColor,
						color: textColor,
						textAlign: "center",
						fontFamily: "sans-serif",
					}}
				>
					<div
						style={{
							display: "inline-block",
							border: `2px solid ${textColor}`,
							padding: "5px 15px",
							borderRadius: "20px",
							fontWeight: "bold",
							fontSize: "14px",
							marginBottom: "15px",
							letterSpacing: "1px",
						}}
					>
						{discount}
					</div>
					<h2
						style={{
							fontSize: "32px",
							margin: "0 0 10px 0",
							fontWeight: "900",
							textTransform: "uppercase",
						}}
					>
						{liveTitle}
					</h2>
					<p style={{ fontSize: "18px", margin: "0 0 20px 0", opacity: 0.9 }}>
						{liveSubtitle}
					</p>

					<a
						href={puck.isEditing ? undefined : buttonLink}
						style={{
							display: "inline-block",
							padding: "12px 30px",
							backgroundColor: buttonBgColor,
							color: buttonTextColor,
							textDecoration: "none",
							borderRadius: "30px",
							fontWeight: "bold",
							fontSize: "16px",
							textTransform: "uppercase",
							cursor: "pointer",
						}}
						onClick={(e) => {
							if (puck.isEditing) e.preventDefault();
						}}
					>
						{liveButtonText}
					</a>
				</div>
			);
		},
	},

	TestimonialPreset: {
		fields: {
			quote: { type: "textarea" as const },
			authorName: { type: "text" as const },
			authorRole: { type: "text" as const },
			avatarSrc: { type: "text" as const },
			rating: { type: "number" as const },
			bgColor: { type: "text" as const },
			padding: { type: "number" as const },
		},
		defaultProps: {
			quote:
				"This product completely transformed how our team works. We've seen a 40% increase in productivity since we started using it.",
			authorName: "Sarah Jenkins",
			authorRole: "Director of Operations, TechCorp",
			avatarSrc: "https://i.pravatar.cc/150?img=47",
			rating: 5,
			bgColor: "#ffffff",
			padding: 30,
		},
		render: ({
			quote,
			authorName,
			authorRole,
			avatarSrc,
			rating,
			bgColor,
			padding,
			id,
		}: any) => {
			const blockOverrides = useLiveContentStore(
				(state) => state.overrides[id],
			);
			const _setOverride = useLiveContentStore((state) => state.setOverride);
			const liveQuote = blockOverrides?.quote ?? quote;

			const stars = Array.from({ length: 5 }).map((_, i) => (
				<span
					key={i}
					style={{
						color: i < rating ? "#fbbf24" : "#e2e8f0",
						fontSize: "20px",
					}}
				>
					★
				</span>
			));

			return (
				<div
					style={{
						padding: `${padding}px`,
						backgroundColor: bgColor,
						borderRadius: "8px",
						border: "1px solid #e2e8f0",
						fontFamily: "sans-serif",
						maxWidth: "600px",
						margin: "0 auto",
					}}
				>
					<div style={{ marginBottom: "15px" }}>{stars}</div>
					<p
						style={{
							fontSize: "18px",
							color: "#1e293b",
							fontStyle: "italic",
							lineHeight: "1.6",
							margin: "0 0 20px 0",
						}}
					>
						"{liveQuote}"
					</p>
					<div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
						<img
							src={avatarSrc}
							alt={authorName}
							style={{
								width: "50px",
								height: "50px",
								borderRadius: "50%",
								objectFit: "cover",
							}}
						/>
						<div>
							<h4
								style={{
									margin: "0 0 4px 0",
									fontSize: "16px",
									color: "#0f172a",
								}}
							>
								{authorName}
							</h4>
							<p style={{ margin: "0", fontSize: "14px", color: "#64748b" }}>
								{authorRole}
							</p>
						</div>
					</div>
				</div>
			);
		},
	},

	FeatureAnnouncementPreset: {
		fields: {
			badgeText: { type: "text" as const },
			title: { type: "text" as const },
			description: { type: "textarea" as const },
			imageSrc: { type: "text" as const },
			buttonText: { type: "text" as const },
			buttonLink: { type: "text" as const },
			buttonBgColor: { type: "text" as const },
			bgColor: { type: "text" as const },
			padding: { type: "number" as const },
		},
		defaultProps: {
			badgeText: "New Feature",
			title: "Introducing Advanced Analytics",
			description:
				"Get deeper insights into your campaigns with our new advanced analytics dashboard. Track conversions, engagement, and ROI in real-time.",
			imageSrc: "https://picsum.photos/seed/analytics/600/400",
			buttonText: "Explore Analytics",
			buttonLink: "#",
			buttonBgColor: "#4f46e5",
			bgColor: "#ffffff",
			padding: 30,
		},
		render: ({
			badgeText,
			title,
			description,
			imageSrc,
			buttonText,
			buttonLink,
			buttonBgColor,
			bgColor,
			padding,
			id,
			puck,
		}: any) => {
			const blockOverrides = useLiveContentStore(
				(state) => state.overrides[id],
			);
			const _setOverride = useLiveContentStore((state) => state.setOverride);
			const liveTitle = blockOverrides?.title ?? title;
			const liveDescription = blockOverrides?.description ?? description;
			const liveButtonText = blockOverrides?.buttonText ?? buttonText;
			const buttonTextColor = getContrastColor(buttonBgColor);

			return (
				<div
					style={{
						padding: `${padding}px`,
						backgroundColor: bgColor,
						fontFamily: "sans-serif",
					}}
				>
					<div
						style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}
					>
						<div
							style={{
								display: "inline-block",
								backgroundColor: "#e0e7ff",
								color: "#4338ca",
								padding: "4px 12px",
								borderRadius: "16px",
								fontSize: "12px",
								fontWeight: "bold",
								textTransform: "uppercase",
								marginBottom: "15px",
								letterSpacing: "0.5px",
							}}
						>
							{badgeText}
						</div>
						<h2
							style={{
								fontSize: "28px",
								color: "#111827",
								margin: "0 0 15px 0",
								fontWeight: "bold",
							}}
						>
							{liveTitle}
						</h2>
						<p
							style={{
								fontSize: "16px",
								color: "#4b5563",
								lineHeight: "1.6",
								margin: "0 0 25px 0",
							}}
						>
							{liveDescription}
						</p>
						<img
							src={imageSrc}
							alt="Feature"
							style={{
								width: "100%",
								borderRadius: "8px",
								boxShadow:
									"0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
								marginBottom: "25px",
							}}
						/>
						<a
							href={puck.isEditing ? undefined : buttonLink}
							style={{
								display: "inline-block",
								padding: "12px 24px",
								backgroundColor: buttonBgColor,
								color: buttonTextColor,
								textDecoration: "none",
								borderRadius: "6px",
								fontWeight: "bold",
								fontSize: "16px",
								cursor: "pointer",
							}}
							onClick={(e) => {
								if (puck.isEditing) e.preventDefault();
							}}
						>
							{liveButtonText}
						</a>
					</div>
				</div>
			);
		},
	},
	GamifiedPopupPreset: {
		fields: {
			title: { type: "text" as const },
			subtitle: { type: "text" as const },
			buttonText: { type: "text" as const },
			bgColor: { type: "text" as const },
			textColor: { type: "text" as const },
			padding: { type: "number" as const },
		},
		defaultProps: {
			title: "Spin to Win!",
			subtitle:
				"Enter your email for a chance to win up to 50% off your next order.",
			buttonText: "Try My Luck",
			bgColor: "#4f46e5",
			textColor: "#ffffff",
			padding: 40,
		},
		render: ({
			title,
			subtitle,
			buttonText,
			bgColor,
			textColor,
			padding,
			id,
			puck,
		}: any) => {
			const blockOverrides = useLiveContentStore(
				(state) => state.overrides[id],
			);
			const liveTitle = blockOverrides?.title ?? title;
			const liveSubtitle = blockOverrides?.subtitle ?? subtitle;
			const liveButtonText = blockOverrides?.buttonText ?? buttonText;

			return (
				<div
					style={{
						padding: `${padding}px`,
						backgroundColor: bgColor,
						color: textColor,
						textAlign: "center",
						fontFamily: "sans-serif",
						borderRadius: "12px",
						position: "relative",
						overflow: "hidden",
					}}
				>
					{/* Decorative background elements */}
					<div
						style={{
							position: "absolute",
							top: "-20px",
							left: "-20px",
							width: "100px",
							height: "100px",
							borderRadius: "50%",
							background: "rgba(255,255,255,0.1)",
						}}
					></div>
					<div
						style={{
							position: "absolute",
							bottom: "-40px",
							right: "-20px",
							width: "150px",
							height: "150px",
							borderRadius: "50%",
							background: "rgba(255,255,255,0.1)",
						}}
					></div>

					<div style={{ position: "relative", zIndex: 1 }}>
						<div style={{ fontSize: "64px", marginBottom: "10px" }}>🎡</div>
						<h2
							style={{
								fontSize: "36px",
								margin: "0 0 15px 0",
								fontWeight: "900",
							}}
						>
							{liveTitle}
						</h2>
						<p
							style={{
								fontSize: "16px",
								margin: "0 auto 25px auto",
								maxWidth: "80%",
								opacity: 0.9,
								lineHeight: "1.5",
							}}
						>
							{liveSubtitle}
						</p>

						<div
							style={{
								display: "flex",
								flexDirection: "column",
								gap: "10px",
								maxWidth: "300px",
								margin: "0 auto",
							}}
						>
							<input
								type="email"
								placeholder="Enter your email address"
								style={{
									padding: "12px 15px",
									borderRadius: "6px",
									border: "none",
									fontSize: "16px",
									width: "100%",
									boxSizing: "border-box",
								}}
								disabled={puck.isEditing}
							/>
							<button
								style={{
									padding: "14px 20px",
									backgroundColor: "#f59e0b",
									color: "#ffffff",
									border: "none",
									borderRadius: "6px",
									fontWeight: "bold",
									fontSize: "18px",
									cursor: puck.isEditing ? "default" : "pointer",
									textTransform: "uppercase",
									letterSpacing: "1px",
									boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
								}}
								onClick={(e) => {
									if (puck.isEditing) e.preventDefault();
								}}
							>
								{liveButtonText}
							</button>
						</div>
						<div style={{ marginTop: "15px", fontSize: "12px", opacity: 0.7 }}>
							<a
								href="#"
								style={{ color: "inherit", textDecoration: "underline" }}
								onClick={(e) => e.preventDefault()}
							>
								No thanks, I don't want to win
							</a>
						</div>
					</div>
				</div>
			);
		},
	},
};
