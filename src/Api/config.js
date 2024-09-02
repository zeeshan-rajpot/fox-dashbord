import axios from 'axios';


const foxUrl = "https://fox-training-f2fph3abhfgbb4hv.eastus-01.azurewebsites.net";  

const config = axios.create({
  baseURL: foxUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default config;
