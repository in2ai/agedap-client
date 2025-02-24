import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  async selectFIle(): Promise<string[]> {
    try {
      const response = await (window as any).electronAPI.runNodeCode({
        func: 'selectFile',
        name: 'All Files',
        extensions: ['zip'],
      });
      console.log('response: ', response);
      const { filePaths } = response;
      return filePaths;
    } catch (error) {
      throw new Error(`Error selecting file : ${error}`);
    }
  }

  constructor() {}
}
