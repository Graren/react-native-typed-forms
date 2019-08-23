## React native typed forms

An UI forms library to make it easy to build forms with custom development behavior in react native

### Installation

First you need to install

- [react-native-svg](https://github.com/react-native-community/react-native-svg)
- [react-native-svg-icon](https://github.com/stowball/react-native-svg-icon)
- [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)

Then

`npm install --save react-native-typed-forms`

Or if using yarn

`yarn add react-native-typed-forms`

### Usage

The main component of the library is the Form component, this component handles everything from displaying the form to handling the inner data of the form.

```
import { Form } from 'react-native-typed-form`

.
.
.
    <Form
        model={model}
        value={formData}
        onFinish={formFinished}
        disableAnswers
    />
.
.
.
```

#### Properties

| Property       | Required | default | type             |
| :------------- | :------- | :------ | :--------------- |
| model          | yes      | -       | Object           |
| value          | no       | null    | Object - null\*  |
| onFinish       | yes      | -       | Function(Object) |
| disableAnswers | no       | false   | Boolean\*\*      |

On finish will provide a data value that can be provided AS IS to the value prop of the form, and the form itself will handle the data to preload the components.

\*If you do not provide a value (that is, the value produced by the onFinish method after completing a form) it will always create a new blank form. Providing a value preloads with data from previous iterations.

\*\*Extremely recommended to set as true always, this was an old mechanic that needs to be changed

#### Model

The model is the spec the lib will use to build the form, see the example for a more convoluted use, but basically it's the following:

```
{
  type: formTypes.form, // always
  answer: answerTypes.single, // answer types, multiple not docummented
  fields: {
    0: { // for now, indexes are required
      type: formTypes.string, // any of the form component types
      key: 'text_identifier', // key is required, has to be unique inside the form
      content: {
        text: 'This is a text field you can fill',
      },
      options: {
        placeHolder: 'Filler text',
        multiline: true,
        default: '',
      },
    },
  },
}
```

Each component has it's own unique content/options spec, which are due for documentation.

# Example app

To run the example app 
```
  - git clone this repo
  - cd example
  - npm install
  - react-native run-android
```

Windows users may need to run npx react-native run-android or similar commands to use the inner react-native cli instead of the proxy cli. Due to new issues with react-native 0.60.x unexpected behavior unrelated to the lib may happen, please inform me of those issues

# Contributing
No particular rules enforced for now, open issues and make PRs to be reviewed


# Special thanks
- @EdoAPP
- Dan Kurfirst