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
                href: "/customer/create",
                name: "Create customer",
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
        name: "Transport",
        dropDown: true,
        childrens: [
            {
                href: "/transport-type/list",
                name: "Transport type list",
            },
            {
                href: "/long-ship/list",
                name: "Long ship list",
            },
        ]
    },
    {
        href: "/long-ship/list",
        name: "Long ship",
    },
];

export default AdminLinks;
  