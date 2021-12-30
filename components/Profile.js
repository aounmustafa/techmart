import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { Card, Chip, SearchBar, Avatar, ListItem } from "react-native-elements";
import * as React from "react";
import { Icon } from "react-native-elements/dist/icons/Icon";

const ProfileScreen = ({ navigation, setIsLoggedIn }) => {
  navigation.setOptions({ title: "Profile" });
  const url =
    "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80";
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image
          style={styles.profilePic}
          resizeMode="cover"
          source={{ uri: url }}
          // onPress={() => props.navigation.navigate("Login")}
        />
        <Text>Syed Aoun Mustafa</Text>
        <Text>@aounmustafa</Text>
      </View>
      <View style={styles.bottom}>
        <CustomList name="My Ads" icon="folder" />
        <CustomList name="Reviews" icon="star" />
        <CustomList name="Change Password" icon="key" />
        <CustomList name="Delete Account" icon="trash" />
        <LogOutRow setIsLoggedIn={setIsLoggedIn} />
      </View>
    </View>
  );
};

const CustomList = (props) => {
  return (
    <TouchableOpacity onPress={() => props.navigation.navigate(props.screen)}>
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
  return (
    <TouchableOpacity onPress={() => setIsLoggedIn(false)}>
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
});
export default ProfileScreen;
