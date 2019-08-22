// @flow

import React                   from 'react'
import { TouchableOpacity }    from 'react-native'
import Icon                    from 'react-native-vector-icons/Ionicons'
import { iconSize, iconColor } from '../../styles'

// TODO: Remove redundant styles
/**
 * This is the element edition button and soon to be element deletion button
 * @param {Object} props
 * @param {Function} props.onPress - What to call when the button is pressed
 * @param {String} props.icon - Vector icon that will render
 * @param {Object} props.styles - Styles to beautify the component
 * @param {Object} props.styles.button - Outer button style
 * @param {Object} props.styles.text - Styles to beautify the icon
 * @param {Object} props.styles.icon - Styles to beautify the icon
 */
const FormButton = ({
  onPress,
  icon,
  styles,
}: {
  onPress: () => any,
  icon: string,
  styles: any,
}) => (
  <TouchableOpacity onPress={onPress} style={styles.button}>
    <Icon
      style={[styles.text, styles.icon]}
      name={icon}
      size={iconSize}
      color={iconColor}
    />
  </TouchableOpacity>
)

export default FormButton
