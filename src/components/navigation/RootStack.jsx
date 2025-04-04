// import React from 'react';
// import {createStackNavigator} from '@react-navigation/stack';
// import AuthStack from './AuthStack';
// import TabNavigator from './TabNavigator';
// import StickyPlayer from '../player/StickyPlayer';
// import {View, StyleSheet} from 'react-native';
// import tw from 'twrnc';
// import {useSelector} from 'react-redux';

// const Stack = createStackNavigator();

// const RootStack = ({isLoggedIn}) => {
//   const {stickyPlayerOpen} = useSelector(state => state.auth);
//   return (
//     <View style={styles.container}>
//       <Stack.Navigator screenOptions={{headerShown: false}}>
//         {isLoggedIn ? (
//           <Stack.Screen name="Main" component={TabNavigator} />
//         ) : (
//           <Stack.Screen name="Auth" component={AuthStack} />
//         )}
//       </Stack.Navigator>
//       {stickyPlayerOpen && <StickyPlayer />}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     position: 'relative', // Ensure the container has a relative position
//   },
//   stickyPlayer: {
//     position: 'absolute',
//     bottom: 50, // Adjust this value as needed
//     left: 0,
//     right: 0,
//     zIndex: 1000, // Adjust the zIndex as needed
//   },
// });

// export default RootStack;
//***************************************////////*//***************************************////////*///***************************************////////*///***************************************////////*///***************************************////////*///***************************************////////*///***************************************////////*///***************************************////////*///***************************************////////*///***************************************////////*//


// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import AuthStack from './AuthStack';
// import TabNavigator from './TabNavigator';
// import StickyPlayer from '../player/StickyPlayer';
// import { View, StyleSheet } from 'react-native';
// import { useSelector } from 'react-redux';
// import AppStack from './AppStack'; // Import the AppStack
// import AuthorStoriesPage from '../../screens/AuthorStoriesPage'; // Import the AuthorStoriesPage

// const Stack = createStackNavigator();

// const RootStack = ({ isLoggedIn }) => {
//   const { stickyPlayerOpen } = useSelector((state) => state.auth);
//   console.log('Sticky Player Open:', stickyPlayerOpen); // Log the sticky player state

//   return (
//     // <View style={styles.container}>
//     //   <Stack.Navigator screenOptions={{ headerShown: false }}>
//     //     {isLoggedIn ? (
//     //       <>
//     //         {/* Main Tab Navigator */}
//     //         <Stack.Screen name="Main" component={TabNavigator} />
//     //         {/* App Stack for CategoryStories */}
//     //         <Stack.Screen name="App" component={AppStack} />
//     //         {/* Add AuthorStories screen */}
//     //         <Stack.Screen
//     //           name="AuthorStories"
//     //           component={AuthorStoriesPage}
//     //           options={{ headerShown: false }} // Hide the header if needed
//     //         />
//     //       </>
//     //     ) : (
//     //       <Stack.Screen name="Auth" component={AuthStack} />
//     //     )}
//     //   </Stack.Navigator>
//     //   {stickyPlayerOpen && <StickyPlayer />}
//     // </View>
//     <View style={styles.container}>
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         {isLoggedIn ? (
//           <>
//             {/* Main Tab Navigator */}
//             <Stack.Screen name="Main" component={TabNavigator} />
//             {/* App Stack for CategoryStories */}
//             <Stack.Screen name="App" component={AppStack} />
//             {/* Add AuthorStories screen */}
//             <Stack.Screen
//               name="AuthorStories"
//               component={AuthorStoriesPage}
//               options={{ headerShown: false }} // Hide the header if needed
//             />
//           </>
//         ) : (
//           <Stack.Screen name="Auth" component={AuthStack} />
//         )}
//       </Stack.Navigator>
//       {stickyPlayerOpen && <StickyPlayer />}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     position: 'relative', // Ensure the container has a relative position
//   },
//   stickyPlayer: {
//     position: 'absolute',
//     bottom: 50, // Adjust this value as needed
//     left: 0,
//     right: 0,
//     zIndex: 1000, // Adjust the zIndex as needed
//   },
// });

// export default RootStack;
//***************************************////////*//***************************************////////*///***************************************////////*///***************************************////////*///***************************************////////*///***************************************////////*///***************************************////////*///***************************************////////*///***************************************////////*///***************************************////////*//


import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStack from './AuthStack';
import TabNavigator from './TabNavigator';
import StickyPlayer from '../player/StickyPlayer';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import AppStack from './AppStack'; // Import the AppStack
import AuthorStoriesPage from '../../screens/AuthorStoriesPage'; // Import the AuthorStoriesPage

const Stack = createStackNavigator();
const RootStack = ({ isLoggedIn }) => {
  const { stickyPlayerOpen, storyInfo } = useSelector((state) => state.auth);
  console.log('Sticky Player Open:', stickyPlayerOpen); // Log the sticky player state
  console.log('Story Info:', storyInfo); // Log the storyInfo object

  // Add a fallback for storyInfo
  const safeStoryInfo = storyInfo || { name: null, id: null };

  return (
    <View style={styles.container}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen name="Main" component={TabNavigator} />
            <Stack.Screen name="App" component={AppStack} />
            <Stack.Screen
              name="AuthorStories"
              component={AuthorStoriesPage}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
      {stickyPlayerOpen && safeStoryInfo.id && <StickyPlayer />}
    </View>
  );
};

export default RootStack;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative', // Ensure the container has a relative position
  },
  stickyPlayer: {
    position: 'absolute',
    bottom: 50, // Adjust this value as needed
    left: 0,
    right: 0,
    zIndex: 1000, // Adjust the zIndex as needed
  },
});