import mjml2html from "mjml-browser";

export function compileMjml(mjmlString: string) {
	try {
		const { html, errors } = mjml2html(mjmlString);
		if (errors && errors.length > 0) {
			console.warn("MJML compilation errors:", errors);
		}
		return html;
	} catch (e) {
		console.error("Failed to compile MJML:", e);
		return "<html><body>Error compiling email</body></html>";
	}
}
