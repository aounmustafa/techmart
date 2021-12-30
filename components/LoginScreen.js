import React, { useReducer } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Input } from "react-native-elements";

import { getDatabase, ref, onValue } from "firebase/database";

const LoginScreen = ({ navigation, setIsLoggedIn }) => {
  const FIREBASE_API_ENDPOINT =
    "https://fir-9d371-default-rtdb.asia-southeast1.firebasedatabase.app/";
  const email = "saounmustafa@gmail.com";

  // const checkEmail = () => {
  //   var requestOptions = {
  //     method: 'GET'
  //   };

  //   fetch(`${FIREBASE_API_ENDPOINT}/users/${email}.json`, requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => console.log(result))
  //     .catch((error) => console.log('error', error));
  // };

  const authUser = async () => {
    const response = await fetch(`${FIREBASE_API_ENDPOINT}/users/.json`)
      .then((response) => response.json())
      .then((result) => {
        for (let i in result) {
          if (result[i].emailID == email) {
            console.log(result[i].pass);
          }
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.loginTitle}>Login</Text>
      </View>
      <View style={styles.loginFieldsWrapper}>
        <Input
          placeholder="Email ID"
          leftIcon={{
            type: "font-awesome",
            name: "at",
            paddingRight: "2%",
            color: "#A9B9CD",
          }}
        />
        <Input
          placeholder="Password"
          secureTextEntry={true}
          leftIcon={{
            type: "font-awesome",
            name: "lock",
            paddingRight: "2%",
            color: "#A9B9CD",
          }}
          rightIcon={<TextClicker name="Forgot?" />}
        />
        <TouchableOpacity
          style={styles.logBtn}
          // onPress={() => navigation.navigate("Home")}
          onPress={() => authUser()}
        >
          <Text style={styles.logBtnText}>Login</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", marginTop: "2%" }}>
          <Text style={{ fontSize: 16 }}>Don't have an account? </Text>
          <TextClicker
            name="Register"
            navigateTo="Sign up"
            navigation={navigation}
          />
        </View>
      </View>
    </View>
  );
};
const TextClicker = (props) => {
  return (
    <TouchableOpacity
      onPress={() => props.navigation.navigate(props.navigateTo)}
    >
      <Text
        style={
          props.name == "Register" ? styles.registerClick : styles.textClick
        }
      >
        {props.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  logBtn: {
    borderRadius: 20,
    width: "100%",
    height: "20%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0364ff",
    margin: "5%",
  },
  logBtnText: {
    color: "#fff",
    fontSize: 20,
  },
  title: {
    marginLeft: "8%",
  },
  loginTitle: {
    color: "#25374d",
    fontSize: 40,
    fontWeight: "bold",
  },
  textClick: {
    color: "#0364ff",
  },
  registerClick: {
    color: "#0364ff",
    fontSize: 16,
  },

  loginFieldsWrapper: {
    alignItems: "center",
    justifyContent: "center",
    paddingRight: "5%",
    paddingLeft: "5%",
  },
});
export default LoginScreen;
