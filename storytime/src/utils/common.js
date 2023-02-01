//Return the truncated text when text and length are passed
export const truncateText = (text, txtLength) => {
  const truncatedText = text.substring(0, txtLength) + '...';
  return truncatedText;
};

// function to calculate remaining expiration time 
export const calculateRemainingExpirationTime = expirationTime => {
  const currentTime = new Date().getTime();
  const newExpirationTime = new Date(expirationTime).getTime(); //0 incase expTime is empty & we get -ve value
  const remainingTime = newExpirationTime - currentTime;
  return remainingTime;
};