export const getComponentDescription = (name: string): string => {
	switch (name) {
		case "Section":
			return "A full-width container for other blocks.";
		case "Columns":
			return "A multi-column layout for side-by-side content.";
		case "HeroLayout":
			return "A large banner area with background image and content.";
		case "SpacerBlock":
			return "Adds vertical space between blocks.";
		case "TitleBlock":
			return "A prominent heading text block.";
		case "TextBlock":
			return "A standard paragraph text block.";
		case "Image":
			return "A single image element.";
		case "LogoBlock":
			return "A specialized block for company logos.";
		case "DoubleImageBlock":
			return "Two images displayed side-by-side.";
		case "TripleImageBlock":
			return "Three images displayed side-by-side.";
		case "CTAButton":
			return "A call-to-action button.";
		case "Divider":
			return "A horizontal line to separate content.";
		case "RawHTML":
			return "Custom HTML code block.";
		case "Video":
			return "An embedded video player.";
		case "SingleArticleBlock":
			return "An article with a large image, title, text, and button.";
		case "SideArticleBlock":
			return "An article with an image on the side of the text.";
		case "DoubleArticleBlock":
			return "Two article blocks side-by-side.";
		case "TripleArticleBlock":
			return "Three article blocks side-by-side.";
		case "PreheaderBlock":
			return "Hidden preview text and view-in-browser links.";
		case "FooterBlock":
			return "Standard footer with unsubscribe links.";
		case "SocialBlock":
			return "Social media icon links.";
		case "ConversationBlock":
			return "A smart conversation or testimonial block.";
		case "LegalPreviewBlock":
			return "A refined image block for legal previews.";
		case "RatingBlock":
			return "A 1-5 star or 0-10 NPS rating block.";
		default:
			return "A building block for your layout.";
	}
};

export const ComponentPreview = ({ name }: { name: string }) => {
	switch (name) {
		case "Section":
			return (
				<div className="w-full h-24 bg-gray-50 flex items-center justify-center p-2">
					<div className="w-full h-full border-2 border-dashed border-gray-300 rounded bg-white flex items-center justify-center">
						<div className="w-12 h-2 bg-gray-200 rounded"></div>
					</div>
				</div>
			);
		case "Columns":
			return (
				<div className="w-full h-24 bg-white flex items-center justify-center p-2 gap-2">
					<div className="flex-1 h-full bg-gray-50 border border-dashed border-gray-300 rounded flex items-center justify-center">
						<div className="w-6 h-2 bg-gray-200 rounded"></div>
					</div>
					<div className="flex-1 h-full bg-gray-50 border border-dashed border-gray-300 rounded flex items-center justify-center">
						<div className="w-6 h-2 bg-gray-200 rounded"></div>
					</div>
				</div>
			);
		case "HeroLayout":
			return (
				<div className="w-full h-24 bg-white flex items-center justify-center p-2">
					<div className="w-full h-full bg-gray-50 border border-dashed border-gray-300 rounded flex flex-col items-center justify-center gap-2">
						<div className="w-16 h-2 bg-gray-300 rounded"></div>
						<div className="w-24 h-1.5 bg-gray-200 rounded"></div>
						<div className="w-12 h-3 bg-gray-300 rounded mt-1"></div>
					</div>
				</div>
			);
		case "SpacerBlock":
			return (
				<div className="w-full h-24 bg-white flex items-center justify-center p-2">
					<div className="w-full h-8 border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center rounded">
						<div className="w-4 h-4 text-gray-400 flex items-center justify-center text-[10px]">
							↕
						</div>
					</div>
				</div>
			);
		case "TitleBlock":
			return (
				<div className="w-full h-24 bg-white flex flex-col justify-center p-4 gap-2">
					<div className="w-3/4 h-3 bg-gray-400 rounded"></div>
					<div className="w-1/2 h-3 bg-gray-400 rounded"></div>
				</div>
			);
		case "TextBlock":
			return (
				<div className="w-full h-24 bg-white flex flex-col justify-center p-4 gap-1.5">
					<div className="w-full h-1.5 bg-gray-300 rounded"></div>
					<div className="w-full h-1.5 bg-gray-300 rounded"></div>
					<div className="w-5/6 h-1.5 bg-gray-300 rounded"></div>
					<div className="w-4/6 h-1.5 bg-gray-300 rounded"></div>
				</div>
			);
		case "Image":
			return (
				<div className="w-full h-24 bg-white flex items-center justify-center p-2">
					<div className="w-full h-full bg-gray-50 border border-dashed border-gray-300 rounded flex items-center justify-center">
						<div className="w-6 h-6 border-2 border-gray-300 rounded-sm transform rotate-45"></div>
					</div>
				</div>
			);
		case "LogoBlock":
			return (
				<div className="w-full h-24 bg-white flex items-center justify-center p-4">
					<div className="w-12 h-12 bg-gray-50 border border-dashed border-gray-300 rounded flex items-center justify-center">
						<div className="w-4 h-4 bg-gray-300 rounded-sm"></div>
					</div>
				</div>
			);
		case "DoubleImageBlock":
			return (
				<div className="w-full h-24 bg-white flex items-center justify-center p-2 gap-2">
					<div className="flex-1 h-full bg-gray-50 border border-dashed border-gray-300 rounded"></div>
					<div className="flex-1 h-full bg-gray-50 border border-dashed border-gray-300 rounded"></div>
				</div>
			);
		case "TripleImageBlock":
			return (
				<div className="w-full h-24 bg-white flex items-center justify-center p-2 gap-1.5">
					<div className="flex-1 h-full bg-gray-50 border border-dashed border-gray-300 rounded"></div>
					<div className="flex-1 h-full bg-gray-50 border border-dashed border-gray-300 rounded"></div>
					<div className="flex-1 h-full bg-gray-50 border border-dashed border-gray-300 rounded"></div>
				</div>
			);
		case "CTAButton":
			return (
				<div className="w-full h-24 bg-white flex items-center justify-center p-4">
					<div className="px-5 py-2.5 bg-gray-100 border border-gray-300 rounded-md flex items-center justify-center">
						<div className="w-12 h-1.5 bg-gray-400 rounded"></div>
					</div>
				</div>
			);
		case "Divider":
			return (
				<div className="w-full h-24 bg-white flex items-center justify-center p-4">
					<div className="w-full h-px bg-gray-300"></div>
				</div>
			);
		case "RawHTML":
			return (
				<div className="w-full h-24 bg-white flex flex-col items-start justify-center p-4 gap-1.5 border border-dashed border-gray-300 rounded m-2 w-[calc(100%-16px)]">
					<div className="w-8 h-1.5 bg-gray-300 rounded"></div>
					<div className="w-12 h-1.5 bg-gray-200 rounded ml-2"></div>
					<div className="w-8 h-1.5 bg-gray-300 rounded"></div>
				</div>
			);
		case "ConversationBlock":
			return (
				<div className="w-full h-24 bg-white flex flex-col justify-center p-2 gap-2">
					<div className="self-end w-3/4 h-6 bg-gray-100 border border-gray-200 rounded-lg rounded-br-sm flex items-center px-2">
						<div className="w-1/2 h-1.5 bg-gray-300 rounded"></div>
					</div>
					<div className="self-start w-3/4 h-6 bg-gray-50 border border-gray-200 rounded-lg rounded-bl-sm flex items-center px-2">
						<div className="w-2/3 h-1.5 bg-gray-300 rounded"></div>
					</div>
				</div>
			);
		case "LegalPreviewBlock":
			return (
				<div className="w-full h-24 bg-white flex flex-col items-center justify-center p-2 gap-1">
					<div className="w-3/4 h-12 bg-gray-50 border border-gray-200 rounded flex items-center justify-center">
						<div className="w-6 h-6 bg-gray-200 rounded-sm"></div>
					</div>
					<div className="w-1/2 h-1 bg-gray-300 rounded"></div>
				</div>
			);
		case "RatingBlock":
			return (
				<div className="w-full h-24 bg-white flex flex-col items-center justify-center p-2 gap-2">
					<div className="w-1/2 h-2 bg-gray-400 rounded"></div>
					<div className="flex gap-1">
						{[1, 2, 3, 4, 5].map((i) => (
							<div
								key={i}
								className="w-4 h-4 bg-yellow-100 border border-yellow-200 rounded-sm flex items-center justify-center"
							>
								<div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
							</div>
						))}
					</div>
				</div>
			);
		case "Video":
			return (
				<div className="w-full h-24 bg-white flex items-center justify-center p-2">
					<div className="w-full h-full bg-gray-50 border border-dashed border-gray-300 rounded flex items-center justify-center relative">
						<div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
							<div className="w-0 h-0 border-t-[4px] border-t-transparent border-l-[6px] border-l-gray-400 border-b-[4px] border-b-transparent ml-1"></div>
						</div>
					</div>
				</div>
			);
		case "SingleArticleBlock":
			return (
				<div className="w-full h-24 bg-white flex flex-col p-2 gap-2 border border-gray-200 rounded m-2 w-[calc(100%-16px)]">
					<div className="w-full h-8 bg-gray-50 border border-dashed border-gray-300 rounded"></div>
					<div className="w-3/4 h-2 bg-gray-400 rounded"></div>
					<div className="w-full h-1.5 bg-gray-300 rounded"></div>
					<div className="w-1/3 h-2 bg-gray-300 rounded mt-auto"></div>
				</div>
			);
		case "SideArticleBlock":
			return (
				<div className="w-full h-24 bg-white flex p-2 gap-2 border border-gray-200 rounded m-2 w-[calc(100%-16px)]">
					<div className="w-12 h-full bg-gray-50 border border-dashed border-gray-300 rounded flex-shrink-0"></div>
					<div className="flex flex-col gap-1.5 flex-1 py-1">
						<div className="w-full h-2 bg-gray-400 rounded"></div>
						<div className="w-full h-1.5 bg-gray-300 rounded"></div>
						<div className="w-4/5 h-1.5 bg-gray-300 rounded"></div>
						<div className="w-1/2 h-2 bg-gray-300 rounded mt-auto"></div>
					</div>
				</div>
			);
		case "DoubleArticleBlock":
			return (
				<div className="w-full h-24 bg-white flex p-2 gap-2">
					<div className="flex-1 flex flex-col gap-1.5 border border-gray-200 rounded p-1.5">
						<div className="w-full h-6 bg-gray-50 border border-dashed border-gray-300 rounded"></div>
						<div className="w-full h-1.5 bg-gray-400 rounded"></div>
						<div className="w-1/2 h-1.5 bg-gray-300 rounded mt-auto"></div>
					</div>
					<div className="flex-1 flex flex-col gap-1.5 border border-gray-200 rounded p-1.5">
						<div className="w-full h-6 bg-gray-50 border border-dashed border-gray-300 rounded"></div>
						<div className="w-full h-1.5 bg-gray-400 rounded"></div>
						<div className="w-1/2 h-1.5 bg-gray-300 rounded mt-auto"></div>
					</div>
				</div>
			);
		case "TripleArticleBlock":
			return (
				<div className="w-full h-24 bg-white flex p-2 gap-1.5">
					{[1, 2, 3].map((i) => (
						<div
							key={i}
							className="flex-1 flex flex-col gap-1 border border-gray-200 rounded p-1"
						>
							<div className="w-full h-5 bg-gray-50 border border-dashed border-gray-300 rounded"></div>
							<div className="w-full h-1 bg-gray-400 rounded"></div>
							<div className="w-2/3 h-1 bg-gray-300 rounded mt-auto"></div>
						</div>
					))}
				</div>
			);
		case "PreheaderBlock":
			return (
				<div className="w-full h-24 bg-white flex items-start justify-between p-3 border-b border-gray-200">
					<div className="w-1/3 h-1.5 bg-gray-300 rounded"></div>
					<div className="w-1/4 h-1.5 bg-gray-300 rounded"></div>
				</div>
			);
		case "FooterBlock":
			return (
				<div className="w-full h-24 bg-white flex flex-col items-center justify-center p-4 gap-2 border-t border-gray-200">
					<div className="w-1/2 h-1.5 bg-gray-300 rounded"></div>
					<div className="w-1/3 h-1.5 bg-gray-300 rounded"></div>
					<div className="w-1/4 h-1.5 bg-gray-400 rounded mt-2"></div>
				</div>
			);
		case "SocialBlock":
			return (
				<div className="w-full h-24 bg-white flex items-center justify-center gap-3 p-4">
					{[1, 2, 3, 4].map((i) => (
						<div
							key={i}
							className="w-6 h-6 bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center"
						>
							<div className="w-2 h-2 bg-gray-300 rounded-sm"></div>
						</div>
					))}
				</div>
			);
		default:
			return (
				<div className="w-full h-24 bg-white flex items-center justify-center p-4">
					<div className="text-gray-400 text-xs font-medium px-2 py-1 bg-gray-100 rounded">
						{name}
					</div>
				</div>
			);
	}
};
