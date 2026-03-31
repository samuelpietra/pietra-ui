import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";

import {
	Badge,
	DataTable,
	type DataTableColumn,
	Flex,
	type SortState,
	Text,
} from "@/components";

type Employee = {
	id: string;
	name: string;
	email: string;
	role: string;
	status: "active" | "inactive";
};

const EMPLOYEES: Employee[] = [
	{
		id: "1",
		name: "J. Jonah Jameson",
		email: "jjj@dailybugle.com",
		role: "Publisher",
		status: "active",
	},
	{
		id: "2",
		name: "Norman Osborn",
		email: "norman@oscorp.com",
		role: "Chief Executive Officer",
		status: "active",
	},
	{
		id: "3",
		name: "Otto G. Octavius",
		email: "otto@oscorp.com",
		role: "Head of Research",
		status: "inactive",
	},
	{
		id: "4",
		name: "Peter Parker",
		email: "peter@dailybugle.com",
		role: "Photographer",
		status: "active",
	},
	{
		id: "5",
		name: "Eddie Brock",
		email: "eddie@dailybugle.com",
		role: "Reporter",
		status: "inactive",
	},
];

const COLUMNS: DataTableColumn<Employee>[] = [
	{
		id: "name",
		header: "Name",
		cell: (item) => item.name,
		comparator: (a, b) => a.name.localeCompare(b.name),
		isRowHeader: true,
	},
	{
		id: "email",
		header: "Email",
		cell: (item) => item.email,
	},
	{
		id: "role",
		header: "Role",
		cell: (item) => item.role,
		comparator: (a, b) => a.role.localeCompare(b.role),
	},
];

const CUSTOM_COLUMNS: DataTableColumn<Employee>[] = [
	{
		id: "name",
		header: "Name",
		cell: (item) => item.name,
		isRowHeader: true,
		width: 200,
	},
	{
		id: "email",
		header: "Email",
		cell: (item) => item.email,
		align: "center",
	},
	{
		id: "status",
		header: "Status",
		cell: (item) => (
			<Badge color={item.status === "active" ? "green" : "gray"} variant="soft">
				{item.status}
			</Badge>
		),
		align: "right",
		width: 100,
	},
];

const meta: Meta = {
	title: "Components/DataTable",
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
	render: () => (
		<DataTable columns={COLUMNS} data={EMPLOYEES} ariaLabel="Employees" />
	),
};

function SortableExample() {
	const [sort, setSort] = useState<SortState>({
		columnId: "name",
		direction: "asc",
	});

	return (
		<DataTable
			columns={COLUMNS}
			data={EMPLOYEES}
			ariaLabel="Sortable employees"
			sort={sort}
			onSortChange={setSort}
		/>
	);
}

export const Sortable: Story = {
	render: () => <SortableExample />,
};

export const CustomColumns: Story = {
	render: () => (
		<DataTable
			columns={CUSTOM_COLUMNS}
			data={EMPLOYEES}
			ariaLabel="Employees with custom columns"
		/>
	),
};

export const Striped: Story = {
	render: () => (
		<DataTable
			columns={COLUMNS}
			data={EMPLOYEES}
			ariaLabel="Striped employees"
			striped
		/>
	),
};

export const ClickableRows: Story = {
	render: () => (
		<DataTable
			columns={COLUMNS}
			data={EMPLOYEES}
			ariaLabel="Clickable employees"
			onRowClick={(item) => alert(`Clicked: ${item.name}`)}
		/>
	),
};

export const NoData: Story = {
	render: () => (
		<Flex direction="column" gap="5">
			<DataTable
				columns={COLUMNS}
				data={[]}
				ariaLabel="Default empty message"
			/>
			<DataTable
				columns={COLUMNS}
				data={[]}
				ariaLabel="Custom empty message"
				noDataMessage={
					<Flex direction="column" align="center" gap="1" py="4">
						<Text weight="medium">No employees found</Text>
						<Text size="1" color="gray">
							Try adjusting your search or filters.
						</Text>
					</Flex>
				}
			/>
		</Flex>
	),
};
