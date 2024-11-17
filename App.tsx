import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/containers/HomeScreen';
import QuizHome from './components/containers/QuizHome';
import { Provider } from 'react-redux';
import { store } from './components/store/store';
import HouseLanding from './components/containers/HouseLanding';
import Potions from './components/containers/Potions';
import SinglePotion from './components/containers/SinglePotion';
const Stack = createStackNavigator();
/*     */
function RootStack() {
  return (
    <Provider store={store} >
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="QuizHome" component={QuizHome} options={{ headerShown: false }}/>
      <Stack.Screen name="HouseLanding" component={HouseLanding} options={{headerShown: false}} />
      <Stack.Screen name = "Potions" component={Potions} />
      <Stack.Screen name = "SinglePotion" component={SinglePotion} />
    </Stack.Navigator>
    </Provider>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
