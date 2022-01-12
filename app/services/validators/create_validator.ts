import { Validator } from "./validator";

export class CreateValidator extends Validator {
    protected validatePassword(data: any): boolean {
        // KMjS.?976.mrt_?X
        if(data.contrasenia.length<8) return false;
        var pattern = new RegExp(/^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,16}$/);
        return pattern.test(data.contrasenia);
    }
}