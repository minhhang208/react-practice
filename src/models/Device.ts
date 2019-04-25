import { Measurement } from "./types";

export abstract class Device {
  abstract getAccuracy(): string;
  measurements: Array<Measurement>;
  goodValue: number;
  name: string;

  constructor(name: string, goodValue: number) {
    this.measurements = [];
    this.name = name;
    this.goodValue = goodValue;
  }
  addRecord(date: Date, value: number) {
    this.measurements.push({
      date,
      value
    });
  }
}
