import React, { Component } from 'react';
import {
  StyleSheet, View, StatusBar
} from 'react-native';
// import Routes from './pages/TabPages/Routes';
import StackNavigation from './src/StackNavigation.js';
import { store } from './src/store.js';
import { Provider } from 'react-redux'
const App = () => {
  return (
    <Provider store={store}>

      <View style={styles.container}>
        <StatusBar backgroundColor="#0000FF"
          barStyle="light-content"
        />
        <StackNavigation />
      </View>
    </Provider>

  )
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});