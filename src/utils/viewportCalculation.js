// @flow
import { Dimensions } from 'react-native'

const { width: viewportWidth, height: viewportHeight } = Dimensions.get(
  'window'
)

/**
 * Percent is an integer between 0 and 100
 */
export const heightPercentage = (
  percent: number,
  viewPort: number = viewportHeight
) => Math.floor(viewPort * (percent / 100))

/**
 * Percent is an integer between 0 and 100
 */
export const widthPercentage = (
  percent: number,
  viewPort: number = viewportWidth
) => Math.floor(viewPort * (percent / 100))

export default {
  viewportWidth,
  viewportHeight,
}
