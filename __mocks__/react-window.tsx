export function useDynamicRowHeight({
	defaultRowHeight,
}: { defaultRowHeight: number }) {
	return defaultRowHeight;
}

export function List({
	rowComponent: Row,
	rowProps,
	rowCount,
	role,
	className,
}: {
	rowComponent: React.ComponentType<
		{ index: number; style: React.CSSProperties } & Record<string, unknown>
	>;
	rowProps: Record<string, unknown>;
	rowCount: number;
	role?: string;
	className?: string;
	[key: string]: unknown;
}) {
	return (
		<div role={role} className={className}>
			{Array.from({ length: rowCount }, (_, i) => (
				<Row key={i} index={i} style={{}} {...rowProps} />
			))}
		</div>
	);
}

export function Grid({
	cellComponent: Cell,
	cellProps,
	columnCount,
	rowCount,
	role,
}: {
	cellComponent: React.ComponentType<
		{
			columnIndex: number;
			rowIndex: number;
			style: React.CSSProperties;
		} & Record<string, unknown>
	>;
	cellProps: Record<string, unknown>;
	columnCount: number;
	rowCount: number;
	role?: string;
	[key: string]: unknown;
}) {
	return (
		<div role={role}>
			{Array.from({ length: rowCount }, (_, rowIndex) =>
				Array.from({ length: columnCount }, (_, columnIndex) => (
					<Cell
						key={`${rowIndex}-${columnIndex}`}
						rowIndex={rowIndex}
						columnIndex={columnIndex}
						style={{}}
						{...cellProps}
					/>
				)),
			)}
		</div>
	);
}
