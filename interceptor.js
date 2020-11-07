var axios = require("axios");
const params = [];

module.exports = batchInterceptor = (instance) => { 
    instance.interceptors.request.use( request => {
        const defParam = request.params;
        // Add your code here
        
        request.url = request.host + request.url;
        new Promise(resolve => {
            params.push(request.params.ids)
            resolve(params)
        });

        console.log("defParam", defParam.ids);

        console.log("params[0]", params[0])

        setTimeout(function() {
            if (defParam.ids === params[0]) {
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
       }, 1000)
        
        throw new axios.Cancel('Operation canceled by the user.')

    }, error => Promise.reject(error));
}

