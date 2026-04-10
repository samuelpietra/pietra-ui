import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import { Box, Combobox, Flex, Text } from "@/components";

const FRUITS = [
	"Apple",
	"Banana",
	"Cherry",
	"Date",
	"Elderberry",
	"Fig",
	"Grape",
	"Honeydew",
	"Kiwi",
	"Lemon",
	"Mango",
	"Nectarine",
	"Orange",
	"Papaya",
	"Quince",
	"Raspberry",
	"Strawberry",
	"Tangerine",
	"Ugli fruit",
	"Watermelon",
];

type Language = {
	id: string;
	label: string;
	category: string;
};

const LANGUAGES: Language[] = [
	{ id: "js", label: "JavaScript", category: "Web" },
	{ id: "ts", label: "TypeScript", category: "Web" },
	{ id: "py", label: "Python", category: "General" },
	{ id: "rs", label: "Rust", category: "Systems" },
	{ id: "go", label: "Go", category: "Systems" },
	{ id: "rb", label: "Ruby", category: "General" },
	{ id: "java", label: "Java", category: "General" },
	{ id: "swift", label: "Swift", category: "Mobile" },
	{ id: "kotlin", label: "Kotlin", category: "Mobile" },
	{ id: "dart", label: "Dart", category: "Mobile" },
	{ id: "css", label: "CSS", category: "Web" },
	{ id: "html", label: "HTML", category: "Web" },
];

const CATEGORIES = ["Web", "General", "Systems", "Mobile"] as const;

const LANGUAGES_BY_CATEGORY = (() => {
	let offset = 0;
	return CATEGORIES.map((category) => {
		const languages = LANGUAGES.filter((l) => l.category === category);
		const group = { category, languages, startIndex: offset };
		offset += languages.length;
		return group;
	});
})();

const meta: Meta = {
	title: "Components/Combobox",
	decorators: [
		(Story) => (
			<Box style={{ minHeight: 350 }}>
				<Story />
			</Box>
		),
	],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
	render: () => (
		<Flex
			direction="column"
			gap="2"
			style={{ width: 300, position: "relative" }}
		>
			<Text size="2" weight="medium">
				Favorite fruit
			</Text>
			<Combobox.Root options={FRUITS}>
				<Combobox.Input placeholder="Search fruits...">
					<Combobox.Trigger />
				</Combobox.Input>
				<Combobox.Content />
			</Combobox.Root>
		</Flex>
	),
};

const ControlledExample = () => {
	const [value, setValue] = useState<string | string[] | null>("Cherry");

	return (
		<Flex
			direction="column"
			gap="2"
			style={{ width: 300, position: "relative" }}
		>
			<Text size="2" weight="medium">
				Controlled selection: {String(value)}
			</Text>
			<Combobox.Root
				options={FRUITS}
				value={value ?? undefined}
				onChange={setValue}
			>
				<Combobox.Input placeholder="Search fruits...">
					<Combobox.Trigger />
				</Combobox.Input>
				<Combobox.Content />
			</Combobox.Root>
		</Flex>
	);
};

export const Controlled: Story = {
	render: () => <ControlledExample />,
};

export const MultiSelect: Story = {
	render: () => (
		<Flex
			direction="column"
			gap="2"
			style={{ width: 300, position: "relative" }}
		>
			<Text size="2" weight="medium">
				Select multiple fruits
			</Text>
			<Combobox.Root options={FRUITS} multiple>
				<Combobox.Input placeholder="Search fruits...">
					<Combobox.Clear />
					<Combobox.Trigger />
				</Combobox.Input>
				<Combobox.Content />
			</Combobox.Root>
		</Flex>
	),
};

const ControlledMultiExample = () => {
	const [value, setValue] = useState<string | string[] | null>([
		"Apple",
		"Mango",
	]);

	return (
		<Flex
			direction="column"
			gap="2"
			style={{ width: 300, position: "relative" }}
		>
			<Text size="2" weight="medium">
				Controlled multi: {Array.isArray(value) ? value.join(", ") : value}
			</Text>
			<Combobox.Root
				options={FRUITS}
				multiple
				value={value ?? undefined}
				onChange={setValue}
			>
				<Combobox.Input placeholder="Search fruits...">
					<Combobox.Clear />
					<Combobox.Trigger />
				</Combobox.Input>
				<Combobox.Content />
			</Combobox.Root>
		</Flex>
	);
};

export const ControlledMultiSelect: Story = {
	render: () => <ControlledMultiExample />,
};

const CreatableExample = () => {
	const [options, setOptions] = useState(LANGUAGES);

	return (
		<Flex
			direction="column"
			gap="2"
			style={{ width: 300, position: "relative" }}
		>
			<Text size="2" weight="medium">
				Pick or create a language
			</Text>
			<Combobox.Root
				options={options}
				allowCreate
				onCreateOption={(inputValue: string) => {
					const newOption: Language = {
						id: inputValue.toLowerCase(),
						label: inputValue,
						category: "Custom",
					};
					setOptions((previous) => [...previous, newOption]);
					return newOption;
				}}
				getOptionLabel={(option: Language) => option.label}
				getOptionValue={(option: Language) => option.id}
			>
				<Combobox.Input placeholder="Search languages...">
					<Combobox.Trigger />
				</Combobox.Input>
				<Combobox.Content />
			</Combobox.Root>
		</Flex>
	);
};

export const Creatable: Story = {
	render: () => <CreatableExample />,
};

export const CollapsedTags: Story = {
	render: () => (
		<Flex
			direction="column"
			gap="2"
			style={{ width: 300, position: "relative" }}
		>
			<Text size="2" weight="medium">
				Collapsed tags
			</Text>
			<Combobox.Root
				options={FRUITS}
				multiple
				defaultValue={[FRUITS[0], FRUITS[3], FRUITS[4], FRUITS[12], FRUITS[16]]}
			>
				<Combobox.Input placeholder="Search fruits..." collapseTags>
					<Combobox.Clear />
					<Combobox.Trigger />
				</Combobox.Input>
				<Combobox.Content />
			</Combobox.Root>
		</Flex>
	),
};

const GroupedContent = () =>
	LANGUAGES_BY_CATEGORY.map((group, groupIndex) => (
		<Box key={group.category}>
			{groupIndex > 0 && <Combobox.Separator />}
			<Combobox.Group label={group.category}>
				{group.languages.map((language, languageIndex) => (
					<Combobox.Item
						key={language.id}
						option={language}
						index={group.startIndex + languageIndex}
					>
						{language.label}
					</Combobox.Item>
				))}
			</Combobox.Group>
		</Box>
	));

export const Grouped: Story = {
	render: () => (
		<Flex
			direction="column"
			gap="2"
			style={{ width: 300, position: "relative" }}
		>
			<Text size="2" weight="medium">
				Languages by category
			</Text>
			<Combobox.Root
				options={LANGUAGES}
				getOptionLabel={(option: Language) => option.label}
				getOptionValue={(option: Language) => option.id}
			>
				<Combobox.Input placeholder="Search languages...">
					<Combobox.Trigger />
				</Combobox.Input>
				<Combobox.Content>
					<GroupedContent />
				</Combobox.Content>
			</Combobox.Root>
		</Flex>
	),
};

export const GroupedMultiSelect: Story = {
	render: () => (
		<Flex
			direction="column"
			gap="2"
			style={{ width: 300, position: "relative" }}
		>
			<Text size="2" weight="medium">
				Select multiple languages
			</Text>
			<Combobox.Root
				options={LANGUAGES}
				multiple
				getOptionLabel={(option: Language) => option.label}
				getOptionValue={(option: Language) => option.id}
			>
				<Combobox.Input placeholder="Search languages...">
					<Combobox.Clear />
					<Combobox.Trigger />
				</Combobox.Input>
				<Combobox.Content>
					<GroupedContent />
				</Combobox.Content>
			</Combobox.Root>
		</Flex>
	),
};

export const Empty: Story = {
	render: () => (
		<Flex
			direction="column"
			gap="2"
			style={{ width: 300, position: "relative" }}
		>
			<Text size="2" weight="medium">
				Custom empty state
			</Text>
			<Combobox.Root options={[]}>
				<Combobox.Input placeholder="Search...">
					<Combobox.Trigger />
				</Combobox.Input>
				<Combobox.Content>
					<Combobox.Empty>
						<Flex direction="column" align="center" gap="1" py="3">
							<Text size="2" color="gray">
								Nothing here yet
							</Text>
							<Text size="1" color="gray">
								Try a different search term
							</Text>
						</Flex>
					</Combobox.Empty>
				</Combobox.Content>
			</Combobox.Root>
		</Flex>
	),
};

export const Disabled: Story = {
	render: () => (
		<Flex
			direction="column"
			gap="2"
			style={{ width: 300, position: "relative" }}
		>
			<Text size="2" weight="medium">
				Disabled combobox
			</Text>
			<Combobox.Root options={FRUITS} disabled>
				<Combobox.Input
					placeholder="Search fruits..."
					aria-label="Disabled combobox"
				>
					<Combobox.Trigger />
				</Combobox.Input>
				<Combobox.Content />
			</Combobox.Root>
		</Flex>
	),
};

export const DisabledMultiSelect: Story = {
	render: () => (
		<Flex
			direction="column"
			gap="2"
			style={{ width: 300, position: "relative" }}
		>
			<Text size="2" weight="medium">
				Disabled with selections
			</Text>
			<Combobox.Root
				options={FRUITS}
				multiple
				disabled
				defaultValue={[FRUITS[0], FRUITS[4], FRUITS[10]]}
			>
				<Combobox.Input
					placeholder="Search fruits..."
					aria-label="Disabled multi-select combobox"
				>
					<Combobox.Clear />
					<Combobox.Trigger />
				</Combobox.Input>
				<Combobox.Content />
			</Combobox.Root>
		</Flex>
	),
};
