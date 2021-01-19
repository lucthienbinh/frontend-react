export const TRANSPORTTYPECOLUMNS = [
  {
    Header: "ID",
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: 'Long ship basic info',
    columns: [
      {
        Header: "From",
        accessor: "location_one",
        disableFilters: true,
      },
      {
        Header: "To",
        accessor: "location_two",
        disableFilters: true,
      },
      {
        Header: "Duration",
        accessor: "long_ship_duration",
        disableFilters: true,
        Cell: ({ value }) => {
          let date = Math.floor(value / 86400)
          return date + " day(s)";
        }
      },
      {
        Header: "Price",
        accessor: "long_ship_price",
        disableFilters: true,
      },
    ]
  },
  {
    Header: 'Bus station address',
    columns: [
      {
        Header: "From",
        accessor: "bus_station_from",
        disableFilters: true,
      },
      {
        Header: "To",
        accessor: "bus_station_to",
        disableFilters: true,
      },
    ]
  },
];