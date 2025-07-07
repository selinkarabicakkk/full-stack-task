import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const fetchProducts = async (filters) => {
  try {
    const params = new URLSearchParams();
    if (filters) {
      if (filters.minPrice) params.append("minPrice", filters.minPrice);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
      if (filters.minPopularity)
        params.append("minPopularity", filters.minPopularity);
    }

    const response = await axios.get(`${API_URL}/products`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
