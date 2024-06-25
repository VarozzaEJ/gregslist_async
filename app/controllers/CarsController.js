import { AppState } from "../AppState.js";
import { carsService } from "../services/CarsService.js";
import { getFormData } from "../utils/FormHandler.js";
import { Pop } from "../utils/Pop.js";
import { setHTML, setText } from "../utils/Writer.js";

export class CarsController {
  constructor() {
    AppState.on("cars", this.drawCars);
    AppState.on("account", this.drawCars);
    AppState.on("account", this.showCarForm);

    this.getCars();
    this.showCarForm();
  }
  // CREATE
  async createCar() {
    try {
      event.preventDefault(); // do not refresh
      const form = event.target; // get the form element out of the HTML
      const carData = getFormData(form); // get the data out of the form
      console.log("RAW CAR DATA", carData);
      await carsService.createCar(carData);

      // TODO clear form AFTER network request
      // @ts-ignore
      form.reset();
    } catch (error) {
      Pop.error(error); //notify user
      console.error("FAILED TO CREATE CAR", error); //notify developer
    }
  }

  // READ
  async getCars() {
    try {
      await carsService.getCars();
    } catch (error) {
      Pop.error(error); //notify user
      console.error("FAILED TO GET CARS", error); //notify developer
    }
  }

  // DELETE
  async destroyCar(carId) {
    try {
      // NOTE have to await Pop.confirm
      const wantsToDelete = await Pop.confirm(
        "Are you sure that you want to delete this car?"
      );

      if (!wantsToDelete) return; //stop function

      await carsService.destroyCar(carId);

      Pop.success("Car was deleted!");
    } catch (error) {
      Pop.error(error); //notify user
      console.error("FAILED TO DESTROY CAR", error); //notify developer
    }
  }

  drawCars() {
    const carListingsElement = document.getElementById("carListings");

    if (!carListingsElement) return;

    const cars = AppState.cars;
    let innerHTMLString = "";
    cars.forEach((car) => (innerHTMLString += car.cardHTMLTemplate));

    carListingsElement.innerHTML = innerHTMLString;
  }

  showCarForm() {
    const carFormElement = document.getElementById("carForm");

    if (!AppState.account) return;

    if (!carFormElement) return;

    carFormElement.classList.remove("d-none");
  }

  drawPrice() {
    // @ts-ignore
    const valueFromRange = event.target.value;

    setText("carPriceFromRange", valueFromRange);
  }
}
