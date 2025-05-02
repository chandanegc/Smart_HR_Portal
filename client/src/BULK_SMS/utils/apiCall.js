import axios from "axios";

 export const loadData = async () => {
    try {
      const { data } = await axios.get("/api/v1/template");
      
      return data.data;
    } catch (error) {
      console.error("Error loading data:", error);
      return [];
    }
  };