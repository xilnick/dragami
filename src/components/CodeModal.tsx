import { Check, Copy } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

interface CodeModalProps {
	showCode: boolean;
	setShowCode: Dispatch<SetStateAction<boolean>>;
	codeOutput: string;
	copied: boolean;
	handleCopyCode: () => void;
}

export function CodeModal({
	showCode,
	setShowCode,
	codeOutput,
	copied,
	handleCopyCode,
}: CodeModalProps) {
	if (!showCode) return null;

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
			<div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col overflow-hidden">
				<div className="flex items-center justify-between p-4 border-b border-gray-200">
					<h2 className="text-lg font-semibold">Code Output</h2>
					<div className="flex items-center gap-4">
						<button
							onClick={handleCopyCode}
							className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
						>
							{copied ? (
								<Check size={16} className="text-green-600" />
							) : (
								<Copy size={16} />
							)}
							{copied ? "Copied!" : "Copy Code"}
						</button>
						<button
							onClick={() => setShowCode(false)}
							className="text-gray-500 hover:text-gray-700"
						>
							Close
						</button>
					</div>
				</div>
				<div className="flex-1 bg-gray-900 p-4 overflow-auto">
					<pre className="text-gray-100 text-sm font-mono whitespace-pre-wrap">
						{codeOutput}
					</pre>
				</div>
			</div>
		</div>
	);
}
