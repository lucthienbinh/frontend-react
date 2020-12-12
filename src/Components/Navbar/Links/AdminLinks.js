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
                href: "/location/list",
                name: "Employee list",
            },
            {
                href: "/location/create",
                name: "Create employee",
            },
        ]
    },
    {
        href: "/incomes",
        name: "Thu nhập",
    }
];

export default AdminLinks;
  