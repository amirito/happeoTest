
let reqqueue = [];
module.exports = batchInterceptor = (instance) => { instance.interceptors.request.use( async request => {
        // Add your code here

        return new Promise(resolve => {
            reqqueue.push({ request: request, resolver: resolve });
            console.log("reqqueue", reqqueue)
        });
        
    }, 

    error => Promise.reject(error));
}

