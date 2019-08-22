import React from 'react'
import { View } from 'react-native'
import FormElementHeader from './FormElementHeader'
import Slider from './SliderComponent'
import styles from '../../styles'

type Props = {
  value: Array<any>,
  onChange: () => any,
  field: {
    content?: any,
    options?: any,
  },
  formStyles: any,
  extra: {
    sliderMaxValueOverride: number,
  },
}

class SingleSliderComponent extends React.PureComponent<Props> {

  render() {
    const { field, formStyles = {}, extra = {} } = this.props
    const { sliderMaxValueOverride = null } = extra
    const { content } = field
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <FormElementHeader
            text={content.text}
            textStyle={formStyles.textStyle}
          />
        </View>
        <View style={[styles.container, styles.listFormContainer]}>
          <View style={styles.listElementContainer}>
            <Slider {...this.props} maximumSharedValue={sliderMaxValueOverride} />
          </View>
        </View>
      </View>
    )
  }
}

export default SingleSliderComponent
