export default class Mutex {
    private _locking: Promise<void>;
    private _locks: number;
    constructor() {
        this._locking = Promise.resolve();
        this._locks = 0;
    }
    isLock() {
        return this._locks > 0;
    }
    lock() {
        this._locks += 1;
        let unLockNext: () => void;
        let willLock = new Promise(resolve => unLockNext = () => {
            this._locks -= 1;
            resolve();
        })
        let willUnlock = this._locking.then(() => unLockNext);
        this._locking = this._locking.then(() => willLock) as Promise<void>;
        return willUnlock;
    }
}