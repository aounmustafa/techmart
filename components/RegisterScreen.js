import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Input } from "react-native-elements";
const LoginScreen = () => {
  return (
    <View style={styles.container}>
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
        />
        <Input
          placeholder="Username"
          leftIcon={{
            type: "font-awesome",
            name: "user",
            paddingRight: 10,
            color: "#A9B9CD",
          }}
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
        />
        <TouchableOpacity style={styles.logBtn}>
          <Text style={styles.logBtnText}>Sign up</Text>
        </TouchableOpacity>
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
    backgroundColor: "#0364ff",
    margin: 10,
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
  },
});
export default LoginScreen;
