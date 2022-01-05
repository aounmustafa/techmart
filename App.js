import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Icon } from "react-native-elements/dist/icons/Icon";
import LoginScreen from "./components/LoginScreen";
import Register from "./components/RegisterScreen";
import CategorySelect from "./components/CategorySelect";
import AddDetails from "./components/AddDetails";
import HomeFeed from "./components/HomeFeed";
import FavScreen from "./components/FavScreen";
import ProfileScreen from "./components/Profile";
import FullAdScreen from "./components/FullAdScreen";
import MyAds from "./components/MyAds";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReportAdScreen from "./components/ReportAdScreen";
import EditAddScreen from "./components/EditAddScreen"

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const App = () => {
  const [isLoggedin, setIsLoggedIn] = React.useState(false);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@userLog");

      jsonValue != null ? setIsLoggedIn(true) : null;
    } catch (e) {
      // error reading value
    }
  };
  React.useEffect(() => {
    console.log("here");
    getData();
  }, []);
  const LoginScreenComp = ({ navigation }) => {
    return (
      <LoginScreen setIsLoggedIn={setIsLoggedIn} navigation={navigation} />
    );
  };

  function MyTabs() {
    const Fav = () => {
      return (
        <Icon name="heart" type="font-awesome" color="#BEC0C8" size={22} />
      );
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
    const ProfileComp = ({ navigation }) => {
      return (
        <ProfileScreen setIsLoggedIn={setIsLoggedIn} navigation={navigation} />
      );
    };
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
          options={{ tabBarIcon: Fav}}
        />

        <Tab.Screen
          name="Create Add"
          component={CategorySelect}
          options={{ tabBarIcon: Plus }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileComp}
          options={{ tabBarIcon: User }}
        />
      </Tab.Navigator>
    );
  }
  
  const cartIcon=()=>{
    return <Icon name="shopping-cart" type="font-awesome" color="black" size={20}/>
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedin ? (
          <Stack.Screen name="Home" component={MyTabs} options={{title:"Tech Mart",headerTitleAlign:"center"}}/>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreenComp}/>
            <Stack.Screen name="Sign up" component={Register} />
          </>
        )}
        <Stack.Screen name="Add Details" component={AddDetails} />
        <Stack.Screen name="Full Ad" component={FullAdScreen} />
        <Stack.Screen name="My Ads" component={MyAds} />
        <Stack.Screen name="Report Ad" component={ReportAdScreen} />
        <Stack.Screen name="Edit Ad" component={EditAddScreen} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
