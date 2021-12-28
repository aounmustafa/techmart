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
// import { TouchableOpacity } from "react-native-gesture-handler";

const FavScreen = () => {
  const [ads, setAds] = React.useState([
    "2Tb SSD",
    "AMD Radeon 790",
    "MousePad",
  ]);
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

export default FavScreen;
