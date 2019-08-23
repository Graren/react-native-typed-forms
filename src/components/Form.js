// @flow

/**
 *
 * Main Form component, it's a self sustainable forms solution, providing ID's and basic validation to forms.
 *
 */

import React                                      from 'react'
import { View }                                   from 'react-native'
import moment                                     from 'moment'
import ProgressBar                                from 'react-native-progress/Bar'
import uuid                                       from 'uuid/v4'
import FormPicker                                 from './FormComponents/FormPicker'
import { actionTypes, passiveTypes, answerTypes } from '../forms/types'
import Answers                                    from './FormAnswers'
import styles                                     from '../styles'
import {
  getButtonText,
  mapIndexesToKeys,
  getValueFromAnswerType,
}                                                 from '../utils/formHelpers'
import { isFormValueInvalid }                     from '../validation/Form'
import { FormProps }                              from '../types/formTypes'
import TextFormButton                             from './components/TextFormButton'
import { CREATE, UPDATE, FINISHED }               from '../forms/constants'
import { LogAction }                              from '../types/formTypes'

const DEBUG_DISPLAY = false

type State = {
  value: FormValue,
  fieldIndex: number,
  formIteration: number,
  storableValue: Array<FormValue>,
  currentElementValue: FormValue,
  isFormFinished: boolean,
  numberOfFields: number,
  indexesMap: any,
  isEditing: boolean,
  formProgress: number,
}

class Form extends React.PureComponent<FormProps, State> {
  constructor(props: Props) {
    super(props)
    this.model = props.model
    const indexesMap = mapIndexesToKeys(this.model)
    const storableValue = props.value || []
    const editionId = props.editionId || null

    let editionElementIndex = editionId
      ? storableValue.findIndex(el => el._id === editionId)
      : null

    const formIteration =
      editionId && editionElementIndex !== -1
        ? editionElementIndex
        : storableValue.length

    const isEditing = editionId && editionElementIndex !== -1 ? true : false

    const fieldIndex = 0

    const value = getValueFromAnswerType(props, props.model, formIteration)

    const currentElementValue = value[indexesMap[fieldIndex]]
      ? value[indexesMap[fieldIndex]].value
      : null

    this.state = {
      value,
      fieldIndex,
      formIteration,
      storableValue,
      currentElementValue,
      isFormFinished: false,
      numberOfFields: Object.keys(this.model.fields).length,
      indexesMap,
      isEditing,
      formProgress: 0,
    }
  }

  componentDidUpdate = prevProps => {
    const { editionId: previousEditionId, baseValues: previousBase } = prevProps
    const { editionId, baseValues } = this.props
    const { storableValue } = this.state

    let editionElementIndex = editionId
      ? storableValue.findIndex(el => el._id === editionId)
      : null

    const isEditing = editionId && editionElementIndex !== -1 ? true : false
    if (isEditing && previousEditionId !== editionId) {
      const value = getValueFromAnswerType(
        this.props,
        this.props.model,
        editionElementIndex
      )
      const { indexesMap } = this.state
      const fieldIndex = 0
      const currentElementValue = value[indexesMap[fieldIndex]]
        ? value[indexesMap[fieldIndex]].value
        : null
      this.setState({
        isEditing: true,
        formIteration: editionElementIndex,
        fieldIndex,
        value,
        currentElementValue,
        isFormFinished: false,
      })
      return
    }

    if (isEditing && baseValues && !previousBase) {
      this.setState({
        isEditing: false,
        formIteration: storableValue.length,
        fieldIndex: 0,
        value: getValueFromAnswerType(
          this.props,
          this.props.model,
          storableValue.length
        ),
        currentElementValue: null,
        isFormFinished: false,
      })
      return
    }
  }

  _getNewValue = () => {
    const { value, indexesMap, currentElementValue, fieldIndex } = this.state
    const currentField = this.model.fields[fieldIndex]
    const defaultValue = currentField.options.default
    const newField = value[indexesMap[fieldIndex]]
      ? {
          ...value[indexesMap[fieldIndex]],
          value: currentElementValue || defaultValue,
          key: currentField.key,
          index: fieldIndex,
          timestamp: moment().format(),
          model: currentField,
        }
      : {
          ...value[indexesMap[fieldIndex]],
          type: currentField.type,
          value: currentElementValue || defaultValue,
          key: currentField.key,
          index: fieldIndex,
          timestamp: moment().format(),
          model: currentField,
          _id: uuid(),
        }
    const newValue = {
      ...value,
      [currentField.key]: newField,
    }
    return newValue
  }

  _goToNextForm = (form: string) => {
    const { fieldIndex } = this.state
    this.setState({ form, fieldIndex: [fieldIndex, 0] })
  }

  _onPressWrapper = () => {
    this._onPress()
  }

  _log = (action: LogAction) => {
    const { log } = this.props
    if (log) log(action)
  }

  _onFinishedForm = () => {
    const { value, fieldIndex } = this.state
    const { onFinish } = this.props

    const currentField = this.model.fields[fieldIndex]

    const newValue = !passiveTypes.find(el => el === currentField.type)
      ? this._getNewValue()
      : value

    const newStorableValue =
      this.model.answer === answerTypes.single
        ? this._handleSingleAnswerStorage(newValue)
        : this._handleMultipleAnswerStorage(newValue)

    this._log({ type: FINISHED, data: { page: fieldIndex + 1 } })

    this.setState(
      {
        value: newValue,
        isFormFinished: true,
        storableValue: newStorableValue,
        isEditing: false,
      },
      () => {
        onFinish(this.state.storableValue)
      }
    )
  }

  _handleSingleAnswerStorage = value => {
    const { storableValue } = this.state

    return !storableValue || storableValue.length === 0
      ? [
          {
            ...value,
            _id: uuid(),
            created_at: moment().format(),
            _meta: {
              version: 1,
            },
          },
        ]
      : [
          {
            ...(storableValue[0] || {}),
            ...value,
            updated_at: moment().format(),
            _meta: {
              ...(storableValue[0]._meta || {}),
              version: storableValue[0]._meta.version + 1,
            },
          },
        ]
  }

  _handleMultipleAnswerStorage = value => {
    const { storableValue, formIteration, isEditing } = this.state
    if (!isEditing) {
      return [
        ...storableValue,
        {
          ...value,
          _id: uuid(),
          created_at: moment().format(),
          _meta: {
            version: 1,
          },
        },
      ]
    } else {
      const currValue = [
        ...storableValue.filter(val => val._id !== value._id),
        {
          ...storableValue[formIteration],
          ...value,
          updated_at: moment().format(),
          _meta: {
            ...(storableValue[formIteration]._meta || {}),
            version: storableValue[formIteration]._meta.version + 1,
          },
        },
      ]
      return currValue
    }
  }

  _onPress = () => {
    const {
      fieldIndex,
      indexesMap,
      value,
      numberOfFields,
      currentElementValue,
    } = this.state
    const currentField = this.model.fields[fieldIndex]
    let newState = {
      fieldIndex: fieldIndex + 1,
      currentElementValue: value[indexesMap[fieldIndex + 1]]
        ? value[indexesMap[fieldIndex + 1]].value
        : null,
      formProgress: (fieldIndex + 1) / numberOfFields,
    }
    if (!passiveTypes.find(el => el === currentField.type)) {
      const newValue = this._getNewValue()
      newState = {
        ...newState,
        value: newValue,
      }

      const isUpdate = value[indexesMap[fieldIndex]] ? true : false

      this._log({
        type: isUpdate ? UPDATE : CREATE,
        data: {
          page: fieldIndex + 1,
          valueForPage: currentElementValue,
        },
      })
    }
    this.setState(newState)
  }

  _onFinish = () => {
    this._onFinishedForm()
  }

  _onChange = value => {
    this.setState({ currentElementValue: value })
  }

  _handleGoTo = payload => {
    const { value, storableValue, formIteration, isEditing } = this.state
    const newState = !isEditing
      ? {
          fieldIndex: payload,
          storableValue: [
            ...storableValue,
            {
              ...value,
              _id: uuid(),
              created_at: moment().format(),
              _meta: {
                version: 1,
              },
            },
          ],
          value:
            this.props.value && this.props.value[formIteration + 1]
              ? this.props.value[formIteration + 1]
              : {},
          formIteration: formIteration + 1,
          isEditing: false,
          formProgress: 0,
        }
      : {
          fieldIndex: payload,
          storableValue: [
            ...storableValue.filter(v => v._id !== value._id),
            {
              ...storableValue[formIteration],
              ...value,
              updated_at: moment().format(),
              _meta: {
                ...(storableValue[formIteration]._meta || {}),
                version: storableValue[formIteration]._meta.version + 1,
              },
            },
          ],
          value:
            this.props.value && this.props.value[storableValue.length]
              ? this.props.value[storableValue.length]
              : {},
          formIteration: storableValue.length,
          isEditing: false,
          formProgress: 0,
        }
    this.setState(newState)
  }

  _buttonHandler = ({ action }: { action: { type: string, payload: any } }) => {
    switch (action.type) {
      case actionTypes.GO_TO:
        this._handleGoTo(action.payload)
    }
  }

  _getButtonIcon = () => {
    const { fieldIndex, numberOfFields } = this.state
    if (fieldIndex < numberOfFields - 1) {
      return 'ios-arrow-round-forward'
    }
    return 'ios-checkmark'
  }

  _onBackPress = () => {
    const { fieldIndex, indexesMap, value } = this.state
    const currentField = this.model.fields[fieldIndex]
    let newState = {
      fieldIndex: fieldIndex - 1,
      currentElementValue: value[indexesMap[fieldIndex - 1]]
        ? value[indexesMap[fieldIndex - 1]].value
        : null,
    }
    if (!passiveTypes.find(el => el === currentField.type)) {
      const newValue = this._getNewValue()
      newState = {
        ...newState,
        value: newValue,
      }
    }
    this.setState(newState)
  }

  render() {
    const {
      fieldIndex,
      currentElementValue,
      numberOfFields,
      value,
      formProgress,
    } = this.state
    const {
      CloseButton = null,
      formStyles = {},
      disableProgress = false,
      baseValues = {},
      disableAnswers = false,
      customProps = {},
    } = this.props
    const currentField = this.model.fields[fieldIndex] || []
    const isFieldRequired =
      currentField && currentField.options && currentField.options.required
    const baseValue = baseValues[currentField.key]
    const currentCustomProps = customProps && customProps[currentField.key]
    return (
      <View style={styles.container}>
        {CloseButton ? <CloseButton /> : null}
        <View style={styles.formContainer}>
          {!disableProgress && (
            <ProgressBar
              progress={formProgress}
              color={this.props.textAndButtonColor}
              style={styles.progressBar}
            />
          )}

          <FormPicker
            key={currentField.key}
            field={currentField}
            onChange={this._onChange}
            value={currentElementValue}
            buttonHandler={this._buttonHandler}
            currentFormValue={value}
            allFields={this.model.fields}
            formStyles={formStyles}
            baseValue={baseValue}
            customProps={currentCustomProps}
          />
        </View>
        {(!disableAnswers || DEBUG_DISPLAY) && (
          <Answers value={value} model={this.model} />
        )}
        <View
          style={
            fieldIndex > 0
              ? styles.formButtonContainerDual
              : styles.formButtonContainer
          }
        >
          {fieldIndex > 0 && (
            <TextFormButton
              onPress={this._onBackPress}
              styles={{
                button: [styles.formButton, formStyles.buttonContainerStyle],
                text: styles.formButtonText,
              }}
              text={'Prev'}
            />
          )}
          {!(
            isFieldRequired &&
            isFormValueInvalid(currentField, currentElementValue)
          ) && (
            <TextFormButton
              onPress={
                fieldIndex < numberOfFields - 1 ? this._onPress : this._onFinish
              }
              styles={{
                button: [styles.formButton, formStyles.buttonContainerStyle],
                text: styles.formButtonText,
              }}
              formStyles={formStyles}
              disabled={
                isFieldRequired &&
                isFormValueInvalid(currentField, currentElementValue)
              }
              text={getButtonText(fieldIndex, numberOfFields)}
            />
          )}
        </View>
      </View>
    )
  }
}

export default Form
