export const COLUMNS = [
  {
    Header: "ID",
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: 'Customer info',
    columns: [
      {
        Header: "Send",
        accessor: "customer_send_id",
        disableFilters: true,
      },
      {
        Header: "Receive",
        accessor: "customer_receive_id",
        disableFilters: true,
      },
    ]
  },
  {
    Header: 'Delivery location info',
    columns: [
      {
        Header: "Sender",
        accessor: "sender",
        disableFilters: true,
      },
      {
        Header: "Receiver",
        accessor: "receiver",
        disableFilters: true,
      },
    ]
  },
  {
    Header: 'Shiping info',
    columns: [

      {
        Header: "Transport Type ID",
        accessor: "transport_type_id",
        disableFilters: true,
      },
      {
        Header: "TotalPrice",
        accessor: "total_price",
        disableFilters: true,
      },
    ]
  },
  {
    Header: "Action",
  },
];