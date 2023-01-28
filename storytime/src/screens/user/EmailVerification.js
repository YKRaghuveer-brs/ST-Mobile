/** 
Created: 23.01.2023
Component: Email Verfification
Description: Contains the email verification logic through OTP
(c) Copyright (c) by Nyros. 
**/

import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, ScrollView, Image, Pressable, SafeAreaView } from "react-native";
import { CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell } from "react-native-confirmation-code-field";
import axios from "axios";
import ToastManager, { Toast } from "toastify-react-native";
import tw from "twrnc";

const EmailVerification = ({ route, navigation }) => {
  const { email } = route.params;
  const [loading, setLoading] = useState(true);
  const CELL_COUNT = 4;
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [counter, setCounter] = useState(59);

  useEffect(() => {
    const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleSubmit = async () => {
    setLoading(true);

    const payload = {
      email: email,
      code: value,
    };
    try {
      const response = await axios.post("http://203.193.173.125:6969/verifyEmailFromMobile", payload);
      if (response) {
        Toast.success(response.data);
        setTimeout(() => {
          navigation.navigate("Login");
        }, 3000);
      }
    } catch (error) {
      Toast.error(error.response.data);
    }
    setLoading(false);
  };

  const resendPassword = async () => {
    const payload = {
      email: email,
    };

    try {
      const response = await axios.post("http://203.193.173.125:6969/resendVerificationCode", payload);
      if (response) {
        Toast.success(response.data);
        setCounter(59);
        setValue("");
      }
    } catch (error) {
      Toast.error(error.response.data);
      console.error(error);
    }
  };

  return (
    <View style={tw`flex-1 justify-center bg-[#291F4E]`}>
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
              source={require("../../assets/images/Spiral_logo_loader.gif")}
            />
          </View>
        ) : (
          ""
        )}
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <ToastManager duration={3000} style={{ fontSize: 10 }} />
        <SafeAreaView style={styles.root}>
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
            <Text style={styles.title}>Email Verify with OTP</Text>
          </View>
          <Text style={styles.title1}>
            Please type the verification code sent to the email &nbsp;
            {email}
          </Text>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFiledRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <View
                // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                onLayout={getCellOnLayoutHandler(index)}
                key={index}
                style={[styles.cellRoot, isFocused && styles.focusCell]}
              >
                <Text style={styles.cellText}>{symbol || (isFocused ? <Cursor /> : null)}</Text>
              </View>
            )}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Pressable disabled={counter == 0 ? false : true} onPress={resendPassword}>
              <Text style={tw`font-bold text-white`}>Resend OTP </Text>
            </Pressable>
            <Text style={tw`font-bold text-white`}>{counter != 0 ? " in 00:" + counter : ""}</Text>
          </View>

          <Pressable
            style={tw`bg-[#2A0D62] h-10 mt-4 ml-8 mr-8 mb-2 flex items-center rounded`}
            activeOpacity={0.5}
            onPress={handleSubmit}
          >
            <Text style={tw`font-bold text-white py-3`}>VERIFY & PROCEED</Text>
          </Pressable>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};
export default EmailVerification;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#291F4E",
    alignContent: "center",
    padding: 20,
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
 title: { textAlign: "center", fontSize: 30, color: "#fff" },
  title1: { textAlign: "center", fontSize: 15, color: "#fff" },

  codeFiledRoot: {
    marginTop: 20,
    width: 280,
    marginLeft: "auto",
    marginRight: "auto",
  },
  cellRoot: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  cellText: {
    color: "#fff",
    fontSize: 36,
    textAlign: "center",
  },
  focusCell: {
    borderBottomColor: "#007AFF",
    borderBottomWidth: 2,
  },
  registerTextStyle: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "center",
        color: "#FFFFFF",

  },
  buttonStyle: {
    backgroundColor: "#2A0D62",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#072c32",
    height: 40,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 150,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});
