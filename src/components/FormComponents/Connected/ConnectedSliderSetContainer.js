import { mapProps }    from 'recompose'
import ConnectedSlider from './ConnectedSliderSet'

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

type SliderProps = {
  value: any,
  onChange: () => any,
  subType: {
    type: string,
  },
  formStyles: any,
  parentField: {
    content?: any,
    options?: any,
  },
}

const merge = (props: Props): SliderProps => {
  const { value, component, formStyles, onChange, dataElement } = props

  const { value: comparisonValue = {} } = dataElement

  const { options } = component
  const { children } = options

  const newChildren = Object.keys(children).reduce((allChildren, key) => {
    const child = children[key]
    const { contentKey } = child
    const _compareValue = comparisonValue[contentKey]
    if (!_compareValue) return child
    return {
      ...allChildren,
      [key]: {
        ...child,
        options: {
          ...(child.options || {}),
          _compareValue,
        },
      },
    }
  }, {})

  const parentField = {
    ...component,
    options: {
      ...options,
      children: newChildren,
    },
  }

  return {
    value,
    parentField,
    formStyles,
    onChange,
  }
}

export default mapProps(merge)(ConnectedSlider)
