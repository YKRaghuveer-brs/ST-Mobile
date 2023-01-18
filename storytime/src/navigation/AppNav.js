import React, {useContext,useState,useEffect} from 'react';
import {View, Text, ActivityIndicator,Image} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AddGifImage  from '../components/AddGifImage';


import AuthStack from './AuthStack';

import AppStack2 from './AppStack2';
import {AuthContext} from '../context/AuthContext';
const Stack = createNativeStackNavigator();
const AppNav = () => {
  const {isLoading, userToken} = useContext(AuthContext);
  const [isVisible,setIsVisible] = useState(false)

  // console.log("userToken",userToken)

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsVisible(false);
  //   }, 5000);
  //   // storeData()
  // }, []);



  if (isLoading) {
    return (
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
            source={require("../../assets/Images/Spiral_logo_loader.gif")}
          />
        </View>
    );
  }

  return (
    <NavigationContainer>
      {userToken !== null ? <AppStack2 /> : <AuthStack />}
    {/*<AppStack2 />*/}
       {/*<View style={{ flex: 1, position: "absolute", zIndex: 3, bottom:"20%",paddingLeft:10 }}>
            <View
              style={{
                justifyContent: "space-between",
                backgroundColor: "#5E48A8",
                width: 372,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: "https://source.unsplash.com/random" }}
                style={{ height: 70, width: 70 }}
              />
            </View>
          </View>*/}
    </NavigationContainer>
  );
};

export default AppNav;



// import React, { Component,useContext } from 'react';  

//  import { Platform, StyleSheet, View, Text,  
//  Image, TouchableOpacity, Alert } from 'react-native';  
// import {NavigationContainer} from '@react-navigation/native';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import AddGifImage  from '../components/AddGifImage';


// import AuthStack from './AuthStack';

// import AppStack2 from './AppStack2';
// import {AuthContext} from '../context/AuthContext';
// const Stack = createNativeStackNavigator();
//    const {isLoading, userToken} = useContext(AuthContext);

//  export default class Myapp extends Component<{}>  
// {  
//    constructor(){  
//      super();  
//      this.state={  
//      isVisible : true,  
//     }  
//   }  
//    Hide_Splash_Screen=()=>{  
//     this.setState({   
//       isVisible : false   
//     });  
//   }  
   
//   componentDidMount(){  
//     var that = this;  
//     setTimeout(function(){  
//       that.Hide_Splash_Screen();  
//     }, 9000);  
//    }  
   
//     render()  
//     {  
//         let Splash_Screen = (  
//              <View style={styles.SplashScreen_RootView}>  
//                  <View style={styles.SplashScreen_ChildView}>  
//                       {/* <Image source={{uri:'https://static.javatpoint.com/tutorial/react-native/images/react-native-tutorial.png'}}  
//                     style={{width:'100%', height: '100%', resizeMode: 'contain'}} />  */}
//                    <Image
//             style ={{width: "100%", height:"100%"}}
//             // source={{ }}
//             source={require("../../assets/Images/Cube_1.gif")}  


//           />
//                 </View>  
//              </View> )  
//          return(  
//              <View style = { styles.MainContainer }>  
//                   <NavigationContainer>
//       {userToken !== null ? <AppStack2 /> : <AuthStack />}   {/*<AppStack2 />*/}
 
//   </NavigationContainer>
//                  {  
//                   (this.state.isVisible === true) ? Splash_Screen : null  
//                 }  
//             </View>  
//               );  
//     }  
// }  
//  const styles = StyleSheet.create(  
// {  
//     MainContainer:  
//     {  
//         flex: 1,  
//         justifyContent: 'center',  
//         alignItems: 'center',  
//         paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0  
//     },  
   
//     SplashScreen_RootView:  
//     {  
//         justifyContent: 'center',  
//         flex:1,  
//         margin: 10,  
//         position: 'absolute',  
//         width: '100%',  
//         height: '100%',  
//       },  
   
//     SplashScreen_ChildView:  
//     {  
//         justifyContent: 'center',  
//         alignItems: 'center',  
//         backgroundColor: '#00BCD4',  
//         flex:1,  
//     },  
// });  

