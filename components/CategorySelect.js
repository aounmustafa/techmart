import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Input, ListItem } from "react-native-elements";

const CategorySelect = ({ navigation }) => {
  navigation.setOptions({
    title: "Choose Category",
    headerTintColor: "white",
    headerStyle: { backgroundColor: "#0364ff" },
    headerTitleAlign: "center",
  });
  const list = [
    "RAM",
    "Graphics Card",
    "Monitor",
    "Keyboard",
    "Gaming Mouse",
    "MotherBoards",
    "Pre-Builds",
    "RAM",
    "Graphics Card",
    "Monitor",
    "Keyboard",
    "Gaming Mouse",
    "MotherBoards",
    "Pre-Builds",
    "Graphics Card",
    "Monitor",
    "Keyboard",
    "Gaming Mouse",
    "MotherBoards",
    "Pre-Builds",
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CategorySelector
          list={list}
          navigation={navigation}
          navigateTo="Add Details"
        />
        {/* <TextInput placeholder="Enter Title" style={styles.fields} /> */}
      </ScrollView>
    </View>
  );
};

const CategorySelector = (props) => {
  return (
    <View>
      {props.list.map((item, i) => (
        <ListItem key={i} bottomDivider>
          <ListItem.Content>
            <ListItem.Title>{item}</ListItem.Title>
          </ListItem.Content>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate(props.navigateTo, { item: item })
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
