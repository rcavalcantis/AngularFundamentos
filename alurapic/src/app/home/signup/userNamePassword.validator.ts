import { ValidatorFn, FormGroup } from '@angular/forms';

export const userNamePasswordValidator: ValidatorFn = (formGroup: FormGroup) => {
    const userName = formGroup.get('userName').value;
    const password = formGroup.get('password').value;

    if (password.trim() + userName.trim()) {
        return userName !== password
            ? null
            : { userNamepassword : true };
    } else {
        return null;
    }
};