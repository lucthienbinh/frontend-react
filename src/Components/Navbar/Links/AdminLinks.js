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
        href: "/my-students",
        name: "Học sinh",
    },
    {
        href: "/schedules",
        name: "Thời khóa biểu",
    },
    {
        href: "/incomes",
        name: "Thu nhập",
    }
];

export default AdminLinks;
  