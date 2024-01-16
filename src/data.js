const data = {
  desktopFolders: {
    title: "Desktop Folder Styles",
    fields: {
      demoDisplay: {
        id: "demoDisplay",
        title: "Simulate Hover",
        type: "checkbox",
        value: false,
        default: false,
        options: [
          {value: true, title: "On"},
          {value: false, title: "Off"},
        ],
        onChange: data => {
          const instance = data.desktopFolders.demoDisplay;
          if (instance.value == false) {
            return {
              type: "removeStylesheet",
              id: instance.id,
            };
          } else {
            const rule = `.header-nav .header-nav-item--folder:nth-child(1) .header-nav-folder-content,
#header .header-nav .header-nav-item--folder:nth-child(1) .header-nav-item--nested-folder:first-of-type .nested-folder {
  display: block;
  opacity: 1;
  pointer-events: auto;
}`;
            return {
              type: "addStylesheet",
              id: instance.id,
              details: rule,
            };
          }
        },
      },
      borderWidth: {
        id: "borderWidth",
        type: "range",
        title: "Border Width",
        value: 1,
        default: 1,
        min: 0,
        step: 1,
        max: 10,
        customProperty: "--folder-border-thickness",
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
        condition: {
          field: "desktopFolders.fields.shadowOpacity",
          operator: "!==",
          value: 0,
        },
        onChange: () => {},
      },
      shadowSpread: {
        id: "shadowSpread",
        type: "range",
        title: "Shadow Spread",
        value: 0,
        default: 0,
        min: 0,
        step: 1,
        max: 20,
        customProperty: "--folder-shadow-spread",
        unit: "px",
        condition: {
          field: "desktopFolders.fields.shadowOpacity",
          operator: "!==",
          value: 0,
        },
        onChange: () => {},
      },
      shadowOffsetX: {
        id: "shadowOffsetX",
        type: "range",
        title: "Horizontal Shadow Offset",
        value: 2,
        default: 2,
        min: 0,
        step: 1,
        max: 10,
        customProperty: "--folder-shadow-offset-x",
        unit: "px",
        condition: {
          field: "desktopFolders.fields.shadowOpacity",
          operator: "!==",
          value: 0,
        },
        onChange: () => {},
      },
      shadowOffsetY: {
        id: "shadowOffsetY",
        type: "range",
        title: "Vertical Shadow Offset",
        value: 2,
        default: 2,
        min: 0,
        step: 1,
        max: 10,
        customProperty: "--folder-shadow-offset-y",
        unit: "px",
        condition: {
          field: "desktopFolders.fields.shadowOpacity",
          operator: "!==",
          value: 0,
        },
        onChange: () => {},
      },
    },
  },

  mobileFolders: {
    title: "Mobile Folder Styles",
    description:
      "To view this on mobile, click and drag the resize bar on the far right.",
    fields: {
      fontSize: {
        id: "fontSize",
        type: "range",
        title: "Nested Item Font Size",
        tippy: "If links get cut off, just close and reopen the dropdown to reset it's height. ",
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
  },
};
export default data;