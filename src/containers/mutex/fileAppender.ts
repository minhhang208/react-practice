import * as fs from "fs";
import Mutex from "./mutex";

export default class FileAppender {
    private _filename: string;
    private _mutex: Mutex;
    constructor(filename: string) {

        this._filename = filename;
        this._mutex = new Mutex();
    }

    async append(data: string, options: fs.WriteFileOptions = null) {

        let unlock = await this._mutex.lock();

        fs.appendFile(this._filename, data, options, error => {

            unlock();

            if (error) {
                throw error;
            }
        });
    }
}