class FileHandle {
  #file;
  

  readFile = jest.fn(() => {
    return Promise.resolve(this.#file);
  });

  close = jest.fn();

  constructor(file) {
    this.#file = file;
  }
}


class FSPromise {

  #disk;

  fileHandle: FileHandle;

  access = jest.fn((path) => {
    if (this.#disk[path]) return Promise.resolve();
    return Promise.reject(getENOENTError(path))
  });
  
  mkdir = jest.fn(path => {
    this.#disk[path] = { type: 'dir' };
    return Promise.resolve();
  });

  open = jest.fn(path => {
    const fileHandle = this.#disk[path];
    if (!fileHandle) return Promise.reject(getENOENTError(path));
    this.fileHandle = fileHandle;
    return Promise.resolve(new FileHandle(this.#disk));
  });

  constructor(disk: {}) {
    this.#disk = disk;
  }

  private 

}

function getENOENTError(path) {
  return {
    name: 'Error',
    message: 'ENOENT: no such file or directory',
    errno: -2,
    code: 'ENOENT',
    syscall: 'access',
    path,
  }
}

export {
  FSPromise,
  FileHandle,
  getENOENTError,
};