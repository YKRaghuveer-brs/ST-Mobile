import {NavigationContainer} from '@react-navigation/native';
import RootStack from './src/components/navigation/RootStack';
import {useSelector} from 'react-redux';

const AppWrapper = () => {
  const {isLoggedIn} = useSelector(state => state.auth);

  return (
    <NavigationContainer>
      <RootStack isLoggedIn={isLoggedIn} />
    </NavigationContainer>
  );
};

export default AppWrapper;
