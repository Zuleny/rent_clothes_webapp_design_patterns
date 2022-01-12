import { Validator } from "./validator";

export class UpdateValidator extends Validator {
    protected validatePassword(data: any): boolean {
        if(data.contrasenia.length<8) return false;
        if(data.contrasenia == data.lastContrasenia) return false;
        var pattern = new RegExp(/^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,16}$/);
        return pattern.test(data.contrasenia);
    }
}