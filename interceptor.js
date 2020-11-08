var axios = require("axios");

const canceled = Symbol("canceled");
let idsQueue = new Set();
let queueResolve;

const getQueuePromise = () =>
  new Promise((resolve) => {
    queueResolve = resolve;
  });
let queuePromise = getQueuePromise();

// add a timeout function to send a unique request to server
setTimeout(async () => {
    if (!idsQueue.size) {
        return;
    }

    const res = await axios.get(
      "https://europe-west1-quickstart-1573558070219.cloudfunctions.net/file-batch-api",
      { params: { ids: [...idsQueue.values()] } }
    );

    queueResolve(res.data);
    queuePromise = getQueuePromise();
}, 100);


module.exports = batchInterceptor = (instance) => { 
  instance.interceptors.request.use(async request => {
    // Add your code here
    request.url = request.host + request.url;

    // check if URLs are similar
    if (request.url.endsWith("/file-batch-api")) {
      // create a queue of IDs
      request.params.ids.forEach(i => {
        idsQueue.add(i);
      });

      // cancel request and send request data to catch
      throw new axios.Cancel({
        symb: canceled,
        request,
        promise: queuePromise
      });
    }

    return request;
  }, error => Promise.reject(error));

  instance.interceptors.response.use(
    async response => response,
    error => {
      if (error.message.symb === canceled) {
        const requestedIds = error.message.request.params.ids;

        // return specific data for each API call
        return error.message.promise.then(data => ({
            items: data.items.filter(i => requestedIds.includes(i.id))
        }));
      }

      return error;
    }
  );
}