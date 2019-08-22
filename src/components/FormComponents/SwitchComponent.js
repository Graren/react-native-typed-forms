import React                  from 'react'
import { View, Switch, Text } from 'react-native'
import FormElementHeader      from './FormElementHeader'
import styles                 from '../../styles'

const SwitchComponent = ({
  value,
  onChange,
  formStyles = {},
  baseValue = null,
  field: {
    content = {
      text: '',
    },
    options = {
      label: '',
      default: false,
      style: {},
    },
    style = {},
  },
}: {
  value: string,
  onChange: string => any,
  color: string,
  formStyles: any,
  baseValue: {
    value: boolean,
  },
  field: {
    content?: {
      text: string,
    },
    options?: {
      label: string,
      default?: boolean,
      style?: any,
    },
    style?: Object,
  },
}) => (
  <React.Fragment>
    <View style={styles.switchComponentLabelContainer}>
      <FormElementHeader text={content.text} textStyle={formStyles.textStyle} />
    </View>
    <View>
      {options.label &&
        options.label.length > 0 && (
          <Text style={[styles.componentSubtitle, formStyles.textStyle]}>
            {options.label}
          </Text>
        )}
      <View style={styles.switchContainer}>
        <Switch
          value={value ? value : baseValue ? baseValue.value : options.default}
          onValueChange={onChange}
        />
      </View>
    </View>
  </React.Fragment>
)

export default SwitchComponent
