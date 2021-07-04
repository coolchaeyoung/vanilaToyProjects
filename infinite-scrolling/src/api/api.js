const API_END_POINT = "https://jsonplaceholder.typicode.com/posts";
const LIMIT = 5;

export const request = async (page) => {
  try {
    const res = await fetch(`${API_END_POINT}?_limit=${LIMIT}&_page=${page}`);
    if (!res.ok) {
      throw new Error("서버의 상태가 이상합니다.");
    }
    return await res.json();
  } catch (e) {
    throw new Error(`에러 발생 ${e.message}`);
  }
};
