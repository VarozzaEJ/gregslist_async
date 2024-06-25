import { Car } from "./models/Car.js";
import { EventEmitter } from "./utils/EventEmitter.js";
import { createObservableProxy } from "./utils/ObservableProxy.js";

class ObservableAppState extends EventEmitter {
  // NOTE leave these properties in the appState for the account and user
  user = null;
  /**@type {import('./models/Account.js').Account | null} */
  account = null;

  /**
   * @type {Car[]}
   */
  cars = [];

  houses = [];
}

export const AppState = createObservableProxy(new ObservableAppState());
