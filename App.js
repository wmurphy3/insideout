import React, { Component }           from 'react'
import { Provider }                   from 'react-redux'
import { AppRegistry, Text }          from 'react-native';
import configureStore                 from './src/core/store'
import AppWithNavigationState         from './src/App'
import { ActionSheetProvider }        from '@expo/react-native-action-sheet'

const store = configureStore();
Text.defaultProps.allowFontScaling=false

export default class App extends Component {

  render() {

    return (
      <Provider store={store}>
        <ActionSheetProvider>
          <AppWithNavigationState />
        </ActionSheetProvider>
      </Provider>
    );
  }
}
