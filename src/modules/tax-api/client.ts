import axios from "axios";
import { configClient } from "../../utils/env/configClient";
import axiosRetry from "axios-retry";

export const taxApiClient = axios.create({
  baseURL: configClient.TAX_API_URL,
});

axiosRetry(taxApiClient, {
  retries: 2,
});