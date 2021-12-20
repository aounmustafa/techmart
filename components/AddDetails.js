import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { Chip, CheckBox, Card, FAB } from "react-native-elements";
import * as React from "react";
import { Icon } from "react-native-elements/dist/icons/Icon";

const AddDetails = ({ navigation, route }) => {
  const [price, setPrice] = React.useState("");
  const category = route.params.item;
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
        <TextInput placeholder="Title" style={styles.fields} maxLength={18} />
        <TextInput
          placeholder="Description"
          style={styles.desc}
          maxLength={200}
          multiline={true}
          numberOfLines={5}
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
            checked={true}
          />
          <CheckBox
            containerStyle={styles.checkBox}
            center
            title="Used"
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            uncheckedColor="#A9B9CD"
            checkedColor="#0364ff"
          />
        </View>
        <TouchableOpacity style={styles.insert}>
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
          <MyComp />
          <MyComp />
        </View>
      </ScrollView>

      <FAB
        buttonStyle={{ borderRadius: 15 }}
        icon={<Icon name="check" type="font-awesome" color="white" />}
        placement="right"
        color="#0364ff"
        // title="PRoceed"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};

const MyComp = () => {
  return (
    <Card
      containerStyle={{
        width: "40%",
        padding: 0,
        borderWidth: 2,
      }}
    >
      {/* <Card.Title>none</Card.Title> */}
      {/* <Card.Divider /> */}
      <Card.Image
        //  style={styles.image}
        source={{
          uri: "https://images.unsplash.com/photo-1628557119555-fb3d687cc310?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
        }}
      />
    </Card>
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
export default AddDetails;
