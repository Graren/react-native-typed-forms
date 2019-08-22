// @flow
import React            from 'react'
import { View }         from 'react-native'
import styles           from '../styles'
import FormSwitch       from './FormAnswerSwitch'
import { passiveTypes } from '../forms/types'

type Props = {
  value: any,
  model: {
    fields: any,
  },
}

class FormAnswers extends React.PureComponent<Props> {
  _mapKeysToIndexes = (model: any) => {
    const { fields } = model
    const map = Object.keys(fields).reduce((m, k) => {
      const field = fields[k]
      if (passiveTypes.find(el => el === field.type)) return m
      const { key } = field
      return {
        ...m,
        [key]: k,
      }
    }, {})
    return map
  }

  _stripKeys = value => {
    const _strippable = ['_id']
    return Object.keys(value).reduce((object, key) => {
      if (_strippable.find(k => k === key)) return object
      return {
        ...object,
        [key]: value[key],
      }
    }, {})
  }

  render() {
    const { value, model } = this.props
    const indexesMap = this._mapKeysToIndexes(model)
    const actualValue = value ? this._stripKeys(value) : {}
    return (
      <View style={styles.answersContainer}>
        {value &&
          Object.keys(actualValue).map(key => {
            const currentValue = value[key]
            const currentModel = model.fields[indexesMap[key]]
            return (
              <FormSwitch
                key={currentValue._id}
                value={currentValue}
                model={currentModel}
              />
            )
          })}
      </View>
    )
  }
}

export default FormAnswers
