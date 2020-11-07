apiClient = require("./appClient")();

// All requests should run at the same time and produce only one request to the backend. All requests should return or reject.
function runTest() {

    const batchUrl = "/file-batch-api";

    // Should return [{id:"fileid1"},{id:"fileid2"}] 
    apiClient.get(batchUrl, {params: {ids: ["fileid1","fileid2"]}}).then(function (response) {
        console.log('1: ', response.data);
    }).catch(function (error) {
        // handle error
        console.log('error ========> ', error);
    });
    // Should return [{id:"fileid2"}] 
    apiClient.get(batchUrl, {params: {ids: ["fileid2"]}}).then(function (response) {
        console.log('2: ', response.data);
    });
    // Should reject as the fileid3 is missing from the response
    apiClient.get(batchUrl, {params: {ids: ["fileid3"]}}).then(function (response) {
        console.log('3: ', response.data);
    }); 

}

runTest();