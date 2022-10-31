// Import React and Component
import React, { useState, createRef } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Switch,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Spinner from "react-native-loading-spinner-overlay";
import axios from 'axios';
import * as yup from 'yup'



const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errortext, setErrortext] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isEnabled, setIsEnabled] = useState(false);
  const passwordInputRef = createRef();

  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter valid email")
    .required('Email Address is Required'),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
})

  const handleSubmitPress = () => {
    setErrortext("");
    if (!email) {
      setErrortext("Please enter email")
    }
    if (!password) {
      setPasswordError("Please enter Password")
      return;
    }

    console.log(email,password)
    setLoading(true);
    setLoading(false);

    const payload = {
      email: email,
      password: password,
    }

    axios({
  method: 'post',
  url: 'http://203.193.173.125:6969/login',
  data: payload, // you are sending body instead
  headers: {
   // 'Authorization': `bearer ${token}`,
  'Content-Type': 'application/json'
  }, 
}) .then((response) => {
        console.log(response);
        })
    .catch((error) => {
       alert(error.response.data)
        console.log(error.response.data);
      })
    // navigation.navigate("Home");
  };

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
        <View style={styles.form}>
          <View
            style={{ alignItems: "center", marginTop: 10, marginBottom: 20 }}
          >
            <Image
              source={{ uri: "https://i.ibb.co/9vNjqVw/logo.png" }}
              style={{
                width: 60,
                height: 60,
                resizeMode: "contain",
                margin: 10,
              }}
            />
            <Text style={{ fontSize: 20 }}>Login</Text>
          </View>

          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(email) => setEmail(email)}
              placeholder="Enter email"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current && passwordInputRef.current.focus()
              }
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
            />
           
          </View>
          <View>
              {errortext != "" ? (
            <Text style={styles.errorTextStyle}>{errortext}</Text>
          ) : null}
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={(password) => setPassword(password)}
              placeholder="Enter Password" //12345
              placeholderTextColor="#8b9cb5"
              keyboardType="default"
              ref={passwordInputRef}
              // onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
              secureTextEntry={true}
              underlineColorAndroid="#f000"
              returnKeyType="next"
            />
          </View>
             <View>
              {errortext != "" ? (
            <Text style={styles.errorTextStyle}>{passwordError}</Text>
          ) : null}
          </View>
         

          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitPress}
          >
            <Text style={styles.buttonTextStyle}>LOGIN</Text>
          </TouchableOpacity>
          <View>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate("Register")}
            >
              You don't have account ? Register
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    alignContent: "center",
  },
  form: {
    position: "absolute",
    zIndex: 2,
    width: "100%",
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
    borderColor: "#072c32",
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
  inputStyle: {
    flex: 1,
    color: "#000",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#dadae8",
  },
  registerTextStyle: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "center",
    padding: 10,
  },
  errorTextStyle: {
    color: "red",
    textAlign: "left",
    fontSize: 12,
     marginLeft: 35,
  },

  wrapper: {
    flex: 1,
  },
  back: {
    width: 100,
    height: 100,
    backgroundColor: "blue",
    zIndex: 0,
  },
  front: {
    position: "absolute",
    top: 25,
    left: 25,
    width: 50,
    height: 50,
    backgroundColor: "red",
    zIndex: 1,
  },
  registerTextStyle: {
    // color: '#FFFFFF',
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "center",
  },
});
