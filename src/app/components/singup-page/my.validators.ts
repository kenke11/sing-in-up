import {FormControl, FormGroup} from '@angular/forms';

export class MyValidators {
  static existingEmails(control: FormControl): {[key: string]: boolean} {
    if (['a@gmail.com', 't@gmail.com'].includes(control.value)){
      return {
        existingEmails: true
      };
    }
    return null;
  }
}

// tslint:disable-next-line:typedef
export function ConfirmedValidator(controlName: string, matchingControlName: string){
  return (form: FormGroup) => {
    const control = form.controls[controlName];
    const matchingControl = form.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
