const AdminLinks = [
    {
        name: "Khóa học",
        dropDown: true,
        childrens: [
            {
                href: "/course/create",
                name: "Thêm khóa học",
            },
            {
                href: "/my-courses",
                name: "Danh sách khóa học",
            },
            {
                href: "/my-lessons",
                name: "Danh sách bài học",
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
  