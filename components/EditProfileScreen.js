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
  import { ListItem, Input ,Overlay} from "react-native-elements";
  import * as React from "react";
  import { Icon } from "react-native-elements/dist/icons/Icon";

  const EditProfileScreen=({navigation,route})=>{
navigation.setOptions({headerRight:()=>UpdateBtn()})

const FIREBASE_API_ENDPOINT =
  "https://fir-9d371-default-rtdb.asia-southeast1.firebasedatabase.app/";

const UpdateBtn=()=>{
  return(
           <Icon name="check" type="font-awesome" color="white" 
           disabled={ValidateEmail()==false || username.length<1 || phone.length!=11? true:false}
           color="#0364ff"
           onPress={() => updateUser()}
         />)
}
    const {myUser}=route.params
    const {myID}=route.params
  
    const [email, setEmail] = React.useState(myUser.emailID);
    const [username, setUserName] = React.useState(myUser.userName);
    const [phone, setPhone] = React.useState(myUser.cell);
    const[visible,setVisible]=React.useState(false)

    const updateUser = () => {
      setVisible(true)
        
        var requestOptions = {
          method: 'PATCH',
          body: JSON.stringify({
          cell:phone,
          emailID:email,
          pass:myUser.pass,
          userName:username
          }),
        };
    
        fetch(`${FIREBASE_API_ENDPOINT}/users/${myID}.json`, requestOptions)
          .then((response) => response.json())
          .then((result) => navigation.navigate("Home"))
          .catch((error) => console.log('error', error));
      };
    
    

      const toggleOverlay = () => {
        setVisible(!visible);
      };


    const ValidateEmail=()=> 
  {
   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    {
      return (true)
    }
      return (false)
  }
  
    const url =
    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80";
      return(
        <View style={styles.container}>
       <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.Overlay}
      >
        <Text style={styles.textPrimary}>
        Details Updated!
        </Text>

       <Icon name="check" type="font-awesome" size={30} color="green"/>
      </Overlay>
       <Image
          style={styles.profilePic}
          resizeMode="cover"
          source={{ uri: url }}
        />

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
 
        
</View>
</View>)}
  
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
