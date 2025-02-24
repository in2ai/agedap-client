import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FileService } from 'src/app/service/file.service';
import { ButtonComponent } from '../../ui/button/button.component';

@Component({
  selector: 'app-file-selector',
  imports: [ReactiveFormsModule, ButtonComponent, CommonModule],
  templateUrl: './file-selector.component.html',
})
export class FileSelectorComponent {
  public fileName?: string = '';
  public filePath?: string;

  @ViewChild('fileInput') fileInputRef?: ElementRef;

  @Input()
  label: string = '';

  @Input()
  placeholder?: string;

  @Input()
  control: FormControl = new FormControl('');

  constructor(private fileService: FileService) {}

  async onClickFileSelector() {
    try {
      const filePaths = await this.fileService.selectFIle();
      this.control.setValue(filePaths);
    } catch (error) {
      console.log(error);
    }
  }
}
