import React, { useState, createRef } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

const LaunchScreen = ({ navigation }) => {
  const [loading, setLoading] = React.useState(false)
  React.useEffect(() => {
     setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <View style={styles.mainBody}>
      {loading && (
        <Spinner
          //visibility of Overlay Loading Spinner
          visible={true}
          //Text with the Spinner
          // textContent={'Loading...'}
          //Text style of the Spinner Text
          textStyle={{ color: "#FFF" }}
        />
      )}
      <ScrollView
        // keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <View>
        <View style={{ alignItems: "center", marginTop: 70 }}>
            <Image
              source={{uri:"https://i.ibb.co/9vNjqVw/logo.png"}}
              style={{
                width: 60,
                height: 60,
                resizeMode: "contain",
                margin: 30,
              }}
            />
          </View>
        
          <View style={{ alignItems: "center", }}>
            <Text style={{ fontSize: 30 }}>Storytime</Text>
          </View>

          <View style={{ paddingTop: "70%" }}>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize: 10 }}>CONTINUE WITH:</Text>
            </View>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/*<View style={styles.half_circle}></View>*/}
      </ScrollView>
    </View>
  );
};
export default LaunchScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    alignContent: "center",
  },
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: "#2A0D62",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#fcc630",
    height: 40,
    alignItems: "center",
    borderRadius: 10,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
     color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
        fontWeight: "bold",

  },
});
