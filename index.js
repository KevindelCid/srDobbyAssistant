/**
 * @format
 */
import React from 'react'
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store } from './src/store'
import { Provider } from 'react-redux'

const AppWrapper = () => (
    <GestureHandlerRootView style={{ flex: 1 }}>
          <Provider store={store}>
            <App /> 
          </Provider>
    </GestureHandlerRootView>
  );
  
  AppRegistry.registerComponent(appName, () => AppWrapper);