import React    from 'react'
import { Text } from 'react-native-elements'
import styles   from '../../styles'

const Label = ({
  field: {
    content = {
      text: '',
    },
  },
  formStyles = {},
}: {
  color?: string,
  field: {
    content: {
      text: string,
    },
  },
  formStyles: any,
}) => (
  <Text h4 style={[styles.labelComponent, formStyles.textStyle]}>
    {content.text}
  </Text>
)

export default Label
