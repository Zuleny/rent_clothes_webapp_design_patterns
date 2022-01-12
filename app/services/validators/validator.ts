export abstract class Validator{
    /**
     * The template method defines the skeleton of an algorithm.
     */
    public validateData(data: any): boolean {
        let validateEmail: boolean = this.validateEmail(data.email);
        let validatePassword: boolean =  this.validatePassword(data);
        let validateCellphone: boolean = this.validateCellphone(data.telefono);
        console.log("email: "+ validateEmail+" password: "+ validatePassword+"cellphone: "+ validateCellphone)
        return validateEmail && validatePassword && validateCellphone;
    }

    protected validateEmail(email: string): boolean {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        return pattern.test(email);
    }

    protected validateCellphone(cellphone: string): boolean {
        if(cellphone.length < 7) return false;
        var pattern = new RegExp(/^\d{8}$/);
        return pattern.test(cellphone);
    }

    protected abstract validatePassword(password: any): boolean;
}