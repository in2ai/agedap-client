import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TagModule } from 'primeng/tag';
import { ButtonComponent } from 'src/app/components/ui/button/button.component';
import { getGPUTier } from 'detect-gpu';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styles: [':host { width: 100%; }'],
  imports: [TranslateModule, Toast, TagModule, CommonModule, ButtonComponent, FormsModule],
  providers: [MessageService],
})
export class ConfigComponent implements OnInit {
  public electronTest?: boolean;
  public modelLoaded?: boolean | null;
  public modelName?: string;
  public isSelectingModel?: boolean;
  public config: string = `{
    "batchSize": 128,
    "contextSize": 4096,
    "gpuLayers": 1,
    "maxTokens": 2048,
    "temperature": 0.7,
    "threads": 4,
    "topK": 40,
    "topP": 0.4
}`;
  public appConfig: any = null;
  public gpuTier: number = 0;
  public togetherApiKey: string = '';
  public minTier: number = 3;

  constructor(private messageService: MessageService) {}

  async ngOnInit() {
    try {
      const response = await (window as any).electronAPI.runNodeCode({
        func: 'state',
      });

      const gpuTier = await getGPUTier();
      this.gpuTier = gpuTier.tier || 0;
      if (this.gpuTier < this.minTier) {
        console.warn(`Low GPU Tier: ${this.gpuTier}`);
        this.messageService.add({
          severity: 'warn',
          summary: 'Memoria de GPU baja',
          detail: `Te recomendamos usar un modelo en remoto, tu equipo puede no tener suficiente memoria de GPU para ejecutar modelo en local.`,
          life: 10000,
        });
      }

      this.electronTest = true;
      if (response && response.modelPath) {
        this.modelLoaded = true;
        this.modelName = response.modelPath;
        if (this.modelName) {
          this.modelName = this.modelName.split('\\').pop() || '';
          this.modelName = this.modelName.split('/').pop() || '';
        }
      }

      this.appConfig = await (window as any).electronAPI.runNodeCode({ func: 'getConfig' });
      this.appConfig = this.appConfig.config;
      if (!this.appConfig || !this.appConfig.secretKey) {
        await (window as any).electronAPI.runNodeCode({ func: 'genSecretKey' });
        this.appConfig = await (window as any).electronAPI.runNodeCode({ func: 'getConfig' });
      }
      console.log('Config loaded:', this.appConfig);
    } catch (error) {
      console.log(error);
      this.electronTest = false;
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

  async selectModel() {
    this.isSelectingModel = true;
    try {
      const response = await (window as any).electronAPI.runNodeCode({
        func: 'selectModel',
        config: this.config,
      });
      this.modelName = response.modelName;
      this.modelLoaded = true;
    } catch (error) {
      console.log(error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error al cargar el modelo',
        detail: 'No se pudo cargar el modelo. Asegúrate de que el modelo existe y es compatible.',
        life: 5000,
      });
      this.modelLoaded = false;
    } finally {
      this.isSelectingModel = false;
    }
  }

  async loadRemoteModel() {
    try {
      const response = await (window as any).electronAPI.runNodeCode({
        func: 'selectModel',
        config: JSON.stringify({
          togetherAI: true,
          togetherApiKey: this.togetherApiKey,
        }),
      });
      this.modelName = response.modelName;
      this.modelLoaded = true;
    } catch (error) {
      console.log(error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error al cargar el modelo remoto',
        detail: 'No se pudo cargar el modelo remoto. Asegúrate de que la clave API es correcta.',
        life: 5000,
      });
      this.modelLoaded = false;
    }
  }

  resetModel() {
    this.modelLoaded = false;
    this.modelName = undefined;
    this.isSelectingModel = false;
    this.togetherApiKey = '';
  }
}
