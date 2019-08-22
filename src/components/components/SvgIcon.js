//@flow
import React from 'react'
import SvgIcon from 'react-native-svg-icon'
import svgs from '../../resources/images/svgicons'

export type IconProps = {
  name: string,
  fill: string,
  height: string | number,
  width: string | number,
  viewBox?: string,
}

/**
 * @class Icon
 * Wrapper component for manually built icons in app
 */
class Icon extends React.PureComponent<IconProps> {
  render() {
    return <SvgIcon {...this.props} svgs={svgs} />
  }
}

export default Icon
