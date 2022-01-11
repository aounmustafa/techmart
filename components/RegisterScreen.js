import React from "react";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { Input ,Overlay} from "react-native-elements";
const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [username, setUserName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [loader, setLoader] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const [dupModal, setdupModal] = React.useState(false);

  const FIREBASE_API_ENDPOINT =
    "https://fir-9d371-default-rtdb.asia-southeast1.firebasedatabase.app/"; 

  const postData = () => {
    setVisible(true)
    let user = {
      userName: username,
      emailID: email,
      pass: password,
      cell: phone,
    };
    console.log(user);
    var requestOptions = {
      method: "POST",
      body: JSON.stringify(user),
    };

    fetch(`${FIREBASE_API_ENDPOINT}/users.json`, requestOptions)
      .then((response) => response.json())
      .then((result) => (navigation.navigate("Login")))
      .catch((error) => console.log("error", error));
  };

const checker= async()=>{
  setLoader(true)
  let duplicate=false;
  const response = await fetch(`${FIREBASE_API_ENDPOINT}/users/.json`)
  .then((response) => response.json())
  .then((result) => {
    for (let i in result) {
      if (result[i].emailID == email || result[i].cell==phone) {
        duplicate=true;
        break;
        }
      }
      if(duplicate){
        setLoader(false)
        setdupModal(true)

      }
      else{
        postData();
      }
   
    })
   
    
  .catch((error) => console.log("error", error));
  
}
  return (
    <View style={styles.container}>
               <Overlay
        isVisible={visible}
       

        overlayStyle={styles.Overlay}
      >
        <Text style={styles.textPrimary}>
        Signed up!
        </Text>

       <Icon name="check" type="font-awesome" size={30} color="green"/>
      </Overlay>

      <Overlay
  
        isVisible={dupModal}
       onBackdropPress={()=>setdupModal(false)}

        overlayStyle={styles.Overlay}
      >
      <View style={styles.closeIcon}>
       <Icon  name="times" type="font-awesome" size={25} color="red"
       onPress={()=>setdupModal(false)}
       />
       </View>
        <Text style={styles.textPrimary}>
        Email/Phone already Registered!
        </Text>
      </Overlay>


      <View style={styles.title}>
        <Text style={styles.loginTitle}>Sign up</Text>
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
        <Input
          placeholder="Password"
          secureTextEntry={true}
          leftIcon={{
            type: "font-awesome",
            name: "lock",
            paddingRight: 10,
            color: "#A9B9CD",
          }}
          value={password}
          onChangeText={setPassword}
        />
        {
          loader?
          
        <TouchableOpacity style={styles.logBtn}><ActivityIndicator size="large" color="white" animating={loader} />
        </TouchableOpacity>:
        <TouchableOpacity
          style={email.length<1 || password.length<1 || username.length<1 || phone.length<1? styles.logBtnDisabled: styles.logBtn}
          disabled={email.length<1 || password.length<1 || username.length<1 || phone.length<1? true:false}
          onPress={() => checker()}
        >
          <Text style={styles.logBtnText}>Sign up</Text>
        </TouchableOpacity>
        }
        
      </View>
    </View>
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
  title: {
    marginLeft: 25,
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
  },Overlay: {
    width: "90%",
    justifyContent: "center",
    borderRadius: 20,
    padding:"10%"
  },textPrimary: {
    textAlign: "center",
    fontSize: 20,
    color: "black",
  },
  closeIcon:
{flexDirection:"row",justifyContent:"flex-end",alignItems:"flex-end"},
});
export default RegisterScreen;
