const API_URL = "https://randomuser.me/api/";

export const request = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error("Server Error");
    }
    return res.json();
  } catch (e) {
    throw new Error(`Error: ${e}`);
  }
};
