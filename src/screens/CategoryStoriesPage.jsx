import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import { Svg, Path } from 'react-native-svg';
import LoadingSpinner from '../components/LoadingSpinner';
import CategorySearch from './CategoryStoriesHelp';
import { useGetPopularShowsQuery } from '../store/spotify/spotifyApiSlice';

const CategoryStoriesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { categoryName, selectedLanguages } = route.params;

  const [stories, setStories] = useState([]);
  const [search, setSearch] = useState(`${categoryName} language:${selectedLanguages}`);

  const { data: categoryStories, isLoading: categoryStoriesLoading } = useGetPopularShowsQuery({
    queryParams: {
      q: search,
      type: 'show',
      include_external: 'audio',
      market: 'IN',
      limit: '50',
    },
  });

  useEffect(() => {
    console.log('Category Stories Data:', categoryStories); // Log the fetched data
    if (!categoryStoriesLoading && categoryStories) {
      console.log('Setting stories:', categoryStories.shows.items); // Log the stories being set
      setStories(categoryStories.shows.items);
    } else {
      console.log('No stories found or loading...'); // Log if no stories are found
      setStories([]);
    }
  }, [categoryStoriesLoading, categoryStories]);
  
  useEffect(() => {
    console.log('Initial search query:', search); // Log the initial search query
  }, []);
  
  const handleSearch = (values) => {
    console.log('Search query submitted:', values.searchText); // Log the search query
    if (values.searchText.trim()) {
      setSearch(`${values.searchText} language:Telugu English Hindi Tamil`);
    } else {
      setSearch(`${categoryName} language:${selectedLanguages}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Breadcrumb Navigation */}
      <View style={styles.breadcrumb}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Svg width={24} height={24} viewBox="0 0 24 24" fill="#FFFFFF">
            <Path d="M0 0h24v24H0V0z" fill="none" />
            <Path d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z" />
          </Svg>
        </TouchableOpacity>
        <Svg width={12} height={12} viewBox="0 0 320 512" fill="#FFFFFF">
          <Path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
        </Svg>
        <TouchableOpacity onPress={() => navigation.navigate('Categories')}>
          <Text style={styles.breadcrumbText}>Categories</Text>
        </TouchableOpacity>
        <Svg width={12} height={12} viewBox="0 0 320 512" fill="#FFFFFF">
          <Path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
        </Svg>
        <Text style={styles.breadcrumbText}>
          {`${categoryName} language:${selectedLanguages}` === search ? categoryName : 'Search Results'}
        </Text>
      </View>

      {/* Search Form */}
      <View style={styles.searchContainer}>
        <Formik initialValues={{ searchText: '' }} onSubmit={handleSearch}>
          {({ handleChange, handleSubmit, values }) => (
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Search..."
                placeholderTextColor="#999"
                value={values.searchText}
                onChangeText={handleChange('searchText')}
              />
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Search</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
      {/* Loading and Stories */}
      {categoryStoriesLoading && <LoadingSpinner />}
      {!categoryStoriesLoading && <CategorySearch stories={stories} />}
      {!categoryStoriesLoading && !categoryStories && (
        <Text style={styles.errorText}>Unable to load Stories. Please try again later!</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#011000',
  },
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  breadcrumbText: {
    color: '#FFFFFF',
    marginHorizontal: 8,
  },
  searchContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  form: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  input: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#FFFFFF',
    width: 300,
    fontSize: 16,
    backgroundColor: '#011000',
  },
  button: {
    padding: 10,
    backgroundColor: '#703fce',
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  errorText: {
    textAlign: 'center',
    color: 'orange',
    fontSize: 18,
    marginTop: 20,
  },
});
export default CategoryStoriesScreen;