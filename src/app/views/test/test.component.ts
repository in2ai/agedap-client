import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: [],
})
export class TestComponent implements OnInit {
  public form!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      model: [
        'C:\\Users\\adri2\\Desktop\\Meta-Llama-3.1-8B-Instruct-Q4_K_M.gguf',
      ],
    });

    (window as any).electronAPI.onNodeCodeResponse(
      (event: any, response: any) => {
        switch (response.func) {
          case 'test':
            alert(response.message);
            break;
          case 'load-llama':
            console.log(response);
            alert('llama loaded: ' + response.llama.loaded);
            break;
          case 'load-model':
            console.log(response);
            alert('llama model loaded: ' + response.model.loaded);
            break;
          default:
            break;
        }
      }
    );
  }

  execNode(func: string = 'test') {
    (window as any).electronAPI.runNodeCode({ func: func });
  }

  loadModel() {
    (window as any).electronAPI.runNodeCode({
      func: 'load-model',
      path: this.form.value.model,
    });
  }
}
