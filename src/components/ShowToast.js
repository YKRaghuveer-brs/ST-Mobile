import Toast from 'react-native-toast-message';

const ShowToast = (type, message) => {
  console.log(type, message);
  if (type === 'success') {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: message,
    });
  } else if (type === 'error') {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: message,
    });
  } else {
    Toast.show({
      type: 'info',
      text1: 'Info',
      text1: message,
    });
  }
};

export default ShowToast;
