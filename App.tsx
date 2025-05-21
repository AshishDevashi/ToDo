import { SafeAreaProvider } from 'react-native-safe-area-context'
import AppNavigator from './src/navigation/AppNavigator'
import { SheetProvider } from 'react-native-actions-sheet';
import { Provider } from 'react-redux'
import { store } from './src/redux/store'

const App = () => {
  return (
    <Provider store={store}>
      <SheetProvider>
        <SafeAreaProvider>
          <AppNavigator />
        </SafeAreaProvider>
      </SheetProvider>
    </Provider>
  )
}

export default App