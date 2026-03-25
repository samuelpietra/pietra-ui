import type { BoxProps } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes";

import { Box } from "@/components/Box";

export function Cell({ children, ...props }: BoxProps) {
	return (
		<Box p="4" style={{ background: "var(--gray-a3)" }} {...props}>
			<Text>{children}</Text>
		</Box>
	);
}

export function makeCells(count: number) {
	return Array.from({ length: count }, (_, index) => (
		// biome-ignore lint/suspicious/noArrayIndexKey: static story helper with fixed items
		<Cell key={index}>Item {index + 1}</Cell>
	));
}
