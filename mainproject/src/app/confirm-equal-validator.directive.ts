import { Directive } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appConfirmEqualValidator]'
})
export class ConfirmEqualValidatorDirective {

  constructor() { }

 static MatchPassword(password: string, confirmPassword: string) {
    return (formGroup: FormGroup):ValidationErrors | null =>{
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);
      let error: ValidationErrors | null;

      if(!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if(confirmPasswordControl.errors && !confirmPasswordControl.errors?.['passwordMismatch']){
        return null;
      }
      if(passwordControl.value!==confirmPasswordControl.value) {
        error={passwordMismatch: true};
      } else {
        error=null;
      }
      confirmPasswordControl.setErrors(error);
      return error;
    }
  }

}
