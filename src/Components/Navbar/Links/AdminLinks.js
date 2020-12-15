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
                href: "/employee/create",
                name: "Create employee",
            },
        ]
    },
    {
        name: "Location",
        dropDown: true,
        childrens: [
            {
                href: "/delivery-location/list",
                name: "Location list",
            },
            {
                href: "/delivery-location/create",
                name: "Create location",
            },
        ]
    },
    {
        href: "/incomes",
        name: "Thu nhập",
    }
];

export default AdminLinks;
  