// at least one uppercase letter, one lowercase letter, one numeric digit, and one special character.
export const reg_email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const reg_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,20}$/
export const validate_password = reg_password;

export function validate_email(mail){
    return reg_email.test(mail);
}

export function validate_pin(pin){
    return reg_password.test(pin);
}