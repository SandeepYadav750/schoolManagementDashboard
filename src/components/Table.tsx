interface ColumnType {
  header: string;
  accessories: string;
  className?: string;
}

const Table = ({
  columns,
  renderRow,
  data,
}: {
  columns: ColumnType[];
  renderRow: (item: any) => React.ReactNode;
  data: any[];
}) => {
  return (
    <table className="w-full mt-4">
      <thead>
        <tr className="text-left text-sm text-gray-500">
          {columns.map((col) => (
            <th
              className={`${col.className} || text-gray-500`}
              key={col.accessories}
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map((item) => renderRow(item))}</tbody>
    </table>
  );
};

export default Table;
