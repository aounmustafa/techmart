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

import AsyncStorage from "@react-native-async-storage/async-storage";
const FavScreen = ({navigation}) => {
  const [ads, setAds] = React.useState([]);
  React.useEffect(()=>{
    
    getFavs();
  },[])

  const getFavs= async () => {
    
    try {
      const jsonValue = JSON.parse(await AsyncStorage.getItem("@Favs"));
      setAds(jsonValue)
    } catch (e) {
      // error reading value
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={ads}
        renderItem={({ item }) => <AdRow item={item} navigation={navigation} />}
        ListEmptyComponent={<EmptyMessage />}
         onRefresh={() => getFavs()}
        refreshing={false}
        keyExtractor={(item) => item.postedBy}
      />
    </View>
  );
};
const AdRow = (props) => {
  return (
    <ListItem bottomDivider>
      <ListItem.Content>
        <TouchableOpacity onPress={()=>props.navigation.navigate("Full Ad",{ad:props.item})}>
          <ListItem.Title>{props.item.Title}</ListItem.Title>
        
        </TouchableOpacity>
        
      </ListItem.Content>
      <ListItem.Chevron color="black"/>
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
