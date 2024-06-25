import { AppState } from "../AppState.js";
import { House } from "../models/House.js";
import { api } from "./AxiosService.js";
import { Pop } from "../utils/Pop.js";

class HousesService {
  async getHouses() {
    const response = await api.get("api/houses");
    const newHouses = response.data.map((POJO) => new House(POJO));
    AppState.houses = newHouses;
    console.log(AppState.houses);
  }

  async createHouse(houseData) {
    const house = await api.post("api/houses", houseData);
    const newHouse = new House(house.data);
    AppState.houses.push(newHouse);
    console.log(AppState.houses);
  }

  async destroyHouse(houseId) {
    const house = await api.delete(`api/houses/${houseId}`);
    const houseIndex = AppState.houses.findIndex(
      (house) => house.id == houseId
    );
    if (houseIndex == -1) throw new Error("Find index is messed up dawg");
    AppState.houses.splice(houseIndex, 1);
  }
}

export const housesService = new HousesService();
