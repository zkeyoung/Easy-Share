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

class FileStats {
  #file;
  isDirectory = jest.fn(() => {
    return isDirectory(this.#file);
  });

  constructor(file) {
    this.#file = file;
  }
}


class FSPromise {

  #disk;
  #fileHandle: FileHandle;
  #fileStats: FileStats;

  access = jest.fn((path) => {
    if (this.#disk[path]) return Promise.resolve();
    return Promise.reject(getENOENTError(path))
  });
  
  mkdir = jest.fn(path => {
    this.#disk[path] = createDir();
    return Promise.resolve();
  });

  open = jest.fn(path => {
    const file = this.#disk[path];
    if (!file) return Promise.reject(getENOENTError(path));
    this.#fileHandle = new FileHandle(file);
    return Promise.resolve(this.#fileHandle);
  });

  stat = jest.fn(path => {
    const file = this.#disk[path];
    if (!file) return Promise.reject(getENOENTError(path));
    this.#fileStats = new FileStats(file);
    return Promise.resolve(this.#fileStats);
  });

  constructor(disk: {}) {
    this.#disk = disk;
  }

  getFileStats() {
    return this.#fileStats;
  }

  getFileHandle() {
    return this.#fileHandle;
  }

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

function createDir() {
  return { type: 'dir' }
}

function isDirectory(file: { type: string }) {
  return file.type === 'dir';
}


export {
  FSPromise,
  FileHandle,
  getENOENTError,
  createDir,
};