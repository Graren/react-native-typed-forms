// @flow
import React                                     from 'react'
import { View }                                  from 'react-native'
import { CheckBox }                              from 'react-native-elements'
import FormElementHeader                         from './FormElementHeader'
import styles, { checkboxColor, uncheckedColor } from '../../styles'
import type { MultiSelectStyle }                 from '../../types/formTypes'

type Props = {
  value: Array<string>,
  onChange: string => any,
  formStyles: any,
  field: {
    content: {
      text: string,
      items: Array<{ text: string, value: string }>,
    },
    options?: {
      default: string,
      style?: MultiSelectStyle,
    },
  },
}

const Check = ({
  onChange,
  checked,
  title,
}: {
  onChange: () => any,
  checked: Boolean,
  title: string,
}) => (
  <CheckBox
    iconType="ionicon"
    checkedIcon="ios-checkbox"
    uncheckedIcon="ios-checkbox-outline"
    checkedColor={checkboxColor}
    uncheckedColor={uncheckedColor}
    checked={checked}
    title={title}
    onPress={onChange}
    containerStyle={{ backgroundColor: 'transparent' }}
  />
)

class MultipleSelect extends React.PureComponent<Props> {
  _onChange = item => {
    const { onChange, value = [] } = this.props
    const { value: itemValue } = item
    const valueSet = new Set(value)
    if (valueSet.has(itemValue)) valueSet.delete(itemValue)
    else valueSet.add(itemValue)
    onChange([...valueSet])
  }

  render() {
    const {
      value = [],
      field: { content, options = {} },
      formStyles = {},
    } = this.props
    const { style: staticStyles = {} } = options
    const valueSet = new Set(value)

    return (
      <React.Fragment>
        <FormElementHeader
          text={content.text}
          textStyle={formStyles.textStyle}
        />
        <View
          style={[
            styles.pickerContainer,
            staticStyles ? staticStyles.pickerContainerStyle : {},
          ]}
        >
          <View
            style={[
              styles.pickerBackground,
              formStyles.elementContainerStyle,
              staticStyles ? staticStyles.selectContainerStyle : {},
            ]}
          >
            {content &&
              content.items.map(item => (
                <Check
                  key={item.id}
                  onChange={() => this._onChange(item)}
                  checked={valueSet.has(item.value)}
                  title={item.text}
                />
              ))}
          </View>
        </View>
      </React.Fragment>
    )
  }
}
export default MultipleSelect
