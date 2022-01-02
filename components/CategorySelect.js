
 import * as React from "react"
 import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Input, ListItem ,Avatar} from "react-native-elements";

const CategorySelect = ({ navigation }) => {
  navigation.setOptions({
    title: "Choose Category",
    headerTintColor: "white",
    headerStyle: { backgroundColor: "#0364ff" },
    headerTitleAlign: "center",
  });
  const [catList,setCatList]=React.useState([])

  const FIREBASE_API_ENDPOINT =
    "https://fir-9d371-default-rtdb.asia-southeast1.firebasedatabase.app/";

    
    const getCategories = async () => {
      const response = await fetch(`${FIREBASE_API_ENDPOINT}/Categories.json`);
      const data = await response.json();
      let myArr=[]
      for(let i in data){
        let myObj={
          name:data[i].name,
          image:`data:image/png;base64,${data[i].image}`}
    
        myArr.push(myObj)
      }
      setCatList(myArr)
  }
  React.useEffect(()=>{
    getCategories()
  },[])

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CategorySelector
          list={catList}
          navigation={navigation}
          navigateTo="Add Details"
        />
      </ScrollView>
    </View>
  );
};

const CategorySelector = (props) => {
  return (
    <View>
      {props.list.map((item, i) => (
        <ListItem key={i} bottomDivider>
           <Avatar source={{uri: item.image}} />
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
          </ListItem.Content>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate(props.navigateTo, { item: item.name })
            }
          >
            <ListItem.Chevron color="#0364ff" size={25} />
          </TouchableOpacity>
        </ListItem>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    //justifyContent: "center",
    //alignItems: "center",
  },
});
export default CategorySelect;
