import React                 from 'react'
import { View }              from 'react-native'
import uuid                  from 'uuid/v4'
import styles                from '../../styles'
import FormElementHeader     from './FormElementHeader'
import FormPicker            from './FormPicker'
import { buildInitialValue } from '../../utils/formHelpers'

type Props = {
  value: Array<any>,
  onChange: () => any,
  field: {
    content?: any,
    options?: any,
  },
  formStyles: any,
  currentFormValue: Object,
}
type State = {}

class FormElementsComponent extends React.PureComponent<Props, State> {
  componentDidUpdate = () => {
    const { value, onChange } = this.props
    if (!value) {
      const initialValue = this._buildInitialValue(this.props)
      onChange({ ...initialValue, _id: uuid() })
    }
  }

  _buildInitialValue = (props: Props) => {
    const initialValue = buildInitialValue(props)
    const value = Object.keys(initialValue).reduce((obj, key) => {
      const valueForKey = initialValue[key]
      return {
        ...obj,
        [key]: {
          ...valueForKey,
          _id: uuid(),
        },
      }
    }, {})
    return value
  }

  componentDidMount = () => {
    const { value, onChange } = this.props
    if (!value) {
      const initialValue = this._buildInitialValue(this.props)
      onChange({ ...initialValue, _id: uuid() })
    }
  }

  _onChange = key => changedValue => {
    const { value = {}, onChange } = this.props

    const valueForKey = value[key]
    const newValue = {
      ...value,
      [key]: {
        ...valueForKey,
        value: changedValue,
      },
    }

    onChange({
      ...newValue,
    })
  }

  render() {
    const { field: { content, options }, value, formStyles = {} } = this.props
    const { childTypes } = options

    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <FormElementHeader
            text={content.text}
            textStyle={formStyles.textStyle}
          />
        </View>
        <View style={[styles.container, styles.listFormContainer]}>
          <View style={styles.listElementContainer}>
            {childTypes &&
              Object.keys(childTypes).map(key => {
                const field = childTypes[key]
                const inValue = value && value[field.key]
                const formValue = value

                return (
                  <FormPicker
                    key={field.key}
                    field={field}
                    value={inValue ? inValue.value : ''}
                    formStyles={formStyles}
                    formValue={formValue}
                    onChange={this._onChange(field.key, key)}
                  />
                )
              })}
          </View>
        </View>
      </View>
    )
  }
}

export default FormElementsComponent
