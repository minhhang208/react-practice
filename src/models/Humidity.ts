import { Device } from "./Device";
export class Humidity extends Device {

  getAccuracy(): string {
    for (let i = 0; i < this.measurements.length; i++) {
      if (Math.abs((this.measurements[i].value - this.goodValue) / this.goodValue) > 0.01) {
        return "discard";
      }
    }
    return "keep";
  }
  
}
