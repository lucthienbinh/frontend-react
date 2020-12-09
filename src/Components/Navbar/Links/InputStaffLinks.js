const InputStaffLinks = [
    {
        name: "Khóa học",
        dropDown: true,
        childrens: [
            {
                href: "/courses",
                name: "Danh sách",
            },
            {
                href: "/my-course",
                name: "Khóa học đang tham gia",
            },
            {
                href: "/recommend-courses",
                name: "Khóa học đề xuất",
            },
        ]
    },
    {
        name: "Giáo viên",
        dropDown: true,
        childrens: [
            {
                href: "/subscribed-teachers",
                name: "Giáo viên đang theo dõi",
            },
            {
                href: "/teachers",
                name: "Danh sách",
            }
        ]
    },
    {
        href: "/schedules",
        name: "Thời khóa biểu",
    }
];

export default InputStaffLinks;
  