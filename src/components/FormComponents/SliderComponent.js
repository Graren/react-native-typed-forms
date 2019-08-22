import React from 'react'
import Slider from 'react-native-slider'
import { View, Text } from 'react-native'
import { FormInput } from 'react-native-elements'
import styles, { minimumTrackColor, maximumTrackColor } from '../../styles'
import { isNumber } from '../../utils/utils'

type Props = {
  value: string | number,
  onChange: string => any,
  formStyles: any,
  completedTrackColor: string,
  incompleteTrackColor: string,
  maximumSharedValue: number,
  field: {
    content?: {
      text: string,
      subtitle?: string,
    },
    options?: {
      minimum: number,
      maximum: number,
      step: number,
      suffixOfValue?: string,
      _compareValue: {
        _id: string,
        value: number,
      },
    },
  },
}

class SliderComponent extends React.PureComponent<Props> {
  constructor(props) {
    super(props)
    const { value = null, field: { options } } = props
    const { _compareValue } = options
    this.state = {
      currentValue:
        value !== null
          ? value
          : _compareValue && _compareValue.value ? _compareValue.value : 0,
      currentTextValue:
        value !== null
          ? value
          : _compareValue && _compareValue.value ? _compareValue.value : 0,
    }
    this.input = null
  }

  componentDidUpdate = (prevProps) => {
    const { value: currentPropValue } = this.props
    const { value: oldValue } = prevProps
    const { currentValue } = this.state
    if(currentPropValue !== null && currentPropValue !== oldValue && currentPropValue !== currentValue) {
      this.setState({ currentValue: currentPropValue, currentTextValue: `${currentPropValue}` })
    }
  }

  _onComplete = val => {
    const { onChange, maximumSharedValue, field: { options } } = this.props
    const { currentValue } = this.state
    const value = Math.min(val, options.max)
    if (maximumSharedValue !== undefined && maximumSharedValue !== null) {
      if (value > maximumSharedValue + currentValue)
        this.setState(
          {
            currentValue: maximumSharedValue + currentValue,
            currentTextValue: maximumSharedValue + currentValue,
          },
          () => onChange(maximumSharedValue + currentValue)
        )
      else
        this.setState({ currentValue: value, currentTextValue: value }, () =>
          onChange(value)
        )
    } else
      this.setState({ currentValue: value, currentTextValue: value }, () =>
        onChange(value)
      )
  }

  _onChangeText = v => {
    let value
    if (v === '') {
      this.setState({ currentTextValue: 0 })
      return
    }
    if (!isNumber(v)) return
    value = parseInt(v)
    this.setState({ currentTextValue: value })
  }

  _onEndEditing = e => {
    const { onChange, maximumSharedValue, field: { options } } = this.props
    const { currentValue } = this.state
    let value
    if (!isNumber(e.nativeEvent.text)) return
    value = Math.min(parseInt(e.nativeEvent.text), options.max)
    if (maximumSharedValue !== undefined && maximumSharedValue !== null) {
      if (value > maximumSharedValue + currentValue)
        this.setState(
          {
            currentValue: maximumSharedValue + currentValue,
            currentTextValue: maximumSharedValue + currentValue,
          },
          () => onChange(maximumSharedValue + currentValue)
        )
      else
        this.setState({ currentValue: value, currentTextValue: value }, () =>
          onChange(value)
        )
    } else
      this.setState({ currentValue: value, currentTextValue: value }, () =>
        onChange(value)
      )
  }

  _buildCompare(comparableValue, value) {
    const flatNumber = comparableValue - value
    return `${flatNumber < 0 ? '+' : ''}${-flatNumber}`
  }

  render() {
    const {
      formStyles = {},
      completedTrackColor = minimumTrackColor,
      incompleteTrackColor = maximumTrackColor,
      field = {
        content: {
          text: 'Spirituality',
          subtitle: 'i.e Meditation, Church, etc.',
        },
        options: {
          min: 0,
          max: 100,
          step: 1,
          suffixOfValue: 'hrs',
          _compareValue: null,
        },
      },
    } = this.props

    const { currentValue, currentTextValue } = this.state
    const { content, options } = field

    return (
      <React.Fragment>
        <View style={styles.sliderTextContainer}>
          <View style={styles.sliderTitleContainer}>
            <Text style={[styles.sliderTitle, formStyles.textStyle]}>
              {content.text}
            </Text>
            <Text style={[styles.sliderSubtitle, formStyles.textStyle]}>{` (${
              content.subtitle
            })`}</Text>
          </View>
          <View style={styles.sliderValueContainer}>
            <View style={styles.sliderValueInputContainerParent}>
              <FormInput
                ref={ref => (this.input = ref)}
                onSubmitEditing={() => this.input.blur()}
                onEndEditing={this._onEndEditing}
                containerStyle={[
                  styles.sliderValueInputContainer,
                  formStyles.elementContainerStyle,
                ]}
                inputStyle={styles.sliderValueInput}
                keyboardType="numeric"
                onBlur={this._onEndEditing}
                onChangeText={this._onChangeText}
                value={`${currentTextValue}`}
              />
            </View>
            <View style={styles.sliderValueTextContainer}>
              {options.suffixOfValue && (
                <Text style={[styles.sliderValue, formStyles.textStyle]}>{`${
                  options.suffixOfValue
                }`}</Text>
              )}
              {options._compareValue && (
                <Text style={[styles.sliderValue, formStyles.textStyle]}>
                  ({this._buildCompare(
                    options._compareValue.value,
                    currentValue
                  )})
                </Text>
              )}
            </View>
          </View>
        </View>
        <Slider
          maximumValue={options.max}
          minimumValue={options.min}
          step={options.step}
          minimumTrackTintColor={completedTrackColor}
          maximumTrackTintColor={incompleteTrackColor}
          value={currentValue}
          onSlidingComplete={this._onComplete}
        />
      </React.Fragment>
    )
  }
}

export default SliderComponent
