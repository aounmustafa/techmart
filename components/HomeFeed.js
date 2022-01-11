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
import { get } from "firebase/database";

const HomeFeed = ({ navigation }) => {
  const FIREBASE_API_ENDPOINT =
    "https://fir-9d371-default-rtdb.asia-southeast1.firebasedatabase.app/";

    const [products, setProducts] = React.useState([]);
    const [cat, setCat] = React.useState([]);
    const [search, setSearch] = React.useState("");
    const [catPressed, setcatPressed] = React.useState("All");
    const [loader, setLoader] = React.useState(false);
    const [searchPlaceHolder,setSearchPlace]=React.useState(catPressed)
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
      let newObj={name:"All"}
      myArr.unshift(newObj)
      setCat(myArr)
  }



  const getData = async () => {
    // setRefresher(true);
    let myArr = [];
    const response = await fetch(`${FIREBASE_API_ENDPOINT}/ads.json`);
    const data = await response.json();
    let keys=Object.keys(data)
    for (let i in keys) {
      let id=keys[i]
      let myObj={Title:data[id].Title,
                Condition:data[id].Condition,
                Category:data[id].Category,
              Price:data[id].Price,
              Description:data[id].Description,
            postedBy:data[id].postedBy,
            image:`data:image/png;base64,${data[id].Image}`,
        adID:id}
        myArr.push(myObj)
      }
    setProducts(myArr);
    
  };

  React.useEffect(() => {
    getData();
    getCategories()
    
  }, [navigation]);

  React.useEffect(()=>{
    setSearchPlace(catPressed)
  })
  const searchResults = () => {
    return products.filter((element) => {
      return element.Title.toUpperCase().includes(search.toUpperCase());
    });
  };
  const searchResultsSpecific = () => {
    // console.log(showFilteredCat())
    return showFilteredCat().filter((element) => {
      return element.Title.toUpperCase().includes(search.toUpperCase());
    });
  };
  const showFilteredCat = () => {
    return products.filter((element) => {
      return element.Category == catPressed;
    });
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder={"Search in "+searchPlaceHolder}
        onChangeText={setSearch}
        value={search}
        inputContainerStyle={{ backgroundColor: "#222b45", borderWidth: 0 }}
        containerStyle={{
          backgroundColor: "#222b45",
        }}
      />
      <View style={styles.catWrapper}>
        <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={cat}
        renderItem={({item})=><Chip
        type={catPressed == item.name ? "solid" : "outline"}
        title={item.name}
        onPress={() => setcatPressed(item.name)}
        containerStyle={styles.chipContainer}
      />}/>
        {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <Chip
            type={catPressed == "All" ? "solid" : "outline"}
            title="All"
            onPress={() => setcatPressed("All")}
            containerStyle={styles.chipAll}
          />
          {cat.map((element, index) => (
           c
          ))}
        </ScrollView> */}
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
            name={item.Title}
            img={item.image}
            price={item.Price}
            navigation={navigation}
            ad={item}

          />
          
        )}
        keyExtractor={(item) => item.adID}
        onRefresh={() => getData()}
        refreshing={false}
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
        onPress={() => props.navigation.navigate("Full Ad", { ad: props.ad })}
      />
      <View style={styles.cardBottomWrapper}>
        <Text style={styles.cardTitle}>{props.name}</Text>
        <Text style={styles.priceText}>Rs.{props.price}</Text>
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
    borderWidth:1,
    borderRadius:10,
  padding:2
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
