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
  const {key } = route.params;
  const [myAds, setMyAds] = React.useState([]);
  const FIREBASE_API_ENDPOINT =
    "https://fir-9d371-default-rtdb.asia-southeast1.firebasedatabase.app/";

    const getData = async () => {
      let myArr = [];
      const response = await fetch(`${FIREBASE_API_ENDPOINT}/ads/.json`)
      const data = await response.json()
      let keys=Object.keys(data)
   
      for (let i in keys) {
        let adID=keys[i]
        if(data[adID].postedBy==key){
        let myObj={Title:data[adID].Title,
                  Condition:data[adID].Condition,
                  Category:data[adID].Category,
                Price:data[adID].Price,
                Description:data[adID].Description,
              postedBy:data[adID].postedBy,
          adID:adID}
          myArr.push(myObj)}
        }
        setMyAds(myArr)}
      
  React.useEffect(()=>{
    getData()
    //console.log(myAds)
  },[id])
    
  return (
    <View style={styles.container}>
      <FlatList
        data={myAds}
        renderItem={({ item }) => <AdRow item={item.Title} />}
        ListEmptyComponent={<EmptyMessage />}
       onRefresh={() => getData()}
       refreshing={false}
      />
    </View>
  );
};
const AdRow = (props) => {
  return (
    <TouchableOpacity onPress={()=>EditAd()}>
    <ListItem bottomDivider>
      <ListItem.Content>
        <TouchableOpacity>
          <ListItem.Title>{props.item}</ListItem.Title>
        </TouchableOpacity>
      </ListItem.Content>

    </ListItem>
    </TouchableOpacity>
  );
};

const EmptyMessage = () => {
  return (
    <View style={styles.emptyContainer}>
      <Text style={{ fontSize: 25 }}>No Ads Posted!</Text>
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
