export const COLUMNS = [
  {
    Header: "ID",
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: 'Basic info',
    columns: [
      {
        Header: "OrderID",
        accessor: "order_id",
        disableFilters: true,
      },
      {
        Header: "Shipper ID",
        accessor: "shipper_id",
        disableFilters: true,
      },
      {
        Header: "Cus Send ID",
        accessor: "customer_send_id",
        disableFilters: true,
      },
      {
        Header: "Cus Recv ID",
        accessor: "customer_receive_id",
        disableFilters: true,
      },
    ]
  },
  {
    Header: 'Shiper Status',
    columns: [
      {
        Header: "SP Called",
        accessor: "shipper_called",
        disableFilters: true,
        Cell: ({ value }) => {
          let valueParse = value ? "Yes" : "No"
          return (
            <div> {valueParse} </div>
          )
        },
      },
      {
        Header: "SP Shipped",
        accessor: "shipper_shipped",
        disableFilters: true,
        Cell: ({ value }) => {
          let valueParse = value ? "Yes" : "No"
          return (
            <div> {valueParse} </div>
          )
        },
      },
      {
        Header: "SP Confirmed",
        accessor: "shipper_confirmed",
        disableFilters: true,
        Cell: ({ value }) => {
          let valueParse = value ? "Yes" : "No"
          return (
            <div> {valueParse} </div>
          )
        },
      },
    ]
  },
  {
    Header: 'Package status',
    columns: [
      {
        Header: "Canceled",
        accessor: "canceled",
        disableFilters: true,
        Cell: ({ value }) => {
          let valueParse = value ? "Yes" : "No"
          return (
            <div> {valueParse} </div>
          )
        },
      },
      {
        Header: "Finished",
        accessor: "finished",
        disableFilters: true,
        Cell: ({ value }) => {
          let valueParse = value ? "Yes" : "No"
          return (
            <div> {valueParse} </div>
          )
        },
      },
    ]
  },
  {
    Header: "Action",
  },
];