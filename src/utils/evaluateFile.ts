import { DeviceQuality } from "../models/types";
import { QualityLogFileAnalyzer } from "../models/QualityLogFileAnalyzer";

export function evaluateFile(content: string): [Array<DeviceQuality>, string] {
  try {
    const fileMeasurement: QualityLogFileAnalyzer = new QualityLogFileAnalyzer(content);     
    return [fileMeasurement.getAccuracy(), ""];
  } catch (e) {
    return [[],e];
  }
}


