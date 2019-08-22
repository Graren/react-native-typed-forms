// @flow
import React           from 'react'
import { View }        from 'react-native'
import styles          from '../../../styles'
import ConnectedSlider from '../Sets/SliderSet'

class ConnectedSliderSet extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <View style={[styles.container, styles.listFormContainer]}>
          <View style={styles.listElementContainer}>
            <ConnectedSlider {...this.props} />
          </View>
        </View>
      </React.Fragment>
    )
  }
}

export default ConnectedSliderSet
