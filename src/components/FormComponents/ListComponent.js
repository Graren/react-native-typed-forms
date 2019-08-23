import React                                   from 'react'
import { View, Text, Alert, TouchableOpacity } from 'react-native'
import Icon                                    from 'react-native-vector-icons/Ionicons'
import uuid                                    from 'uuid/v4'
import FormElementHeader                       from './FormElementHeader'
import TextElement                             from './common/ListTextElement'
import styles, {
  TEMPORARY_COLOR_FOR_BUTTONS,
}                                              from '../../styles'
import FormPicker                              from './FormPicker'
import types                                   from '../../forms/types'
import {
  mapChildtypeIndexesToKeys,
  buildInitialValue,
  getFormItems,
}                                              from '../../utils/formHelpers'
import { stripKeys }                           from '../../utils/stripKeys'

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

type ValueElement = {
  _id: string,
  _model: any,
  [x: string]: {
    value: any,
    key: string,
  },
}

type State = {
  value: Array<ValueElement>,
  currentValue: ValueElement,
}

// TODO: Derive currentValue from props instead of using setState asynchronously

class ListComponent extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props)
    const currentValue = buildInitialValue(props)
    const indexesMap = mapChildtypeIndexesToKeys(props.field.options)
    this.state = {
      isEditing: false,
      currentValue,
      indexesMap,
      editObjectId: null,
    }
  }

  componentDidUpdate = prevProps => {
    if (this.props.value !== prevProps.value) {
      this.setState({
        currentValue: buildInitialValue(this.props),
      })
    }
  }

  _onChange = (value: any, key: string, index: number) => {
    const { currentValue } = this.state
    const valueForKey = currentValue[key] || {}
    this.setState({
      currentValue: {
        ...currentValue,
        [key]: { ...valueForKey, value, key, index },
      },
    })
  }

  _selectFilter = key => items => {
    const { value } = this.props
    const { isEditing, currentValue, indexesMap } = this.state
    const inValue = currentValue[indexesMap[key]] || {}
    const currentItems = getFormItems(value)
    const filtered = items
      ? items.filter(item => {
        const filter = !isEditing
          ? ci => ci.value === item.value
          : ci => ci.value === item.value && ci._id !== inValue._id
        const isSelected = currentItems && currentItems.find(filter)
        return !isSelected
      })
      : items
    return filtered
  }

  _validate = (options = {}) => {
    const { currentValue, isEditing } = this.state
    const { constraints = {} } = options
    const hasError = Object.values(currentValue).some(value => {
      return value.value === undefined || value.value === ''
    })
    if (hasError)
      return {
        error: 'The input text cannot be blank',
        failed: true,
      }
    if (!isEditing && constraints && constraints.max) {
      const { max } = constraints
      const { errors = {} } = constraints
      const { max: maxError } = errors
      const { value = [] } = this.props
      if (value && value.length >= max)
        return {
          error: maxError
            ? maxError
            : `The maximum number of elements is ${max}`,
          failed: true,
        }
    }
    return {
      failed: false,
    }
  }

  _onEditPress = (element: any) => {
    const strippedObject = stripKeys(element)
    this.setState({
      isEditing: true,
      currentValue: strippedObject,
      editObjectId: element._id,
    })
  }

  _onEditDone = () => {
    const { currentValue, editObjectId } = this.state
    const { value = [], onChange, field: { options } } = this.props
    const { error, failed } = this._validate(options)
    if (failed) {
      Alert.alert('Input Error', error)
      return
    }
    const valueToSave = value.reduce((newValue, val) => {
      if (val._id !== editObjectId) return [...newValue, val]
      else
        return [
          ...newValue,
          {
            ...val,
            ...currentValue,
          },
        ]
    }, [])
    this.setState(
      {
        editObjectId: null,
        isEditing: false,
      },
      () => onChange(valueToSave)
    )
  }

  _onAddPress = () => {
    const { currentValue } = this.state
    const { value = [], onChange, field: { options } } = this.props
    const { childTypes } = options
    const { error, failed } = this._validate(options)
    if (failed) {
      Alert.alert('Input Error', error)
      return
    }
    const valueToSave = Object.values(childTypes).reduce((prev, model) => {
      return {
        ...prev,
        [model.key]: {
          ...currentValue[model.key],
          _id: uuid(),
        },
      }
    }, {})
    onChange([
      ...(value ? value : []),
      {
        ...valueToSave,
        _id: uuid(),
      },
    ])
  }

  _onDeletePress = () => {}

  renderReferencedValue = referencedValue => {
    const { currentFormValue = {}, formStyles = {} } = this.props
    const referencedElement = currentFormValue[referencedValue.key]

    return (
      <View style={styles.container}>
        <Text style={[styles.textElementText, formStyles.textStyle]}>
          {`${referencedValue.text}: ${referencedElement.value}`}
        </Text>
      </View>
    )
  }

  render() {
    const { currentValue, indexesMap, isEditing, editObjectId } = this.state
    const { field: { content, options }, value, formStyles = {} } = this.props
    const { childTypes, referencedValue } = options

    return (
      <View style={styles.container}>
        <View>
          <FormElementHeader
            text={content.text}
            textStyle={formStyles.textStyle}
          />
        </View>
        <View style={[styles.listFormContainer]}>
          <View style={styles.listElementContainer}>
            {childTypes &&
              Object.keys(childTypes).map(key => {
                const field = childTypes[key]
                const { type } = field
                const inValue = currentValue[indexesMap[key]] || {}
                const formValue = value

                return (
                  <FormPicker
                    key={field.key}
                    field={field}
                    value={inValue.value}
                    formStyles={formStyles}
                    formValue={formValue}
                    onChange={value =>
                      this._onChange(value, indexesMap[key], key)
                    }
                    {...(type === types.select
                      ? isEditing
                        ? {
                          __extraProps: {
                            editObjectId,
                            filterFunction: this._selectFilter(key),
                          },
                        }
                        : {
                          __extraProps: {
                            filterFunction: this._selectFilter(key),
                          },
                        }
                      : {})}
                  />
                )
              })}
          </View>
          <View style={styles.listButtonContainer}>
            <TouchableOpacity
              style={[
                styles.listAddButtonStyle,
                {
                  borderColor:
                    formStyles.accentColor || TEMPORARY_COLOR_FOR_BUTTONS,
                },
              ]}
              onPress={!isEditing ? this._onAddPress : this._onEditDone}
            >
              {!isEditing ? (
                <Text
                  style={[
                    {
                      fontSize: 20,
                      marginBottom: 3,
                      color:
                        formStyles.accentColor || TEMPORARY_COLOR_FOR_BUTTONS,
                    },
                  ]}
                >
                  +
                </Text>
              ) : (
                <Icon
                  size={20}
                  color={formStyles.accentColor || TEMPORARY_COLOR_FOR_BUTTONS}
                  name={'ios-checkmark'}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        {referencedValue &&
          referencedValue.type === types.string &&
          this.renderReferencedValue(referencedValue)}
        <View style={[styles.container, styles.listContentContainer]}>
          {value && (
            <Text style={[styles.textElementText, formStyles.textStyle]}>
              {`${content.listText}`}:
            </Text>
          )}
          {value &&
            value.map((val, index) => (
              <TextElement
                key={val._id}
                element={val}
                index={index}
                formStyles={formStyles}
                onEditPress={() => this._onEditPress(val)}
                editObjectId={editObjectId}
              />
            ))}
        </View>
      </View>
    )
  }
}

export default ListComponent
