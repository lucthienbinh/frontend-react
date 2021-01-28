export const COLUMNS = [
  {
    Header: "ID",
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "Customer ID",
    accessor: "customer_id",
  },
  {
    Header: "Phone",
    accessor: "phone",
  },
  {
    Header: "Validate Phone",
    accessor: "validate_phone",
    Cell: ({ value }) => {
      let valueParse = value ? "Yes" : "No"
      return (
        <div> {valueParse} </div>
      )
    },
  },
  {
    Header: "Account Balance",
    accessor: "account_balance",
  },
  {
    Header: "Action",
  },
];