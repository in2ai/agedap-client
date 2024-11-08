import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: [],
})
export class ConfigComponent implements OnInit {
  public electronTest?: boolean;
  public llamaLoaded?: boolean;
  public modelLoaded?: boolean | null;
  public modelPath?: string;
  public modelName?: string;
  constructor() {}

  async ngOnInit() {
    try {
      const response = await (window as any).electronAPI.runNodeCode({
        func: 'llm-state',
      });

      this.electronTest = true;
      if (response.llama.loaded) this.llamaLoaded = true;
      if (response.model.loaded) this.modelLoaded = true;
    } catch (error) {
      this.electronTest = false;
      this.llamaLoaded = false;
      this.modelLoaded = false;
    }
  }

  async testElectron() {
    try {
      await (window as any).electronAPI.runNodeCode({
        func: 'test',
      });
      this.electronTest = true;
    } catch (error) {
      console.log(error);
      this.electronTest = false;
    }
  }

  async loadLlama() {
    try {
      const response = await (window as any).electronAPI.runNodeCode({
        func: 'load-llama',
      });
      this.llamaLoaded = response.llama.loaded;
    } catch (error) {
      console.log(error);
      this.llamaLoaded = false;
    }
  }

  async loadModel() {
    try {
      const response = await (window as any).electronAPI.runNodeCode({
        func: 'select-model',
      });
      this.modelPath = response.path;
      this.modelName = response.path;
      if (this.modelName) {
        this.modelName = this.modelName.split('\\').pop() || '';
        this.modelName = this.modelName.split('/').pop() || '';
      }
      this.modelLoaded = null;

      if (this.modelPath) this.loadModelPath(this.modelPath);
    } catch (error) {
      console.log(error);
      this.modelLoaded = false;
    }
  }

  async loadModelPath(path: string) {
    try {
      const response = await (window as any).electronAPI.runNodeCode({
        func: 'load-model',
        path: path,
      });
      this.modelLoaded = response.model.loaded;
    } catch (error) {
      console.log(error);
      this.modelLoaded = false;
    }
  }
}
