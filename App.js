import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Icon } from "react-native-elements/dist/icons/Icon";
import LoginScreen from "./components/LoginScreen";
import Register from "./components/RegisterScreen";
import CategorySelect from "./components/CategorySelect";
import AddDetails from "./components/AddDetails";
import HomeFeed from "./components/HomeFeed";
import FavScreen from "./components/FavScreen";
import { Title } from "react-native-paper";

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Select Category" component={CategorySelect} />
        <Stack.Screen name="Add Details" component={AddDetails} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Sign up" component={Register} />
        <Stack.Screen name="Home" component={MyTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const Fav = () => {
  return <Icon name="heart" type="font-awesome" color="#BEC0C8" size={22} />;
};
const Home = () => {
  return <Icon name="home" type="font-awesome" color="#BEC0C8" size={22} />;
};

const Plus = () => {
  return <Icon name="plus" type="font-awesome" color="#BEC0C8" size={22} />;
};

const User = () => {
  return <Icon name="user" type="font-awesome" color="#BEC0C8" size={22} />;
};

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      barStyle={{
        backgroundColor: "#222b45",
        height: "10%",
        justifyContent: "space-evenly",
      }}
      shifting={true}
    >
      <Tab.Screen
        name="Home"
        component={HomeFeed}
        options={{ tabBarIcon: Home }}
      />

      <Tab.Screen
        name="Favourties"
        component={FavScreen}
        options={{ tabBarIcon: Fav }}
      />

      <Tab.Screen
        name="Create Add"
        component={CategorySelect}
        options={{ tabBarIcon: Plus }}
      />
      <Tab.Screen
        name="Profile"
        component={CategorySelect}
        options={{ tabBarIcon: User }}
      />
    </Tab.Navigator>
  );
}

export default App;
