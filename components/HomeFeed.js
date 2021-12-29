import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  FlatList,
} from "react-native";
import { Card, Image, Chip, SearchBar, Avatar } from "react-native-elements";
import * as React from "react";

const HomeFeed = ({ navigation }) => {
  const [products, setProducts] = React.useState([
    {
      name: "Gaming PC",
      img: "https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=680&q=80 ",
      price: "Rs.45000",
      cat: "Pre-Builds",
    },

    {
      name: "Graphics Card",
      img: "https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=680&q=80 ",
      price: "Rs.45000",
      cat: "Graphics Card",
    },
    {
      name: "Mouse Pad",
      img: "https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=680&q=80 ",
      price: "Rs.45000",
      cat: "Gaming Mouse",
    },
    {
      name: "RAM",
      img: "https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=680&q=80 ",
      price: "Rs.45000",
      cat: "RAM",
    },
    {
      name: "SSD",
      img: "https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=680&q=80 ",
      price: "Rs.45000",
    },
    {
      name: "Mouse",
      img: "https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=680&q=80 ",
      price: "Rs.45000",
      cat: "Gaming Mouse",
    },
    {
      name: "Gaming PC",
      img: "https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=680&q=80 ",
      price: "Rs.45000",
      cat: "Pre-Builds",
    },
  ]);
  const [cat, setCat] = React.useState([
    "RAM",
    "Graphics Card",
    "Monitor",
    "Keyboard",
    "Gaming Mouse",
    "MotherBoards",
    "Pre-Builds",
  ]);
  const [search, setSearch] = React.useState("");
  const [catPressed, setcatPressed] = React.useState("All");

  const searchResults = () => {
    return products.filter((element) => {
      return element.name.toUpperCase().includes(search.toUpperCase());
    });
  };
  const searchResultsSpecific = () => {
    return showFilteredCat().filter((element) => {
      return element.name.toUpperCase().includes(search.toUpperCase());
    });
  };
  const showFilteredCat = () => {
    return products.filter((element) => {
      return element.cat == catPressed;
    });
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Type Here..."
        onChangeText={setSearch}
        value={search}
        inputContainerStyle={{ backgroundColor: "#222b45", borderWidth: 0 }}
        containerStyle={{
          backgroundColor: "#222b45",
        }}
      />
      <View style={styles.catWrapper}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <Chip
            type={catPressed == "All" ? "solid" : "outline"}
            title="All"
            onPress={() => setcatPressed("All")}
            containerStyle={styles.chipAll}
          />
          {cat.map((element, index) => (
            <Chip
              type={catPressed == element ? "solid" : "outline"}
              title={element}
              onPress={() => setcatPressed(element)}
              containerStyle={styles.chipContainer}
            />
          ))}
        </ScrollView>
      </View>

      <FlatList
        numColumns={2}
        data={
          search.length < 1 && catPressed == "All"
            ? products
            : search.length < 1 && catPressed !== "All"
            ? showFilteredCat()
            : search.length >= 1 && catPressed == "All"
            ? searchResults()
            : searchResultsSpecific()
        }
        renderItem={({ item }) => (
          <ProductCard
            name={item.name}
            img={item.img}
            price={item.price}
            navigation={navigation}
          />
        )}
      />
    </View>
  );
};
const ProductCard = (props) => {
  return (
    <Card containerStyle={styles.cardContainer}>
      <Image
        style={styles.cardImage}
        resizeMode="cover"
        source={{ uri: props.img }}
        onPress={() => props.navigation.navigate("Login")}
      />
      <View style={styles.cardBottomWrapper}>
        <Text style={styles.cardTitle}>{props.name}</Text>
        <Text style={styles.priceText}>{props.price}</Text>
      </View>
    </Card>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  catWrapper: {
    width: "100%",
    height: "10%",
  },
  cardContainer: {
    width: "45%",
    height: 200,
    justifyContent: "center",
    padding: "0%",
    borderWidth: 0,
    flex: 0.5,
    marginBottom: "20%",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    padding: "0%",
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "bold",
  },
  priceText: {
    fontSize: 14,
  },
  cardBottomWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "2%",
    width: "100%",
  },
  chipContainer: {
    marginHorizontal: 5,
    marginVertical: 10,
  },
  pressedChipContainer: {
    marginHorizontal: 5,
    marginVertical: 10,
  },
  chipAll: {
    marginHorizontal: 5,
    marginVertical: 10,
    width: "10%",
  },
});
export default HomeFeed;
