/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";

import {
  Column,
  usePagination,
  useSortBy,
  useTable,
  TableOptions,
} from "react-table";

function TableHOC<T extends object>(
  columns: Column<T>[],
  data: T[],
  containerClassName: string,
  heading: string,
  showPagination: boolean = false
) {
  return function HOC() {
    const options: TableOptions<T> = {
      columns,
      data,
      initialState: {
        pageSize: 6,
      },
    };

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page,
      nextPage,
      previousPage,
      canNextPage,
      canPreviousPage,
      gotoPage,
      pageCount,
      state: { pageIndex },
    } = useTable(options, useSortBy, usePagination);
    return (
      <div className={containerClassName}>
        <h2 className="heading">{heading}</h2>
        <table className="table" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, headerGroupIndex) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                key={headerGroup.id || headerGroupIndex}
              >
                {headerGroup.headers.map((column, columnIndex) => {
                  const { key, ...restProps } = column.getHeaderProps(
                    column.getSortByToggleProps()
                  );
                  return (
                    <th key={key || columnIndex} {...restProps}>
                      {column.render("Header")}
                      {column.isSorted && (
                        <span>
                          {column.isSortedDesc ? (
                            <AiOutlineSortDescending />
                          ) : (
                            <AiOutlineSortAscending />
                          )}
                        </span>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, rowIndex) => {
              prepareRow(row);
              const { key, ...rowProps } = row.getRowProps();
              return (
                <tr {...rowProps} key={key || rowIndex}>
                  {row.cells.map((cell, cellIndex) => {
                    const { key, ...cellProps } = cell.getCellProps();
                    return (
                      <td key={key || cellIndex} {...cellProps}>
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        {showPagination && (
          <div className="tablePagination">
            <button onClick={() => gotoPage(0)} disabled={pageIndex === 0}>
              First Page
            </button>
            <button disabled={!canPreviousPage} onClick={previousPage}>
              Prev
            </button>
            <span>{`${pageIndex + 1} of ${pageCount}`}</span>
            <button disabled={!canNextPage} onClick={nextPage}>
              Next
            </button>
            <button
              onClick={() => gotoPage(pageCount - 1)}
              disabled={pageIndex === pageCount - 1}
            >
              Last Page
            </button>
          </div>
        )}
      </div>
    );
  };
}

export default TableHOC;
