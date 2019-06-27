import XMLHttpRequest from "xmlhttprequest";
function CustomPromise(action) {
    this.status = "pending";
    this.value = undefined;
    this.thenCallbacks = [];
    this.onFinally = undefined;
    this.onCatch = undefined;
 
    this.then  = function(callback) {
        this.thenCallbacks.push(callback);
        return this;
    }

    this.catch = function(callback) {
        this.onCatch = callback;
        return this;
    }

    this.finally = function(callback) {
        this.onFinally = callback;
        return this;
    }

    action(resolver.bind(this), rejector.bind(this));

    function resolver(value) {
        this.state = 'resolved';
        this.value = value;
        this.thenCallbacks.forEach((func) => {
            func(this.value);
        }, this);
        if(typeof this.onFinally === 'function') {
            this.onFinally(this.value);
        }
    }

    function rejector(value) {
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


function get(url) {
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

get('https://nerboda.github.ioq')  //https://darms.service-now.com/nav_to.do?uri=%2Fhome.do
    .then(function(response) {
       // console.log('response', response);
    }).catch(error => console.log('error', error))
    .finally(result => console.log('finally'));