import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'node_modules/ag-grid-community/dist/types/src/rendering/cellRenderers/iCellRenderer';

@Component({
  selector: 'app-onlinechat-delete-renderer',
  templateUrl: './onlinechat-delete-renderer.component.html',
  styles: [':host { width: 100%; height: 100%; }'],
  imports: [CommonModule],
})
export class OnlineChatDeleteRendererComponent implements ICellRendererAngularComp {
  value = signal('');
  parsedValue = signal('');

  icon: string = '';

  agInit(params: ICellRendererParams): void {
    this.refresh(params);
  }

  refresh(params: ICellRendererParams): boolean {
    this.value.set(params.value);
    return true;
  }
}
