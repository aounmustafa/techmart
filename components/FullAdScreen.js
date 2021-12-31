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
import { Divider, ListItem } from "react-native-elements";
import * as React from "react";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { Linking } from "react-native";

const FullAdScreen = ({ navigation, route }) => {
  const [sellerDetails, setSellerDetails] = React.useState({});

  const FIREBASE_API_ENDPOINT =
    "https://fir-9d371-default-rtdb.asia-southeast1.firebasedatabase.app/";
  const { ad } = route.params;

  const getData = async () => {
    const id = ad.postedBy;
    const response = await fetch(`${FIREBASE_API_ENDPOINT}/users/${id}/.json`)
      .then((response) => response.json())
      .then((result) => setSellerDetails(result))
      .catch((error) => console.log(console.error()));
  };

  React.useEffect(() => {
    getData();
  }, [ad]);

  const url =
    "https://images.unsplash.com/photo-1621164071312-67bb68821b3f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80";

  const dialup = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image style={styles.adPic} resizeMode="cover" source={{ uri: url }} />
        <Text style={styles.adTitle}>{ad.Title}</Text>
      </View>
      <View style={styles.bottom}>
        <Text style={{ fontSize: 15, fontWeight: "bold", marginLeft: "1%" }}>
          Description
        </Text>
        <View style={styles.dscView}>
          <Text numberOfLines={6} style={{ fontSize: 18 }}>
            {ad.Description}
          </Text>
        </View>
        <CustomList name={ad.Condition} />
        <CustomList name={ad.Price} icon="money" />

        <CustomList name={sellerDetails.userName} icon="user" />
        <TouchableOpacity onPress={() => dialup(sellerDetails.cell)}>
          <CustomList name={sellerDetails.cell} icon="phone" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CustomList = (props) => {
  return (
    <ListItem bottomDivider>
      {props.name == "New" || props.name == "Used" ? (
        <Text style={{ fontWeight: "bold" }}>Condition</Text>
      ) : (
        <Icon name={props.icon} type="font-awesome" color="#222b45" size={28} />
      )}

      <ListItem.Content>
        {props.icon == "phone" ? (
          <ListItem.Title style={{ color: "green", fontWeight: "bold" }}>
            Tap to call
          </ListItem.Title>
        ) : null}
      </ListItem.Content>

      <Text>{props.name}</Text>
    </ListItem>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  adPic: {
    //borderRadius: 90,
    height: "90%",
    width: "100%",
    borderWidth: 0.25,
    borderColor: "#222b45",
    marginBottom: "2%",
  },
  top: {
    flex: 1.5,
    alignItems: "center",
    marginBottom: "10%",
  },
  bottom: {
    flex: 2,
  },
  dscView: {
    marginTop: "2%",
    borderWidth: 0.5,
    padding: "5%",
    borderRadius: 15,
  },
  adTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
export default FullAdScreen;
