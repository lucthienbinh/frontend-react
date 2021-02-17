const AdminLinks = [
    {
        name: "Customer",
        dropDown: true,
        childrens: [
            {
                href: "/customer/list",
                name: "Customer list",
            },
            {
                href: "/customer-credit/list",
                name: "Customer credit list",
            },
        ]
    },
    {
        name: "Employee",
        dropDown: true,
        childrens: [
            {
                href: "/employee/list",
                name: "Employee list",
            },
            {
                href: "/employee-type/list",
                name: "Employee type list",
            },
            {
                href: "/delivery-location/list",
                name: "Delivery location list",
            },
        ]
    },
    {
        href: "/transport-type/list",
        name: "Transport type list",
    },
    {
        href: "/long-ship/list",
        name: "Long ship",
    },
    {
        href: "/order/list",
        name: "Order list",
    },
    {
        href: "/order-short-ship/list",
        name: "Order short ship",
    },
    {
        href: "/zeebe-api",
        name: "Zeebe API",
    },
];

export default AdminLinks;
  