import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html'
})
export class AboutComponent {
  public subscribeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private readonly toastrService: ToastrService,
  ) {
    this.subscribeForm = this.formBuilder.group({
      email: [undefined, Validators.compose([
        Validators.required,
        Validators.email
      ])]
    })
  }

  public subscribeNewEager(): void {
    this.toastrService.success('subscription successfully completed');
    this.subscribeForm.reset();
  }
}
