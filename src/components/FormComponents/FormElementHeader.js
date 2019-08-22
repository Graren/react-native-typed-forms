// @flow
import React    from 'react'
import { Text } from 'react-native-elements'
import styles   from '../../styles'

type Props = {
  text: string,
  textStyle: any,
}

class FormElementHeader extends React.PureComponent<Props> {
  render() {
    const { text, textStyle = {} } = this.props
    return <Text style={[styles.textInputLabelStyle, textStyle]}>{text}</Text>
  }
}

export default FormElementHeader
