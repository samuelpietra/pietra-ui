import type { ReactNode } from "react";
import { Theme, type ThemeProps } from "@radix-ui/themes";

export interface PietraThemeProviderProps extends ThemeProps {
	children: ReactNode;
}

const PIETRA_DEFAULTS: Partial<ThemeProps> = {
	accentColor: "gray",
	appearance: "inherit",
	grayColor: "slate",
	radius: "medium",
	scaling: "100%",
};

export const ThemeProvider = ({
	children,
	...consumerProps
}: PietraThemeProviderProps) => {
	return (
		<Theme {...PIETRA_DEFAULTS} {...consumerProps}>
			{children}
		</Theme>
	);
};
