import { Image as ImageIcon, Link as LinkIcon, Upload, X } from "lucide-react";
import { useState } from "react";
import { useImageManagerStore } from "../store/useImageManagerStore";
import { useLiveContentStore } from "../store/useLiveContentStore";

const UNSPLASH_IMAGES = [
	"https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
	"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
	"https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
	"https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=800&q=80",
	"https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=800&q=80",
	"https://images.unsplash.com/photo-1577563908411-50cb98976fea?auto=format&fit=crop&w=800&q=80",
];

export function ImageManagerModal() {
	const isOpen = useImageManagerStore((state) => state.isOpen);
	const currentId = useImageManagerStore((state) => state.currentId);
	const currentField = useImageManagerStore((state) => state.currentField);
	const currentValue = useImageManagerStore((state) => state.currentValue);
	const closeManager = useImageManagerStore((state) => state.closeManager);
	const setOverride = useLiveContentStore((state) => state.setOverride);

	const [activeTab, setActiveTab] = useState<"gallery" | "url" | "upload">(
		"gallery",
	);
	const [urlInput, setUrlInput] = useState(currentValue || "");

	if (!isOpen || !currentId || !currentField) return null;

	const handleSelect = (url: string) => {
		setOverride(currentId, currentField, url);
		closeManager();
	};

	const handleUrlSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (urlInput) {
			handleSelect(urlInput);
		}
	};

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				handleSelect(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4">
			<div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
				<div className="flex items-center justify-between p-4 border-b border-gray-100">
					<h2 className="text-xl font-semibold text-gray-900">Asset Manager</h2>
					<button
						onClick={closeManager}
						className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
					>
						<X size={20} />
					</button>
				</div>

				<div className="flex border-b border-gray-200 bg-gray-50 px-4">
					<button
						onClick={() => setActiveTab("gallery")}
						className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "gallery" ? "border-blue-600 text-blue-600 bg-white" : "border-transparent text-gray-600 hover:text-gray-900"}`}
					>
						<ImageIcon size={16} />
						Gallery
					</button>
					<button
						onClick={() => setActiveTab("url")}
						className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "url" ? "border-blue-600 text-blue-600 bg-white" : "border-transparent text-gray-600 hover:text-gray-900"}`}
					>
						<LinkIcon size={16} />
						From URL
					</button>
					<button
						onClick={() => setActiveTab("upload")}
						className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === "upload" ? "border-blue-600 text-blue-600 bg-white" : "border-transparent text-gray-600 hover:text-gray-900"}`}
					>
						<Upload size={16} />
						Upload
					</button>
				</div>

				<div className="p-6 overflow-y-auto flex-1 bg-white">
					{activeTab === "gallery" && (
						<div className="grid grid-cols-2 md:grid-cols-3 gap-4">
							{UNSPLASH_IMAGES.map((url, i) => (
								<div
									key={i}
									onClick={() => handleSelect(url)}
									className="relative aspect-video rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500 cursor-pointer group"
								>
									<img
										src={url}
										alt={`Gallery image ${i}`}
										className="w-full h-full object-cover"
									/>
									<div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
										<span className="opacity-0 group-hover:opacity-100 bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-full transition-opacity shadow-sm">
											Select
										</span>
									</div>
								</div>
							))}
						</div>
					)}

					{activeTab === "url" && (
						<form onSubmit={handleUrlSubmit} className="max-w-xl mx-auto py-8">
							<label className="block text-sm font-medium text-gray-700 mb-2">
								Image URL
							</label>
							<div className="flex gap-2">
								<input
									type="url"
									value={urlInput}
									onChange={(e) => setUrlInput(e.target.value)}
									placeholder="https://example.com/image.jpg"
									className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
									required
								/>
								<button
									type="submit"
									className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
								>
									Insert
								</button>
							</div>
							{urlInput && (
								<div className="mt-6 border border-gray-200 rounded-lg p-2 bg-gray-50">
									<p className="text-xs text-gray-500 mb-2 text-center">
										Preview
									</p>
									<img
										src={urlInput}
										alt="Preview"
										className="max-h-48 mx-auto rounded object-contain"
										onError={(e) => (e.currentTarget.style.display = "none")}
									/>
								</div>
							)}
						</form>
					)}

					{activeTab === "upload" && (
						<div className="max-w-xl mx-auto py-8">
							<div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:bg-gray-50 transition-colors">
								<Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
								<h3 className="text-lg font-medium text-gray-900 mb-1">
									Upload an image
								</h3>
								<p className="text-sm text-gray-500 mb-4">
									PNG, JPG, GIF up to 5MB
								</p>
								<label className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer shadow-sm">
									<span>Select file</span>
									<input
										type="file"
										className="hidden"
										accept="image/*"
										onChange={handleFileUpload}
									/>
								</label>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
