import React from 'react';
import { Text } from 'react-native-elements';
import { formTextColor } from '../../styles';

const Dummy = ({
  color = formTextColor,
  value,
}: {
  color?: string,
  value: any,
}) => {
  <Text h4 style={{ color }}>
    {JSON.stringify(value)}
  </Text>;
};

export default Dummy;
