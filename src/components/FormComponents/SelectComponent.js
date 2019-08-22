// @flow
import React                            from 'react'
import { Picker, Platform, View, Text } from 'react-native'
import ModalSelector                    from 'react-native-modal-selector'
import FormElementHeader                from './FormElementHeader'
import styles                           from '../../styles'
import { DISABLE }                      from './../../forms/constants'
import type { SelectStyle }             from './../../types/formTypes'

const AndroidPicker = (props: any) => {
  const { options = {}, items, onChange, formStyles, baseValue, value } = props
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
        selectedValue={
          value ? value : baseValue ? baseValue.value : options.default
        }
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
  const { items, onChange, formStyles, value, baseValue, options = {} } = props
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
      : baseValue ? baseValue.value : data[0]

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

const Select = ({
  value,
  onChange,
  field: { content, options },
  baseValue = null,
  formStyles = {},
  __extraProps = {},
}: {
  value: string,
  onChange: string => any,
  formStyles: any,
  baseValue: {
    value: string,
  },
  field: {
    content: {
      text: string,
      items: Array<{ text: string, value: string }>,
    },
    options?: {
      default?: string,
      label?: string,
      repeats?: string,
      style?: SelectStyle,
    },
  },
  formValue: any,
  __extraProps: {
    editObjectId: string,
    filterFunction?: (Array<any>) => Array<any>,
  },
}) => {
  const { style: staticStyles = {} } = options

  const onValueChange = itemValue => {
    onChange(itemValue)
  }

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

  const textStyle = {
    ...formStyles.textStyle,
    ...(staticStyles.formHeaderText ? staticStyles.formHeaderText : {}),
  }

  return (
    <React.Fragment>
      <FormElementHeader text={content.text} textStyle={textStyle} />
      {options.label &&
        options.label.length > 0 && (
          <Text style={[styles.componentSubtitle, formStyles.textStyle]}>
            {options.label}
          </Text>
        )}
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
            items={filteredItems}
            options={options}
            onChange={onValueChange}
            baseValue={baseValue}
          />
        ) : (
          <AndroidPicker
            value={value}
            formStyles={formStyles}
            items={filteredItems}
            options={options}
            onChange={onValueChange}
            baseValue={baseValue}
          />
        )}
      </View>
    </React.Fragment>
  )
}

export default Select
