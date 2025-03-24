// import React from "react";
// import { View, Text, Image, TouchableOpacity, FlatList, Dimensions } from "react-native";
// import { useDispatch } from "react-redux";
// import { setStoryInfo, toggleSidebar } from "../../store/user/authSlice";

// const { width } = Dimensions.get("window");

// const AuthorStoriesList = ({ stories }) => {
//   const dispatch = useDispatch();

//   const showSidebar = (s_id, s_name) => {
//     console.log(s_id, s_name);
//     dispatch(setStoryInfo({ s_id, s_name }));
//     dispatch(toggleSidebar());
//   };

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       key={item.id}
//       style={{
//         padding: 8,
//         borderRadius: 8,
//         backgroundColor: "#f0f0f0",
//         marginBottom: 12,
//         width: width * 0.3,
//       }}
//       onPress={() => showSidebar(item.id, item.name)}
//     >
//       <View style={{ position: "relative", aspectRatio: 1, marginBottom: 8 }}>
//         <Image
//           source={{ uri: item.images[0].url }}
//           style={{
//             position: "absolute",
//             width: "100%",
//             height: "100%",
//             borderRadius: 8,
//           }}
//           resizeMode="cover"
//         />
//         <TouchableOpacity
//           style={{
//             width: 40,
//             height: 40,
//             borderRadius: 20,
//             backgroundColor: "#6200ea",
//             position: "absolute",
//             bottom: 8,
//             right: 8,
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <View style={{ width: 16, height: 16 }}>
//             <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <polygon points="21.57 12 5.98 3 5.98 21 21.57 12" fill="white" />
//             </svg>
//           </View>
//         </TouchableOpacity>
//       </View>
//       <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: "bold" }}>
//         {item.name}
//       </Text>
//     </TouchableOpacity>
//   );

//   return (
//     <FlatList
//       data={stories}
//       keyExtractor={(item) => item.id.toString()}
//       renderItem={renderItem}
//       numColumns={2}
//       columnWrapperStyle={{ justifyContent: "space-between" }}
//       contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16 }}
//     />
//   );
// };

// export default AuthorStoriesList;
//********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
// import React from "react";
// import { View, Text, Image, TouchableOpacity, FlatList, Dimensions } from "react-native";
// import { useDispatch } from "react-redux";
// import { setStoryInfo, toggleSidebar } from "../../store/user/authSlice";
// import Svg, { Polygon } from "react-native-svg"; // Import Svg and Polygon from react-native-svg

// const { width } = Dimensions.get("window");

// const AuthorStoriesList = ({ stories }) => {
//   const dispatch = useDispatch();

//   const showSidebar = (s_id, s_name) => {
//     console.log(s_id, s_name);
//     dispatch(setStoryInfo({ s_id, s_name }));
//     dispatch(toggleSidebar());
//   };

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       key={item.id}
//       style={{
//         padding: 8,
//         borderRadius: 8,
//         backgroundColor: "#f0f0f0",
//         marginBottom: 12,
//         width: width * 0.3,
//       }}
//       onPress={() => showSidebar(item.id, item.name)}
//     >
//       <View style={{ position: "relative", aspectRatio: 1, marginBottom: 8 }}>
//         <Image
//           source={{ uri: item.images[0].url }}
//           style={{
//             position: "absolute",
//             width: "100%",
//             height: "100%",
//             borderRadius: 8,
//           }}
//           resizeMode="cover"
//         />
//         <TouchableOpacity
//           style={{
//             width: 40,
//             height: 40,
//             borderRadius: 20,
//             backgroundColor: "#6200ea",
//             position: "absolute",
//             bottom: 8,
//             right: 8,
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <View style={{ width: 16, height: 16 }}>
//             <Svg width="100%" height="100%" viewBox="0 0 24 24">
//               <Polygon points="21.57 12 5.98 3 5.98 21 21.57 12" fill="white" />
//             </Svg>
//           </View>
//         </TouchableOpacity>
//       </View>
//       <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: "bold" }}>
//         {item.name}
//       </Text>
//     </TouchableOpacity>
//   );

//   return (
//     <FlatList
//       data={stories}
//       keyExtractor={(item) => item.id.toString()}
//       renderItem={renderItem}
//       numColumns={2}
//       columnWrapperStyle={{ justifyContent: "space-between" }}
//       contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16 }}
//     />
//   );
// };

// export default AuthorStoriesList;
import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions } from "react-native";
import { useDispatch } from "react-redux";
import { setStoryInfo, toggleSidebar, openStickyPlayer } from "../../store/user/authSlice"; // Import openStickyPlayer
import Svg, { Polygon } from "react-native-svg"; // Import Svg and Polygon from react-native-svg

const { width } = Dimensions.get("window");

const AuthorStoriesList = ({ stories }) => {
  const dispatch = useDispatch();

  const showSidebar = (s_id, s_name) => {
    // console.log(s_id, s_name);
    dispatch(setStoryInfo({ s_id, s_name }));
    dispatch(toggleSidebar());
    dispatch(openStickyPlayer()); // Open the sticky player
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      style={{
        padding: 8,
        borderRadius: 8,
        backgroundColor: "#f0f0f0",
        marginBottom: 12,
        width: width * 0.3,
      }}
      onPress={() => showSidebar(item.id, item.name)}
    >
      <View style={{ position: "relative", aspectRatio: 1, marginBottom: 8 }}>
        <Image
          source={{ uri: item.images[0].url }}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: 8,
          }}
          resizeMode="cover"
        />
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "#6200ea",
            position: "absolute",
            bottom: 8,
            right: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ width: 16, height: 16 }}>
            <Svg width="100%" height="100%" viewBox="0 0 24 24">
              <Polygon points="21.57 12 5.98 3 5.98 21 21.57 12" fill="white" />
            </Svg>
          </View>
        </TouchableOpacity>
      </View>
      <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: "bold" }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={stories}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      numColumns={2}
      columnWrapperStyle={{ justifyContent: "space-between" }}
      contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16 }}
    />
  );
};

export default AuthorStoriesList;