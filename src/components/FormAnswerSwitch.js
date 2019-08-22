/**
 * TODO: Fix wrong switch render pattern
 */
// @flow
import React from 'react'
import { View, Text } from 'react-native'
import types from '../forms/types'
import styles from '../styles'

const TextComponent = ({
  hint,
  value,
  translation,
}: {
  hint: string,
  value: string,
  translation?: string => string,
}) => {
  return (
    <View>
      <Text style={styles.answerText}>{`${hint}: ${
        translation ? translation(value) : value
      }`}</Text>
    </View>
  )
}

const ListComponent = ({
  hint,
  value,
}: {
  hint: string,
  value: Array<any>,
}) => {
  const formElements = value.reduce((allElements, val) => {
    return [
      ...allElements,
      ...Object.keys(val).reduce((array, key) => {
        if (key === '_id') return array
        return [...array, val[key]]
      }, []),
    ]
  }, [])
  return (
    <View>
      <Text style={styles.answerText}>{hint}:</Text>
      {formElements.map((element, index) => {
        const { value, _id } = element
        return (
          <View style={styles.indented} key={_id}>
            <Text style={styles.answerText}>{`${index + 1}) ${value}`}</Text>
          </View>
        )
      })}
    </View>
  )
}

const MultiSelectComponent = ({
  hint,
  value,
}: {
  hint: string,
  value: Array<string>,
}) => {
  return (
    <View>
      <Text style={styles.answerText}>{hint}:</Text>
      {value.map((element, index) => {
        return (
          <View style={styles.indented} key={index}>
            <Text style={styles.answerText}>{`${index + 1}) ${element}`}</Text>
          </View>
        )
      })}
    </View>
  )
}

const switchComponents = (model: { type: string }) => {
  const { type } = model
  switch (type) {
  case types.string:
    return TextComponent
  case types.select:
    return TextComponent
  case types.list:
    return ListComponent
  case types.multipleSelect:
    return MultiSelectComponent
  default:
    return null
  }
}

const FormAnswerSwitch = (props: { model: string, value: any }) => {
  const Component = switchComponents(props.model)
  return Component ? (
    <Component
      value={props.value.value}
      hint={props.model.content.smallKey}
      primary={props.model.content.primary}
      translation={props.model.content.translation}
    />
  ) : null
}

export default FormAnswerSwitch
