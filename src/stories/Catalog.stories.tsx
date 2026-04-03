import { useState } from "react";
import { Search } from "lucide-react";
import type { Meta, StoryObj } from "@storybook/react";

import {
	Avatar,
	BadgeGroup,
	type BadgeGroupItem,
	type BadgeProps,
	Button,
	Catalog,
	CatalogGrid,
	CatalogItemCount,
	CatalogList,
	CatalogTable,
	CatalogToolbar,
	CatalogViewSwitcher,
	type FieldCreator,
	Flex,
	Text,
	TextField,
	useCatalogContext,
} from "@/components";

import frenchieBlack from "./assets/frenchie-black.png";
import frenchieBlue from "./assets/frenchie-blue.png";
import frenchieGreen from "./assets/frenchie-green.png";
import frenchieRed from "./assets/frenchie-red.png";
import frenchieYellow from "./assets/frenchie-yellow.png";

type Tag = {
	label: string;
	color: BadgeProps["color"];
};

type Player = {
	id: string;
	name: string;
	nationality: string;
	marketValue: number;
	position: string;
	tags: Tag[];
	image: string;
	bio: string;
};

const PLAYERS: Player[] = [
	{
		id: "1",
		name: "Ronaldo Nazario",
		nationality: "Brazil",
		marketValue: 45,
		position: "Striker",
		tags: [
			{ label: "ballon d'or", color: "gold" },
			{ label: "finisher", color: "red" },
			{ label: "skillful", color: "cyan" },
			{ label: "legend", color: "violet" },
		],
		image: frenchieYellow,
		bio: "Il Fenomeno. Widely regarded as one of the greatest strikers of all time, known for his explosive pace, clinical finishing, and ability to dribble past entire defenses.",
	},
	{
		id: "4",
		name: "Thierry Henry",
		nationality: "France",
		marketValue: 35,
		position: "Forward",
		tags: [
			{ label: "finisher", color: "red" },
			{ label: "leader", color: "teal" },
		],
		image: frenchieRed,
		bio: "Arsenal's all-time top scorer. A lethal combination of pace, power, and technical brilliance that terrorized Premier League defenses for years.",
	},
	{
		id: "5",
		name: "Paolo Maldini",
		nationality: "Italy",
		marketValue: 30,
		position: "Defender",
		tags: [
			{ label: "captain", color: "orange" },
			{ label: "leader", color: "teal" },
			{ label: "legend", color: "violet" },
			{ label: "versatile", color: "green" },
		],
		image: frenchieBlack,
		bio: "The definition of defensive perfection. Spent his entire 25-year career at AC Milan, mastering both left-back and centre-back positions with unmatched grace.",
	},
	{
		id: "2",
		name: "Zinedine Zidane",
		nationality: "France",
		marketValue: 55,
		position: "Midfielder",
		tags: [
			{ label: "ballon d'or", color: "gold" },
			{ label: "playmaker", color: "blue" },
			{ label: "captain", color: "orange" },
			{ label: "legend", color: "violet" },
		],
		image: frenchieBlue,
		bio: "The maestro of elegance. His roulette turns and silky first touch made him one of the most technically gifted players in football history.",
	},
	{
		id: "3",
		name: "Ronaldinho Gaucho",
		nationality: "Brazil",
		marketValue: 40,
		position: "Midfielder",
		tags: [
			{ label: "ballon d'or", color: "gold" },
			{ label: "skillful", color: "cyan" },
			{ label: "playmaker", color: "blue" },
			{ label: "versatile", color: "green" },
		],
		image: frenchieGreen,
		bio: "Barcelona legend. Worldly-known for impossible dribblings, overwhelming freekicks and a crooked smile all the time.",
	},
	{
		id: "6",
		name: "Carles Puyol",
		nationality: "Spain",
		marketValue: 25,
		position: "Defender",
		tags: [
			{ label: "captain", color: "orange" },
			{ label: "leader", color: "teal" },
		],
		image: frenchieYellow,
		bio: "The heart and soul of Barcelona's golden era. A warrior on the pitch whose leadership and determination inspired every teammate around him.",
	},
	{
		id: "7",
		name: "Gianluigi Buffon",
		nationality: "Italy",
		marketValue: 35,
		position: "Goalkeeper",
		tags: [
			{ label: "leader", color: "teal" },
			{ label: "captain", color: "orange" },
			{ label: "legend", color: "violet" },
			{ label: "versatile", color: "green" },
		],
		image: frenchieBlue,
		bio: "One of the greatest goalkeepers ever to grace the game. His reflexes, commanding presence, and longevity set the standard for generations.",
	},
	{
		id: "8",
		name: "Clarence Seedorf",
		nationality: "Netherlands",
		marketValue: 28,
		position: "Midfielder",
		tags: [
			{ label: "versatile", color: "green" },
			{ label: "playmaker", color: "blue" },
			{ label: "skillful", color: "cyan" },
			{ label: "leader", color: "teal" },
		],
		image: frenchieGreen,
		bio: "The only player to win the Champions League with three different clubs. A powerful, versatile midfielder with an extraordinary football intellect.",
	},
	{
		id: "9",
		name: "Oliver Kahn",
		nationality: "Germany",
		marketValue: 30,
		position: "Goalkeeper",
		tags: [
			{ label: "captain", color: "orange" },
			{ label: "leader", color: "teal" },
			{ label: "legend", color: "violet" },
			{ label: "finisher", color: "red" },
		],
		image: frenchieRed,
		bio: "Der Titan. A fierce competitor between the posts, known for his incredible shot-stopping ability and intimidating presence that rattled strikers worldwide.",
	},
	{
		id: "10",
		name: "Samuel Eto'o",
		nationality: "Cameroon",
		marketValue: 32,
		position: "Striker",
		tags: [
			{ label: "finisher", color: "red" },
			{ label: "skillful", color: "cyan" },
			{ label: "leader", color: "teal" },
			{ label: "versatile", color: "green" },
		],
		image: frenchieBlack,
		bio: "Africa's greatest ever striker. His blistering speed and predatory instincts made him a key figure in Barcelona's treble-winning season.",
	},
];

function createFields(createField: FieldCreator<Player>) {
	return [
		createField<"id">({
			type: "identifier",
			id: "playerId",
			value: (p) => p.id,
		}),
		createField<"name">({
			type: "descriptor",
			id: "name",
			label: "Player",
			value: (p) => p.name,
			comparator: (a, b) => a.localeCompare(b),
		}),
		createField<"nationality">({
			type: "descriptor",
			id: "nationality",
			label: "Nationality",
			value: (p) => p.nationality,
			comparator: (a, b) => a.localeCompare(b),
		}),
		createField<"marketValue">({
			type: "descriptor",
			id: "marketValue",
			label: "Market Value",
			value: (p) => p.marketValue,
			render: (value) => `€${value}M`,
			comparator: (a, b) => a - b,
			align: "right",
			width: 140,
		}),
		createField<"position">({
			type: "descriptor",
			id: "position",
			label: "Position",
			value: (p) => p.position,
			comparator: (a, b) => a.localeCompare(b),
		}),
		createField<"tags">({
			type: "descriptor",
			id: "tags",
			label: "Tags",
			value: (p) => p.tags,
			render: (tags) => (
				<BadgeGroup
					badges={tags.map(
						(t): BadgeGroupItem => ({
							id: t.label,
							children: t.label,
							color: t.color,
							variant: "soft",
							size: "1",
						}),
					)}
				/>
			),
		}),
	];
}

function listViewProps() {
	return {
		titleField: "name",
		subtitleField: "position",
		descriptionField: (_: unknown, createField: FieldCreator<Player>) =>
			createField<"bio">({
				type: "descriptor",
				id: "bio",
				label: "Bio",
				value: (p) => p.bio,
			}),
		previewField: (_: unknown, createField: FieldCreator<Player>) =>
			createField<"image">({
				type: "descriptor",
				id: "preview",
				label: "Preview",
				value: (p) => p.image,
				render: (url) => <Avatar size="7" src={url} fallback="?" />,
			}),
		footerField: "tags",
	} as const;
}

function gridViewProps() {
	return {
		titleField: "name",
		previewField: (_: unknown, createField: FieldCreator<Player>) =>
			createField<"image">({
				type: "descriptor",
				id: "preview",
				label: "Preview",
				value: (p) => p.image,
				render: (url) => <img src={url} alt="" />,
			}),
		footerField: "tags",
	} as const;
}

function BulkActions() {
	const { selectedItems, setSelectedItems } = useCatalogContext<Player>();

	if (selectedItems.length === 0) return null;

	return (
		<Button
			size="1"
			color="red"
			variant="soft"
			onClick={() => {
				alert(`Removing ${selectedItems.length} players`);
				setSelectedItems([]);
			}}
		>
			Remove ({selectedItems.length})
		</Button>
	);
}

const meta: Meta = {
	title: "Components/Catalog",
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
	render: () => {
		const [filter, setFilter] = useState("");
		const filtered = PLAYERS.filter((p) =>
			p.name.toLowerCase().includes(filter.toLowerCase()),
		);

		return (
			<Catalog collection={filtered} mapItemToFields={createFields}>
				<CatalogToolbar>
					<CatalogItemCount />
					<TextField.Root
						size="1"
						placeholder="Search players..."
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
						style={{ marginLeft: "auto" }}
					>
						<TextField.Slot>
							<Search size={12} />
						</TextField.Slot>
					</TextField.Root>
					<CatalogViewSwitcher />
				</CatalogToolbar>
				<CatalogTable defaultView />
				<CatalogList {...listViewProps()} />
				<CatalogGrid {...gridViewProps()} />
			</Catalog>
		);
	},
};

export const Selectable: Story = {
	render: () => (
		<Catalog collection={PLAYERS} mapItemToFields={createFields} selectable>
			<CatalogToolbar>
				<CatalogItemCount />
				<BulkActions />
				<CatalogViewSwitcher />
			</CatalogToolbar>
			<CatalogTable defaultView />
			<CatalogList {...listViewProps()} />
			<CatalogGrid {...gridViewProps()} />
		</Catalog>
	),
};

export const NoData: Story = {
	render: () => (
		<Catalog<Player> collection={[]} mapItemToFields={createFields}>
			<CatalogToolbar>
				<CatalogItemCount />
				<CatalogViewSwitcher />
			</CatalogToolbar>
			<CatalogTable
				defaultView
				noDataMessage={
					<Flex direction="column" align="center" gap="1" py="4">
						<Text weight="medium">No players found</Text>
						<Text size="1" color="gray">
							Try adjusting your search or filters.
						</Text>
					</Flex>
				}
			/>
		</Catalog>
	),
};
