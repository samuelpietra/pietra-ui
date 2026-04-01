import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import {
	Badge,
	Button,
	Catalog,
	CatalogItemCount,
	CatalogTable,
	CatalogToolbar,
	type FieldCreator,
	Flex,
	Text,
	useCatalogContext,
} from "@/components";

type Player = {
	id: string;
	name: string;
	nationality: string;
	marketValue: number;
	position: string;
	tags: string[];
};

const PLAYERS: Player[] = [
	{
		id: "1",
		name: "Ronaldo Nazario",
		nationality: "Brazil",
		marketValue: 45,
		position: "Striker",
		tags: ["legend", "ballon d'or"],
	},
	{
		id: "2",
		name: "Zinedine Zidane",
		nationality: "France",
		marketValue: 55,
		position: "Midfielder",
		tags: ["legend", "ballon d'or"],
	},
	{
		id: "3",
		name: "Ronaldinho Gaucho",
		nationality: "Brazil",
		marketValue: 40,
		position: "Midfielder",
		tags: ["legend", "skillful"],
	},
	{
		id: "4",
		name: "Thierry Henry",
		nationality: "France",
		marketValue: 35,
		position: "Forward",
		tags: ["legend"],
	},
	{
		id: "5",
		name: "Paolo Maldini",
		nationality: "Italy",
		marketValue: 30,
		position: "Defender",
		tags: ["legend", "captain"],
	},
	{
		id: "6",
		name: "Carles Puyol",
		nationality: "Spain",
		marketValue: 25,
		position: "Defender",
		tags: ["legend", "captain"],
	},
	{
		id: "7",
		name: "Gianluigi Buffon",
		nationality: "Italy",
		marketValue: 35,
		position: "Goalkeeper",
		tags: ["legend"],
	},
	{
		id: "8",
		name: "Clarence Seedorf",
		nationality: "Netherlands",
		marketValue: 28,
		position: "Midfielder",
		tags: ["legend"],
	},
	{
		id: "9",
		name: "Oliver Kahn",
		nationality: "Germany",
		marketValue: 30,
		position: "Goalkeeper",
		tags: ["legend", "captain"],
	},
	{
		id: "10",
		name: "Samuel Eto'o",
		nationality: "Cameroon",
		marketValue: 32,
		position: "Striker",
		tags: ["legend"],
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
	];
}

const meta: Meta = {
	title: "Components/Catalog",
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
	render: () => (
		<Catalog collection={PLAYERS} mapItemToFields={createFields}>
			<CatalogToolbar>
				<CatalogItemCount />
			</CatalogToolbar>
			<CatalogTable />
		</Catalog>
	),
};

export const WithSelection: Story = {
	render: () => (
		<Catalog collection={PLAYERS} mapItemToFields={createFields} selectable>
			<CatalogToolbar>
				<CatalogItemCount />
			</CatalogToolbar>
			<CatalogTable />
		</Catalog>
	),
};

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

export const FullExample: Story = {
	render: () => {
		const [filter, setFilter] = useState("");
		const filtered = PLAYERS.filter((p) =>
			p.name.toLowerCase().includes(filter.toLowerCase()),
		);

		return (
			<Catalog
				collection={filtered}
				mapItemToFields={(createField) => [
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
						onClick: (p) => alert(`Navigate to ${p.name}`),
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
					createField<"tags">({
						type: "descriptor",
						id: "tags",
						label: "Tags",
						value: (p) => p.tags,
						render: (tags) =>
							tags.map((t) => (
								<Badge key={t} variant="soft" size="1">
									{t}
								</Badge>
							)),
					}),
				]}
				selectable
			>
				<CatalogToolbar>
					<CatalogItemCount />
					<BulkActions />
					<input
						placeholder="Filter..."
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
						style={{
							marginLeft: "auto",
							padding: "4px 8px",
							border: "1px solid var(--gray-6)",
							borderRadius: "var(--radius-1)",
						}}
					/>
				</CatalogToolbar>
				<CatalogTable striped />
			</Catalog>
		);
	},
};

export const NoData: Story = {
	render: () => (
		<Catalog<Player> collection={[]} mapItemToFields={createFields}>
			<CatalogToolbar>
				<CatalogItemCount />
			</CatalogToolbar>
			<CatalogTable
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
