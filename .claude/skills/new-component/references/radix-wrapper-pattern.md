# Radix Themes wrapper pattern

Use this pattern when the new component is a thin wrap around a Radix Themes primitive. Inherit Radix's prop types via `ComponentPropsWithoutRef<typeof RadixComponent.Sub>` so consumers get the full Radix API surface without duplication.

For general component-writing rules (props destructuring, `forwardRef` usage, `displayName`, styling), see `references/coding-conventions.md`.

## Root (no ref)

Root components are context providers and don't render a DOM element themselves, so `forwardRef` is not needed.

```tsx
import type { ComponentPropsWithoutRef } from "react";
import { ComponentName as RadixComponentName } from "@radix-ui/themes";

export interface ComponentNameRootProps
    extends ComponentPropsWithoutRef<typeof RadixComponentName.Root> {}

export const ComponentNameRoot = (props: ComponentNameRootProps) => {
    return <RadixComponentName.Root {...props} />;
};

ComponentNameRoot.displayName = "ComponentName.Root";
```

## Subcomponent (with ref)

Subcomponents that render a DOM element (Trigger, Content, Close, etc.) must use `forwardRef`.

```tsx
import { type ComponentPropsWithoutRef, forwardRef } from "react";
import { ComponentName as RadixComponentName } from "@radix-ui/themes";

export interface ComponentNameContentProps
    extends ComponentPropsWithoutRef<typeof RadixComponentName.Content> {}

export const ComponentNameContent = forwardRef<HTMLDivElement, ComponentNameContentProps>(
    (props, ref) => {
        return <RadixComponentName.Content ref={ref} {...props} />;
    },
);

ComponentNameContent.displayName = "ComponentName.Content";
```

