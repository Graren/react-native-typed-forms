import { StyleSheet, Platform }              from 'react-native'
import hexToRgba                             from '../utils/colorTransform'
import { widthPercentage, heightPercentage } from '../utils/viewportCalculation'
import { iOSUIKit, systemWeights }           from 'react-native-typography'

export const gray400 = '#BDBDBD'
export const white2 = '#f8f8f8'
export const greenA400 = '#00E676'
export const gray50 = '#FAFAFA'
export const gray900 = '#212121'
export const azure = '#4EADFF'
export const blue900 = '#0D47A1'

export const TEMPORARY_COLOR_FOR_BUTTONS = azure

export const buttonWidth = widthPercentage(15)
export const buttonHeight = heightPercentage(5.55)

export const formTextColor = blue900
export const iconSize = 30
export const iconColor = gray50

export const checkboxColor = greenA400
export const uncheckedColor = gray400
export const helpButtonColor = azure

const helperIconSize = 16

export const helperIconColorIfSelected = white2

export const minimumTrackColor = blue900
export const maximumTrackColor = gray400

export const iconStyle = {
  fill: gray900,
  height: helperIconSize,
  width: helperIconSize,
}

const buttonStyles = {
  borderRadius: 6,
  paddingHorizontal: 10,
  paddingVertical: 8,
  height: buttonHeight,
  width: buttonWidth,
  alignItems: 'center',
  justifyContent: 'center',
  ...Platform.select({
    android: { elevation: 2 },
    ios: {
      shadowColor: 'black',
      shadowOffset: {
        width: 2,
        height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 12,
    },
  }),
}

export const connectedComponentStyles = StyleSheet.create({
  connectedRow: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 16,
    minHeight: 50,
  },
  elementIdentifierContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  contentContainer: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  pickerStyle: {
    width: '100%',
    backgroundColor: hexToRgba(azure, 0.1),
    minHeight: 25,
    maxHeight: 30,
    flex: 1,
  },
  modalPicker: {
    width: '100%',
  },
  modalText: {
    ...iOSUIKit.footnoteObject,
    ...systemWeights.light,
    fontFamily: 'Metropolis',
  },
  pickerItemStyle: {
    color: gray900,
    fontFamily: 'Metropolis',
    fontWeight: '500',
    fontSize: 12,
    height: 100,
    width: 200,
    backgroundColor: gray50,
  },
  pickerBackground: {
    backgroundColor: hexToRgba(azure, 0.1),
    paddingVertical: 0.5,
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: '#cccccc',
  },
  connectedElement: {
    marginVertical: 4,
  },
  text: {
    fontFamily: 'Metropolis',
  },
  identifierText: {
    fontWeight: '700',
  },
})

const formStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formElementHeaderContainer: {
    marginBottom: 20,
  },
  helpButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: azure,
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpButtonContainer: {
    flex: 1,
    flexGrow: 0,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingRight: 20,
    paddingTop: 10,
  },
  formContainer: {
    backgroundColor: 'transparent',
    flex: 5,
    ...Platform.select({
      android: { padding: 16 },
      ios: { padding: 10 },
    }),
    paddingTop: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  progressBar: {
    marginBottom: 10,
  },
  formButtonContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    flex: 1,
    flexGrow: 0,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formButtonContainerDual: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    flex: 1,
    flexGrow: 0,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  formButton: {
    backgroundColor: azure,
    ...buttonStyles,
  },
  formDisabledButton: {
    backgroundColor: '#606060',
    ...buttonStyles,
  },
  formButtonText: {
    color: gray50,
  },
  labelComponent: {
    fontFamily: 'Metropolis',
  },
  textInputLabelStyle: {
    fontFamily: 'Metropolis',
    fontWeight: '700',
    color: formTextColor,
    fontSize: 17,
  },
  textInputStyle: {
    color: gray900,
    fontFamily: 'Helvetica',
    fontSize: 16,
    width: '100%',
  },
  textInputLabelContainer: {
    marginBottom: 16,
  },
  formLabelContainer: {
    marginBottom: 16,
  },
  textInputContainerStyle: {
    margin: 0,
    marginLeft: 0,
    marginRight: 0,
    borderWidth: 0.5,
    borderColor: '#cccccc',
    width: '80%',
    borderRadius: 4,
  },
  buttonComponentContainer: {
    flexDirection: 'row',
    paddingTop: 16,
    marginTop: 8,
    justifyContent: 'space-around',
  },
  centeredButton: {
    justifyContent: 'center',
  },
  buttonComponentStyle: {
    backgroundColor: azure,
    minWidth: 80,
    borderRadius: 6,
    ...Platform.select({
      android: { elevation: 2 },
      ios: {
        shadowColor: 'black',
        shadowOffset: {
          width: 1,
          height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 1,
      },
    }),
  },
  listButtonContainer: {
    flex: 1,
    alignSelf: 'center',
  },
  pickerContainer: {
    width: '80%',
    marginTop: 16,
  },
  pickerStyle: {},
  pickerItemStyle: {
    color: gray900,
    fontFamily: 'Metropolis',
    fontWeight: '700',
    fontSize: 16,
  },
  pickerBackground: {
    width: '100%',
    backgroundColor: hexToRgba(azure, 0.1),
    paddingVertical: 1,
    paddingHorizontal: 2,
    borderWidth: 0.5,
    borderRadius: 4,
    borderColor: '#cccccc',
  },
  listFormContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    width: '100%',
  },
  listElementContainer: {
    marginBottom: 23,
    flex: 4,
    alignSelf: 'center',
    width: '100%',
  },
  listButtonStyle: {
    maxWidth: 80,
  },
  listAddButtonStyle: {
    width: buttonHeight,
    height: buttonHeight,
    borderWidth: 1,
    borderColor: gray900,
    backgroundColor: 'transparent',
    borderRadius: buttonHeight / 2,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        marginTop: 7,
        marginRight: 40,
      },
      android: {},
    }),
  },
  listContentContainer: {
    marginTop: 16,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    alignContent: 'flex-start',
    flex: 1,
  },
  listButtonTextStyle: {
    fontFamily: 'Metropolis',
    fontWeight: '700',
    fontSize: 16,
  },
  textElementText: {
    fontSize: 13,
    fontFamily: 'Metropolis',
    fontWeight: '400',
    textAlign: 'justify',
    color: gray900,
    alignSelf: 'flex-start',
  },
  textElementSubText: {
    ...iOSUIKit.footnoteEmphasizedObject,
    fontFamily: 'Metropolis',
    fontWeight: '700',
    textAlign: 'justify',
    alignSelf: 'flex-start',
    color: gray900,
  },
  answersContainer: {
    padding: 16,
  },
  answerText: {
    fontFamily: 'Metropolis',
    fontWeight: '700',
    textAlign: 'justify',
    color: gray900,
    alignSelf: 'flex-start',
  },
  indented: {
    paddingLeft: 16,
  },
  row: {
    flexDirection: 'row',
  },
  listTextAnswersContainer: {
    justifyContent: 'center',
    paddingVertical: 8,
  },
  listTextAnswerTextContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  listTextAnswerIconContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  listTextEditIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 28,
    width: 28,
    borderRadius: 14,
    borderColor: '#212121',
    borderWidth: 1,
  },
  sliderTextContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  sliderTitleContainer: {
    flex: 2,
  },
  sliderValueContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  sliderValueInputContainer: {
    borderWidth: 0.5,
    borderColor: '#cccccc',
    borderRadius: 4,
    flex: 1,
    maxHeight: 54,
    flexDirection: 'column',
    marginRight: 0,
    marginLeft: 2,
  },
  sliderValueInput: {
    color: gray900,
    fontFamily: 'Helvetica',
    fontSize: 16,
    width: '100%',
    minHeight: 32,
  },
  sliderValueInputContainerParent: {
    flex: 2.5,
  },
  sliderValueTextContainer: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sliderTitle: {
    ...iOSUIKit.footnoteEmphasizedObject,
    fontFamily: 'Metropolis',
    fontWeight: '700',
  },
  sliderSubtitle: {
    ...iOSUIKit.caption2EmphasizedObject,
    fontFamily: 'Metropolis',
  },
  componentSubtitle: {
    ...iOSUIKit.caption2EmphasizedObject,
    fontFamily: 'Metropolis',
  },
  sliderValue: {
    ...iOSUIKit.caption2EmphasizedObject,
    flex: 1,
    textAlign: 'center',
  },
  sliderSetTotalContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    padding: 8,
  },
  sliderSetTotal: {
    height: 30,
    width: 30,
    borderRadius: 6,
    backgroundColor: gray400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalValue: {
    ...iOSUIKit.subheadEmphasizedObject,
  },
  iosSelectorText: {
    textAlign: 'left',
  },
  switchContainer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
})

export default formStyles
