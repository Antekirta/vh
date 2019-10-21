import { formatDate } from "./../utils/date";
import axios from "axios";
import api from "../constants/api";
import { CURRENCIES } from "./../constants/currency";

export const getExchangeRates = async (
  base: CURRENCIES,
  rates: Array<CURRENCIES>,
  date: Date
): Promise<{ rates: { [key in CURRENCIES]?: string } }> => {
  const formattedDate = formatDate(date);
  const formattedRates = rates.join(",");

  const { data } = await axios.get(
    `${api.RATES}${formattedDate}?base=${base}&symbols=${formattedRates}`
  );

  return data;
};
