import store, {persistor} from './src/store/store.js';
import AppWrapper from './AppWrapper.jsx';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppWrapper />
          <Toast style={{fontSize: 14}} position="top" topOffset={100} />
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
