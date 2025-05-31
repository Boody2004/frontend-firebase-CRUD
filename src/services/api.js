const BASE_URL = "https://app-hanxxmv2aa-uc.a.run.app";

export const getAll = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/read/`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};
