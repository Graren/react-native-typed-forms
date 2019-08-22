import React                        from 'react'
import { Picker, Platform }         from 'react-native'
import ModalSelector                from 'react-native-modal-selector'
import { connectedComponentStyles } from '../../../styles'
import type { SelectStyle }         from './../../types/formTypes'

const Select = ({
  value,
  onChange,
  component: { content, options },
  formStyles = {},
}: {
  value: string,
  onChange: string => any,
  formStyles: any,
  component: {
    content: {
      items: Array<{ text: string, value: string }>,
    },
    options?: {
      default: string,
      style?: SelectStyle,
    },
  },
}) => {
  const onValueChange = itemValue => {
    onChange(itemValue)
  }

  const onChangeIosSelector = item => {
    onChange(item.key)
  }

  const renderAndroidPicker = () => (
    <Picker
      selectedValue={value ? value : options.value}
      style={[
        connectedComponentStyles.pickerStyle,
        formStyles.elementContainerStyle,
        options.style ? options.style.pickerContainerStyle : {},
      ]}
      onValueChange={onValueChange}
      itemStyle={[
        connectedComponentStyles.pickerItemStyle,
        options.style ? options.style.itemStyle : {},
      ]}
    >
      {content &&
        content.items.map(({ value, text }) => (
          <Picker.Item key={value} value={value} label={text} />
        ))}
    </Picker>
  )

  const renderiOSPicker = () => {
    const data = content
      ? content.items.map(({ value, text }) => ({
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
        <ModalSelector
          initValue={textValue}
          data={data}
          onChange={onChangeIosSelector}
          selectStyle={[
            connectedComponentStyles.modalPicker,
            options.style ? options.style.pickerContainerStyle : {},
          ]}
          selectTextStyle={connectedComponentStyles.modalText}
        />
      )
    )
  }

  return (
    <React.Fragment>
      {Platform.OS === 'ios' ? renderiOSPicker() : renderAndroidPicker()}
    </React.Fragment>
  )
}

export default Select
