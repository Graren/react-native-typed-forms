// @flow
import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import SvgIcon from '../../components/SvgIcon'
import { stripKeys } from '../../../utils/stripKeys'
import styles, {
  TEMPORARY_COLOR_FOR_BUTTONS,
  iconStyle,
  helperIconColorIfSelected,
} from '../../../styles'

type ValueElement = {
  _id: string,
  _model: any,
  [x: string]: {
    value: any,
    key: string,
  },
}

const isBoolean = value => value.value === true || value.value === false

const handleBoolean = v => {
  const { _model, value } = v
  const { options = {} } = _model
  const { listText = '' } = options
  const actual = value === true ? 'Yes' : 'No'
  return `${listText} ${actual}`
}

const TextElement = ({
  element,
  index,
  formStyles = {},
  onEditPress,
  editObjectId,
}: {
  index: number,
  element: ValueElement,
  formStyles: any,
  onEditPress: () => any,
  editObjectId: string,
}) => {
  const strippedObject = stripKeys(element)
  const text = Object.values(strippedObject)
    .filter(value => value.value !== null && value.value !== undefined)
    .map(value => (isBoolean(value) ? handleBoolean(value) : value.value))
    .map((value, ind) => {
      if (ind === 0) return `${index + 1} ) ${value}`
      return `${value}`
    }, [])
  return (
    <React.Fragment>
      {text && (
        <View
          style={[
            styles.container,
            styles.indented,
            styles.row,
            styles.listTextAnswersContainer,
          ]}
        >
          <View style={styles.listTextAnswerTextContainer}>
            {text &&
              text.length > 0 &&
              text.map((txt, index) => (
                <Text
                  key={index}
                  style={[
                    index === 0
                      ? styles.textElementText
                      : styles.textElementSubText,
                    formStyles.textStyle,
                  ]}
                >
                  {txt}
                </Text>
              ))}
          </View>
          <TouchableOpacity style={styles.listTextAnswerIconContainer}>
            <TouchableOpacity
              onPress={onEditPress}
              style={[
                styles.listTextEditIcon,
                editObjectId === element._id
                  ? {
                    backgroundColor:
                        formStyles.accentColor || TEMPORARY_COLOR_FOR_BUTTONS,
                    borderColor:
                        formStyles.accentColor || TEMPORARY_COLOR_FOR_BUTTONS,
                  }
                  : {
                    borderColor:
                        formStyles.accentColor || TEMPORARY_COLOR_FOR_BUTTONS,
                  },
              ]}
            >
              <SvgIcon
                name={'Edit'}
                {...iconStyle}
                fill={
                  editObjectId === element._id
                    ? helperIconColorIfSelected
                    : formStyles.accentColor || TEMPORARY_COLOR_FOR_BUTTONS
                }
              />
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      )}
    </React.Fragment>
  )
}

export default TextElement
