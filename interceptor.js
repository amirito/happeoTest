var axios = require("axios");
let reqqueue = [];
const params = [];

module.exports = batchInterceptor = (instance) => { 
    instance.interceptors.request.use( request => {
    // console.log("request", request)
        reqqueue = request;
        // Add your code here
        
        request.url = request.host + request.url;

        new Promise(resolve => {
            reqLength += 1; 
        })
        new Promise(resolve => {
            params.push(request.params.ids)
            reqqueue.params.ids = params;
            console.log("reqqueue", params);
            console.log("reqqueue.length", params.length);
            if (params.length === 3) {
                axios.get(request.url , {params: {ids: params}})
                    .then(function (response) {
                        // handle success
                        console.log('data: ', response.data);
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })
                    .then(function () {
                        // always executed
                    });
            } 

            throw new axios.Cancel('Operation canceled by the user.')
        });

        // return reqqueue;

    }, error => Promise.reject(error));

    // instance.interceptors.response.use(response=>{
    //     console.log("response", response);

    //     return response;
        
    // },
    //     error=>{
    //     // console.log("error: ", error)
    //       const fallbackValue = [
    //         {userId: "Not authorized",id: "aerw15311sq",
    //          title: "Please try     again",completed: false}];
    //        return Promise.reject(fallbackValue);}
    //     );
}

