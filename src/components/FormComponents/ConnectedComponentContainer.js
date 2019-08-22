/**
 * TODO: replace with a context
 */
// @flow
import React                             from 'react'
import types, { passiveTypes, setTypes } from '../../forms/types'
import { mapProps }                      from 'recompose'
import ConnectedComponent                from './ConnectedComponent'

type Props = {
  onChange: () => any,
  value: any,
  field: any,
  buttonHandler: () => any,
  currentFormValue: any,
  allFields: any,
}

const _extractSliderSetData = (
  value: any,
  { childrenKeys }: { childrenKeys: Array<string> }
) => {
  const finalValue = childrenKeys.reduce((result, el) => {
    const { key, contentKey } = el
    const valueElement = value[key]
    if (!valueElement)
      return {
        ...result,
        [contentKey]: {
          key,
          contentKey,
          value: 0,
        },
      }
    const { value: childValue, _id } = valueElement
    return {
      ...result,
      [contentKey]: {
        key,
        contentKey,
        value: childValue,
        _id,
      },
    }
  }, {})
  return finalValue
}

const _extractSetData = (value: any, field: any, props: any) => {
  const { options = {} } = field
  const { subtype: { type } } = options
  switch (type) {
  case setTypes.slider:
    return _extractSliderSetData(value, props)
  default:
    return value
  }
}

const _extractListDataArray = (
  value: Array<any>,
  { childrenKeys }: { childrenKeys: any }
) => {
  const newVal = value.map(val => {
    const { _id } = val
    const values = childrenKeys.reduce((allValues, childKey) => {
      const valueElement = val[childKey] || {}
      const value = valueElement.value || null

      return [...allValues, value]
    }, [])

    return {
      listElementId: _id,
      values,
    }
  })

  return newVal
}

const _extractConnectedDataArray = (value: Array<any>) => {
  const newVal = value.map(val => {
    const { _id, value = null, parentValues } = val

    return {
      listElementId: _id,
      values: [...parentValues.values, value],
    }
  })

  return newVal
}

const _buildSingleElement = ({
  element,
  currentFormValue,
  indexesMap,
  fields,
}: {
  element: Array<any>,
  currentFormValue: any,
  indexesMap: any,
  fields: any,
}) => {
  const { text, childrenKeys, key } = element
  const index = indexesMap[key]
  const fieldElement = fields[index]
  const valueElement = currentFormValue[key]

  const value =
    valueElement && valueElement.value
      ? fieldElement.type === types.list
        ? _extractListDataArray(valueElement.value, { childrenKeys })
        : fieldElement.type === types.connected
          ? _extractConnectedDataArray(valueElement.value)
          : fieldElement.type === types.set
            ? _extractSetData(valueElement.value, fieldElement, {
              childrenKeys,
            })
            : valueElement.value
      : {}

  return {
    type: fieldElement.type,
    text,
    value,
  }
}

const _mapKeysToIndexes = (fields: any) => {
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

const merge = (props: Props) => {
  const { field, currentFormValue, allFields: fields } = props
  const indexesMap = _mapKeysToIndexes(fields)
  const { options, content: { text } } = field
  const { connect } = options
  const { withElements, using } = connect
  const dataElement = _buildSingleElement({
    element: withElements,
    indexesMap,
    currentFormValue,
    fields,
  })
  return {
    ...props,
    component: using,
    dataElement,
    header: text,
  }
}

const ConnectedComponentContainer = mapProps(merge)(ConnectedComponent)

export const connect = (Component: React.node) => {
  class FormConnectContainer extends React.PureComponent<Props> {
    render() {
      /* eslint-disable-next-line */
      const { allFields, ...regularProps } = this.props
      const { type } = regularProps.field

      return type === types.connected ? (
        <ConnectedComponentContainer {...this.props} />
      ) : (
        <Component {...regularProps} />
      )
    }
  }
  return FormConnectContainer
}
