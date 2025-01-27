import { generateID } from "@/lib/common";

export const FORM_ENTITIES_NAME = {
  BLOCK: "page",

  INPUTTEXTFIELD: "text-field",
  INPUTMULTILINE: "multiline-text-field",
  RADIOGROUP: "radio-group",
  SELECTDROPDOWN: "select-drop-down",

  CHECKBOX: "checkbox",
  DATEFIELD: "date-field",
  TIMEFIELD: "time-field",
  FILEUPLOAD: "file-upload",
  IMAGEUPLOAD: "image-upload",
  TOGGLE: "toggle",
  CHECKLIST: "checklist",
  SIGNATURE: "signature",
  MULTICHOICES: "multi-choices",
  SCANCODE: "scan-code",
  VERIFIEDID: "verified-id",
  INFORMATION: "information",
};

export const FORM_COMPONENTS = {
  CONTROL: "control",
  CONTAINER: "container",
};

export const FORM_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
};

export const FORM_PAGE = [
  {
    id: FORM_ENTITIES_NAME.BLOCK,
    controlName: FORM_ENTITIES_NAME.BLOCK,
    displayText: "Page",
    description: "Form Page",
    itemType: FORM_COMPONENTS.CONTAINER,
    heading: "Page Name",
    subHeading: "Page sub-heading (optional)",
    skipAble: false,
    type: "INPUT",
  },
];

export const FORM_ENTITIES = [
  // Input
  {
    id: FORM_ENTITIES_NAME.INPUTTEXTFIELD,
    controlName: FORM_ENTITIES_NAME.INPUTTEXTFIELD,
    displayText: "Input Field",
    description:
      "Displays a form input field or a component that looks like an input field.",
    labelName: "Input Field",
    itemType: FORM_COMPONENTS.CONTROL,
    dataType: "text",
    required: false,
    category: "text-elements",
    containerId: "",
    placeholder: "Placeholder for Input Field",
    name: "Text Field",
    sequence: 0,
  },

  // Textarea
  {
    id: FORM_ENTITIES_NAME.INPUTMULTILINE,
    controlName: FORM_ENTITIES_NAME.INPUTMULTILINE,
    displayText: "Text Field",
    description:
      "Displays a form textarea or a component that looks like a textarea.",
    labelName: "Text Field",
    itemType: FORM_COMPONENTS.CONTROL,
    dataType: "text",
    required: false,
    category: "text-elements",
    containerId: "",
    placeholder: "Placeholder for Text Field",
    name: "Text Field",
    sequence: 0,
  },

  //Radio
  {
    id: FORM_ENTITIES_NAME.RADIOGROUP,
    controlName: FORM_ENTITIES_NAME.RADIOGROUP,
    displayText: "Radio",
    description:
      "A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.",
    labelName: "Label for Radio",
    itemType: FORM_COMPONENTS.CONTROL,
    required: false,
    category: "choose-elements",
    items: [
      {
        id: generateID(),
        value: "radio-option-1",
        label: "Radio Option 1",
      },
      {
        id: generateID(),
        value: "radio-option-2",
        label: "Radio Option 2",
      },
    ],

    containerId: "",
    placeholder: "Placeholder for Radio",
    name: "Radio",
    sequence: 0,
  },

  //Select
  {
    id: FORM_ENTITIES_NAME.SELECTDROPDOWN,
    controlName: FORM_ENTITIES_NAME.SELECTDROPDOWN,
    displayText: "Select",
    description:
      "Displays a list of options for the user to pick from—triggered by a button.",
    labelName: "Label for Select",
    itemType: FORM_COMPONENTS.CONTROL,
    required: false,
    items: [
      {
        id: generateID(),
        value: "Option__-1",
        label: "Option 1",
      },
      {
        id: generateID(),
        value: "Option__-2",
        label: "Option 2",
      },
    ],
    category: "select-elements",
    containerId: "",
    placeholder: "Placeholder for Select",
    name: "Dropdown",
    sequence: 0,
  },

  // Checkbox
  {
    id: FORM_ENTITIES_NAME.CHECKBOX,
    controlName: FORM_ENTITIES_NAME.CHECKBOX,
    displayText: "Checkbox",
    description:
      "A control that allows the user to toggle between checked and not checked.",
    labelName: "Checkbox",
    itemType: FORM_COMPONENTS.CONTROL,
    dataType: "boolean",
    required: false,
    category: "boolean-elements",
    containerId: "",
    placeholder: "Placeholder for Checkbox",
    name: "Checkbox",
    sequence: 0,
  },
];
