import React          from 'react'
import { View, Text } from 'react-native'
import styles         from '../../../styles'
import Slider         from '../SliderComponent'
import { SHARED }     from '../../../forms/constants'
import uuid           from 'uuid/v4'

type Props = {
  value: any,
  onChange: () => any,
  formStyles: any,
  parentField: {
    content?: any,
    options?: any,
  },
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
  currentValue: ValueElement,
}

class SliderSet extends React.PureComponent<Props, State> {
  constructor(props) {
    super(props)
    const { value } = props
    const indexesMap = this._mapIndexesToKeys(props.parentField.options)
    const currentValue = value ? value : this._buildInitialValue(props)
    this.state = {
      indexesMap,
      globalMaxValue: this._calculateMaxValue(
        currentValue,
        props.parentField.options
      ),
      currentValue,
    }
  }

  componentDidMount = () => {
    const { value, onChange } = this.props
    if (!value) onChange(this.state.currentValue)
  }

  componentDidUpdate(prevProps) {
    if (this.props.value && prevProps.value !== this.props.value)
      this.setState({
        globalMaxValue: this._calculateMaxValue(
          this.props.value,
          this.props.parentField.options
        ),
      })
  }

  _buildInitialValue = (props: Props) => {
    const { parentField } = props
    const { subtypeOptions, children } = parentField.options
    const initialValue = Object.keys(children).reduce((currentValue, index) => {
      const child = children[index]
      const { key, contentKey, options = {} } = child
      return {
        ...currentValue,
        [key]: {
          _id: uuid(),
          _model: child,
          value: options
            ? options._compareValue
              ? options._compareValue.value
              : options.min ? options.min : subtypeOptions.min
            : subtypeOptions.min,
          key,
          index,
          contentKey,
        },
      }
    }, {})
    return initialValue
  }

  _calculateMaxValue = (value: any, options: any) => {
    const { subtypeOptions } = options
    if (subtypeOptions.data !== SHARED) return null
    const max = Object.values(value).reduce((maxVal, val) => {
      const { value: v } = val
      return maxVal - v
    }, subtypeOptions.max)
    return max
  }

  _mapIndexesToKeys = (options: { children: any }) => {
    const { children } = options
    const map = Object.keys(children).reduce((m, k) => {
      const field = children[k]
      const { key } = field
      return {
        ...m,
        [k]: key,
      }
    }, {})
    return map
  }

  _onChange = (value: any, key: string, contentKey: string, index: number) => {
    const { onChange, value: currentValue = {} } = this.props
    const valueForKey =
      currentValue && currentValue[key] ? currentValue[key] : {}
    let newState = {
      currentValue: {
        ...currentValue,
        [key]: {
          ...valueForKey,
          _id: valueForKey._id ? valueForKey._id : uuid(),
          value,
          key,
          index,
          contentKey,
        },
      },
    }
    this.setState(newState, () => onChange(this.state.currentValue))
  }

  render() {
    const { globalMaxValue } = this.state
    const {
      formStyles,
      parentField: { options },
      value: currentValue = {},
    } = this.props

    const {
      elementContainerStyle: { backgroundColor },
      textStyle: { color },
    } = formStyles

    const { subtypeOptions, children, displayGlobal = true } = options

    return (
      <View style={styles.container}>
        {displayGlobal && (
          <View style={styles.sliderSetTotalContainer}>
            <View style={styles.sliderSetTotal}>
              <Text style={[styles.totalValue, formStyles.textStyle]}>
                {globalMaxValue}
              </Text>
            </View>
          </View>
        )}

        {children &&
          Object.keys(children).map(index => {
            const child = children[index]
            const { key, contentKey, content, options: childOptions } = child
            const options = {
              ...subtypeOptions,
              ...childOptions,
            }

            const field = {
              content,
              options,
            }

            const value =
              currentValue && currentValue[key]
                ? currentValue[key].value
                : undefined
            return (
              <View key={key}>
                <Slider
                  completedTrackColor={color}
                  incompleteTrackColor={backgroundColor}
                  field={field}
                  formStyles={formStyles}
                  onChange={value =>
                    this._onChange(value, key, contentKey, index)
                  }
                  maximumSharedValue={globalMaxValue}
                  value={value}
                />
              </View>
            )
          })}
        {displayGlobal && (
          <View style={styles.sliderSetTotalContainer}>
            <View style={styles.sliderSetTotal}>
              <Text style={[styles.totalValue, formStyles.textStyle]}>
                {globalMaxValue}
              </Text>
            </View>
          </View>
        )}
      </View>
    )
  }
}

export default SliderSet
