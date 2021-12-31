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
import { ListItem, Overlay } from "react-native-elements";
import * as React from "react";
import { Icon } from "react-native-elements/dist/icons/Icon";

import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = ({ navigation, setIsLoggedIn }) => {
  const FIREBASE_API_ENDPOINT =
    "https://fir-9d371-default-rtdb.asia-southeast1.firebasedatabase.app/";
  navigation.setOptions({ title: "Profile" });
  const [userDetails, setUserDetails] = React.useState({});
  const [id, setId] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@userLog");
      const a = JSON.parse(jsonValue);
      setId(a[0]);
      setUserDetails(a[1]);
    } catch (e) {
      // error reading value
    }
  };
  const clearLog = async () => {
    try {
      await AsyncStorage.removeItem("@userLog");
      return true;
    } catch (exception) {
      return false;
    }
  };
  React.useEffect(() => {
    getData();
  }, []);
  const url =
    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80";

  const deleteUser = () => {
    var requestOptions = {
      method: "DELETE",
    };

    fetch(`${FIREBASE_API_ENDPOINT}/users/${id}.json`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        clearLog();
        setIsLoggedIn(false);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <View style={styles.container}>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text style={styles.textPrimary}>
          Are you sure you want to delete you account?
        </Text>
        <TouchableOpacity style={styles.logBtn} onPress={() => deleteUser()}>
          <Text style={{ fontSize: 20, color: "white" }}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logBtn} onPress={() => toggleOverlay()}>
          <Text style={{ fontSize: 20, color: "white" }}>No</Text>
        </TouchableOpacity>
      </Overlay>

      <View style={styles.top}>
        <Image
          style={styles.profilePic}
          resizeMode="cover"
          source={{ uri: url }}
          // onPress={() => props.navigation.navigate("Login")}
        />
        <Text>{userDetails.userName}</Text>
        <Text>{userDetails.emailID}</Text>
        <Text>{userDetails.cell}</Text>
      </View>
      <View style={styles.bottom}>
        <CustomList name="My Ads" icon="folder" />
        <CustomList name="Reviews" icon="star" />
        <CustomList name="Change Password" icon="key" />
        <CustomList
          name="Delete Account"
          icon="trash"
          function={() => setVisible(true)}
        />
        <LogOutRow setIsLoggedIn={setIsLoggedIn} />
      </View>
    </View>
  );
};

const CustomList = (props) => {
  return (
    <TouchableOpacity onPress={props.function}>
      <ListItem bottomDivider>
        <Icon name={props.icon} type="font-awesome" color="#222b45" size={20} />
        <ListItem.Content>
          <ListItem.Title>{props.name}</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron size={25} color="#222b45" />
      </ListItem>
    </TouchableOpacity>
  );
};

const LogOutRow = ({ setIsLoggedIn }) => {
  const clearLog = async () => {
    try {
      await AsyncStorage.removeItem("@userLog");
      return true;
    } catch (exception) {
      return false;
    }
  };

  const ChangePassModal = () => {
    return (
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Text style={styles.textPrimary}>
          Are you sure you want to delete you account?
        </Text>
        <TouchableOpacity style={styles.logBtn} onPress={() => deleteUser()}>
          <Text style={{ fontSize: 20, color: "white" }}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logBtn} onPress={() => toggleOverlay()}>
          <Text style={{ fontSize: 20, color: "white" }}>No</Text>
        </TouchableOpacity>
      </Overlay>
    );
  };

  return (
    <TouchableOpacity
      onPress={() => {
        setIsLoggedIn(false);
        clearLog();
      }}
    >
      <ListItem bottomDivider>
        <Icon
          name="arrow-right"
          type="font-awesome"
          color="#222b45"
          size={20}
        />
        <ListItem.Content>
          <ListItem.Title>Log out</ListItem.Title>
        </ListItem.Content>
        <ListItem.Chevron size={25} color="#222b45" />
      </ListItem>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  profilePic: {
    borderRadius: 90,
    height: "70%",
    width: "45%",
    borderWidth: 0.25,
    borderColor: "#222b45",
    marginBottom: "2%",
  },
  top: {
    flex: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  bottom: {
    flex: 2,
  },
  textPrimary: {
    textAlign: "center",
    fontSize: 20,
    color: "black",
  },
  logBtn: {
    marginTop: "10%",
    borderRadius: 20,
    height: "15%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#222b45",
  },
});
export default ProfileScreen;
