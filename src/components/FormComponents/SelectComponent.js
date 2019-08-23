// @flow
import React                          from 'react'
import { Picker, Platform, View }     from 'react-native'
import ModalSelector                  from 'react-native-modal-selector'
import Component                      from './Component'
import FormElementHeader              from './FormElementHeader'
import styles                         from '../../styles'
import { DISABLE }                    from './../../forms/constants'
import type { SelectStyle, ItemType } from './../../types/formTypes'

const AndroidPicker = (props: any) => {
  const { options = {}, items, onChange, formStyles, value } = props
  const { style: staticStyles = {} } = options
  return (
    <View
      style={[
        styles.pickerBackground,
        formStyles.elementContainerStyle,
        staticStyles ? staticStyles.selectContainerStyle : {},
      ]}
    >
      <Picker
        selectedValue={value ? value : options.default}
        style={[
          styles.pickerStyle,
          staticStyles ? staticStyles.pickerContainerStyle : {},
        ]}
        onValueChange={onChange}
        itemStyle={[
          styles.pickerItemStyle,
          staticStyles ? staticStyles.itemStyle : {},
        ]}
      >
        {items &&
          items.map(({ value, text }) => (
            <Picker.Item key={value} value={value} label={text} />
          ))}
      </Picker>
    </View>
  )
}

const IOSPicker = (props: any) => {
  const { items, onChange, formStyles, value, options = {} } = props
  const { style: staticStyles = {} } = options

  const data =
    items && items.length > 0
      ? items.map(({ value, text }) => ({
          key: value,
          label: text,
        }))
      : [{ key: '', label: '-' }]

  const dataElement =
    value && data
      ? data.find(element => element.key === value) || data[0]
      : data[0]

  const textValue = dataElement.label

  return (
    data && (
      <View
        style={[
          styles.pickerStyle,
          formStyles.elementContainerStyle,
          staticStyles ? staticStyles.selectContainerStyle : {},
        ]}
      >
        <ModalSelector
          initValue={textValue}
          selectTextStyle={styles.iosSelectorText}
          data={data}
          onChange={element => onChange(element.key)}
        />
      </View>
    )
  )
}

type Props = {
  value: string,
  onChange: string => any,
  formStyles: any,
  customProps: {
    filter: (Array<ItemType>) => Array<ItemType>,
  },
  field: {
    content: {
      text: string,
      items: Array<{ text: string, value: string }>,
    },
    options?: {
      default?: string,
      repeats?: string,
      style?: SelectStyle,
    },
  },
  formValue: any,
  __extraProps: {
    editObjectId: string,
    filterFunction?: (Array<any>) => Array<any>,
  },
}

class Select extends Component<Props> {
  _onValueChange = itemValue => {
    this.onBaseChange(itemValue)
  }

  render() {
    const {
      value,
      field: { content, options },
      formStyles = {},
      __extraProps = {},
      customProps = {},
    } = this.props

    const { style: staticStyles = {} } = options

    const { filterFunction = null } = __extraProps
    const filteredItems =
      content && content.items
        ? options &&
          options.repeats &&
          options.repeats === DISABLE &&
          filterFunction !== null
          ? filterFunction(content.items)
          : content.items
        : []

    const userFilter = customProps.filter || null

    const selectItems = userFilter ? userFilter(filteredItems) : filteredItems

    const textStyle = {
      ...formStyles.textStyle,
      ...(staticStyles.formHeaderText ? staticStyles.formHeaderText : {}),
    }

    return (
      <React.Fragment>
        <FormElementHeader text={content.text} textStyle={textStyle} />
        <View
          style={[
            styles.pickerContainer,
            staticStyles.pickerContentContainer
              ? staticStyles.pickerContentContainer
              : {},
          ]}
        >
          {Platform.OS === 'ios' ? (
            <IOSPicker
              value={value}
              formStyles={formStyles}
              items={selectItems}
              options={options}
              onChange={this._onValueChange}
            />
          ) : (
            <AndroidPicker
              value={value}
              formStyles={formStyles}
              items={selectItems}
              options={options}
              onChange={this._onValueChange}
            />
          )}
        </View>
      </React.Fragment>
    )
  }
}

export default Select
