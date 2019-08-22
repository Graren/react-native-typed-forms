// @flow
import React                                        from 'react'
import { View, Text, TextInput as TextInputNative } from 'react-native'
import R                                            from 'ramda'
import { FormInput }                                from 'react-native-elements'
import type { TextStyle }                           from '../../../types/formTypes'
import styles                                       from '../../../styles'

const TextInput = ({
  value,
  onChange,
  formStyles = {},
  component: {
    content = {
      text: '',
    },
    options = {
      multiline: false,
      placeHolder: '',
      label: '',
      numberOfLines: null,
      fullWidth: false,
      type: 'default',
      style: {},
    },
    style = {},
  },
}: {
  value: string,
  onChange: string => any,
  color: string,
  formStyles: any,
  component: {
    content?: {
      text: string,
    },
    options?: {
      multiline: boolean,
      placeHolder: string,
      label: string,
      default?: string,
      type?: string,
      style?: TextStyle,
    },
    style?: Object,
  },
}) => (
  <React.Fragment>
    {options.multiline ? (
      <View
        style={[
          styles.textInputContainerStyle,
          formStyles.elementContainerStyle,
          options.style ? options.style.textInputContainerStyle : {},
          options.fullWidth ? { width: '100%' } : {},
        ]}
      >
        <TextInputNative
          style={[
            R.isEmpty(style) ? styles.textInputStyle : style,
            options.style ? options.style.textInputStyle : {},
          ]}
          underlineColorAndroid={'transparent'}
          onChangeText={onChange}
          value={value ? value : options.default}
          multiline
          placeholder={options.placeHolder}
          numberOfLines={options.numberOfLines}
          allowFontScaling
          keyboardType={options.type}
        />
      </View>
    ) : (
      <FormInput
        containerStyle={[
          styles.textInputContainerStyle,
          formStyles.elementContainerStyle,
          options.style ? options.style.textInputContainerStyle : {},
          options.fullWidth ? { width: '100%' } : {},
        ]}
        inputStyle={[
          R.isEmpty(style) ? styles.textInputStyle : style,
          options.style ? options.style.textInputStyle : {},
        ]}
        underlineColorAndroid={'transparent'}
        onChangeText={onChange}
        value={value ? value : options.default}
        placeholder={options.placeHolder}
        keyboardType={options.type}
      />
    )}
  </React.Fragment>
)

export default TextInput
