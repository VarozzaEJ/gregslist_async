import { AppState } from "../AppState.js";
import { House } from "../models/House.js";
import { api } from "./AxiosService.js";

class HousesService {
  async getHouses() {
    const response = await api.get("api/houses");
    const newHouses = response.data.map((POJO) => new House(POJO));
    AppState.houses = newHouses;
    console.log(AppState.houses);
  }
}

export const housesService = new HousesService();
