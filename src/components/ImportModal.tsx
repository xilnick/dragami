import type { Dispatch, SetStateAction } from "react";

interface ImportModalProps {
	showImport: boolean;
	setShowImport: Dispatch<SetStateAction<boolean>>;
	importHtmlStr: string;
	setImportHtmlStr: Dispatch<SetStateAction<string>>;
	handleImport: (asRawHtml?: boolean) => void;
}

export function ImportModal({
	showImport,
	setShowImport,
	importHtmlStr,
	setImportHtmlStr,
	handleImport,
}: ImportModalProps) {
	if (!showImport) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
			<div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl flex flex-col overflow-hidden">
				<div className="flex items-center justify-between p-4 border-b border-gray-200">
					<h2 className="text-lg font-semibold">Import Template</h2>
					<button
						onClick={() => setShowImport(false)}
						className="text-gray-500 hover:text-gray-700"
					>
						Close
					</button>
				</div>
				<div className="p-4">
					<p className="text-sm text-gray-600 mb-4">
						Paste your custom HTML, Mosaico JSON, or Puck JSON here. The builder
						will attempt to map it to editable blocks.
					</p>
					<textarea
						value={importHtmlStr}
						onChange={(e) => setImportHtmlStr(e.target.value)}
						className="w-full h-64 p-3 border border-gray-300 rounded-md font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						placeholder="<div><h1>Hello</h1><p>World</p></div> or { ... }"
					/>
				</div>
				<div className="p-4 border-t border-gray-200 flex justify-between items-center">
					<button
						onClick={() => handleImport(true)}
						className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100"
						title="Imports the exact HTML into a single Raw HTML block without parsing"
					>
						Import as Raw HTML
					</button>
					<div className="flex gap-3">
						<button
							onClick={() => setShowImport(false)}
							className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
						>
							Cancel
						</button>
						<button
							onClick={() => handleImport(false)}
							className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
						>
							Import
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
