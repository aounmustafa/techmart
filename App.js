import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./components/LoginScreen";
import Register from "./components/RegisterScreen";
import CategorySelect from "./components/CategorySelect";
import AddDetails from "./components/AddDetails";
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Select Category" component={CategorySelect} />
        <Stack.Screen name="Add Details" component={AddDetails} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Sign up" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MyComp = () => {
  return (
    <View>
      <Text>Hello</Text>
    </View>
  );
};
export default App;
