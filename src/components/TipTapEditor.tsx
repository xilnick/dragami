import { Color } from "@tiptap/extension-color";
import { Link } from "@tiptap/extension-link";
import { TextStyle } from "@tiptap/extension-text-style";
import { EditorContent, useEditor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import { StarterKit } from "@tiptap/starter-kit";
import {
	Bold,
	Braces,
	ChevronDown,
	Heading1,
	Heading2,
	Heading3,
	Italic,
	Link as LinkIcon,
	Palette,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface TipTapEditorProps {
	content: string;
	onChange: (content: string) => void;
	isEditing?: boolean;
	inline?: boolean;
	className?: string;
}

export function TipTapEditor({
	content,
	onChange,
	isEditing = true,
	inline = false,
	className = "",
}: TipTapEditorProps) {
	const [isActive, setIsActive] = useState(false);
	const [showMergeTags, setShowMergeTags] = useState(false);
	const [showLinkInput, setShowLinkInput] = useState(false);
	const [linkUrl, setLinkUrl] = useState("");
	const mergeTagsRef = useRef<HTMLDivElement>(null);
	const linkInputRef = useRef<HTMLDivElement>(null);
	const contentRef = useRef(content);

	const mergeTags = [
		{ label: "First Name", value: "first_name" },
		{ label: "Last Name", value: "last_name" },
		{ label: "Email Address", value: "email" },
		{ label: "Company Name", value: "company" },
		{ label: "Unsubscribe Link", value: "unsubscribe_url" },
		{ label: "View in Browser", value: "web_version_url" },
	];

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				mergeTagsRef.current &&
				!mergeTagsRef.current.contains(event.target as Node)
			) {
				setShowMergeTags(false);
			}
			if (
				linkInputRef.current &&
				!linkInputRef.current.contains(event.target as Node)
			) {
				setShowLinkInput(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const editor = useEditor({
		extensions: [
			StarterKit,
			TextStyle,
			Color,
			Link.configure({
				openOnClick: false,
			}),
		],
		content,
		editable: false, // Start as false so it can be dragged
		onUpdate: ({ editor }) => {
			const html = editor.getHTML();
			if (html !== contentRef.current) {
				contentRef.current = html;
				onChange(html);
			}
		},
		onBlur: ({ editor }) => {
			setIsActive(false);
			editor.setEditable(false);
		},
	});

	// Sync content from outside
	useEffect(() => {
		if (editor && content !== contentRef.current) {
			editor.commands.setContent(content, false as any);
			contentRef.current = content;
		}
	}, [content, editor]);

	if (!editor) {
		return null;
	}

	const handleClick = (e: React.MouseEvent) => {
		if (isEditing) {
			e.stopPropagation();
			setIsActive(true);
			editor.setEditable(true);
			editor.commands.focus();
		}
	};

	const handlePointerDown = (e: React.PointerEvent) => {
		if (isEditing) {
			e.stopPropagation();
		}
	};

	return (
		<div
			onClick={handleClick}
			onPointerDown={handlePointerDown}
			data-puck-overlay-portal="true"
			className={`tiptap-container transition-all duration-200 ${className} ${isEditing && !isActive ? "cursor-text" : ""}`}
		>
			{isActive && (
				<BubbleMenu
					editor={editor}
					className="flex items-center gap-1 p-1 bg-white border border-gray-200 shadow-xl rounded-lg z-50"
					shouldShow={({ view, state }) => {
						const { selection } = state;
						const { empty } = selection;
						const hasEditorFocus = view.hasFocus();

						if (!hasEditorFocus && !showLinkInput && !showMergeTags) {
							return false;
						}

						if (empty && !showLinkInput && !showMergeTags) {
							return false;
						}

						return true;
					}}
				>
					<div className="flex items-center gap-1 pr-2 border-r border-gray-200">
						<button
							onClick={() =>
								editor.chain().focus().toggleHeading({ level: 1 }).run()
							}
							className={`p-1.5 rounded-md transition-colors ${editor.isActive("heading", { level: 1 }) ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100 text-gray-700"}`}
							title="Heading 1"
						>
							<Heading1 size={16} />
						</button>
						<button
							onClick={() =>
								editor.chain().focus().toggleHeading({ level: 2 }).run()
							}
							className={`p-1.5 rounded-md transition-colors ${editor.isActive("heading", { level: 2 }) ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100 text-gray-700"}`}
							title="Heading 2"
						>
							<Heading2 size={16} />
						</button>
						<button
							onClick={() =>
								editor.chain().focus().toggleHeading({ level: 3 }).run()
							}
							className={`p-1.5 rounded-md transition-colors ${editor.isActive("heading", { level: 3 }) ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100 text-gray-700"}`}
							title="Heading 3"
						>
							<Heading3 size={16} />
						</button>
					</div>

					<div className="flex items-center gap-1 px-2 border-r border-gray-200">
						<button
							onClick={() => editor.chain().focus().toggleBold().run()}
							className={`p-1.5 rounded-md transition-colors ${editor.isActive("bold") ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100 text-gray-700"}`}
							title="Bold"
						>
							<Bold size={16} />
						</button>
						<button
							onClick={() => editor.chain().focus().toggleItalic().run()}
							className={`p-1.5 rounded-md transition-colors ${editor.isActive("italic") ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100 text-gray-700"}`}
							title="Italic"
						>
							<Italic size={16} />
						</button>
					</div>

					<div className="flex items-center gap-1 pl-2">
						<div className="relative" ref={mergeTagsRef}>
							<button
								onClick={() => setShowMergeTags(!showMergeTags)}
								className="flex items-center gap-1 p-1.5 rounded-md transition-colors hover:bg-gray-100 text-gray-700"
								title="Insert Merge Tag"
							>
								<Braces size={16} />
								<ChevronDown size={12} />
							</button>

							{showMergeTags && (
								<div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 shadow-lg rounded-md py-1 z-[60]">
									<div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 mb-1">
										Personalization
									</div>
									{mergeTags.map((tag) => (
										<button
											key={tag.value}
											onClick={() => {
												editor
													.chain()
													.focus()
													.insertContent(`{{${tag.value}}}`)
													.run();
												setShowMergeTags(false);
											}}
											className="w-full text-left px-3 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
										>
											{tag.label}
										</button>
									))}
								</div>
							)}
						</div>
						<div className="relative" ref={linkInputRef}>
							<button
								onClick={() => {
									if (editor.isActive("link")) {
										editor.chain().focus().unsetLink().run();
									} else {
										setLinkUrl(editor.getAttributes("link").href || "");
										setShowLinkInput(!showLinkInput);
									}
								}}
								className={`p-1.5 rounded-md transition-colors ${editor.isActive("link") ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100 text-gray-700"}`}
								title="Link"
							>
								<LinkIcon size={16} />
							</button>

							{showLinkInput && (
								<div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 shadow-lg rounded-md p-2 z-[60] flex gap-2">
									<input
										type="url"
										placeholder="https://example.com"
										value={linkUrl}
										onChange={(e) => setLinkUrl(e.target.value)}
										className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-blue-500"
										onKeyDown={(e) => {
											if (e.key === "Enter") {
												e.preventDefault();
												if (linkUrl) {
													editor
														.chain()
														.focus()
														.setLink({ href: linkUrl })
														.run();
												}
												setShowLinkInput(false);
											}
										}}
									/>
									<button
										onClick={() => {
											if (linkUrl) {
												editor.chain().focus().setLink({ href: linkUrl }).run();
											}
											setShowLinkInput(false);
										}}
										className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
									>
										Save
									</button>
								</div>
							)}
						</div>
						<div
							className="relative flex items-center p-1.5 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
							title="Text Color"
						>
							<Palette size={16} className="text-gray-700" />
							<input
								type="color"
								onInput={(event) =>
									editor
										.chain()
										.focus()
										.setColor((event.target as HTMLInputElement).value)
										.run()
								}
								value={editor.getAttributes("textStyle").color || "#000000"}
								className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
							/>
						</div>
					</div>
				</BubbleMenu>
			)}
			<div className={`${inline ? "" : "p-2"} outline-none`}>
				<EditorContent editor={editor} />
			</div>
		</div>
	);
}
