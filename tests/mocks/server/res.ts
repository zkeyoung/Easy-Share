class ResponseMock {
  private downloadSets = new Set<{ path: string, name: string, callback: (err?: Error) => {} }>();
  public headersSent: boolean;
  public sendStatus = jest.fn();
  public download = jest.fn((path, name, callback) => {
    this.downloadSets.add({path, name, callback});
  });
  public json = jest.fn();
  public run(error?: Error) {
    this.downloadSets.forEach(({ callback }) => {
      callback(error);
    });
  }
}

const response = new ResponseMock();

export {
  response
}