import { AppState } from "../AppState.js";
import { housesService } from "../services/HousesService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";

export class HousesController {
  constructor() {
    AppState.on("houses", this.drawHouses);
    AppState.on("account", this.drawHouses);
    AppState.on("account", this.showHouseForm);
    console.log("Houses Controller Loaded");
    this.getHouses();
    this.showHouseForm();
  }

  async createHouse() {
    try {
      event.preventDefault();
      const form = event.target;
      const houseData = getFormData(form);
      console.log("Raw House Data", houseData);
      await housesService.createHouse(houseData);
      // @ts-ignore
      form.reset();
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

  async destroyHouse(houseId) {
    try {
      const wantsToDelete = await Pop.confirm("ARE YOU SURE ABOUT THAT👺");
      if (!wantsToDelete) return;
      await housesService.destroyHouse(houseId);
      Pop.success("House Was Successfully Deleted");
    } catch (error) {
      Pop.error(error);
      console.log("There was a problem deleting the house ");
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

  showHouseForm() {
    const houseForm = document.getElementById("houseForm");

    if (!AppState.account) return;

    if (!houseForm) return;

    houseForm.classList.remove("hidden");
  }
}
