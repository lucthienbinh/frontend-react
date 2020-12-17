export const COLUMNS = [
  {
    Header: 'Basic Info',
    columns: [
      {
        Header: "ID",
        accessor: "id",
        disableFilters: true,
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ value }) => {
          return (
            <div
              style={{
                whiteSpace: "nowrap",
                width: 110,
                overflow: "hidden",
                textOverflow: "ellipsis",
                }} > { value }
            </div>
          )
        },
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Address",
        accessor: "address",
      },
    ]
  },
  {
    Header: 'Employee Info',
    columns: [
      {
        Header: "Type",
        accessor: "employee_type_name",
      },
      {
        Header: "City",
        accessor: "delivery_location_city",
      },
      {
        Header: "District",
        accessor: "delivery_location_district",
      },
    ]
  },
  {
    Header: "Action",
  },
];
