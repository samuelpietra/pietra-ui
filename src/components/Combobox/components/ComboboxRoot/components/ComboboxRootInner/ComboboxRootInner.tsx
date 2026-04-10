import { forwardRef, useCallback, useEffect, useRef } from "react";
import { composeRefs } from "@radix-ui/react-compose-refs";

import { Box } from "@/components/Box";

import { ComboboxContext } from "../../../../context";
import { useComboboxState } from "../../../../hooks";
import type { ComboboxRootProps } from "../../ComboboxRoot.tsx";

import "./ComboboxRootInner.css";

export const ComboboxRootInner = forwardRef<HTMLDivElement, ComboboxRootProps>(
	({ children, ...stateOptions }, ref) => {
		const state = useComboboxState(stateOptions);

		const rootRef = useRef<HTMLDivElement>(null);
		const composedRef = composeRefs(rootRef, ref);

		const handleClickOutside = useCallback(
			(event: MouseEvent) => {
				if (
					rootRef.current &&
					event.target instanceof Node &&
					!rootRef.current.contains(event.target)
				) {
					state.setOpen(false);
				}
			},
			[state.setOpen],
		);

		useEffect(() => {
			if (!state.isOpen) return;

			document.addEventListener("mousedown", handleClickOutside);

			return () =>
				document.removeEventListener("mousedown", handleClickOutside);
		}, [state.isOpen, handleClickOutside]);

		return (
			<ComboboxContext.Provider value={state}>
				<Box ref={composedRef} className="pietra-combobox-root">
					{children}
				</Box>
			</ComboboxContext.Provider>
		);
	},
) as <T>(
	props: ComboboxRootProps<T> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement | null;

// biome-ignore lint/suspicious/noExplicitAny: displayName assignment on type-cast generic component
(ComboboxRootInner as any).displayName = "Combobox.RootInner";
