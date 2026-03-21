import type { ComponentConfig } from "@measured/puck";
import type { ReactElement } from "react";

export type BlockMode = "web" | "email";

export type BlockConfig<Props extends Record<string, any>> = {
	fields: ComponentConfig<any>["fields"];
	defaultProps: Props;
	render: (
		props: Props & { mode: BlockMode; id: string; puck: any },
	) => ReactElement;
};
