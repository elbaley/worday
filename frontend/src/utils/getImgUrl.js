export const getImgUrl = (url) => {
  if (url.startsWith("/")) {
    return `http://localhost:4001/${url}`;
  } else {
    return url;
  }
};
