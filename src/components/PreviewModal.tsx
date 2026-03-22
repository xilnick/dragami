import { Monitor, Smartphone } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

interface PreviewModalProps {
	showPreview: boolean;
	setShowPreview: Dispatch<SetStateAction<boolean>>;
	outputType: "email" | "standaloneHtml" | "json";
	previewMode: "desktop" | "mobile";
	setPreviewMode: Dispatch<SetStateAction<"desktop" | "mobile">>;
	previewHtml: string;
}

export function PreviewModal({
	showPreview,
	setShowPreview,
	outputType,
	previewMode,
	setPreviewMode,
	previewHtml,
}: PreviewModalProps) {
	if (!showPreview) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
			<div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden">
				<div className="flex items-center justify-between p-4 border-b border-gray-200">
					<h2 className="text-lg font-semibold">
						Preview ({outputType === "email" ? "Email" : "On-site Message"})
					</h2>
					<div className="flex items-center gap-4">
						<div className="flex items-center bg-gray-100 p-1 rounded-lg">
							<button
								type="button"
								onClick={() => setPreviewMode("desktop")}
								className={`p-1.5 rounded-md transition-colors ${
									previewMode === "desktop"
										? "bg-white text-gray-900 shadow-sm"
										: "text-gray-500 hover:text-gray-700"
								}`}
								title="Desktop View"
							>
								<Monitor size={18} />
							</button>
							<button
								type="button"
								onClick={() => setPreviewMode("mobile")}
								className={`p-1.5 rounded-md transition-colors ${
									previewMode === "mobile"
										? "bg-white text-gray-900 shadow-sm"
										: "text-gray-500 hover:text-gray-700"
								}`}
								title="Mobile View"
							>
								<Smartphone size={18} />
							</button>
						</div>
						<button
							type="button"
							onClick={() => setShowPreview(false)}
							className="text-gray-500 hover:text-gray-700"
						>
							Close
						</button>
					</div>
				</div>
				<div className="flex-1 bg-gray-100 p-8 overflow-auto flex justify-center">
					<div
						className={`bg-white shadow-md min-h-full transition-all duration-300 ${
							previewMode === "mobile" ? "w-[375px]" : "w-full max-w-[800px]"
						}`}
					>
						<iframe
							srcDoc={previewHtml}
							className="w-full h-full border-0"
							title="Preview"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
