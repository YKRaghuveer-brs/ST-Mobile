//Return the truncated text when text and length are passed
export const truncateText = (text, txtLength) => {
  const truncatedText = text.substring(0, txtLength) + '...';
  return truncatedText;
};
