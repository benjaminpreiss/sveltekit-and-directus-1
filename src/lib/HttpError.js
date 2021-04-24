class HttpError extends Error {
    constructor(response, message) {
      super(message ? message : `${response.status} for ${response.url}`);
      this.name = 'HttpError';
      this.response = response;
    }
}

export default HttpError