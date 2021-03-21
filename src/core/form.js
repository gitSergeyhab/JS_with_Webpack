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

    clearForm() {
        Object.keys(this.controls).forEach(cont => {
            this.form[cont].value = '';
        })
    }

    isValid() {
        let isFormValid = true;
        Object.keys(this.controls).forEach(control => {
            const validators = this.controls[control];

            let isValid = true;
            validators.forEach(val => {
                isValid = val(this.form[control].value) && isValid;
            })
            clearError(this.form[control])
            if(!isValid) {
                setError(this.form[control])
            }
            isFormValid = isFormValid && isValid;
        })
        
        if (!isFormValid) this.invalidFormMessage();
        return isFormValid;
    }

    invalidFormMessage() {
        const btn = this.form.querySelector('button');
        btn.textContent = 'Введены некоректные данные!';
        btn.style.backgroundColor = 'red'
        setTimeout(() => {
            btn.textContent = 'Создать';
            btn.style.backgroundColor = '';
        }, 2000)
    
    }
}

function setError(cont) {
    const errorMessage = '<p class="validation-error">Некоректное значение!</p>';
    cont.classList.add('invalid');
    cont.insertAdjacentHTML('afterend', errorMessage);
}

function clearError(cont) {
    const errorMessages = cont.parentElement.querySelectorAll('.validation-error');
    errorMessages.forEach(em => em.remove());
    cont.classList.remove('invalid');
}

export {Form}