import { createUsePuck } from "@measured/puck";
import {
	Code,
	Download,
	Eye,
	LayoutTemplate,
	Redo2,
	Save,
	Send,
	Trash2,
	Undo2,
	Upload,
} from "lucide-react";

const usePuck = createUsePuck();

interface BuilderHeaderProps {
	outputType: "email" | "standaloneHtml" | "json";
	setOutputType: (type: "email" | "standaloneHtml" | "json") => void;
	setShowGallery: (show: boolean) => void;
	setShowImport: (show: boolean) => void;
	handleClear: () => void;
	handleSendTest: () => void;
	handlePreview: () => void;
	handleShowCode: () => void;
	handleExport: () => void;
	handleSave: () => void;
}

export function BuilderHeader({
	outputType,
	setOutputType,
	setShowGallery,
	setShowImport,
	handleClear,
	handleSendTest,
	handlePreview,
	handleShowCode,
	handleExport,
	handleSave,
}: BuilderHeaderProps) {
	const history = usePuck((state) => state.history);

	return (
		<header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between shadow-sm z-10 w-full">
			<div className="flex items-center gap-2">
				<div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
					E
				</div>
				<h1 className="text-xl font-semibold text-gray-800">Builder</h1>
			</div>

			<div className="flex items-center gap-4">
				<div className="flex items-center bg-gray-100 p-1 rounded-lg">
					<button
						onClick={() => setOutputType("email")}
						className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${outputType === "email" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
					>
						Email (HTML)
					</button>
					<button
						onClick={() => setOutputType("standaloneHtml")}
						className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${outputType === "standaloneHtml" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
					>
						On-site (HTML)
					</button>
					<button
						onClick={() => setOutputType("json")}
						className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${outputType === "json" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
					>
						JSON (Data)
					</button>
				</div>

				<div className="h-6 w-px bg-gray-300 mx-1"></div>

				<div className="flex items-center gap-1">
					<button
						onClick={() => history.back()}
						disabled={!history.hasPast}
						className={`p-2 rounded-md transition-colors ${history.hasPast ? "text-gray-700 hover:bg-gray-100" : "text-gray-300 cursor-not-allowed"}`}
						title="Undo"
					>
						<Undo2 size={18} />
					</button>
					<button
						onClick={() => history.forward()}
						disabled={!history.hasFuture}
						className={`p-2 rounded-md transition-colors ${history.hasFuture ? "text-gray-700 hover:bg-gray-100" : "text-gray-300 cursor-not-allowed"}`}
						title="Redo"
					>
						<Redo2 size={18} />
					</button>
				</div>

				<div className="h-6 w-px bg-gray-300 mx-1"></div>

				<button
					onClick={() => setShowGallery(true)}
					className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
					title="Template Gallery"
				>
					<LayoutTemplate size={16} />
					Templates
				</button>

				<button
					onClick={() => setShowImport(true)}
					className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
					title="Import HTML"
				>
					<Upload size={16} />
				</button>

				<button
					onClick={handleClear}
					className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 bg-white border border-red-200 rounded-md hover:bg-red-50 transition-colors"
					title="Clear Canvas"
				>
					<Trash2 size={16} />
				</button>

				<div className="h-6 w-px bg-gray-300 mx-1"></div>

				{outputType === "email" && (
					<button
						onClick={handleSendTest}
						className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
					>
						<Send size={16} />
						Send Test
					</button>
				)}

				<button
					onClick={handlePreview}
					className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
				>
					<Eye size={16} />
					Preview
				</button>
				<button
					onClick={handleShowCode}
					className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
				>
					<Code size={16} />
					Code
				</button>
				<button
					onClick={handleExport}
					className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
				>
					<Download size={16} />
					Export{" "}
					{outputType === "email"
						? "HTML"
						: outputType === "json"
							? "JSON"
							: "HTML"}
				</button>
				<button
					onClick={handleSave}
					className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
				>
					<Save size={16} />
					Save
				</button>
			</div>
		</header>
	);
}
