class Form {
    constructor(form, controls) {
        this.form = form
        this.controls = controls
    }

    value() {
        const value = {};
        Object.keys(this.controls).forEach(control => {
            value[control] = this.form[control].value
        })
        return value;
    }

    isValid() {
        let isFormValid = true;
        Object.keys(this.controls).forEach(control => {
            const validators = this.controls[control];
            // let isValid = true;
            validators.forEach(val => {
                // isValid = val(this.form[control].value) && isValid;
                isFormValid = val(this.form[control].value) && isFormValid;
            })
            // isFormValid = isFormValid && isValid
        })
        return isFormValid

    }
}

export {Form}