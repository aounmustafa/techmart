import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Input } from "react-native-elements";
const LoginScreen = () => {
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
          rightIcon={<TextClicker name="Forgot?" />}
        />
        <TouchableOpacity style={styles.logBtn}>
          <Text style={styles.logBtnText}>Login</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", marginTop: 15 }}>
          <Text>Don't have an account? </Text>
          <TextClicker name="Register" />
        </View>
      </View>
    </View>
  );
};
const TextClicker = (props) => {
  return (
    <TouchableOpacity>
      <Text style={styles.textClick}>{props.name}</Text>
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
