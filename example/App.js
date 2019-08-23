/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment, useState, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {Form} from 'react-native-typed-forms';
import model from './form';

const Header = () => (
  <View style={styles.header}>
    <Text style={styles.headerText}>Example form </Text>
  </View>
);

const InitialComponent = props => {
  const {onPress} = props;

  return (
    <View style={styles.container}>
      <View style={[styles.container, styles.initItemContainer]}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText}>Fill the form</Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.container, styles.initItemContainer]}>
        <Text style={styles.explanation}>
          Press the button and complete the form once, the form answers will be
          pre-populated from that point on. There are several other components
          and features the lib showcases, but they will be documented later on
        </Text>
      </View>
    </View>
  );
};

const App = () => {
  const [formData, setFormData] = useState(null);
  const [viewForm, setViewForm] = useState(false);

  const formFinished = useCallback(
    data => {
      setViewForm(false);
      setFormData(data);
    },
    [setFormData],
  );

  const onInitPress = useCallback(() => {
    setViewForm(true);
  }, [setViewForm]);

  return (
    <Fragment>
      <StatusBar barStyle="light-content" backgroundColor={'#2196f3'} />
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={[styles.scrollView, styles.fullContainer]}
          contentContainerStyle={styles.fullContainer}>
          <Header />
          <View style={styles.body}>
            {viewForm ? (
              <Form
                model={model}
                value={formData}
                onFinish={formFinished}
                key={'form'}
                disableAnswers
              />
            ) : (
              <InitialComponent onPress={onInitPress} />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#FAFAFA',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: '#FAFAFA',
    flex: 1,
    padding: 20,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#212121',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: '#212121',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: '#212121',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  header: {
    width: '100%',
    height: 64,
    backgroundColor: '#2196f3',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FAFAFA',
  },
  fullContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  initItemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#2196f3',
    borderRadius: 6,
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  buttonText: {
    color: '#FAFAFA',
    fontSize: 18,
  },
  explanation: {
    color: '#212121',
    fontSize: 16,
    textAlign: 'center'
  },
});

export default App;
