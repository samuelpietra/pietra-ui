export function List({
	rowComponent: Row,
	rowProps,
	rowCount,
}: {
	rowComponent: React.ComponentType<
		{ index: number; style: React.CSSProperties } & Record<string, unknown>
	>;
	rowProps: Record<string, unknown>;
	rowCount: number;
	[key: string]: unknown;
}) {
	return Array.from({ length: rowCount }, (_, i) => (
		<Row key={i} index={i} style={{}} {...rowProps} />
	));
}
