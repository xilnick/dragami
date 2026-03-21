import type React from "react";
import { useEffect, useRef, useState } from "react";

interface InlineTextEditorProps {
	value: string;
	onChange: (value: string) => void;
	isEditing: boolean;
	tagName?: React.ElementType;
	style?: React.CSSProperties;
	className?: string;
}

export function InlineTextEditor({
	value,
	onChange,
	isEditing,
	tagName: Tag = "span",
	style,
	className,
}: InlineTextEditorProps) {
	const [isEditingMode, setIsEditingMode] = useState(false);
	const [currentValue, setCurrentValue] = useState(value);
	const inputRef = useRef<HTMLElement>(null);

	useEffect(() => {
		setCurrentValue(value);
	}, [value]);

	useEffect(() => {
		if (isEditingMode && inputRef.current) {
			inputRef.current.focus();
			const selection = window.getSelection();
			const range = document.createRange();
			range.selectNodeContents(inputRef.current);
			range.collapse(false);
			selection?.removeAllRanges();
			selection?.addRange(range);
		}
	}, [isEditingMode]);

	const handleClick = (e: React.MouseEvent) => {
		if (isEditing) {
			e.preventDefault();
			e.stopPropagation();
			setIsEditingMode(true);
		}
	};

	const handlePointerDown = (e: React.PointerEvent) => {
		if (isEditing) {
			e.stopPropagation();
		}
	};

	const handleBlur = () => {
		setIsEditingMode(false);
		if (currentValue !== value) {
			onChange(currentValue);
		}
	};

	const handleInput = (e: React.FormEvent<HTMLElement>) => {
		setCurrentValue(e.currentTarget.textContent || "");
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			inputRef.current?.blur();
		} else if (e.key === "Escape") {
			setCurrentValue(value);
			setIsEditingMode(false);
		}
	};

	if (isEditingMode) {
		return (
			<Tag
				ref={inputRef as any}
				contentEditable
				suppressContentEditableWarning
				onBlur={handleBlur}
				onInput={handleInput}
				onKeyDown={handleKeyDown}
				onPointerDown={handlePointerDown}
				onClick={(e: React.MouseEvent) => e.stopPropagation()}
				data-puck-overlay-portal="true"
				style={{
					...style,
					outline: "none",
					cursor: "text",
					minWidth: "10px",
					display: "inline-block",
				}}
				className={className}
			>
				{currentValue}
			</Tag>
		);
	}

	return (
		<Tag
			onClick={handleClick}
			onPointerDown={handlePointerDown}
			data-puck-overlay-portal="true"
			style={{ ...style, cursor: isEditing ? "text" : "inherit" }}
			className={className}
		>
			{value}
		</Tag>
	);
}
