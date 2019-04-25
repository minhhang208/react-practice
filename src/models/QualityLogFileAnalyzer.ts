import { Device } from "./Device";
import { Thermometer } from "./Thermometer";
import { Humidity } from "./Humidity";
import { DeviceQuality } from "./types";
export class QualityLogFileAnalyzer {
    devices: Map<string, Device>;
    constructor(content: string) {
        this.devices = new Map<string, Device>();
        this._processFile(content);
    }

    getAccuracy(): Array<DeviceQuality> {
        console.log(JSON.stringify(Array.from(this.devices.values())));
        return Array.from(this.devices.values()).map(device => {
            return { name: device.name, quality: device.getAccuracy() };
        });
    }

    private _processFile(content: string) {
        let lines = content.split('\n');
        if (lines.length === 0) {
            throw `invalid file format`;
        }
        let currentDevice: Device | null = null;
        const [temparatureRef, humidityRef] = this._processReferenceLine(lines[0]);
        for (let i = 1; i < lines.length; i++) {
            let line = lines[i].replace(/[\t\r]/g, '').trim();
            if (!line) {
                continue;
            }
            if (line.startsWith("thermometer")) {
                currentDevice = this._processDeviceLine(line, temparatureRef);
                continue;
            }
            if (line.startsWith("humidity")) {
                currentDevice = this._processDeviceLine(line, humidityRef);
                continue;
            }
            if (currentDevice === null) {
                throw `invalid file format - no device for line: ${line}`;
            } else {
                this._processValueLine(line, currentDevice);
            }

        }
    }

    private _processReferenceLine(line: string): [number, number] {

        let words = line.split(" ");
        if (!line.startsWith("reference") || words.length !== 3) {
            throw `invalid file format - no valid reference`;
        }

        if (isNaN(+words[1]) || isNaN(+words[2])) {
            throw 'invalid reference format'
        }
        // return temparature and humidity reference 
        return [+words[1], +words[2]]
    }

    private _processDeviceLine(line: string, ref: number): Device {
        let words = line.split(" ");
        if (words.length !== 2) {
            throw `invalid device input format ${line}`
        }

        if (this.devices.has(words[1])) {
            return this.devices.get(words[1]) as Device;
        } else {
            let device = line.startsWith("thermometer") ? new Thermometer(words[1], ref) : new Humidity(words[1], ref);
            this.devices.set(words[1], device);
            return device;
        }
    }

    private _processValueLine(line: string, device: Device): void {
        let words = line.split(" ");
        if (words.length !== 2 || isNaN(Date.parse(words[0])) || isNaN(+words[1])) {
            throw `invalid file format - line content: ${line}`;
        }
        if (words.length == 2) {
            device.addRecord(new Date(words[0]), +words[1]);
        }
    }
}
