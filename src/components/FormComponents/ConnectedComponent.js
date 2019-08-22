import React             from 'react'
import types             from '../../forms/types'
import { View }          from 'react-native'
import styles            from '../../styles'
import ConnectedSelect   from './Connected/ConnectedSelect'
import ConnectedSet      from './Connected/ConnectedSetSwitch'
import ConnectedText     from './Connected/ConnectedText'
import FormElementHeader from './FormElementHeader'

type Props = {
  onChange: () => any,
  value: any,
  field: any,
  buttonHandler: () => any,
  currentFormValue: any,
  allFields: any,
  component: any,
  header: string,
  dataElement: {
    text: string,
    value: Array<any>,
    type: string,
  },
  formStyles: any,
}

const SwitchComponent = (props: { component: any, props: any }) => {
  const { component: { type } } = props
  switch (type) {
  case types.string:
    return <ConnectedText {...props} />
  case types.select:
    return <ConnectedSelect {...props} />
  case types.set:
    return <ConnectedSet {...props} />
  default:
    return null
  }
}

class ConnectedComponent extends React.PureComponent<Props> {
  render() {
    const { header, formStyles = {} } = this.props
    return (
      <React.Fragment>
        <View style={styles.container}>
          <View style={styles.container}>
            <FormElementHeader text={header} textStyle={formStyles.textStyle} />
          </View>
          <SwitchComponent {...this.props} formStyles={formStyles} />
        </View>
      </React.Fragment>
    )
  }
}

export default ConnectedComponent
