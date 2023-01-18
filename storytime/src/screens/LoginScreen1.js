import React, { useState, useEffect, createRef, useContext } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  SafeAreaView,
  Image,
  Button,
  Pressable,
} from "react-native";
// import AuthContext from "../../store/app-context";
import axios from "axios";
import * as yup from "yup";
import { Formik } from "formik";
import ToastManager, { Toast } from "toastify-react-native";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthContext} from '../context/AuthContext';

const LoginScreen1 = ({ navigation }) => {
  // const ctx = useContext(AuthContext);
    const {login, logout} = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
    // storeData()
  }, []);

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Please enter valid email")
      .required("Email Address is Required"),
    password: yup
      .string()
      .min(6, ({ min }) => `Password must be at least ${min} characters`)
      .required("Password is required"),
  });

  // const handleSubmitPress = async () => {
  //   const payload = {
  //     email: "nraju.nyros@gmail.com",
  //     password: "123456",
  //   };

  //   const response = await ctx.HttpPost("login", payload);
  //   if (response) {
  //     const expirationTime = new Date(
  //       new Date().getTime() + response.usertokenExp * 1000
  //     );
  //     const spotifyExpirationTime = new Date(
  //       new Date().getTime() + response.spotifytoken.expires_in * 1000
  //     );
  //     ctx.login(
  //       response.token,
  //       expirationTime.toISOString(),
  //       response.spotifytoken.access_token,
  //       spotifyExpirationTime.toISOString()
  //     );
  //     navigation.navigate("Home");
  //   }
  // };

  return (
    <View style={tw`flex-1 bg-[#291F4E] text-white`}>
      {loading ? (
        <View
          style={{
            position: "absolute",
            zIndex: 2,
            left: 0,
            right: 0,
            top: 20,
            bottom: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{ width: 100, height: 100 }}
            // source={{uri: 'https://media3.giphy.com/media/wWue0rCDOphOE/giphy.gif'}}
            source={require("../../assets/Images/Spiral_logo_loader.gif")}
          />
        </View>
      ) : (
        ""
      )}
      <SafeAreaView
        // keyboardShouldPersistTaps="handled"
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <ToastManager duration={3000} style={{ fontSize: 10 }} />

        <View style={tw`w-full`}>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{
              email: "gopinathkrm@gmail.com",
              password: "123456",
            }}
            onSubmit={async (values) => {
              login(values.email,values.password);
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
            }) => (
              <>
                <View
                  style={{
                    alignItems: "center",
                    marginTop: 10,
                    marginBottom: 20,
                  }}
                >
                  <Image
                    source={{ uri: "https://i.ibb.co/YfCLy1z/storytime.png" }}
                    style={{
                      width: 60,
                      height: 60,
                      resizeMode: "contain",
                      margin: 10,
                    }}
                  />
                  <Text
                    style={{ alignSelf: "center", color: "#fff", fontSize: 20 }}
                  >
                    Login
                  </Text>
                </View>

                <View style={tw`h-10 mt-4 ml-8 mr-8 mb-2`}>
                  <TextInput
                    name="email"
                    placeholder="Email Address"
                    style={tw`flex-1 rounded pl-4 bg-slate-400`}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    keyboardType="email-address"
                  />
                </View>
                <View>
                  {errors.email && (
                    <Text style={tw`text-red-600 text-xs ml-8`}>
                      {errors.email}
                    </Text>
                  )}
                </View>
                <View style={tw`h-10 mt-4 ml-8 mr-8 mb-2`}>
                  <TextInput
                    name="password"
                    placeholder="Password"
                    style={tw`flex-1 rounded pl-4 bg-slate-400`}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    secureTextEntry
                  />
                </View>
                <View>
                  {errors.password && (
                    <Text style={tw`text-red-600 text-xs ml-8`}>
                      {errors.password}
                    </Text>
                  )}
                </View>
                <View style={tw`flex items-end mr-8`}>
                  <Text
                    style={tw`font-bold text-white`}
                    onPress={() => navigation.navigate("ForgotPassword")}
                  >
                    Forgot Password?
                  </Text>
                </View>
                <Pressable
                  style={tw`bg-[#2A0D62] h-10 mt-4 ml-8 mr-8 mb-2 flex items-center rounded`}
                  activeOpacity={0.5}
                  onPress={handleSubmit}
                  // onPress={handleSubmitPress}
                >
                  <Text style={tw`text-white py-3 font-bold`}>LOGIN</Text>
                </Pressable>

                <View style={tw`flex items-center`}>
                  <Text
                    style={tw`font-bold text-white`}
                    onPress={() => navigation.navigate("Register")}
                  >
                    You don't have account ? Sign up
                  </Text>
                 
                </View>
              </>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </View>
  );
};
export default LoginScreen1;
