export const truncateText = (text, txtLength) => {
  const truncatedText = text.substring(0, txtLength) + '...';
  return truncatedText;
};
