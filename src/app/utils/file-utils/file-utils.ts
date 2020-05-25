export class FileUtils {
  // Transforms a file array into a sendable array of objects:
  // [{name: string, content: string}]
  public static prepareFiles(files: File[]) {
    return Promise.all(files.map(this.fileToPreparedObject));
  }

  private static fileToPreparedObject(file: File) {
    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.onload = (event) => {
        resolve({ name: file.name, content: event.target.result });
      };
      reader.readAsText(file);
    });
  }
}
