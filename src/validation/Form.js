import types from '../forms/types'

const _listValidation = (value, options) => {
  const { constraints = {} } = options
  if (!value) return false
  return constraints.min && constraints.min > 0
    ? value.length >= constraints.min
    : value.length > 0
}

const _multipleSelectValidation = (value, options) => {
  const { constraints = {} } = options
  if (!value) return false
  return constraints.min && constraints.min > 0
    ? value.length >= constraints.min
    : value.length > 0
}

const _formElementsValidation = (val, options) => {
  const { childTypes } = options
  if (!val) return false
  const hasError = Object.values(childTypes).reduce((err, child) => {
    if (err === false) return err
    const { key, options, type } = child
    if (!options.required) return err
    const elementForKey = val ? val[key] : null
    if (!elementForKey) return false
    const value = elementForKey.value
    const result = _isValueValidForType(value, type, options)
    return result
  }, true)
  return hasError
}

const isValidString = (value: any, type: strings, options?: any = {}) => {
  const { type: inputType, max = 100, min = 0 } = options
  if (inputType === 'numeric') return value >= min && value <= max
  return value && value.trim() !== ''
}

// returns true if the value is as expected
const _isValueValidForType = (value: any, type: string, options?: any = {}) => {
  switch (type) {
  case types.string:
    return value && value.trim() !== ''
  case types.connected:
    return !!value
  case types.list:
    return _listValidation(value, options)
  case types.multipleSelect:
    return _multipleSelectValidation(value, options)
  case types.formElements:
    return _formElementsValidation(value, options)
  default:
    return true
  }
}

// Returns false if there are no issues and true if a data type fails to fulfill their constraints
export const isFormValueInvalid = (field, value) => {
  const { type, options = {} } = field
  return !_isValueValidForType(value, type, options)
}
