import React, { useState, useEffect, createRef, useContext } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Button,
  Pressable,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import * as Yup from "yup";
import { Formik } from "formik";
import ToastManager, { Toast } from "toastify-react-native";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../config";


const ProfileScreen1 = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  // const [user, setUser] = useState([]);
  const [isSubmit, setIsSubmit] = useState(false);

  const FirstRoute = () => <View style={[styles.scene, { backgroundColor: "#ff4081" }]} />;
  const SecondRoute = () => <View style={[styles.scene, { backgroundColor: "#673ab7" }]} />;

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Form Validation
  const validateSchema = Yup.object().shape({
    first_name: Yup.string()
      .required("First Name is required")
      .min(3, "First Name must be at least 3 characters")
      .max(20, "First Name must not exceed 20 characters"),
    last_name: Yup.string()
      .required("Last Name is required")
      .min(3, "Last Name must be at least 3 characters")
      .max(20, "Last Name must not exceed 20 characters"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
  });

  const initialValues = {
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
  };

  const handleSubmitPress = async () => {
    const payload = {
      email: "nraju.nyros@gmail.com",
      password: "123456",
    };

    const response = await ctx.HttpPost("login", payload);
    if (response) {
      const expirationTime = new Date(new Date().getTime() + response.usertokenExp * 1000);
      const spotifyExpirationTime = new Date(
        new Date().getTime() + response.spotifytoken.expires_in * 1000
      );
      ctx.login(
        response.token,
        expirationTime.toISOString(),
        response.spotifytoken.access_token,
        spotifyExpirationTime.toISOString()
      );
      navigation.navigate("Home");
    }
  };

  return (
    <View style={tw`flex-1 bg-[#291F4E] pt-4 text-white`}>
      {loading && (
        <View
          style={{
            position: "absolute",
            zIndex: 2,
            left: 0,
            right: 0,
            top: 40,
            bottom: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{ width: 100, height: 100 }}
            // source={{uri: 'https://media3.giphy.com/media/wWue0rCDOphOE/giphy.gif'}}
            source={require("../../../assets/Images/Spiral_logo_loader.gif")}
          />
        </View>
      )}
      <ScrollView
        // keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <ToastManager duration={3000} style={{ fontSize: 10 }} />

        <View style={styles.navBar}>
          <View style={styles.leftContainer}>
            <Pressable onPress={() => navigation.navigate("Home")}>
              <Text
                style={[
                  {
                    textAlign: "left",
                    fontSize: 25,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    color: "#fff",
                    backgroundColor: "#FFFFFF3E",
                    marginLeft: 10,
                  },
                ]}
              >
                {"<"}
              </Text>
            </Pressable>
          </View>
          <Text style={tw`text-xl text-white pt-3 font-bold content-center  `}>Profile</Text>

          <View style={styles.rightContainer}>
            <Text
              style={[
                {
                  fontSize: 15,
                  padding: 5,
                  color: "#fff",
                  backgroundColor: "#FFFFFF3E",
                  marginRight: 10,
                },
              ]}
            >
              {"<"}
            </Text>
          </View>
        </View>

        <View style={tw`position:absolute,z-10, w-full`}>
          <Formik
            validationSchema={validateSchema}
            initialValues={initialValues}
            onSubmit={async (values) => {
              // const response = await axios.put(`updateUser/${user._id}`, values);
              //     axios.put(BASE_URL + "updateUser/" + user._id, values)

              // if (response) {
              // Toast.success("Update your data successfully");
              // }
              // setTimeout(() => {
              //  setIsSubmit(false)
              // }, 5000);
              axios.put(BASE_URL + "updateUser/" + user._id, values)
                .then((res) => {
                  if (res) {
                    Toast.success("Update your data successfully");
                  }
                  setTimeout(() => {
                    setIsSubmit(false);
                  }, 5000);
                })
                .catch((error) => {
                  Toast.error(error.response.data);
                });
            }}

            // onSubmit={async (values) => {
            //   // showToast()
            //   setLoading(true);

            //   try {
            //     const response = await axios.post(
            //       "http://192.168.146.2:6969/login",
            //       values
            //     );
            //     console.log(response);

            //     if(response){
            //       const expirationTime = new Date(
            //         new Date().getTime() + response.usertokenExp * 1000
            //       );
            //       const spotifyExpirationTime = new Date(
            //         new Date().getTime() +
            //           response.spotifytoken.expires_in * 1000
            //       );
            //       ctx.login(
            //         response.token,
            //         expirationTime.toISOString(),
            //         response.spotifytoken.access_token,
            //         spotifyExpirationTime.toISOString()
            //       );
            //       navigation.navigate("Home");
            //     }
            //     Toast.success("You logged in successfully!");

            //     // setTimeout(() => {
            //     //   navigation.navigate("Home");
            //     // }, 3000);
            //     setLoading(false);
            //   } catch (error) {
            //     // alert(error.response.data);
            //     Toast.error(error.response.data);
            //     setLoading(false);

            //     console.error(error);
            //   }

            //   // handleSubmitPress();
            // }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
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
                </View>

                <View style={tw`h-15 mt-4 ml-8 mr-8 mb-2`}>
                  <Text style={tw`text-slate-200 mb-2`}>Email</Text>
                  <TextInput
                    name="email"
                    placeholder="Email"
                    style={tw`flex-1 rounded pl-4 bg-slate-400`}
                    // style={[tw`rounded-full ml-2 justify-between`]}
                    editable={false}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                  />
                </View>

                <View style={tw`h-15 mt-4 ml-8 mr-8 mb-2`}>
                  <Text style={tw`text-slate-200 mb-2`}>First Name</Text>
                  <TextInput
                    name="first_name"
                    placeholder="First Name"
                    style={tw`flex-1 rounded pl-4 bg-slate-400`}
                    // style={[tw`rounded-full ml-2 justify-between`]}

                    onChangeText={handleChange("first_name")}
                    onBlur={handleBlur("first_name")}
                    value={values.first_name}
                  />
                </View>
                <View>
                  {errors.first_name && (
                    <Text style={tw`text-red-600 text-xs ml-8`}>{errors.first_name}</Text>
                  )}
                </View>
                <View style={tw`h-15 mt-4 ml-8 mr-8 mb-2`}>
                  <Text style={tw`text-slate-200 mb-2`}>Last Name</Text>

                  <TextInput
                    name="last_name"
                    placeholder="Last Name"
                    style={tw`flex-1 rounded pl-4 bg-slate-400`}
                    // style={[tw`rounded-full ml-2 justify-between`]}

                    onChangeText={handleChange("last_name")}
                    onBlur={handleBlur("last_name")}
                    value={values.last_name}
                  />
                </View>
                <View>
                  {errors.last_name && (
                    <Text style={tw`text-red-600 text-xs ml-8`}>{errors.last_name}</Text>
                  )}
                </View>

                <Pressable
                  style={tw`bg-[#2A0D62] h-10 mt-4 ml-8 mr-8 mb-2 flex items-center rounded`}
                  activeOpacity={0.5}
                  onPress={handleSubmit}
                  disabled={isSubmit}

                  // onPress={handleSubmitPress}
                >
                  <Text style={tw`text-white py-3 font-bold`}>Update</Text>
                </Pressable>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </View>
  );
};
export default ProfileScreen1;

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
    marginBottom: 20,
  },
  leftContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  rightContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
