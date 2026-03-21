import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Suppress benign ResizeObserver errors
window.addEventListener("error", (e) => {
	if (
		e.message &&
		(e.message.includes("ResizeObserver loop limit exceeded") ||
			e.message.includes(
				"ResizeObserver loop completed with undelivered notifications.",
			))
	) {
		e.stopImmediatePropagation();
		e.preventDefault();
	}
});

window.addEventListener("unhandledrejection", (e) => {
	if (
		e.reason?.message &&
		(e.reason.message.includes("ResizeObserver loop limit exceeded") ||
			e.reason.message.includes(
				"ResizeObserver loop completed with undelivered notifications.",
			))
	) {
		e.preventDefault();
	}
});

const originalConsoleError = console.error;
console.error = (...args: any[]) => {
	const isResizeObserverError = args.some((arg) => {
		if (typeof arg === "string") {
			return (
				arg.includes("ResizeObserver loop limit exceeded") ||
				arg.includes(
					"ResizeObserver loop completed with undelivered notifications.",
				)
			);
		}
		if (arg instanceof Error) {
			return (
				arg.message.includes("ResizeObserver loop limit exceeded") ||
				arg.message.includes(
					"ResizeObserver loop completed with undelivered notifications.",
				)
			);
		}
		return false;
	});

	if (isResizeObserverError) {
		return;
	}
	originalConsoleError(...args);
};

const rootElement = document.getElementById("root");
if (rootElement) {
	createRoot(rootElement).render(
		<StrictMode>
			<App />
		</StrictMode>,
	);
}
