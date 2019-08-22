import React        from 'react'
import SliderSet    from './ConnectedSliderSetContainer'
import { setTypes } from '../../../forms/types'

type Props = {
  onChange: () => any,
  value: any,
  field: any,
  buttonHandler: () => any,
  currentFormValue: any,
  allFields: any,
  component: {
    content?: any,
    options?: any,
  },
  dataElement: {
    text: string,
    value: Array<any>,
    type: string,
  },
  formStyles: any,
}

const SwitchComponent = ({ props }: { type: string }) => {
  const { component } = props
  const { options = {} } = component
  const { subtype: { type } } = options
  switch (type) {
  case setTypes.slider:
    return <SliderSet {...props} />
  default:
    return null
  }
}

class SetSwitch extends React.PureComponent<Props> {
  render() {
    return <SwitchComponent props={this.props} />
  }
}

export default SetSwitch
