import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  Linking
} from "react-native";
import { Divider, ListItem,Overlay,Input } from "react-native-elements";
import * as React from "react";
import { Icon } from "react-native-elements/dist/icons/Icon";

import AsyncStorage from "@react-native-async-storage/async-storage";
const FullAdScreen = ({ navigation, route }) => {
   navigation.setOptions({title:route.params.ad.Category, headerRight: () => ReportIcon()})
  const [sellerDetails, setSellerDetails] = React.useState({});
  const [visible, setVisible] = React.useState(false);
  const [report,setReport]=React.useState("")
  const [idOfFav,setIdOfFav]=React.useState("")
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const [fav, setFav] = React.useState(false);
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

  const ReportIcon=()=>{
    return( <View style={{flexDirection:"row"}}><TouchableOpacity><Icon name="ban" type="font-awesome" color="red" size={28} onPress={()=>setVisible(true)}/>
    <Text>Report Ad</Text></TouchableOpacity>
  <FavIcon/></View>)
  }
  React.useEffect(() => {
    getData();
    getFavs();
  }, [ad]);

  const url =
    "https://images.unsplash.com/photo-1621164071312-67bb68821b3f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=736&q=80";

    // const getID = async () => {
    //   setFav(true)
    //   try {
    //     const jsonValue = await AsyncStorage.getItem("@userLog")
    //     .then((jsonValue)=>JSON.parse(jsonValue))
    //     .then((a)=>storeFav(a[0])
    //       );
        
      
    //   } catch (e) {
    //     // error reading value
    //   }}
    


      
  const getFavs= async () => {
    
    try {
      const jsonValue = JSON.parse(await AsyncStorage.getItem("@Favs"));
      if (jsonValue != null) {
   console.log("null naihi ha")
   for(let i in jsonValue){
    console.log(ad)
    if (JSON.stringify(jsonValue[i])==JSON.stringify(ad)) {
          setFav(true);
        }}
      }
    } catch (e) {
      // error reading value
    }
  };

  
  const storeFav = async () => {
    setFav(true);
    let newArr = [];
    try {
      let oldData = JSON.parse(await AsyncStorage.getItem("@Favs"));
      if (oldData != null) {
        newArr = oldData;
      }

      newArr.push(ad);
      console.log("added")

      await AsyncStorage.setItem("@Favs", JSON.stringify(newArr));
    } catch (e) {
      // saving error
    }
  };


  const unFav = async (value) => {
    setFav(false);
    let newArr = [];
    try {
      let oldData = JSON.parse(await AsyncStorage.getItem("@Favs"));
      if (oldData != null) {
        newArr = oldData;
      }
      let i = newArr.indexOf(ad);
      newArr.splice(i, 1);

     // console.log(newArr);
      //AsyncStorage.clear();
      await AsyncStorage.setItem("@Favs", JSON.stringify(newArr));
      console.log("done removing");
    } catch (e) {
      // saving error
    }
  };

//       const checkFav= async ()=>{
//  const response = await fetch(`${FIREBASE_API_ENDPOINT}/favs/.json`)
//    .then((response) => response.json())
//    .then((result) => {
//      let keys=Object.keys(result)
//     for(let i in keys){
//       let j=keys[i]
//       if(result[j].favedAd==ad.adID){
//         setFav(true)
//         setIdOfFav(j)
//       } 
//    }})
//    .catch((error) => console.log(console.error()));
// };
   

  //   const storeFav =  (i) => {
      
  //       let obj={userID:i,
  //         favedAd:ad.adID
  //       }
  //       console.log(obj)
  //     var requestOptions = {
  //       method: "POST",
  //       body: JSON.stringify(obj),
  //     };
  
  //     fetch(`${FIREBASE_API_ENDPOINT}/favs.json`, requestOptions)
  //       .then((response) => response.json())
  //       .then((result) =>checkFav() )
  //       .catch((error) => console.log("error", error));
 
  // };

  // const unFav=()=>{
  //   setFav(!fav)
  //   var requestOptions = {
  //     method: "DELETE",
  //   };

  //   fetch(`${FIREBASE_API_ENDPOINT}/favs/${idOfFav}.json`, requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => console.log("Delet") )
  //     .catch((error) => console.log("error", error));
  // }
    
   
  const FavIcon = () => {
    if (fav == false) {
      return (
        <Icon
          name="heart"
          type="evilicon"
          color="#bb4a62"
          size={38}
          onPress={() =>storeFav()}
        />
      );
    }
    return (
      <Icon
        name="heart"
        type="font-awesome"
        color="#bb4a62"
        size={35}
        onPress={() =>unFav()}
      />
    );
  };
  const sendReport= () => {
    let fullReport = {
      adId:ad.adID,
      reportContent:report
    };
    console.log(fullReport);
    var requestOptions = {
      method: "POST",
      body: JSON.stringify(fullReport),
    };

    fetch(`${FIREBASE_API_ENDPOINT}/reportedAds.json`, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const dialup = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  return (
    <View style={styles.container}>
      
  <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={styles.Overlay}
      >
        <Text style={styles.textPrimary}>
          Report Ad
        </Text>
      <Input placeholder="Explain reason for reporting" maxLength={80} value={report} onChangeText={setReport} numberOfLines={3} rightIcon={<Text>{report.length}/80</Text>}/>
      
        <TouchableOpacity style={styles.logBtn} onPress={() => {sendReport();
        toggleOverlay()}}>
          <Text style={{ fontSize: 20, color: "white" }}>Report</Text>
        </TouchableOpacity>
      </Overlay>
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
  logBtn: {
    borderRadius: 20,
    width: "100%",
    height: "20%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0364ff",
    margin: "5%",
  },
  adTitle: {
    fontWeight: "bold",
    fontSize: 20,
  }, Overlay: {
    width: "90%",
    justifyContent: "center",
    borderRadius: 20,
    alignItems:'center',
  },
  textPrimary: {
    textAlign: "center",
    fontSize: 20,
    color: "black",
    marginBottom:"10%"
  },
  logBtn: {
    borderRadius: 20,
    height: "20%",
    width:"80%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#222b45",
  },
});
export default FullAdScreen;
