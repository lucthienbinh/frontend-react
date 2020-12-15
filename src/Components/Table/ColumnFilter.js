import React from "react";

export const ColumnFilter = ({ column }) => {
  const { filterValue, setFilter } = column;
  return (
    <span>
      <div>Search:{" "}</div>
      <input
        style={{ 
          width: 100, 
          height: 25,
          borderRadius: 5,
          border: 'none',
          outline: 'none'
         }}
        value={filterValue || ""}
        onChange={(e) => setFilter(e.target.value)}
      />
    </span>
  );
};
