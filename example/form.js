// @flow
import {formTypes, answerTypes} from 'react-native-forms';

const multipleSelectOptions = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5',
];

const selectFieldOptions = [
  'Option 1',
  'Option 2',
  'Option 3',
  'Option 4',
  'Option 5',
];

const form = {
  type: formTypes.form,
  answer: answerTypes.multiple,
  fields: {
    0: {
      type: formTypes.string,
      key: 'text_identifier',
      content: {
        text: 'This is a text field you can fill',
      },
      options: {
        placeHolder: 'Filler text',
        multiline: true,
        default: '',
      },
    },
    1: {
      type: formTypes.multipleSelect,
      key: 'multiple_select_identifier',
      content: {
        text: 'A multiple select field as well!',
        listText: 'Selection',
        items: multipleSelectOptions.map(opt => ({
          value: opt,
          text: opt,
          id: `$multiple_select_identifier_${opt}`,
        })),
      },
      options: {
        default: [],
        required: true,
        constraints: {
          min: 1,
        },
      },
    },
    2: {
      type: formTypes.select,
      key: 'select_field_identifier',
      content: {
        text: 'Have a standard select field with default value',
        items: selectFieldOptions.map(opt => ({
          value: opt,
          text: opt,
        })),
      },
      options: {
        default: selectFieldOptions[2],
      },
    },
    3: {
      type: formTypes.list,
      key: 'list-identifier',
      content: {
        text: 'And a list component',
        listText: 'list',
        smallKey: 'list',
      },
      options: {
        childTypes: {
          0: {
            type: formTypes.string,
            key: 'list-identifier.string',
            options: {
              placeHolder: 'some text',
            },
          },
        },
        default: [],
        required: true,
      },
    },
  },
};

export default form;
