import { X } from "lucide-react";
import { useState } from "react";

interface TemplateGalleryModalProps {
	showGallery: boolean;
	setShowGallery: (show: boolean) => void;
	outputType: "email" | "standaloneHtml" | "json";
	onSelectTemplate: (templateData: any) => void;
}

export function TemplateGalleryModal({
	showGallery,
	setShowGallery,
	outputType,
	onSelectTemplate,
}: TemplateGalleryModalProps) {
	const [confirmingId, setConfirmingId] = useState<string | null>(null);

	if (!showGallery) return null;

	const emailTemplates = [
		{
			id: "welcome",
			name: "Welcome Email",
			description: "A friendly welcome email for new signups.",
			thumbnail:
				"https://images.unsplash.com/photo-1577563908411-50cb98976fea?auto=format&fit=crop&w=400&q=80",
			data: {
				content: [
					{
						type: "LogoBlock",
						props: {
							id: "logo-1",
							src: "https://picsum.photos/seed/logo/200/50",
							alt: "Company Logo",
							width: "M",
							align: "center",
							padding: 20,
							transparentBg: true,
						},
					},
					{
						type: "TitleBlock",
						props: {
							id: "title-1",
							text: "Welcome to our platform!",
							color: "#1f2937",
							fontSize: 32,
							align: "center",
							padding: 10,
						},
					},
					{
						type: "TextBlock",
						props: {
							id: "text-1",
							content:
								"We're thrilled to have you on board. Get started by exploring our features.",
							color: "#4b5563",
							fontSize: 16,
							align: "center",
							padding: 10,
							lineHeight: 1.5,
							letterSpacing: 0,
							fontFamily: "Arial, sans-serif",
						},
					},
					{
						type: "CTAButton",
						props: {
							id: "btn-1",
							text: "Get Started",
							link: "#",
							bgColor: "#4f46e5",
							borderRadius: 6,
							padding: 20,
							align: "center",
						},
					},
					{
						type: "Divider",
						props: { id: "div-1", color: "#e5e7eb", thickness: 1, padding: 20 },
					},
					{
						type: "FooterBlock",
						props: {
							id: "footer-1",
							content: "© 2026 Company Inc. All rights reserved.",
							padding: 20,
						},
					},
				],
				root: {
					props: {
						title: "Welcome Email",
						backgroundColor: "#f9fafb",
						fontFamily: "Arial, sans-serif",
						textColor: "#1f2937",
					},
				},
				zones: {},
			},
		},
		{
			id: "promo",
			name: "Promotional Offer",
			description: "Announce a sale or special discount.",
			thumbnail:
				"https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=400&q=80",
			data: {
				content: [
					{
						type: "HeroLayout",
						props: {
							id: "hero-1",
							bgImage:
								"https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=800&q=80",
							bgColor: "#000000",
							padding: 40,
							minHeight: 300,
						},
					},
					{
						type: "SpacerBlock",
						props: { id: "spacer-1", size: 20, transparentBg: true },
					},
					{
						type: "DoubleImageBlock",
						props: {
							id: "images-1",
							img1Src:
								"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80",
							img1Link: "#",
							img2Src:
								"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80",
							img2Link: "#",
							gutterVisible: true,
							fixedHeight: 200,
							padding: 20,
						},
					},
					{
						type: "FooterBlock",
						props: {
							id: "footer-1",
							content: "Unsubscribe from these emails.",
							padding: 20,
						},
					},
				],
				root: {
					props: {
						title: "Spring Sale",
						backgroundColor: "#ffffff",
						fontFamily: "Helvetica, sans-serif",
						textColor: "#000000",
					},
				},
				zones: {
					"hero-1:hero-content": [
						{
							type: "TitleBlock",
							props: {
								id: "title-1",
								text: "50% OFF EVERYTHING",
								color: "#ffffff",
								fontSize: 48,
								align: "center",
								padding: 10,
							},
						},
						{
							type: "CTAButton",
							props: {
								id: "btn-1",
								text: "Shop the Sale",
								link: "#",
								bgColor: "#ef4444",
								borderRadius: 0,
								padding: 20,
								align: "center",
							},
						},
					],
				},
			},
		},
		{
			id: "newsletter",
			name: "Monthly Newsletter",
			description: "Share updates, articles, and news.",
			thumbnail:
				"https://images.unsplash.com/photo-1585241936939-82bc563b7173?auto=format&fit=crop&w=400&q=80",
			data: {
				content: [
					{
						type: "PreheaderBlock",
						props: {
							id: "pre-1",
							previewText: "This month's top stories...",
							webVersionLink: "#",
							unsubscribeLink: "#",
							padding: 10,
						},
					},
					{
						type: "LogoBlock",
						props: {
							id: "logo-1",
							src: "https://picsum.photos/seed/news/200/50",
							alt: "News Logo",
							width: "M",
							align: "center",
							padding: 20,
							transparentBg: true,
						},
					},
					{
						type: "SingleArticleBlock",
						props: {
							id: "article-1",
							imageSrc:
								"https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=600&q=80",
							imageWidth: "Full",
							title: "The Future of Design",
							text: "Explore the latest trends in UI/UX design for 2026.",
							buttonText: "Read More",
							buttonLink: "#",
							buttonBgColor: "#111827",
							padding: 20,
						},
					},
					{
						type: "Divider",
						props: { id: "div-1", color: "#e5e7eb", thickness: 1, padding: 20 },
					},
					{
						type: "SideArticleBlock",
						props: {
							id: "article-2",
							imageSrc:
								"https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=300&q=80",
							imagePos: "left",
							imageWidth: "M",
							title: "Tech Updates",
							text: "New features released this week.",
							buttonText: "View",
							buttonLink: "#",
							buttonBgColor: "#111827",
							padding: 20,
						},
					},
					{
						type: "SocialBlock",
						props: {
							id: "social-1",
							iconType: "colors",
							networks: "facebook,twitter,instagram",
							align: "center",
							padding: 20,
						},
					},
				],
				root: {
					props: {
						title: "Monthly Newsletter",
						backgroundColor: "#f3f4f6",
						fontFamily: "Georgia, serif",
						textColor: "#1f2937",
					},
				},
				zones: {},
			},
		},
		{
			id: "abandoned-cart",
			name: "Abandoned Cart",
			description: "Remind users of items left in their cart.",
			thumbnail:
				"https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=400&q=80",
			data: {
				content: [
					{
						type: "LogoBlock",
						props: {
							id: "logo-1",
							src: "https://picsum.photos/seed/shop/200/50",
							alt: "Shop Logo",
							width: "M",
							align: "center",
							padding: 20,
							transparentBg: true,
						},
					},
					{
						type: "TitleBlock",
						props: {
							id: "title-1",
							text: "Did you forget something?",
							color: "#1f2937",
							fontSize: 28,
							align: "center",
							padding: 10,
						},
					},
					{
						type: "TextBlock",
						props: {
							id: "text-1",
							content:
								"We noticed you left some great items in your cart. Complete your purchase before they sell out!",
							color: "#4b5563",
							fontSize: 16,
							align: "center",
							padding: 10,
							lineHeight: 1.5,
							letterSpacing: 0,
							fontFamily: "Arial, sans-serif",
						},
					},
					{
						type: "SideArticleBlock",
						props: {
							id: "article-1",
							imageSrc:
								"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80",
							imagePos: "left",
							imageWidth: "M",
							title: "Premium Wireless Headphones",
							text: "$199.99",
							buttonText: "Return to Cart",
							buttonLink: "#",
							buttonBgColor: "#4f46e5",
							padding: 20,
						},
					},
					{
						type: "Divider",
						props: { id: "div-1", color: "#e5e7eb", thickness: 1, padding: 20 },
					},
					{
						type: "FooterBlock",
						props: {
							id: "footer-1",
							content: "© 2026 Shop Inc. All rights reserved.",
							padding: 20,
						},
					},
				],
				root: {
					props: {
						title: "Abandoned Cart",
						backgroundColor: "#ffffff",
						fontFamily: "Arial, sans-serif",
						textColor: "#1f2937",
					},
				},
				zones: {},
			},
		},
		{
			id: "event-invite",
			name: "Event Invitation",
			description: "Invite users to a webinar or live event.",
			thumbnail:
				"https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=400&q=80",
			data: {
				content: [
					{
						type: "HeroLayout",
						props: {
							id: "hero-1",
							bgImage:
								"https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
							bgColor: "#1e3a8a",
							padding: 40,
							minHeight: 250,
						},
					},
					{
						type: "TitleBlock",
						props: {
							id: "title-1",
							text: "Join our Annual Tech Summit",
							color: "#1f2937",
							fontSize: 28,
							align: "center",
							padding: 20,
						},
					},
					{
						type: "TextBlock",
						props: {
							id: "text-1",
							content:
								"Discover the latest innovations and network with industry leaders. Save your spot today!",
							color: "#4b5563",
							fontSize: 16,
							align: "center",
							padding: 10,
							lineHeight: 1.5,
							letterSpacing: 0,
							fontFamily: "Arial, sans-serif",
						},
					},
					{
						type: "CTAButton",
						props: {
							id: "btn-1",
							text: "Register Now",
							link: "#",
							bgColor: "#1e3a8a",
							borderRadius: 4,
							padding: 20,
							align: "center",
						},
					},
					{
						type: "FooterBlock",
						props: {
							id: "footer-1",
							content: "Unsubscribe from event updates.",
							padding: 20,
						},
					},
				],
				root: {
					props: {
						title: "Event Invitation",
						backgroundColor: "#f8fafc",
						fontFamily: "Helvetica, sans-serif",
						textColor: "#1f2937",
					},
				},
				zones: {
					"hero-1:hero-content": [
						{
							type: "TitleBlock",
							props: {
								id: "title-hero",
								text: "TECH SUMMIT 2026",
								color: "#ffffff",
								fontSize: 40,
								align: "center",
								padding: 10,
							},
						},
						{
							type: "TextBlock",
							props: {
								id: "text-hero",
								content: "October 15-17 | Virtual Event",
								color: "#e2e8f0",
								fontSize: 18,
								align: "center",
								padding: 10,
								lineHeight: 1.5,
								letterSpacing: 2,
								fontFamily: "Arial, sans-serif",
							},
						},
					],
				},
			},
		},
	];

	const onsiteTemplates = [
		{
			id: "announcement",
			name: "Announcement Banner",
			description: "A simple banner for site-wide announcements.",
			thumbnail:
				"https://images.unsplash.com/photo-1588600878108-578307a3cc9d?auto=format&fit=crop&w=400&q=80",
			data: {
				content: [
					{
						type: "Section",
						props: { id: "sec-1", bgColor: "#4f46e5", padding: 10 },
					},
				],
				root: {
					props: {
						title: "Announcement",
						backgroundColor: "transparent",
						fontFamily: "Arial, sans-serif",
						textColor: "#ffffff",
					},
				},
				zones: {
					"sec-1:content": [
						{
							type: "TextBlock",
							props: {
								id: "text-1",
								content:
									"🎉 Big news! We just launched our new feature. **Learn more ->**",
								color: "#ffffff",
								fontSize: 14,
								align: "center",
								padding: 5,
								lineHeight: 1.5,
								letterSpacing: 0,
								fontFamily: "Arial, sans-serif",
							},
						},
					],
				},
			},
		},
		{
			id: "discount-popup",
			name: "Discount Popup",
			description: "A centered popup offering a discount code.",
			thumbnail:
				"https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=400&q=80",
			data: {
				content: [
					{
						type: "Section",
						props: { id: "sec-1", bgColor: "#ffffff", padding: 30 },
					},
				],
				root: {
					props: {
						title: "Discount Popup",
						backgroundColor: "transparent",
						fontFamily: "Helvetica, sans-serif",
						textColor: "#1f2937",
					},
				},
				zones: {
					"sec-1:content": [
						{
							type: "TitleBlock",
							props: {
								id: "title-1",
								text: "Get 20% Off",
								color: "#111827",
								fontSize: 32,
								align: "center",
								padding: 10,
							},
						},
						{
							type: "TextBlock",
							props: {
								id: "text-1",
								content:
									"Sign up for our newsletter and receive a 20% discount on your first order.",
								color: "#4b5563",
								fontSize: 16,
								align: "center",
								padding: 10,
								lineHeight: 1.5,
								letterSpacing: 0,
								fontFamily: "Arial, sans-serif",
							},
						},
						{
							type: "CTAButton",
							props: {
								id: "btn-1",
								text: "Claim Discount",
								link: "#",
								bgColor: "#000000",
								borderRadius: 8,
								padding: 20,
								align: "center",
							},
						},
						{
							type: "TextBlock",
							props: {
								id: "text-2",
								content: "No thanks, I prefer paying full price.",
								color: "#9ca3af",
								fontSize: 12,
								align: "center",
								padding: 10,
								lineHeight: 1.5,
								letterSpacing: 0,
								fontFamily: "Arial, sans-serif",
							},
						},
					],
				},
			},
		},
		{
			id: "feature-update",
			name: "Feature Update Modal",
			description: "Highlight a new feature with an image and text.",
			thumbnail:
				"https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80",
			data: {
				content: [
					{
						type: "Section",
						props: { id: "sec-1", bgColor: "#ffffff", padding: 0 },
					},
				],
				root: {
					props: {
						title: "Feature Update",
						backgroundColor: "transparent",
						fontFamily: "Arial, sans-serif",
						textColor: "#1f2937",
					},
				},
				zones: {
					"sec-1:content": [
						{
							type: "Image",
							props: {
								id: "img-1",
								src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80",
								alt: "New Feature",
								width: "Full",
								align: "center",
								padding: 0,
							},
						},
						{
							type: "SpacerBlock",
							props: { id: "spacer-1", size: 20, transparentBg: true },
						},
						{
							type: "TitleBlock",
							props: {
								id: "title-1",
								text: "Introducing Analytics 2.0",
								color: "#1f2937",
								fontSize: 24,
								align: "left",
								padding: 20,
							},
						},
						{
							type: "TextBlock",
							props: {
								id: "text-1",
								content:
									"Get deeper insights into your data with our completely redesigned analytics dashboard.",
								color: "#4b5563",
								fontSize: 16,
								align: "left",
								padding: 20,
								lineHeight: 1.5,
								letterSpacing: 0,
								fontFamily: "Arial, sans-serif",
							},
						},
						{
							type: "CTAButton",
							props: {
								id: "btn-1",
								text: "Try it now",
								link: "#",
								bgColor: "#2563eb",
								borderRadius: 6,
								padding: 20,
								align: "left",
							},
						},
					],
				},
			},
		},
		{
			id: "feedback",
			name: "Feedback Request",
			description: "Ask users for their feedback or rating.",
			thumbnail:
				"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80",
			data: {
				content: [
					{
						type: "Section",
						props: { id: "sec-1", bgColor: "#f8fafc", padding: 30 },
					},
				],
				root: {
					props: {
						title: "Feedback",
						backgroundColor: "transparent",
						fontFamily: "Arial, sans-serif",
						textColor: "#1f2937",
					},
				},
				zones: {
					"sec-1:content": [
						{
							type: "TitleBlock",
							props: {
								id: "title-1",
								text: "How are we doing?",
								color: "#1e293b",
								fontSize: 24,
								align: "center",
								padding: 10,
							},
						},
						{
							type: "TextBlock",
							props: {
								id: "text-1",
								content:
									"We'd love to hear your thoughts on your recent experience.",
								color: "#64748b",
								fontSize: 16,
								align: "center",
								padding: 10,
								lineHeight: 1.5,
								letterSpacing: 0,
								fontFamily: "Arial, sans-serif",
							},
						},
						{
							type: "RatingBlock",
							props: {
								id: "rating-1",
								scale: 5,
								activeColor: "#fbbf24",
								inactiveColor: "#e2e8f0",
								align: "center",
								padding: 20,
							},
						},
						{
							type: "CTAButton",
							props: {
								id: "btn-1",
								text: "Submit Feedback",
								link: "#",
								bgColor: "#334155",
								borderRadius: 4,
								padding: 10,
								align: "center",
							},
						},
					],
				},
			},
		},
	];

	const templates = outputType === "email" ? emailTemplates : onsiteTemplates;

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
			<div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden">
				<div className="flex items-center justify-between p-6 border-b border-gray-100">
					<div>
						<h2 className="text-2xl font-semibold text-gray-900">
							{outputType === "email"
								? "Email Templates"
								: "Onsite Push Templates"}
						</h2>
						<p className="text-sm text-gray-500 mt-1">
							Choose a starting point for your design.
						</p>
					</div>
					<button
						onClick={() => {
							setShowGallery(false);
							setConfirmingId(null);
						}}
						className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
					>
						<X size={24} />
					</button>
				</div>

				<div className="p-6 overflow-y-auto flex-1 bg-gray-50">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{templates.map((template) => (
							<div
								key={template.id}
								className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer group flex flex-col"
								onClick={() => {
									if (confirmingId === template.id) {
										onSelectTemplate(template.data);
										setShowGallery(false);
										setConfirmingId(null);
									} else {
										setConfirmingId(template.id);
									}
								}}
							>
								<div className="h-48 overflow-hidden relative">
									<img
										src={template.thumbnail}
										alt={template.name}
										className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
									/>
									<div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

									{confirmingId === template.id && (
										<div className="absolute inset-0 bg-blue-600/90 flex flex-col items-center justify-center text-white p-4 text-center animate-in fade-in duration-200">
											<p className="font-medium mb-3">
												This will replace your current canvas.
											</p>
											<p className="text-sm opacity-90 mb-4">Are you sure?</p>
											<div className="flex gap-3">
												<button
													className="px-4 py-2 bg-white text-blue-600 rounded-md font-medium text-sm hover:bg-blue-50 transition-colors"
													onClick={(e) => {
														e.stopPropagation();
														onSelectTemplate(template.data);
														setShowGallery(false);
														setConfirmingId(null);
													}}
												>
													Yes, Load
												</button>
												<button
													className="px-4 py-2 bg-blue-700 text-white rounded-md font-medium text-sm hover:bg-blue-800 transition-colors"
													onClick={(e) => {
														e.stopPropagation();
														setConfirmingId(null);
													}}
												>
													Cancel
												</button>
											</div>
										</div>
									)}
								</div>
								<div className="p-4 flex-1 flex flex-col">
									<h3 className="text-lg font-medium text-gray-900">
										{template.name}
									</h3>
									<p className="text-sm text-gray-500 mt-1 flex-1">
										{template.description}
									</p>
									<button
										className={`mt-4 w-full py-2 font-medium rounded-lg transition-colors ${
											confirmingId === template.id
												? "bg-blue-600 text-white"
												: "bg-gray-50 text-blue-600 group-hover:bg-blue-50"
										}`}
									>
										{confirmingId === template.id
											? "Click to Confirm"
											: "Use Template"}
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
