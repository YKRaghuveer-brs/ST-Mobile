import React from "react";
import { View, Text, Image, TouchableOpacity, FlatList, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Svg, { Path } from "react-native-svg";

const { width } = Dimensions.get("window");

const AuthorsList = ({ authors }) => {
  const navigation = useNavigation();

  const authorStoriesHandler = (publisher, name, url) => {
    navigation.navigate('AuthorStories', { publisher, name, url });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      key={item.id}
      style={{
        width: width / 3 - 16,
        padding: 8,
        borderRadius: 8,
        backgroundColor: "#1E1E1E",
        margin: 8,
      }}
      onPress={() => authorStoriesHandler(item.publisher, item.name, item.images[0].url)}
    >
      <View style={{ aspectRatio: 1, borderRadius: 12, overflow: "hidden", marginBottom: 8 }}>
        <Image
          source={{ uri: item.images[0].url }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
        <Text
          style={{
            flex: 1,
            fontSize: 16,
            fontWeight: "600",
            color: "#fff",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <View style={{ backgroundColor: "black", padding: 4, borderRadius: 4, marginLeft: 8 }}>
          <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
            <Path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
          </Svg>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={authors}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      numColumns={3}
      contentContainerStyle={{ paddingHorizontal: 8, paddingTop: 16 }}
    />
  );
};

export default AuthorsList;
