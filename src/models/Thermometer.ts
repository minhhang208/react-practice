import { Device } from "./Device";

export class Thermometer extends Device {
  getAccuracy(): string {
    const mean = this._getMean();
    const standardDeviation = this._getStandardDeviation();
    if (Math.abs(mean - this.goodValue) <= 0.5) {
      if (standardDeviation < 3) {
        return "ultra precise";
      }
      if (standardDeviation < 5) {
        return "very precise";
      }
    }
    return "precise";
  }

  private _getMean(): number {
    const sum = this.measurements.reduce((prev, e) => {
      return prev + e.value;
    }, 0);
    return sum / this.measurements.length;
  }

  private _getStandardDeviation(): number {
    const mean = this._getMean();
    const variance = this.measurements.reduce((prev, e) => {
      return prev + (e.value - mean) * (e.value - mean);
    }, 0);
    return Math.sqrt(variance/this.measurements.length);
  }
}
