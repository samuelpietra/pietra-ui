import type { FieldCreator } from "../Catalog.types";

export type Player = {
	id: string;
	name: string;
	nationality: string;
	marketValue: number;
	position: string;
};

export const PLAYERS: Player[] = [
	{
		id: "1",
		name: "Ronaldo Nazario",
		nationality: "Brazil",
		marketValue: 45,
		position: "Striker",
	},
	{
		id: "2",
		name: "Zinedine Zidane",
		nationality: "France",
		marketValue: 55,
		position: "Midfielder",
	},
	{
		id: "3",
		name: "Ronaldinho Gaucho",
		nationality: "Brazil",
		marketValue: 40,
		position: "Midfielder",
	},
];

export function createFields(createField: FieldCreator<Player>) {
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
		}),
		createField<"marketValue">({
			type: "descriptor",
			id: "marketValue",
			label: "Market Value",
			value: (p) => p.marketValue,
			render: (value) => `€${value}M`,
			align: "right",
			width: 140,
		}),
		createField<"position">({
			type: "descriptor",
			id: "position",
			label: "Position",
			value: (p) => p.position,
		}),
	];
}
