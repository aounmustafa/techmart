import React, { useReducer } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Input,Overlay } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Icon } from "react-native-elements/dist/icons/Icon";

const LoginScreen = ({ navigation, setIsLoggedIn }) => {
  const FIREBASE_API_ENDPOINT =
    "https://fir-9d371-default-rtdb.asia-southeast1.firebasedatabase.app/";
  const [email, setEmail] = React.useState("");
  const [password, setpassword] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const [visible, setVisible] = React.useState(false);


  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const authUser = async () => {
    setLoader(true);
    const response = await fetch(`${FIREBASE_API_ENDPOINT}/users/.json`)
      .then((response) => response.json())
      .then((result) => {
        for (let i in result) {
          if (result[i].emailID == email && result[i].pass == password) {

              let key = getKeyByValue(result, result[i]);
              storeData([key, result[i]]);
              setIsLoggedIn(true)
            
            }
          }
          
           setLoader(false)
            setVisible(true)
          })
        
      .catch((error) => console.log("error", error));
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@userLog", jsonValue);
      console.log("saved");
    } catch (e) {
      // saving error
    }
  };
  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }
  return (
    <View style={styles.container}>

         <Overlay
        isVisible={visible}
        onBackdropPress={()=>toggleOverlay()}

        overlayStyle={styles.Overlay}
      >
        
       <Icon name="times" type="font-awesome" size={30} color="red"/>
        <Text style={styles.textPrimary}>
        Invalid Credentials! Try Again
        </Text>
      </Overlay>

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
          value={email}
          onChangeText={setEmail}
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
          value={password}
          onChangeText={setpassword}
        />
        {loader == false ? (
          <TouchableOpacity style={email.length<1 || password.length<1 ? styles.logBtnDisabled: styles.logBtn} 
          disabled={email.length<1 || password.length<1 ? true:false}
           onPress={() => authUser()}>
            <Text style={styles.logBtnText}>Login</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.logBtn}>
            <ActivityIndicator size="large" color="white" animating={loader} />
          </TouchableOpacity>
        )}

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
    backgroundColor: "#222b45",
    margin: "5%",
  },
  logBtnDisabled: {
    borderRadius: 20,
    width: "100%",
    height: "20%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#95979c",
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
  Overlay: {
    width: "90%",
    justifyContent: "center",
    borderRadius: 20,
    padding:"10%"
  },textPrimary: {
    textAlign: "center",
    fontSize: 20,
    color: "black",
  },
});
export default LoginScreen;
