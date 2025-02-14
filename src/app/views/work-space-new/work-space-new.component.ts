import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { FieldComponent } from 'src/app/components/smart/field/field.component';
import { ButtonComponent } from 'src/app/components/ui/button/button.component';

@Component({
  selector: 'app-work-space-new',
  templateUrl: './work-space-new.component.html',
  styles: [':host { width: 100%; }'],
  imports: [FieldComponent, ButtonComponent, TranslateModule],
})
export class WorkSpaceNewComponent implements OnInit {
  router = inject(Router);

  public WorkSpaceForm!: FormGroup;

  constructor() {}

  ngOnInit() {
    this.WorkSpaceForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
    });
  }

  getWorkSpaceControl(name: string) {
    return this.WorkSpaceForm.get(name) as FormControl;
  }

  saveWorkSpace() {
    // TODO: API create new workspace and when id retreived navigate to /workspace/:id
    console.log('SAVE NEW WORKSPACE');
    this.router.navigate(['/workspace/1']);
  }
}
