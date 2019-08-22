// @flow
import React          from 'react'
import types          from '../../forms/types'
import Label          from './Label'
import TextInput      from './TextInput'
import Button         from './ButtonComponent'
import Select         from './SelectComponent'
import List           from './ListComponent'
import MultipleSelect from './MultipleSelectComponent'
import Set            from './SetComponent'
import Slider         from './SingleSlider'
import FormElements   from './FormElementsComponent'
import BooleanSwitch  from './SwitchComponent'
import { connect }    from './ConnectedComponentContainer'

type Props = {
  onChange: () => any,
  value: any,
  field: any,
  buttonHandler: () => any,
  formValue: any,
}

const SwitchComponent = ({ field, props }: { type: string, props: any }) => {
  const { type } = field
  switch (type) {
    case types.label:
      return <Label {...props} />
    case types.string:
      return <TextInput {...props} />
    case types.button:
      return <Button {...props} />
    case types.select:
      return <Select {...props} />
    case types.list:
      return <List {...props} />
    case types.multipleSelect:
      return <MultipleSelect {...props} />
    case types.set:
      return <Set {...props} />
    case types.slider:
      return <Slider {...props} />
    case types.formElements:
      return <FormElements {...props} />
    case types.switch:
      return <BooleanSwitch {...props} />
    default:
      return null
  }
}

class FormPicker extends React.PureComponent<Props> {
  render() {
    const { field } = this.props
    return <SwitchComponent field={field} props={this.props} />
  }
}

export default connect(FormPicker)
