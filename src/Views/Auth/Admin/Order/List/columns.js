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


export const ORDER_PAY_COLUMNS = [
  {
    Header: "ID",
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: 'Customer info',
    columns: [
      {
        Header: "Order ID",
        accessor: "order_id",
      },
      {
        Header: "Pay method",
        accessor: "pay_method",
        disableFilters: true,
      },
      {
        Header: "Pay status",
        accessor: "pay_status",
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
                }} > { valueParse }
            </div>
          )
        },
      },
      {
        Header: "Total price",
        accessor: "total_price",
        disableFilters: true,
      },
    ]
  },
  {
    Header: 'Finished step',
    columns: [
      {
        Header: "One",
        accessor: "finished_step_one",
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
                }} > { valueParse }
            </div>
          )
        },
      },
      {
        Header: "Two",
        accessor: "finished_step_two",
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
                }} > { valueParse }
            </div>
          )
        },
      },
    ]
  },
  {
    Header: 'Shipper',
    columns: [
      {
        Header: "Receive money",
        accessor: "shipper_receive_money",
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
                }} > { valueParse }
            </div>
          )
        },
      },
    ]
  },
];
