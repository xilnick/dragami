import { CheckCircle2, X } from "lucide-react";
import { useEffect } from "react";

interface ToastProps {
	message: string;
	onClose: () => void;
	duration?: number;
}

export function Toast({ message, onClose, duration = 3000 }: ToastProps) {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, duration);

		return () => clearTimeout(timer);
	}, [duration, onClose]);

	return (
		<div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg animate-in slide-in-from-bottom-5 fade-in duration-300">
			<CheckCircle2 size={18} className="text-green-400" />
			<span className="text-sm font-medium">{message}</span>
			<button
				type="button"
				onClick={onClose}
				className="ml-2 text-gray-400 hover:text-white transition-colors"
			>
				<X size={16} />
			</button>
		</div>
	);
}
