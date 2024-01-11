const data = {
  desktopFolders: {
    title: "Desktop Folder Styles",
    fields: {
      demoDisplay: {
        id: "demoDisplay",
        title: "Simulate Hover",
        type: "dropdown",
        value: false,
        default: false,
        options: [
          {value: true, title: "On"},
          {value: false, title: "Off"},
        ],
        onChange: (data) => {
          const instance = data.desktopFolders.demoDisplay;
          if (instance.value == false) {
            return {
              type: 'removeStylesheet',
              id: instance.id,
            }
          } else {
            const rule = `.header-nav .header-nav-item--folder:nth-child(1) .header-nav-folder-content,
#header .header-nav .header-nav-item--folder:nth-child(1) .header-nav-item--nested-folder:first-of-type .nested-folder {
  display: block;
  opacity: 1;
  pointer-events: auto;
}`;
            return {
              type: 'addStylesheet',
              id: instance.id,
              details: rule
            }
          }
        },
      },
      borderWidth: {
        id: "borderWidth",
        type: "range",
        title: "Border Width",
        value: 0,
        default: 0,
        min: 0,
        step: 1,
        max: 10,
        customProperty: "--folder-border-thickness",
        unit: "px",
        onChange: () => {},
      },
      shadowOffsetX: {
        id: "shadowOffsetX",
        type: "range",
        title: "Horizontal Shadow Offset",
        value: 0,
        default: 0,
        min: 0,
        step: 1,
        max: 10,
        customProperty: "--folder-shadow-offset-x",
        unit: "px",
        onChange: () => {},
      },
      shadowOffsetY: {
        id: "shadowOffsetY",
        type: "range",
        title: "Vertical Shadow Offset",
        value: 0,
        default: 0,
        min: 0,
        step: 1,
        max: 10,
        customProperty: "--folder-shadow-offset-y",
        unit: "px",
        onChange: () => {},
      },
      shadowBlur: {
        id: "shadowBlur",
        type: "range",
        title: "Shadow Blur",
        value: 0,
        default: 0,
        min: 0,
        step: 1,
        max: 20,
        customProperty: "--folder-shadow-blur",
        unit: "px",
        onChange: () => {},
      },
      shadowOpacity: {
        id: "shadowOpacity",
        type: "range",
        title: "Shadow Opacity",
        value: 0,
        default: 0,
        min: 0,
        step: 1,
        max: 100,
        customProperty: "--folder-shadow-opacity",
        unit: "%",
        onChange: () => {},
      },
    },
  },

  mobileFolders: {
    title: "Mobile Folder Styles",
    fields: {
      fontSize: {
        id: "fontSize",
        type: "range",
        title: "Nested Item Font Size",
        value: -2.5,
        default: -2.5,
        min: -5,
        step: 0.5,
        max: 5,
        customProperty: "--mobile-nested-item-size",
        unit: "vmin",
        onChange: () => {},
      },
      itemSpacing: {
        id: "itemSpacing",
        type: "range",
        title: "Nested Item Item Spacing",
        value: 2,
        default: 2,
        min: 0,
        step: 0.1,
        max: 5,
        customProperty: "--mobile-nested-item-spacing",
        unit: "vw",
        onChange: () => {},
      },
      nestedItemInset: {
        id: "nestedItemInset",
        type: "range",
        title: "Nested Item Inset",
        value: 12,
        default: 12,
        min: 0,
        step: 1,
        max: 50,
        customProperty: "--mobile-nested-item-inset",
        unit: "px",
        onChange: () => {},
      },
      iconSize: {
        id: "iconSize",
        type: "range",
        title: "Icon Size",
        value: 25,
        default: 25,
        min: 10,
        step: 1,
        max: 50,
        customProperty: "--mobile-nested-folder-icon-size",
        unit: "px",
        onChange: () => {},
      },
      
    },
  }
};
export default data;


  // bannerSettings: {
  //   title: "Banner Settings",
  //   fields: {
  //     height: {
  //       id: "bannerHeight",
  //       type: "range",
  //       title: "Banner Height",
  //       value: 50,
  //       default: 50,
  //       group: "bannerSettings",
  //       min: 0,
  //       step: 1,
  //       max: 100,
  //       customProperty: "--banner-height",
  //       unit: "vh",
  //       onChange: () => {},
  //     },
  //     verticalAlignment: {
  //       id: "verticalAlignment",
  //       title: "Vertical Alignment",
  //       type: "dropdown",
  //       value: "center",
  //       default: "center",
  //       group: "bannerSettings",
  //       customProperty: "--vertical-alignment",
  //       options: [
  //         {value: "start", title: "Top"},
  //         {value: "center", title: "Center"},
  //         {value: "end", title: "Bottom"},
  //       ],
  //       onChange: () => {},
  //     },
  //     textAlignment: {
  //       id: "textAlignment",
  //       title: "Text Alignment",
  //       type: "dropdown",
  //       value: "start",
  //       default: "start",
  //       group: "bannerSettings",
  //       customProperty: "--text-alignment",
  //       options: [
  //         {value: "start", title: "Start"},
  //         {value: "center", title: "Center"},
  //         {value: "end", title: "End"},
  //       ],
  //       onChange: () => {},
  //     },
  //     contentSpacing: {
  //       id: "bannerContentSpacing",
  //       type: "range",
  //       title: "Banner Content Spacing",
  //       value: 8,
  //       default: 8,
  //       group: "bannerSettings",
  //       customProperty: "--banner-content-spacing",
  //       min: 0,
  //       step: 1,
  //       max: 100,
  //       unit: "px",
  //       onChange: () => {},
  //     },
  //     backgroundOpacity: {
  //       id: "backgroundOpacity",
  //       type: "range",
  //       title: "Background Opacity",
  //       value: 15,
  //       default: 15,
  //       group: "bannerSettings",
  //       customProperty: "--banner-overlay-opacity",
  //       min: 0,
  //       step: 1,
  //       max: 100,
  //       unit: "%",
  //       onChange: () => {},
  //     },
  //     gradientOpacity: {
  //       id: "gradientOpacity",
  //       type: "range",
  //       title: "Gradient Opacity",
  //       value: 0,
  //       default: 0,
  //       group: "bannerSettings",
  //       customProperty: "--banner-gradient-opacity",
  //       min: 0,
  //       step: 1,
  //       max: 100,
  //       unit: "%",
  //       onChange: () => {},
  //     },
  //     imageSource: {
  //       id: "imageSource",
  //       title: "Image Source",
  //       type: "dropdown",
  //       value: "thumbnail",
  //       default: "thumbnail",
  //       group: "bannerSettings",
  //       settingProperty: "bannerImage.src",
  //       options: [
  //         {value: "thumbnail", title: "Thumbnail Image"},
  //         {value: "social", title: "Social Image"},
  //       ],
  //       onChange: () => {},
  //     },
  //   },
  // },
  // belowBannerSettings: {
  //   title: "Below Banner Settings",
  //   fields: {
  //     textAlignment: {
  //       id: "belowTextAlignment",
  //       title: "Text Alignment",
  //       type: "dropdown",
  //       value: "start",
  //       default: "start",
  //       group: "bannerSettings",
  //       customProperty: "--below-banner-text-alignment",
  //       options: [
  //         {value: "start", title: "Start"},
  //         {value: "center", title: "Center"},
  //         {value: "end", title: "End"},
  //       ],
  //       onChange: () => {},
  //     },
  //   }
  // },

  // title: {
  //   title: "Title",
  //   fields: {
  //     display: {
  //       id: "titleDisplay",
  //       type: "dropdown",
  //       value: "banner",
  //       default: "banner",
  //       title: "Display",
  //       group: "title",
  //       settingProperty: "title.display",
  //       options: [
  //         {value: "banner", title: "Banner"},
  //         {value: "belowBanner", title: "Below Banner"},
  //       ],
  //       onChange: () => {},
  //     },
  //   },
  // },

  // backToBlog: {
  //   title: "Back To Blog",
  //   fields: {
  //     display: {
  //       id: "backToBlogDisplay",
  //       title: "Display",
  //       type: "dropdown",
  //       value: "banner",
  //       default: "banner",
  //       group: "backToBlog",
  //       settingProperty: "backToBlog.display",
  //       options: [
  //         {value: "banner", title: "Banner"},
  //         {value: "belowBanner", title: "Below Banner"},
  //         {value: "none", title: "None"},
  //       ],
  //       onChange: () => {},
  //     },
  //     text: {
  //       id: "backToBlogText",
  //       title: "Back to Blog Text",
  //       type: "input",
  //       value: "← Back To All Entries",
  //       default: "← Back To All Entries",
  //       group: "backToBlog",
  //       settingProperty: "backToBlog.text",
  //       condition: {
  //         field: 'backToBlog.fields.display',
  //         operator: '!==',
  //         value: 'none'
  //       },
  //       onChange: () => {},
  //     },
  //   },
  // },

  // date: {
  //   title: "Date",
  //   fields: {
  //     display: {
  //       id: "dateDisplay",
  //       title: "Display",
  //       type: "dropdown",
  //       value: "belowBanner",
  //       default: "belowBanner",
  //       settingProperty: "date.display",
  //       group: "date",
  //       options: [
  //         {value: "banner", title: "Banner"},
  //         {value: "belowBanner", title: "Below Banner"},
  //         {value: "none", title: "None"},
  //       ],
  //       onChange: () => {},
  //     },
  //     format: {
  //       id: "dateFormat",
  //       title: "Format",
  //       type: "dropdown",
  //       value: "month day with suffix",
  //       default: "month day with suffix",
  //       group: "date",
  //       settingProperty: "date.format",
  //       condition: {
  //         field: 'date.fields.display',
  //         operator: '!==',
  //         value: 'none'
  //       },
  //       options: [
  //         {value: "short date", title: "12/31/2023"},
  //         {value: "long date", title: "December 31, 2023"},
  //         {value: "time", title: "11:59 PM"},
  //         {value: "weekday", title: "Sunday"},
  //         {value: "month year", title: "December 2023"},
  //         {value: "full", title: "Sunday, December 31, 2023, 11:59 PM"},
  //         {value: "year", title: "2023"},
  //         {value: "month", title: "December"},
  //         {value: "day month", title: "31 December"},
  //         {value: "month day", title: "December 31"},
  //         {value: "month day with suffix", title: "December 31st"},
  //         {value: "day month with suffix", title: "31st December"},
  //         {value: "iso", title: "2023-12-31T23:59:00"},
  //         {value: "none", title: "None"},
  //       ],
  //       onChange: e => {
  //         e.finalOutput.dateFormat = e.dateFormat.value;
  //       },
  //     },
  //   },
  // },

  // excerpt: {
  //   title: "Excerpt",
  //   fields: {
  //     display: {
  //       id: "excerptDisplay",
  //       title: "Display",
  //       type: "dropdown",
  //       value: "none",
  //       default: "none",
  //       group: "excerpt",
  //       settingProperty: "excerpt.display",
  //       options: [
  //         {value: "banner", title: "Banner"},
  //         {value: "belowBanner", title: "Below Banner"},
  //         {value: "none", title: "None"},
  //       ],
  //       onChange: () => {},
  //     },
  //   },
  // },

  // tags: {
  //   title: "Tags",
  //   fields: {
  //     display: {
  //       id: "tagsDisplay",
  //       title: "Display",
  //       type: "dropdown",
  //       value: "none",
  //       default: "none",
  //       group: "tags",
  //       settingProperty: "tags.display",
  //       options: [
  //         {value: "banner", title: "Banner"},
  //         {value: "belowBanner", title: "Below Banner"},
  //         {value: "none", title: "None"},
  //       ],
  //       onChange: () => {},
  //     },
  //     delimiter: {
  //       id: "delimiter",
  //       title: "Delimiter",
  //       type: "input",
  //       value: ", ",
  //       default: ", ",
  //       group: "tags",
  //       settingProperty: "tag.delimiter",
  //       condition: {
  //         field: 'tags.fields.display',
  //         operator: '!==',
  //         value: 'none'
  //       },
  //       onChange: () => {},
  //     },
  //     isLink: {
  //       id: "tagsLink",
  //       title: "Is Link",
  //       type: "dropdown",
  //       value: "true",
  //       default: "true",
  //       group: "tags",
  //       settingProperty: "tags.isLink",
  //       condition: {
  //         field: 'tags.fields.display',
  //         operator: '!==',
  //         value: 'none'
  //       },
  //       options: [
  //         {value: "true", title: "Yes"},
  //         {value: "false", title: "No"},
  //       ],
  //       onChange: () => {},
  //     },
  //   },
  // },

  // categories: {
  //   title: "Categories",
  //   fields: {
  //     display: {
  //       id: "categoriesDisplay",
  //       title: "Display",
  //       type: "dropdown",
  //       value: "none",
  //       default: "none",
  //       settingProperty: "categories.display",
  //       group: "categories",
  //       options: [
  //         {value: "banner", title: "Banner"},
  //         {value: "belowBanner", title: "Below Banner"},
  //         {value: "none", title: "None"},
  //       ],
  //       onChange: () => {},
  //     },
  //     delimiter: {
  //       id: "categoriesDelimiter",
  //       title: "Delimiter",
  //       type: "input",
  //       value: ", ",
  //       default: ", ",
  //       group: "categories",
  //       settingProperty: "categories.delimiter",
  //       condition: {
  //         field: 'categories.fields.display',
  //         operator: '!==',
  //         value: 'none'
  //       },
  //       onChange: () => {},
  //     },
  //     isLink: {
  //       id: "categoriesLink",
  //       title: "Is Link",
  //       type: "dropdown",
  //       value: "true",
  //       default: "true",
  //       group: "categories",
  //       settingProperty: "categories.isLink",
  //       condition: {
  //         field: 'categories.fields.display',
  //         operator: '!==',
  //         value: 'none'
  //       },
  //       options: [
  //         {value: "true", title: "Yes"},
  //         {value: "false", title: "No"},
  //       ],
  //       onChange: () => {},
  //     },
  //   },
  // },
// };