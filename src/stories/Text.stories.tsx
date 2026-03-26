import { Code, Em, Kbd } from "@radix-ui/themes";
import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox, Flex, Link, Text } from "@/components";

const meta: Meta<typeof Text> = {
	title: "Typography/Text",
	component: Text,
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
	args: {
		children: "The quick brown fox jumps over the lazy dog.",
	},
};

const SIZES = ["1", "2", "3", "4", "5", "6", "7", "8", "9"] as const;

export const Size: Story = {
	render: () => (
		<Flex gap="3" direction="column">
			{SIZES.map((size) => (
				<Text key={size} size={size}>
					The quick brown fox jumps over the size {size}.
				</Text>
			))}
		</Flex>
	),
};

const WEIGHTS = ["regular", "medium", "bold"] as const;

export const Weight: Story = {
	render: () => (
		<Flex gap="3" direction="column">
			{WEIGHTS.map((weight) => (
				<Text key={weight} weight={weight} as="div">
					The quick brown fox jumps over the {weight} weight.
				</Text>
			))}
		</Flex>
	),
};

const ALIGNS = ["left", "center", "right"] as const;

export const Align: Story = {
	render: () => (
		<Flex gap="3" direction="column">
			{ALIGNS.map((align) => (
				<Text key={align} align={align} as="div">
					{align}-aligned
				</Text>
			))}
		</Flex>
	),
};

export const Trim: Story = {
	render: () => (
		<Flex direction="column" gap="3">
			<Text
				trim="normal"
				style={{
					background: "var(--gray-a2)",
					borderTop: "1px dashed var(--gray-a7)",
					borderBottom: "1px dashed var(--gray-a7)",
				}}
			>
				Without trim
			</Text>
			<Text
				trim="both"
				style={{
					background: "var(--gray-a2)",
					borderTop: "1px dashed var(--gray-a7)",
					borderBottom: "1px dashed var(--gray-a7)",
				}}
			>
				With trim
			</Text>
		</Flex>
	),
};

const SAMPLE_TEXT =
	"The goal of typography is to relate font size, line height, and line width in a proportional way that maximizes beauty and makes reading easier and more pleasant.";

export const Truncate: Story = {
	render: () => (
		<Flex
			p="3"
			overflow="auto"
			width="300px"
			style={{
				border: "1px dotted var(--gray-a7)",
				resize: "horizontal",
			}}
		>
			<Text truncate>{SAMPLE_TEXT}</Text>
		</Flex>
	),
};

const WRAPS = ["nowrap", "balance", "pretty"] as const;

export const Wrap: Story = {
	render: () => (
		<Flex gap="3" direction="column">
			{WRAPS.map((wrap) => (
				<Flex key={wrap} gap="3" direction="column">
					<Text weight="bold">{wrap}</Text>
					<Flex
						p="3"
						overflow="auto"
						width="300px"
						style={{
							border: "1px dotted var(--gray-a7)",
							resize: "horizontal",
						}}
					>
						<Text wrap={wrap}>{SAMPLE_TEXT}</Text>
					</Flex>
				</Flex>
			))}
		</Flex>
	),
};

const SAMPLE_COLORS = ["indigo", "cyan", "orange", "crimson"] as const;

export const Color: Story = {
	render: () => (
		<Flex direction="column">
			{SAMPLE_COLORS.map((color) => (
				<Text key={color} color={color}>
					The quick brown fox jumps over the {color} color.
				</Text>
			))}
		</Flex>
	),
};

export const HighContrast: Story = {
	render: () => (
		<Flex direction="column">
			<Text color="gray">The quick brown fox jumps over the regular text.</Text>
			<Text color="gray" highContrast>
				The quick brown fox jumps over the high-contrast text.
			</Text>
		</Flex>
	),
};

export const AsElement: Story = {
	render: () => (
		<Flex gap="3" direction="column">
			<Text weight="bold">{`As <p>`}</Text>
			<Flex
				p="3"
				overflow="auto"
				width="500px"
				style={{
					border: "1px dotted var(--gray-a7)",
				}}
			>
				<Text as="p">
					Look, such a helpful <Link href="#">link</Link>, an{" "}
					<Em>italic emphasis</Em>, a piece of computer <Code>code</Code>, and
					even a hotkey combination <Kbd>⇧⌘A</Kbd> within the text.
				</Text>
			</Flex>
			<Text weight="bold">{`As <label>`}</Text>
			<Flex
				p="3"
				overflow="auto"
				width="500px"
				style={{
					border: "1px dotted var(--gray-a7)",
				}}
			>
				<Text as="label" size="3">
					<Flex gap="2">
						<Checkbox defaultChecked />I understand that these documents are
						confidential and cannot be shared with a third party.
					</Flex>
				</Text>
			</Flex>
		</Flex>
	),
};
