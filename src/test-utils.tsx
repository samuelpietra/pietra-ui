import type { ReactElement } from "react";
import { Theme } from "@radix-ui/themes";
import { type RenderOptions, render } from "@testing-library/react";

export function renderWithTheme(ui: ReactElement, options?: RenderOptions) {
	return render(ui, {
		wrapper: ({ children }) => <Theme>{children}</Theme>,
		...options,
	});
}
