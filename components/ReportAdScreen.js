import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Button,
    Image,
  } from "react-native";
  import * as ImagePicker from "expo-image-picker";
  import { Chip, CheckBox, FAB } from "react-native-elements";
  import * as React from "react";
  import { Icon } from "react-native-elements/dist/icons/Icon";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  
  const ReportAdScreen = ({ navigation, route }) => {
    const [title, setTitle] = React.useState("");
    const [dsc, setDsc] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [newchecked, setNewChecked] = React.useState(false);
    const [usedchecked, setUsedChecked] = React.useState(false);
    const [condition, setCondition] = React.useState("");
    const [image, setImage] = React.useState(null);
    const [id, setId] = React.useState("");
  
    const category = route.params.item;
  
    const FIREBASE_API_ENDPOINT =
      "https://fir-9d371-default-rtdb.asia-southeast1.firebasedatabase.app/";
  
    React.useEffect(() => {
      getData();
    });
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("@userLog");
        const a = JSON.parse(jsonValue);
        setId(a[0]);
        //  setUserDetails(a[1]);
      } catch (e) {
        // error reading value
      }
    };
    const postData = () => {
      let adObj = {
        Title: title,
        Description: dsc,
        Price: price,
        Condition: condition,
        Category: category,
        postedBy: id,
      };
      var requestOptions = {
        method: "POST",
        body: JSON.stringify(adObj),
      };
  
      fetch(`${FIREBASE_API_ENDPOINT}/ads.json`, requestOptions)
        .then((response) => response.json())
        .then((result) => console.log(result))
        .catch((error) => console.log("error", error));
    };
  
    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.cancelled) {
        setImage(result.uri);
  
        //console.log(image);
      }
    };
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <Chip
            title={category}
            type="outline"
            icon={{
              name: "close",
              type: "font-awesome",
              size: 25,
              color: "#0364ff",
            }}
            onPress={() => navigation.navigate("Select Category")}
            iconPosition="right"
          />
          <TextInput
            placeholder="Title"
            style={styles.fields}
            maxLength={18}
            value={title}
            onChangeText={setTitle}
          />
  
          <TextInput
            placeholder="Description"
            style={styles.desc}
            maxLength={200}
            multiline={true}
            numberOfLines={5}
            onChangeText={setDsc}
            value={dsc}
          />
  
          <TextInput
            keyboardType="number-pad"
            placeholder="Price"
            onChangeText={setPrice}
            value={price}
            style={styles.fields}
          />
          <View style={{ flexDirection: "row", right: 10 }}>
            <CheckBox
              containerStyle={styles.checkBox}
              center
              title="New"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              uncheckedColor="#A9B9CD"
              checkedColor="#0364ff"
              checked={newchecked}
              onPress={(title) => {
                setNewChecked(true);
                setUsedChecked(false);
                setCondition("New");
              }}
            />
            <CheckBox
              containerStyle={styles.checkBox}
              center
              title="Used"
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              uncheckedColor="#A9B9CD"
              checkedColor="#0364ff"
              checked={usedchecked}
              onPress={() => {
                setUsedChecked(true);
                setNewChecked(false);
                setCondition("Used");
              }}
            />
          </View>
          <TouchableOpacity style={styles.insert} onPress={() => pickImage()}>
            <Icon
              iconPosition="right"
              name="plus"
              type="font-awesome"
              color="#0364ff"
            />
  
            <Text>Insert Images</Text>
          </TouchableOpacity>
  
          {/* <Text style={{ marginLeft: 2, marginTop: 4, color: "#25374d" }}>
            Max 4 Images allowed.
          </Text> */}
  
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 40,
            }}
          >
            <View
              style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
            >
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{ width: 200, height: 200 }}
                />
              )}
            </View>
            {/* <MyComp />
            <MyComp /> */}
          </View>
        </ScrollView>
  
        <FAB
          buttonStyle={{ borderRadius: 15 }}
          icon={<Icon name="check" type="font-awesome" color="white" />}
          placement="right"
          color="#0364ff"
          // title="PRoceed"
          onPress={() => postData()}
        />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      padding: 15,
    },
    fields: {
      borderColor: "#0364ff",
      borderWidth: 0.5,
      borderRadius: 12,
      padding: 10,
      marginTop: 10,
    },
    desc: {
      borderColor: "#0364ff",
      borderWidth: 0.5,
      borderRadius: 12,
      padding: 10,
      marginTop: 10,
      textAlignVertical: "top",
    },
    logBtn: {
      borderRadius: 20,
      width: "100%",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#0364ff",
      margin: 10,
    },
    logBtnText: {
      color: "#fff",
      fontSize: 18,
    },
    bottomView: {
      padding: 10,
      justifyContent: "center",
      alignItems: "center",
      bottom: 0,
      width: "100%",
      height: "13%",
    },
    checkBox: {
      borderColor: "#0364ff",
      borderWidth: 0.4,
      borderRadius: 12,
      backgroundColor: "white",
      margin: 20,
    },
    insert: {
      borderColor: "#0364ff",
      borderWidth: 0.4,
      borderRadius: 12,
      backgroundColor: "white",
      justifyContent: "space-evenly",
      alignItems: "center",
      width: "50%",
      flexDirection: "row",
      height: "8%",
    },
  });
  export default ReportAdScreen
  