import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    FlatList,
    Image,
    Button,
    TouchableOpacity,
  } from "react-native";
  import { ListItem, Overlay, Input } from "react-native-elements";
  import * as React from "react";
  import { Icon } from "react-native-elements/dist/icons/Icon";

  const EditProfileScreen=({navigation,route})=>{

    const [email, setEmail] = React.useState("");
    const [username, setUserName] = React.useState("");
    const [phone, setPhone] = React.useState("");
    
      return(
        <View style={styles.container}>
       
<View style={styles.img}>
 
</View>
<View style={styles.loginFieldsWrapper}>
 <Input
   placeholder="Email ID"
   leftIcon={{
     type: "font-awesome",
     name: "at",
     paddingRight: 10,
     color: "#A9B9CD",
   }}
   value={email}
   onChangeText={setEmail}
 />
 <Input
   placeholder="Full Name"
   leftIcon={{
     type: "font-awesome",
     name: "user",
     paddingRight: 10,
     color: "#A9B9CD",
   }}
   value={username}
   onChangeText={setUserName}
 />
 <Input
   placeholder="Cell Number"
   keyboardType="number-pad"
   leftIcon={{
     type: "font-awesome",
     name: "phone",
     paddingRight: 10,
     color: "#A9B9CD",
   }}
   value={phone}
   onChangeText={setPhone}
 />
 <TouchableOpacity
   style={email.length<1 || password.length<1 || username.length<1 || phone.length<1? styles.logBtnDisabled: styles.logBtn}
   disabled={email.length<1 || password.length<1 || username.length<1 || phone.length<1? true:false}
   onPress={() => postData()}
 >
   <Text style={styles.logBtnText}>Sign up</Text>
 </TouchableOpacity>
</View>
</View>
      )
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    logBtn: {
      borderRadius: 20,
      width: "100%",
      height: "15%",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#222b45",
      margin: "5%",
    },
    logBtnDisabled: {
      borderRadius: 20,
      width: "100%",
      height: "15%",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#95979c",
      margin: "5%",
    },
    logBtnText: {
      color: "#fff",
      fontSize: 20,
    },
    loginTitle: {
      color: "#25374d",
      fontSize: 40,
      fontWeight: "bold",
    },
    textClick: {
      color: "#0364ff",
    },
    loginFieldsWrapper: {
      alignItems: "center",
      justifyContent: "center",
      paddingRight: 20,
      paddingLeft: 20,
    }})
    
  export default EditProfileScreen
