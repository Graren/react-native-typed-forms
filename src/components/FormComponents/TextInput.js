// @flow
import React from "react";
import Component from "./Component";
import { View, Text, TextInput as TextInputNative } from "react-native";
import R from "ramda";
import { Input } from "react-native-elements";
import FormElementHeader from "./FormElementHeader";
import type { TextStyle } from "../../types/formTypes";
import styles from "../../styles";

type Props = {
  value: string,
  onChange: string => any,
  color: string,
  formStyles: any,
  baseValue: {
    value: string
  },
  field: {
    content?: {
      text: string
    },
    options?: {
      multiline: boolean,
      placeHolder: string,
      label: string,
      default?: string,
      type?: string,
      style?: TextStyle
    },
    style?: Object
  }
};

class TextInput extends Component<Props> {
  render() {
    const {
      value,
      onChange,
      formStyles = {},
      baseValue = null,
      field: {
        content = {
          text: ""
        },
        options = {
          multiline: false,
          placeHolder: "",
          label: "",
          numberOfLines: null,
          fullWidth: false,
          type: "default",
          style: {}
        },
        style = {}
      }
    } = this.props;
    return (
      <React.Fragment>
        <View style={styles.textInputLabelContainer}>
          <FormElementHeader
            text={content.text}
            textStyle={formStyles.textStyle}
          />
        </View>
        {options.label && options.label.length > 0 && (
          <Text style={[styles.componentSubtitle, formStyles.textStyle]}>
            {options.label}
          </Text>
        )}
        {options.multiline ? (
          <View
            style={[
              styles.textInputContainerStyle,
              formStyles.elementContainerStyle,
              options.style ? options.style.textInputContainerStyle : {},
              options.fullWidth ? { width: "100%" } : {}
            ]}
          >
            <TextInputNative
              style={[
                R.isEmpty(style) ? styles.textInputStyle : style,
                options.style ? options.style.textInputStyle : {}
              ]}
              underlineColorAndroid={"transparent"}
              onChangeText={onChange}
              value={
                value ? value : baseValue ? baseValue.value : options.default
              }
              multiline
              placeholder={options.placeHolder}
              numberOfLines={options.numberOfLines}
              allowFontScaling
              keyboardType={options.type}
            />
          </View>
        ) : (
          <Input
            containerStyle={[
              styles.textInputContainerStyle,
              formStyles.elementContainerStyle,
              options.style ? options.style.textInputContainerStyle : {},
              options.fullWidth ? { width: "100%" } : {}
            ]}
            inputStyle={[
              R.isEmpty(style) ? styles.textInputStyle : style,
              options.style ? options.style.textInputStyle : {}
            ]}
            underlineColorAndroid={"transparent"}
            onChangeText={onChange}
            value={
              value ? value : baseValue ? baseValue.value : options.default
            }
            placeholder={options.placeHolder}
            keyboardType={options.type}
          />
        )}
      </React.Fragment>
    );
  }
}

export default TextInput;
