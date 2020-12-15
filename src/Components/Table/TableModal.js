import React, { useMemo } from "react";
import { useTable, usePagination, useFilters } from "react-table";
import { Button, ButtonGroup } from "react-bootstrap";
import "./table.css";
import { ColumnFilter } from "./ColumnFilter";

export const TableModal = (props) => {
  const columns = useMemo(() => props.columns, []);
  const data = useMemo(() => props.data, []);

  const defaultColumn = React.useMemo(
    () => ({
      Filter: ColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      defaultColumn,
    },
    useFilters,
    usePagination
  );

  const { pageIndex, pageSize } = state;

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}{" "}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  if (cell.column.Header === "Action") {
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <ButtonGroup className="m-1">
                          <Button
                            className="btn btn-9"
                            onClick={() =>
                              props.tableButton.buttonUpdate(cell.row.values.id)
                            }
                          >
                            Update
                          </Button>
                          <Button
                            className="btn btn-10"
                            onClick={() =>
                              props.tableButton.buttonDelete(cell.row.values.id)
                            }
                          >
                            Delete
                          </Button>
                        </ButtonGroup>
                      </td>
                    );
                  } else if (cell.column.Header === "ID") {
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          textAlign: "center",
                        }}
                      >
                        <Button
                          className="btn btn-8"
                          onClick={() =>
                            props.tableButton.buttonDetail(cell.row.values.id)
                          }
                        >
                          {cell.row.values.id}
                        </Button>
                      </td>
                    );
                  } else {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "50px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 25, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
