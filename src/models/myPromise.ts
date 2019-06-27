type State = "pending" | "resolved" | "rejected";
export class CustomPromise {
    state: State;
    thenCallbacks: Function[];
    onFinally: Function| undefined;
    onCatch: Function | undefined;
    value: any;
    constructor(action: (resolver: (value: any) => void, reject: (value: any) => void) => void) {
        this.state = "pending";
        this.value = undefined;
        this.thenCallbacks = [];
        this.onFinally = undefined;
        this.onCatch = undefined;
        action(this.resolver.bind(this), this.rejector.bind(this));
    }
    
 
    then(callback: Function) {
        this.thenCallbacks.push(callback);
        return this;
    }

    catch(callback: Function) {
        this.onCatch = callback;
        return this;
    }

    finally(callback: Function) {
        this.onFinally = callback;
        return this;
    }

    

    resolver(value: any) {
        this.state = 'resolved';
        this.value = value;
        this.thenCallbacks.forEach((func) => {
            func(this.value);
        }, this);
        if(typeof this.onFinally === 'function') {
            this.onFinally(this.value);
        }
    }

    rejector(value: any) {
        this.state = 'rejected';
        this.value = value;
        if(typeof this.onCatch === 'function') {
            this.onCatch(this.value);
        }
        if(typeof this.onFinally === 'function') {
            this.onFinally(this.value);
        }
    }
}


function get(url: string) {
    return new CustomPromise(function(resolve, reject) {
        var request = new XMLHttpRequest();
        request.open('GET', url);
        request.onload = function() {            
            if(request.status === 200) {                
                resolve(request.responseText);
            } else {
                reject(Error(request.statusText));
            }
        }
        request.onerror = function() {            
            reject(Error('Network Error'));
        }
        request.send();
    });
}

get('https://nerboda.github.io1')  //https://darms.service-now.com/nav_to.do?uri=%2Fhome.do
    .then(function(response: any) {
       console.log('response', response);
    }).then((response: any) => console.log('second', response)).catch((error: any) => console.log('error', error))
    .finally((result: any) => console.log('finally', result));