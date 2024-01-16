const navigation = {
  title: "Nested Folders",
  items: [
    {
      title: "Install",
      page: "https://www.will-myers.com/nested-folders/installation",
    },
    {
      title: "Customize",
      page: "design",
    },
    {
      title: "Advanced",
      page: "https://www.will-myers.com/nested-folders/advanced",
      subpages: [
        {
          title: "Clickable Nested Titles",
          scrollTo: "#clickable-links", // should be a selector
        },
        {
          title: "Self Hosting",
          scrollTo: "#self-hosting"
        },
      ],
    },
    {
      title: "Support",
      page: "https://www.will-myers.com/nested-folders/support",
    },
  ],
};

export default navigation;
