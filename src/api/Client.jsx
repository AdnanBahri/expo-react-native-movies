import axios from "axios";
import { TMDB_API_KEY, TMDB_BASE_URL } from "../utils/Urls";

export const Client = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});
