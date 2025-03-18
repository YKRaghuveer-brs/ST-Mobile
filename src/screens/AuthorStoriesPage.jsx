

// const AuthorStoriesScreen = () => {
//   return (
//     <Text>Author Stories Screen</Text>
//   )
// }

// export default AuthorStoriesScreen
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useGetPopularShowsQuery } from '../store/spotify/spotifyApiSlice';
import AuthorStoriesList from '../components/authors/AuthorStoriesList';

const AuthorStoriesPage = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { publisher, name, url } = route.params;

  const [featured, setFeatured] = useState([]);

  const { data: featuredList, isLoading: featuredLoading } = useGetPopularShowsQuery({
    queryParams: {
      q: `${publisher} ${name}`,
      type: 'show',
      include_external: 'audio',
      market: 'IN',
      limit: '50',
    },
  });

  useEffect(() => {
    try {
      if (!featuredLoading) {
        setFeatured(
          featuredList?.shows?.items.filter((story) => story.publisher.includes(publisher)) || [],
        );
      }
    } catch (error) {
      console.log(error);
      setFeatured([]);
    }
  }, [featuredLoading, publisher, featuredList]);

  return (
    <ScrollView style={styles.container}>
      {/* Breadcrumb Navigation */}
      <View style={styles.breadcrumbContainer}>
        {/* <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.breadcrumbLink}>Home</Text>
        </TouchableOpacity> */}
        <Text style={styles.breadcrumbSeparator}> &gt; </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Authors')}>
          <Text style={styles.breadcrumbLink}>Authors</Text>
        </TouchableOpacity>
        <Text style={styles.breadcrumbSeparator}> &gt; </Text>
        <Text style={styles.breadcrumbText}>{name}</Text>
      </View>

      {/* Author Details */}
      <View style={styles.authorContainer}>
        <Image source={{ uri: url }} style={styles.authorImage} />
        <Text style={styles.authorName}>{name}</Text>
        <Text style={styles.authorPublisher}>
          Author: <Text style={styles.publisherText}>{publisher}</Text>
        </Text>
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Follow</Text>
        </TouchableOpacity>
      </View>

      {/* Featured Stories Header */}
      <View style={styles.featuredHeader}>
        <Text style={styles.featuredHeaderText}>Featured Stories</Text>
      </View>

      {/* Featured Stories List */}
      {featured.length > 0 ? (
        <AuthorStoriesList stories={featured} />
      ) : (
        <Text style={styles.noStoriesText}>No Stories to load!</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  breadcrumbContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  breadcrumbLink: {
    color: '#FFFFFF',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  breadcrumbSeparator: {
    color: '#FFFFFF',
    fontSize: 16,
    marginHorizontal: 8,
  },
  breadcrumbText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  authorContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  authorImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  authorName: {
    color: '#FFFFFF',
    fontSize: 24,
    marginTop: 10,
  },
  authorPublisher: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 5,
  },
  publisherText: {
    fontWeight: 'bold',
  },
  followButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  followButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 5,
  },
  featuredHeader: {
    marginBottom: 20,
  },
  featuredHeaderText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  noStoriesText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default AuthorStoriesPage;