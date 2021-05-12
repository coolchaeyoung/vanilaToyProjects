const SEARCH_API = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const RANDOM_API = "https://www.themealdb.com/api/json/v1/1/random.php";

export const searchAPI = async (meal) => {
  try {
    const res = await fetch(`${SEARCH_API}${meal}`);
    if (!res.ok) {
      throw new Error("Server Error");
    }
    return res.json();
  } catch (e) {
    throw new Error(`Error!${e}`);
  }
};

export const randomAPI = async () => {
  try {
    const res = await fetch(RANDOM_API);
    if (!res.ok) {
      throw new Error("Server Error");
    }
    return res.json();
  } catch (e) {
    throw new Error(`Error!${e}`);
  }
};
