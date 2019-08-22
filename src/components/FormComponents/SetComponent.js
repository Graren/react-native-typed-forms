import React             from 'react'
import { View }          from 'react-native'
import FormElementHeader from './FormElementHeader'
import styles            from '../../styles'
import SetSwitch         from './Sets/SetSwitch'

type Props = {
  value: Array<any>,
  onChange: () => any,
  field: {
    content?: any,
    options?: any,
  },
  formStyles: any,
}

class SetComponent extends React.PureComponent<Props> {
  _onChange = (value: any) => {
    const { onChange } = this.props
    onChange(value)
  }

  render() {
    const { field, value = null, formStyles = {} } = this.props
    const { content, options, key } = field
    const { subtype } = options
    return (
      <View style={styles.container}>
        <View style={styles.formElementHeaderContainer}>
          <FormElementHeader
            text={content.text}
            textStyle={formStyles.textStyle}
          />
        </View>
        <View style={[styles.container, styles.listFormContainer]}>
          <View style={styles.listElementContainer}>
            {subtype && (
              <SetSwitch
                field={field}
                key={key}
                subtype={subtype}
                value={value}
                formStyles={formStyles}
                onChange={value => this._onChange(value)}
              />
            )}
          </View>
        </View>
      </View>
    )
  }
}

export default SetComponent
