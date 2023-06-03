export const useFetchCountries = async (url) => {
  console.log(url);
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    return console.log(error);
  }
};
