import { format } from 'date-fns'

export const LONGSHIPCOLUMNS = [
  {
    Header: "ID",
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "Transport type id",
    accessor: "transport_type_id",
  },
  {
    Header: "License plate",
    accessor: "license_plate",
  },

  {
    Header: "Departure time",
    accessor: "estimated_time_of_departure",
    disableFilters: true,
    Cell: ({ value }) => {
      return format(new Date(value * 1000), 'dd/MM/yy HH:mm:ss')
    }
  },
  {
    Header: "Arrival time",
    accessor: "estimated_time_of_arrival",
    disableFilters: true,
    Cell: ({ value }) => {
      return format(new Date(value * 1000), 'dd/MM/yy HH:mm:ss')
    }
  },

  {
    Header: "Finished",
    accessor: "finished",
    disableFilters: true,
    Cell: ({ value }) => {
      let valueParse = value ? "Yes" : "No"
      return (
        <div
          style={{
            whiteSpace: "nowrap",
            width: 110,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }} > { valueParse}
        </div>
      )
    },
  },
];

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
    Header: 'Short ship',
    columns: [
      {
        Header: "Price / KM",
        accessor: "short_ship_price_per_km",
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