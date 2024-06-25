import { AppState } from "../AppState.js";
import { housesService } from "../services/HousesService.js";
import { Pop } from "../utils/Pop.js";

export class HousesController {
  constructor() {
    AppState.on("houses", this.drawHouses);
    console.log("Houses Controller Loaded");
    this.getHouses();
  }

  async createHouse() {
    try {
      event.preventDefault();
      const form = event.target;
      //   await housesService.createHouse(houseData);
    } catch (error) {
      Pop.error(error);
      console.log("Error Creating the House Dawggy");
    }
  }

  async getHouses() {
    try {
      await housesService.getHouses();
    } catch (error) {
      Pop.error(error);
      console.log("Error Getting the Houses from the API");
    }
  }

  drawHouses() {
    const houseElement = document.getElementById("housesListings");
    if (!houseElement) return;
    let innerHTMLString = "";
    const house = AppState.houses;
    house.forEach((house) => (innerHTMLString += house.cardHTMLTemplate));
    houseElement.innerHTML = innerHTMLString;
  }
}
