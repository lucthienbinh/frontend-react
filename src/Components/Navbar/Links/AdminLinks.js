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
                href: "/delivery-location/list",
                name: "Delivery location list",
            },
        ]
    },
    {
        href: "/incomes",
        name: "Thu nhập",
    }
];

export default AdminLinks;
  