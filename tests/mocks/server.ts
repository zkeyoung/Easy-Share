class Server {
  // app
  start = jest.fn(() => Promise.resolve({} || undefined));
}

const server = new Server();


export {
  server,
}