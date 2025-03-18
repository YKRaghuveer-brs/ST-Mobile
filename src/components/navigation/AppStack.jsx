// import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';

// import CategoryStoriesScreen from '../../screens/CategoryStoriesPage';

// const Stack = createStackNavigator();

// const AppStack = () => {
//   return (
//     // <Stack.Navigator screenOptions={{ headerShown: false }}>
//     //   <Stack.Screen name="CategoryStories" component={CategoryStoriesScreen} />
//     // </Stack.Navigator>
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="CategoryStories" component={CategoryStoriesScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default AppStack;
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CategoryStoriesScreen from '../../screens/CategoryStoriesPage';
import AuthorStoriesPage from '../../screens/AuthorStoriesPage';
const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CategoryStories"
        component={CategoryStoriesScreen}
        options={{ headerShown: false }} // Hide the header if needed
      />
       <Stack.Screen
        name="AuthorStories"
        component={AuthorStoriesPage}
        options={{ headerShown: false }} // Hide the header if needed
      />
    </Stack.Navigator>
  );
};

export default AppStack;