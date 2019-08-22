// @flow
import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const TextFormButton = ({
  onPress,
  text,
  styles,
  disabled,
}: {
  onPress: () => void,
  text: string,
  styles: any,
  disabled: boolean,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={disabled ? styles.formDisabledButton : styles.button}
    disabled={disabled}
  >
    <Text
      style={[
        styles.text,
        styles.bottomButtonText,
        disabled ? { opacity: 0 } : {},
      ]}
    >
      {text}
    </Text>
  </TouchableOpacity>
)

export default TextFormButton
