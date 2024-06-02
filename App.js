import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import MainScreen from './components/MainScreen';
import SettingsScreen from './components/SettingsScreen';
import { GlobalProvider } from './context/GlobalContext';
import colors from './utils/colors';

const Stack = createStackNavigator();

const App = () => {
  return (
    <GlobalProvider>
      <ErrorBoundary>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={MainScreen}
              options={{
                title: 'אתגר האותיות',
                headerStyle: { backgroundColor: colors.primary },
                headerTintColor: colors.onPrimary,
              }}
            />
            <Stack.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                title: 'הגדרות',
                headerStyle: { backgroundColor: colors.primary },
                headerTintColor: colors.onPrimary,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ErrorBoundary>
    </GlobalProvider>
  );
};

export default App;
