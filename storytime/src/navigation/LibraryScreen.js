import {View, Text, TouchableOpacity} from 'react-native';

const LibraryScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{marginTop: 15, fontSize: 18, marginBottom: 10}}>
        The Library is currently empty
      </Text>
      <Text>Find more of the stories amoung our popular stories</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Popular')}>
        <Text style={{marginTop: 15, fontSize: 18, color: '#0aada8'}}>
          Go To Popular Stories
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LibraryScreen;
