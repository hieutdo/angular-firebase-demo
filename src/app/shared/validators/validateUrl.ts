import { FormControl } from '@angular/forms';

export function validateUrl(ctrl: FormControl) {
  const url = ctrl.value;
  const valid = /^(ftp|http|https):\/\/[^ "]+$/.test(url);
  return valid
    ? null
    : {
        validUrl: {
          valid: false,
        },
      };
}
