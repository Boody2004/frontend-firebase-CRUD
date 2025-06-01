const BASE_URL = "https://app-hanxxmv2aa-uc.a.run.app";

// GET all items
export const getAllItems = async () => {
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

// POST new item
export const postNewItem = async (itemData) => {
  try {
    const response = await fetch(`${BASE_URL}/api/create/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(itemData),
    });
    if (!response.ok) throw new Error("Failed to create item");
    return await response.json();
  } catch (error) {
    throw error;
  }
};
