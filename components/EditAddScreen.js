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
  import { Chip, CheckBox, FAB ,Overlay} from "react-native-elements";
  import * as React from "react";
  import { Icon } from "react-native-elements/dist/icons/Icon";
  import * as FileSystem from 'expo-file-system'
  
  const EditAddScreen = ({ navigation, route }) => {
      navigation.setOptions({headerRight:()=>deleteIcon()})
   
      const deleteIcon=()=>{
          return(
        <TouchableOpacity onPress={()=>setVisible2(true)}><Icon name="trash" type="font-awesome" size={25} color="black"/>
        <Text>Delete Ad</Text></TouchableOpacity>)
      }


    const {ad}=route.params
    const [title, setTitle] = React.useState(ad.Title);
    const [dsc, setDsc] = React.useState(ad.Description);
    const [price, setPrice] = React.useState(ad.Price);
    const [newchecked, setNewChecked] = React.useState(false);
    const [usedchecked, setUsedChecked] = React.useState(false);
    const [condition, setCondition] = React.useState(ad.Condition);
    const [image, setImage] = React.useState(ad.image);
    
  const [base64,setbase64] = React.useState()
  const [visible2, setVisible2] = React.useState(false);
     const [visible, setVisible] = React.useState(false);
    const category = route.params.item;
  
    const FIREBASE_API_ENDPOINT =
      "https://fir-9d371-default-rtdb.asia-southeast1.firebasedatabase.app/";
  
      const deleteAd = () => {
        const id = ad.adID
        
        var requestOptions = {
          method: 'DELETE',
        };
    
        fetch(`${FIREBASE_API_ENDPOINT}/ads/${id}.json`, requestOptions)
          .then((response) => response.json())
          .then((result) => console.log('Delete Response:', result))
          .catch((error) => console.log('error', error));
      };
    React.useEffect(() => {
     if(ad.Condition=="Used"){
         setUsedChecked(true)
     }
     else{
         setUsedChecked(true)
     }
    },[ad]);
    
    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
      });
  
      if (!result.cancelled) {
        const base64 = await FileSystem.readAsStringAsync(result.uri, { encoding: 'base64' })
        setImage(result.uri);
        setbase64(base64)
      }
    }
  
    const updateAd = () => {
      setVisible(true)
        const idOld = ad.adID
        var requestOptions = {
          method: 'PATCH',
          body: JSON.stringify({
            Category: 
            ad.Category,
            Condition: 
            condition,
            Description: dsc,
            Price: 
            price,
            Title: 
            title,
            postedBy: 
            ad.postedBy,
            Image:
            base64
          }),
        };

        fetch(`${FIREBASE_API_ENDPOINT}/ads/${idOld}.json`, requestOptions)
          .then((response) => response.json())
          .then((result) => navigation.navigate("Home"))
          .catch((error) => console.log('error', error));
      };

    const toggleOverlay = () => {
        setVisible(!visible);
      };
      const toggleOverlay2 = () => {
        setVisible2(!visible2);
      };
    return (
      <View style={styles.container}>
          
      <Overlay
      isVisible={visible2}
      onBackdropPress={toggleOverlay2}
      overlayStyle={styles.Overlay}
    >
      <Text style={styles.textPrimary}>
        Are you sure you want to delete?
      </Text>
      <TouchableOpacity style={styles.logBtn2} onPress={() => {deleteAd();navigation.navigate("Home")}}>
        <Text style={{ fontSize: 20, color: "white" }}>Yes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logBtn2} onPress={() => toggleOverlay2()}>
        <Text style={{ fontSize: 20, color: "white" }}>No</Text>
      </TouchableOpacity>
    </Overlay>

           <Overlay
        isVisible={visible}
     
        overlayStyle={styles.Overlay}
      >
        <Text style={styles.textPrimary}>
          Your Ad has been Updated!
        </Text>
       <Icon name="check" type="font-awesome" size={25} color="black"/>
      </Overlay>

        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
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
          onPress={() => updateAd()}
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
    textPrimary: {
      textAlign: "center",
      fontSize: 20,
      color: "black",
    },
  Overlay: {
    width: "90%",
    justifyContent: "center",
    borderRadius: 20,
  },
  
  logBtn2: {
    marginTop: "10%",
    borderRadius: 20,
    height: "17%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#222b45",
  },
  });
  export default EditAddScreen