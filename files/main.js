'use strict';

const firstNameField = document.getElementById("formFirstName");
const lastNameField = document.getElementById("formLastName");
const fullNameField = document.getElementById("formFullName");
const withdrwalAmountField = document.getElementById("withdrwalAmount");
const paymentWithdrawalContent = document.getElementById("paymentWithdrawalContent");
const paymentWithdrawal = document.getElementById("paymentWithdrawal");
const EligibleForTaxRefund = document.getElementById("EligibleForTaxRefund");
const NotEligibleForTaxRefound = document.getElementById("NotEligibleForTaxRefound");
const message = document.getElementById("message");
const automatedMonthlyContent = document.getElementById("automatedMonthlyContent");
const CorrespondingToLoanFiled = document.getElementById("CorrespondingToLoan");
const nameError = document.getElementById("formFullNameError");
const nextFormContent = document.getElementById("nextFormContent");
const formTypeField = document.getElementsByName("formType");
const withdrawalTypeField = document.getElementsByName("withdrawalType");
const mainForm = document.querySelector("form");
const nameRegex = /^[a-zA-Z]{2,}[a-zA-Z ]*$/;
const errors = new Set(['formType', 'formEmail', 'formSSN', 'fundName', 'fundNumber', 'accountNumber']);


[firstNameField, lastNameField, fullNameField].forEach(nameChange => nameChange.addEventListener("change", function () {
    if (this.id === 'formFirstName' || this.id === 'formLastName') {
        fullNameField.value = `${firstNameField.value} ${lastNameField.value}`;
    } else {
        let splitedName = fullNameField.value.split(' ');
        firstNameField.value = splitedName[0];
        lastNameField.value = splitedName.slice(1).join(' ');
    }
    [firstNameField, lastNameField].forEach(item => {
        if (!nameRegex.test(item.value)) {
            item.classList.add('error');
            nameError.classList.remove('hide');
            errors.add(item.id);
        } else {
            item.classList.remove('error');
            nameError.classList.add('hide');
            errors.delete(item.id);
        }
    });
}));

[{name: 'formEmail', regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/},
    {name: 'formSSN', regex: /^[0-9]{3}-[0-9]{2}-[0-9]{4}$/},
    {name: 'fundName', regex: /^[A-Za-z0-9 ]{1,}$/},
    {name: 'fundNumber', regex: /^[0-9]{1,}$/},
    {name: 'accountNumber', regex: /^[0-9]{1,}$/},
].forEach(({name, regex}) => {
    let field = document.getElementById(name);
    let error = document.getElementById(name + "Error");
    field.addEventListener("input", function () {
        if (!regex.test(field.value)) {
            errors.add(name);
            field.classList.add('error');
            error.classList.remove('hide');
        } else {
            errors.delete(name);
            field.classList.remove('error');
            error.classList.add('hide');
        }
    });
});

paymentWithdrawal.addEventListener("change", function () {
    if (this.checked) {
        paymentWithdrawalContent.classList.remove('hide');
        EligibleForTaxRefund.checked = false;
        NotEligibleForTaxRefound.checked = false;
    } else {
        paymentWithdrawalContent.classList.add('hide');
    }
});

for (const radioButton of withdrawalTypeField) {
    radioButton.addEventListener("change", function () {
        withdrwalAmountField.classList.add('hide');
        automatedMonthlyContent.classList.add('hide');
        paymentWithdrawalContent.classList.add('hide');
        withdrwalAmountField.value = '';
        paymentWithdrawal.checked = false;
        EligibleForTaxRefund.checked = false;
        NotEligibleForTaxRefound.checked = false;
        CorrespondingToLoanFiled.checked = false;
        if (this.value === 'withdrawalType2') {
            withdrwalAmountField.classList.remove('hide');
        } else if (this.value === 'withdrawalType3') {
            automatedMonthlyContent.classList.remove('hide');
        }
    });
}

for (const radioButton of formTypeField) {
    radioButton.addEventListener("change", function () {
        if (this.value) {
            nextFormContent.classList.remove('hide');
            errors.delete('formType');
            document.getElementById('formTypeError').classList.add('hide');
        }
    });
}


const onClear = () => {
    withdrwalAmountField.classList.add('hide');
    withdrwalAmountField.classList.remove('show');
    paymentWithdrawalContent.classList.add('hide');
    automatedMonthlyContent.classList.add('hide');
    nextFormContent.classList.add('hide');
}

mainForm.addEventListener("submit", function (event) {
    event.preventDefault();
    if (!errors.size) {
        message.classList.remove('hide');
        mainForm.classList.add('hide');
    } else {
        alert("Error: please fix the form. ");

        [...errors].forEach((item) => {
            let field = document.getElementById(item);
            let errorMessage = document.getElementById(item + 'Error');
            console.log(field, errorMessage);
            field?.classList.add('error');
            errorMessage?.classList.remove('hide');
        });
    }
});
