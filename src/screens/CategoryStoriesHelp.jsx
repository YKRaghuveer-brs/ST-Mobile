import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStoryInfo, toggleSidebar, openStickyPlayer } from '../store/user/authSlice'; // Add openStickyPlayer
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';

const CategorySearch = ({ stories }) => {
  const dispatch = useDispatch();

  const showSidebar = (s_id, s_name) => {
    console.log('Story clicked:', s_id, s_name); // Log the story being clicked
    dispatch(setStoryInfo({ s_id, s_name }));
    dispatch(toggleSidebar());
    dispatch(openStickyPlayer()); // Open the sticky player
  };

  const { storyInfo } = useSelector((state) => state.auth);

  return (
    // <ScrollView contentContainerStyle={styles.container}>
    //   {stories.map((story) => (
    //     <TouchableOpacity
    //       key={story.id}
    //       style={styles.storyContainer}
    //       onPress={() => showSidebar(story.id, story.name)}
    //     >
    //       <View style={styles.imageContainer}>
    //         <Image
    //           source={{ uri: story.images[0].url }}
    //           style={styles.image}
    //         />
    //         <TouchableOpacity style={styles.playButton}>
    //           <View style={styles.playIcon} />
    //         </TouchableOpacity>
    //       </View>
    //       <Text style={styles.storyName} numberOfLines={1}>
    //         {story.name}
    //       </Text>
    //       <Text style={styles.storyPublisher} numberOfLines={2}>
    //         {story.publisher}
    //       </Text>
    //     </TouchableOpacity>
    //   ))}
    // </ScrollView>
    <ScrollView contentContainerStyle={styles.container}>
      {stories.map((story) => (
        <TouchableOpacity
          key={story.id}
          style={styles.storyContainer}
          onPress={() => showSidebar(story.id, story.name)}
        >
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: story.images[0].url }}
              style={styles.image}
            />
            <TouchableOpacity style={styles.playButton}>
              <View style={styles.playIcon} />
            </TouchableOpacity>
          </View>
          <Text style={styles.storyName} numberOfLines={1}>
            {story.name}
          </Text>
          <Text style={styles.storyPublisher} numberOfLines={2}>
            {story.publisher}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  storyContainer: {
    width: '48%', // Two columns with a small gap
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    padding: 8,
  },
  imageContainer: {
    position: 'relative',
    paddingTop: '100%', // Maintain 1:1 aspect ratio
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  playButton: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#6200ee', // Primary color
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    width: 16,
    height: 16,
    backgroundColor: '#fff', // White color for the play icon
    clipPath: 'polygon(100% 50%, 0 0, 0 100%)', // Simulate a play icon
  },
  storyName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#000',
  },
  storyPublisher: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});

export default CategorySearch;
