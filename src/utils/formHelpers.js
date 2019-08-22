// @flow
import { DISABLE }                   from '../forms/constants'
import types                         from '../forms/types'
import { stripKeys }                 from '../utils/stripKeys'
import { passiveTypes, answerTypes } from '../forms/types'

/**
 * Initial value for complex structures
 */
export const buildInitialValue = (props: any) => {
  const { field: { options } } = props
  const { childTypes } = options
  const initialValue = Object.keys(childTypes).reduce((value, index) => {
    const child = childTypes[index]
    const { key, type, options } = child
    return type === types.select &&
      options &&
      options.repeats &&
      options.repeats === DISABLE
      ? {
        ...value,
        [key]: _handleSelectTypeValue(child, index, props),
      }
      : {
        ...value,
        [key]: {
          key,
          index,
          _model: child,
          value: child.options ? child.options.default : undefined,
        },
      }
  }, {})
  return initialValue
}

const _handleSelectTypeValue = (child, indexKey, props) => {
  const { key, content: { items = [] } } = child
  const filteredValues = _selectFilterRoot(props, items)
  return {
    key,
    index: indexKey,
    _model: child,
    value:
      filteredValues && filteredValues.length > 0
        ? filteredValues[0].value
        : undefined,
  }
}

const _selectFilterRoot = (props, items) => {
  const { value } = props
  const currentItems = getFormItems(value)
  const filtered = items
    ? items.filter(item => {
      const filter = ci => ci.value === item.value
      const isSelected = currentItems && currentItems.find(filter)
      return !isSelected
    })
    : items
  return filtered
}

export const getFormItems = formValue => {
  const mappedObjects =
    formValue &&
    formValue.map(val => {
      const strippedObject = stripKeys(val)
      const mappedObject = Object.values(strippedObject).map(value => {
        return (
          value &&
          value.value && {
            _id: value._id,
            value: value.value,
          }
        )
      })

      return mappedObject[0]
    })
  return mappedObjects
}

/**
 * Initial value for complex structures
 */

/**
 * Root form helpers
 */

export const getButtonText = (fieldIndex: number, numberOfFields: number) => {
  if (fieldIndex < numberOfFields - 1) {
    return 'Next'
  }
  return 'Done'
}

export const getValueFromAnswerType = (
  props: any,
  model: any,
  formIteration: number
) => {
  if (model.answer === answerTypes.single)
    return props.value && props.value[0] ? props.value[0] : {}
  return props.value && props.value[formIteration]
    ? props.value[formIteration]
    : {}
}

export const mapIndexesToKeys = (model: any) => {
  const { fields } = model
  const map = Object.keys(fields).reduce((m, k) => {
    const field = fields[k]
    if (passiveTypes.find(el => el === field.type)) return m
    const { key } = field
    return {
      ...m,
      [k]: key,
    }
  }, {})
  return map
}

export const mapChildtypeIndexesToKeys = (options: { childTypes: any }) => {
  const { childTypes } = options
  const map = Object.keys(childTypes).reduce((m, k) => {
    const field = childTypes[k]
    const { key } = field
    return {
      ...m,
      [k]: key,
    }
  }, {})
  return map
}
