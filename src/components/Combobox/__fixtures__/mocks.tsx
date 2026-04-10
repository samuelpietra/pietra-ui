import { useState } from "react";

import { Box } from "@/components/Box";

import { Combobox } from "../../index";

export const FRUITS = ["Apple", "Banana", "Cherry", "Date", "Elderberry"];

type Language = { id: string; label: string; category: string };

export const LANGUAGES: Language[] = [
	{ id: "js", label: "JavaScript", category: "Web" },
	{ id: "ts", label: "TypeScript", category: "Web" },
	{ id: "py", label: "Python", category: "General" },
	{ id: "rs", label: "Rust", category: "Systems" },
];

const CATEGORIES = ["Web", "General", "Systems"] as const;

const LANGUAGES_BY_CATEGORY = (() => {
	let offset = 0;

	return CATEGORIES.map((category) => {
		const languages = LANGUAGES.filter((l) => l.category === category);
		const group = { category, languages, startIndex: offset };

		offset += languages.length;

		return group;
	});
})();

export function SingleSelect({
	options = FRUITS,
	onChange,
}: {
	options?: string[];
	onChange?: (value: string | string[] | null) => void;
}) {
	return (
		<Combobox.Root options={options} onChange={onChange}>
			<Combobox.Input placeholder="Select a fruit..." />
			<Combobox.Content />
		</Combobox.Root>
	);
}

export function MultiSelect({
	options = FRUITS,
	onChange,
	collapseTags,
}: {
	options?: string[];
	onChange?: (value: string | string[] | null) => void;
	collapseTags?: boolean;
}) {
	return (
		<Combobox.Root options={options} multiple onChange={onChange}>
			<Combobox.Input
				placeholder="Select fruits..."
				collapseTags={collapseTags}
			/>
			<Combobox.Content />
		</Combobox.Root>
	);
}

export function CreatableSelect() {
	const [options, setOptions] = useState(FRUITS);
	return (
		<Combobox.Root
			options={options}
			allowCreate
			onCreateOption={(value: string) => {
				setOptions((previous) => [...previous, value]);
				return value;
			}}
		>
			<Combobox.Input placeholder="Select or create..." />
			<Combobox.Content />
		</Combobox.Root>
	);
}

export function WithClear() {
	return (
		<Combobox.Root options={FRUITS} multiple>
			<Combobox.Input placeholder="Select fruits...">
				<Combobox.Clear />
			</Combobox.Input>
			<Combobox.Content />
		</Combobox.Root>
	);
}

export function GroupedSelect({
	onChange,
}: {
	onChange?: (value: Language | Language[] | null) => void;
}) {
	return (
		<Combobox.Root
			options={LANGUAGES}
			getOptionLabel={(option: Language) => option.label}
			getOptionValue={(option: Language) => option.id}
			onChange={onChange}
		>
			<Combobox.Input placeholder="Search languages..." />
			<Combobox.Content>
				{LANGUAGES_BY_CATEGORY.map((group, groupIndex) => (
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
				))}
			</Combobox.Content>
		</Combobox.Root>
	);
}
