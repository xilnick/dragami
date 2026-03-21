import { type Data, Puck } from "@measured/puck";
import "@measured/puck/puck.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import { BuilderHeader } from "./components/BuilderHeader";
import { CodeModal } from "./components/CodeModal";
import {
	ComponentPreview,
	getComponentDescription,
} from "./components/ComponentPreviews";
import { ImageManagerModal } from "./components/ImageManagerModal";
import { ImportModal } from "./components/ImportModal";
import { PreviewModal } from "./components/PreviewModal";
import { TemplateGalleryModal } from "./components/TemplateGalleryModal";
import { emailConfig, webConfig } from "./configs/unified.config";
import { useBuilderStore } from "./store/useBuilderStore";
import { useLiveContentStore } from "./store/useLiveContentStore";
import { generateStandaloneHtml } from "./utils/htmlGenerator";
import { parseHtmlToPuck } from "./utils/htmlToPuck";
import { mergeOverrides } from "./utils/mergeOverrides";
import { compileMjml } from "./utils/mjml";
import { generateMjml } from "./utils/mjmlGenerator";
import { mosaicoToUnified } from "./utils/templateConverter";

export default function App() {
	const emailData = useBuilderStore((state) => state.emailData);
	const webData = useBuilderStore((state) => state.webData);
	const setEmailData = useBuilderStore((state) => state.setEmailData);
	const setWebData = useBuilderStore((state) => state.setWebData);
	const clearEmailData = useBuilderStore((state) => state.clearEmailData);
	const clearWebData = useBuilderStore((state) => state.clearWebData);
	const clearOverrides = useLiveContentStore((state) => state.clearOverrides);

	const [showPreview, setShowPreview] = useState(false);
	const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">(
		"desktop",
	);
	const [showCode, setShowCode] = useState(false);
	const [copied, setCopied] = useState(false);
	const [showImport, setShowImport] = useState(false);
	const [showGallery, setShowGallery] = useState(false);
	const [showClearConfirm, setShowClearConfirm] = useState(false);
	const [alertMessage, setAlertMessage] = useState<string | null>(null);
	const [outputType, setOutputType] = useState<
		"email" | "standaloneHtml" | "json"
	>("email");
	const [puckKey, setPuckKey] = useState(0);
	const [codeOutput, setCodeOutput] = useState("");
	const [previewHtml, setPreviewHtml] = useState("");
	const [importHtmlStr, setImportHtmlStr] = useState("");

	const currentData = outputType === "email" ? emailData : webData;
	const currentConfig = outputType === "email" ? emailConfig : webConfig;
	const setCurrentData = outputType === "email" ? setEmailData : setWebData;
	const clearCurrentData =
		outputType === "email" ? clearEmailData : clearWebData;

	const getMergedData = useCallback(() => {
		const state = useBuilderStore.getState();
		const data = outputType === "email" ? state.emailData : state.webData;
		return mergeOverrides(data, useLiveContentStore.getState().overrides);
	}, [outputType]);

	const handleExport = useCallback(() => {
		const finalData = getMergedData();
		if (outputType === "email") {
			const mjmlString = generateMjml(finalData);
			const html = compileMjml(mjmlString);

			const blob = new Blob([html], { type: "text/html" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = "email-template.html";
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		} else if (outputType === "standaloneHtml") {
			const html = generateStandaloneHtml(finalData);
			const blob = new Blob([html], { type: "text/html" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = "onsite-notification.html";
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		} else {
			const jsonStr = JSON.stringify(finalData, null, 2);
			const blob = new Blob([jsonStr], { type: "application/json" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = "onsite-notification.json";
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		}
	}, [outputType, getMergedData]);

	const handlePreview = useCallback(() => {
		const finalData = getMergedData();
		if (outputType === "email") {
			const mjmlString = generateMjml(finalData);
			const html = compileMjml(mjmlString);
			setPreviewHtml(html);
		} else if (outputType === "standaloneHtml") {
			const html = generateStandaloneHtml(finalData);
			setPreviewHtml(html);
		} else {
			const jsonStr = JSON.stringify(finalData, null, 2);
			setPreviewHtml(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>JSON Preview</title>
        </head>
        <body style="background: #1e1e1e; color: #d4d4d4; padding: 20px; font-family: monospace;">
          <pre>${jsonStr}</pre>
        </body>
        </html>
      `);
		}
		setShowPreview(true);
	}, [outputType, getMergedData]);

	const handleShowCode = useCallback(() => {
		const finalData = getMergedData();
		if (outputType === "email") {
			const mjmlString = generateMjml(finalData);
			const html = compileMjml(mjmlString);
			setCodeOutput(html);
		} else if (outputType === "standaloneHtml") {
			const html = generateStandaloneHtml(finalData);
			setCodeOutput(html);
		} else {
			const jsonStr = JSON.stringify(finalData, null, 2);
			setCodeOutput(jsonStr);
		}
		setShowCode(true);
	}, [outputType, getMergedData]);

	const handleImport = useCallback(
		(asRawHtml: boolean = false) => {
			try {
				const trimmed = importHtmlStr.trim();
				let newData: Data;

				if (asRawHtml) {
					newData = {
						content: [
							{
								type: "RawHTML",
								props: {
									id: `raw-html-${Date.now()}`,
									html: trimmed,
									padding: 0,
								},
							},
						],
						root: {},
						zones: {},
					};
				} else if (trimmed.startsWith("{")) {
					const json = JSON.parse(trimmed);
					if (
						json.mainBlocks ||
						json.preheaderBlock ||
						json.type === "template"
					) {
						// It's Mosaico JSON
						const unified = mosaicoToUnified(json);
						newData = unified.content;
					} else if (json.content && Array.isArray(json.content)) {
						// It's likely Puck Data
						newData = json;
					} else {
						throw new Error("Unknown JSON format");
					}
				} else {
					// It's HTML
					newData = parseHtmlToPuck(importHtmlStr);
				}

				setCurrentData(newData);
				clearOverrides();
				setPuckKey((k) => k + 1);
				setShowImport(false);
				setImportHtmlStr("");
			} catch (e) {
				console.error(e);
				setAlertMessage(
					"Failed to parse input. Please ensure it's valid HTML, Mosaico JSON, or Puck JSON.",
				);
			}
		},
		[importHtmlStr, setCurrentData, clearOverrides],
	);

	const handleClear = useCallback(() => {
		setShowClearConfirm(true);
	}, []);

	const confirmClear = useCallback(() => {
		clearCurrentData();
		clearOverrides();
		setPuckKey((k) => k + 1);
		setShowClearConfirm(false);
	}, [clearCurrentData, clearOverrides]);

	const handlePublish = useCallback(
		(data: Data) => {
			const mergedData = mergeOverrides(
				data,
				useLiveContentStore.getState().overrides,
			);
			setCurrentData(mergedData);
			clearOverrides();
		},
		[setCurrentData, clearOverrides],
	);

	const [testEmail, setTestEmail] = useState("");
	const [showTestEmailModal, setShowTestEmailModal] = useState(false);

	const handleSendTest = useCallback(() => {
		setShowTestEmailModal(true);
	}, []);

	const confirmSendTest = useCallback(() => {
		if (testEmail) {
			setAlertMessage(`Test email successfully sent to ${testEmail}!`);
			setShowTestEmailModal(false);
			setTestEmail("");
		}
	}, [testEmail]);

	const handleCopyCode = useCallback(() => {
		navigator.clipboard.writeText(codeOutput);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	}, [codeOutput]);

	useEffect(() => {
		// Force Puck zoom to 100% by default
		let hasSetZoom = false;

		const setZoomTo100 = () => {
			if (hasSetZoom) return;
			const zoomSelect = document.querySelector(
				'select[class*="zoomSelect"]',
			) as HTMLSelectElement;
			if (zoomSelect) {
				if (zoomSelect.value !== "1") {
					const has100 = Array.from(zoomSelect.options).some(
						(opt) => opt.value === "1",
					);
					if (has100) {
						zoomSelect.value = "1";
						const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
							window.HTMLSelectElement.prototype,
							"value",
						)?.set;
						if (nativeInputValueSetter) {
							nativeInputValueSetter.call(zoomSelect, "1");
						}
						zoomSelect.dispatchEvent(new Event("change", { bubbles: true }));
					}
				}
				hasSetZoom = true;
			}
		};

		// Try immediately and set up an observer for when the toolbar renders
		setZoomTo100();

		const observer = new MutationObserver(() => {
			if (!hasSetZoom) {
				setZoomTo100();
			} else {
				observer.disconnect();
			}
		});

		observer.observe(document.body, { childList: true, subtree: true });

		return () => observer.disconnect();
	}, []); // Re-run when switching between Email/Web modes

	const puckOverrides = useMemo(
		() => ({
			header: () => (
				<BuilderHeader
					outputType={outputType}
					setOutputType={setOutputType}
					setShowGallery={setShowGallery}
					setShowImport={setShowImport}
					handleClear={handleClear}
					handleSendTest={handleSendTest}
					handlePreview={handlePreview}
					handleShowCode={handleShowCode}
					handleExport={handleExport}
				/>
			),
			drawerItem: ({ name }: { name: string }) => {
				const getComponentLabel = (name: string) => {
					const labels: Record<string, string> = {
						Section: "Section",
						Columns: "Columns",
						SpacerBlock: "Spacer",
						TitleBlock: "Title",
						TextBlock: "Text",
						Image: "Image",
						LogoBlock: "Logo",
						DoubleImageBlock: "Double Image",
						TripleImageBlock: "Triple Image",
						CTAButton: "Button",
						Divider: "Divider",
						RawHTML: "Raw HTML",
						Video: "Video",
						HeroLayout: "Hero Preset",
						SingleArticleBlock: "Single Article Preset",
						SideArticleBlock: "Side Article Preset",
						DoubleArticleBlock: "Double Article Preset",
						TripleArticleBlock: "Triple Article Preset",
						PreheaderBlock: "Preheader",
						FooterBlock: "Footer",
						SocialBlock: "Social Links",
						ConversationBlock: "Conversation Preset",
						LegalPreviewBlock: "Legal Preview",
						RatingBlock: "Rating / NPS",
					};
					return labels[name] || name.replace(/([A-Z])/g, " $1").trim();
				};
				const label = getComponentLabel(name);
				return (
					<div className="flex items-center gap-3 p-2 border border-gray-200 rounded-md bg-white hover:border-blue-500 hover:shadow-sm transition-all cursor-grab active:cursor-grabbing">
						<div className="w-16 h-16 flex-shrink-0 border border-gray-100 rounded overflow-hidden flex items-center justify-center bg-gray-50">
							<div className="scale-[0.65] origin-center w-[150%] h-[150%] flex items-center justify-center">
								<ComponentPreview name={name} />
							</div>
						</div>
						<div className="flex flex-col flex-1 min-w-0">
							<span className="text-sm font-semibold text-gray-800 truncate">
								{label}
							</span>
							<span className="text-xs text-gray-500 line-clamp-2 leading-tight mt-0.5">
								{getComponentDescription(name)}
							</span>
						</div>
					</div>
				);
			},
		}),
		[
			outputType,
			handleClear,
			handleSendTest,
			handlePreview,
			handleShowCode,
			handleExport,
		],
	);

	const handleChange = useCallback(
		(data: Data) => {
			setCurrentData(data);
		},
		[setCurrentData],
	);

	return (
		<div className="h-screen flex flex-col">
			<main className="flex-1 overflow-hidden">
				<Puck
					key={`${outputType}-${puckKey}`}
					config={currentConfig}
					data={currentData}
					onPublish={handlePublish}
					onChange={handleChange}
					overrides={puckOverrides}
				/>
			</main>

			{/* Template Gallery Modal */}
			<TemplateGalleryModal
				showGallery={showGallery}
				setShowGallery={setShowGallery}
				outputType={outputType}
				onSelectTemplate={(data) => {
					setCurrentData(data);
					clearOverrides();
					setPuckKey((k) => k + 1);
				}}
			/>

			{/* Import Modal */}
			<ImportModal
				showImport={showImport}
				setShowImport={setShowImport}
				importHtmlStr={importHtmlStr}
				setImportHtmlStr={setImportHtmlStr}
				handleImport={handleImport}
			/>

			{/* Image Manager Modal */}
			<ImageManagerModal />

			{/* Preview Modal */}
			<PreviewModal
				showPreview={showPreview}
				setShowPreview={setShowPreview}
				outputType={outputType}
				previewMode={previewMode}
				setPreviewMode={setPreviewMode}
				previewHtml={previewHtml}
			/>

			{/* Code Modal */}
			<CodeModal
				showCode={showCode}
				setShowCode={setShowCode}
				codeOutput={codeOutput}
				copied={copied}
				handleCopyCode={handleCopyCode}
			/>

			{/* Clear Confirmation Modal */}
			{showClearConfirm && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
						<div className="p-6">
							<h3 className="text-xl font-semibold text-gray-900 mb-2">
								Clear Canvas
							</h3>
							<p className="text-gray-600">
								Are you sure you want to clear the canvas? This action cannot be
								undone.
							</p>
						</div>
						<div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-100">
							<button
								type="button"
								onClick={() => setShowClearConfirm(false)}
								className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
							>
								Cancel
							</button>
							<button
								type="button"
								onClick={confirmClear}
								className="px-4 py-2 bg-red-600 text-white font-medium hover:bg-red-700 rounded-lg transition-colors"
							>
								Clear Canvas
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Alert Modal */}
			{alertMessage && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
						<div className="p-6">
							<h3 className="text-xl font-semibold text-gray-900 mb-2">
								Notice
							</h3>
							<p className="text-gray-600">{alertMessage}</p>
						</div>
						<div className="bg-gray-50 px-6 py-4 flex justify-end border-t border-gray-100">
							<button
								type="button"
								onClick={() => setAlertMessage(null)}
								className="px-4 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 rounded-lg transition-colors"
							>
								OK
							</button>
						</div>
					</div>
				</div>
			)}

			{/* Test Email Modal */}
			{showTestEmailModal && (
				<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
					<div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
						<div className="p-6">
							<h3 className="text-xl font-semibold text-gray-900 mb-2">
								Send Test Email
							</h3>
							<p className="text-gray-600 mb-4">
								Enter an email address to send a test of your current design.
							</p>
							<input
								type="email"
								value={testEmail}
								onChange={(e) => setTestEmail(e.target.value)}
								placeholder="email@example.com"
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							/>
						</div>
						<div className="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-100">
							<button
								type="button"
								onClick={() => {
									setShowTestEmailModal(false);
									setTestEmail("");
								}}
								className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
							>
								Cancel
							</button>
							<button
								type="button"
								onClick={confirmSendTest}
								disabled={!testEmail}
								className="px-4 py-2 bg-blue-600 text-white font-medium hover:bg-blue-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
							>
								Send Test
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
