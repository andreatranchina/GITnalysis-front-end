import axios from "axios"
axios.defaults.withCredentials=true;
export const getRepoMetrics = async (full_name) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/lead_time/running_average/${full_name}`);
      // const response = await axios.get(`http://localhost:8080/api/lead_time/running_average/${full_name}`);
      console.log(response);
      return response;
    } catch (error) {
      console.error('Error fetching authenticated user:', error);
    }
  };

  export const getLeadTime = async (full_name) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/lead_time/${full_name}`);
      // const response = await axios.get(`http://localhost:8080/api/lead_time/running_average/${full_name}`);
      console.log(response);
      return response.data.average_lead_time;
    } catch (error) {
      console.error('Error fetching authenticated user:', error);
    }
  };