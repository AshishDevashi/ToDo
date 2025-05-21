import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import AddTodo from '../screens/AddTodo';
import { RootStackParamList } from '../utils/types';


function RootStack() {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="AddTodo" component={AddTodo} />
        </Stack.Navigator>
    );
}
const AppNavigator = () => {
    return (
        <NavigationContainer>
            <RootStack />
        </NavigationContainer>
    )
}

export default AppNavigator