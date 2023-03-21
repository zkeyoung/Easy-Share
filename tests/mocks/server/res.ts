class ResponseMock {
  public sendStatus = jest.fn();
  public download = jest.fn();
}

const response = new ResponseMock();

export {
  response
}