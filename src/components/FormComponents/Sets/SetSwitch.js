import React        from 'react'
import SliderSet    from './SliderSet'
import { setTypes } from '../../../forms/types'

type Props = {
  onChange: () => any,
  value: any,
  field: any,
  buttonHandler: () => any,
  formValue: any,
  subtype: any,
}

const SwitchComponent = ({ props }: { type: string }) => {
  const { subtype } = props
  const { type } = subtype
  const { field: parentField, ...rest } = props
  switch (type) {
  case setTypes.slider:
    return <SliderSet {...rest} parentField={parentField} />
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
