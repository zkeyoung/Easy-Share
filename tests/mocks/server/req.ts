class RequestMock {
  #params = {};
  public params = jest.fn(() => this.#params);
}

const request = new RequestMock();

export {
  request,
}