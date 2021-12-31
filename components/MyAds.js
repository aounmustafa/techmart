import { ListItem, Icon, SearchBar } from "react-native-elements";
import * as React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";

const MyAds = ({ route }) => {
  const { id } = route.params;
  const [ads, setAds] = React.useState([
    "2Tb SSD",
    "AMD Radeon 790",
    "MousePad",
  ]);

  const FIREBASE_API_ENDPOINT =
    "https://fir-9d371-default-rtdb.asia-southeast1.firebasedatabase.app/";

  const getData = async () => {
    const response = await fetch(
      `${FIREBASE_API_ENDPOINT}/ads/postedBy/${id}/.json`
    )
      .then((response) => response.json())
      .then((result) => setSellerDetails(result))
      .catch((error) => console.log(console.error()));
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={ads}
        renderItem={({ item }) => <AdRow item={item} />}
        ListEmptyComponent={<EmptyMessage />}
        // onRefresh={() => getData()}
        // refreshing={refresh}
      />
    </View>
  );
};
const AdRow = (props) => {
  return (
    <ListItem bottomDivider>
      <ListItem.Content>
        <TouchableOpacity>
          <ListItem.Title>{props.item}</ListItem.Title>
        </TouchableOpacity>
      </ListItem.Content>

      <Icon name="heart" type="font-awesome" color="#bb4a62" size={30} />
    </ListItem>
  );
};

const EmptyMessage = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={{ fontSize: 25 }}>No Favourties!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "100%",
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: "10%",
  },
});

export default MyAds;
