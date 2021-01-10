/* Form Inputs */
const nameInput = document.querySelector('#input-name');
const passwordInput = document.querySelector('#input-password');
const emailInput = document.querySelector('#input-email');
const checkboxAgreement = document.querySelector('#input-checkbox');
const selectAge = document.querySelector('#select-age');
const inputValues = document.querySelectorAll('.data-input');

/* Buttons */
const submitBtn = document.querySelector('#submit-btn');
const resetBtn = document.querySelector('#reset-btn');

const form = document.querySelector('#form-container');

/* Methods */

function init() {
	resetBtn.addEventListener('click', () => form.reset());
	submitBtn.addEventListener('click', (e) => submitValues(e));
}

function submitValues(e) {
	e.preventDefault();
	e.stopPropagation();

	let errors = getErrors();

	clearErrors(errors);

	if (errors.length === 0) {
		form.submit();
	} else {
		displayErrors(errors);
	}
}

function getErrors() {
	let errors = [];

	validateName(nameInput, errors);
	validateEmail(emailInput, errors);
	validatePassword(passwordInput, errors);
	validateLicenseAgreement(checkboxAgreement, errors);
	validateAge(selectAge, errors);

	return errors;
}

function clearErrors(errors) {
	let errorsInput = getIds(errors);
	inputValues.forEach((input) => {
		if (errorsInput.indexOf(input) < 0) {
			input.parentElement.classList.remove('error');
		}
	});
}

function getIds(errors) {
	let ids = [];

	errors.forEach((error) => ids.push(error.elementError));

	return ids;
}
function displayErrors(errors) {
	errors.forEach((error) => {
		let element = error.elementError;
		element.parentElement.setAttribute('data-msg-error', error.msg);
		element.parentElement.classList.add('error');
	});
}

function validateName(nameInput, errors) {
	if (!nameInput.value) setError('Empty name', errors, nameInput);
}

function validateEmail(emailInput, errors) {
	if (!emailInput.value) setError('Invalid email', errors, emailInput);
}

function validatePassword(passwordInput, errors) {
	if (passwordInput.value.length < 10)
		setError('Invalid password', errors, passwordInput);
}

function validateLicenseAgreement(checkboxAgreement, errors) {
	if (!checkboxAgreement.checked)
		setError('Please accept the license agreement', errors, checkboxAgreement);
}

function validateAge(selectAge, errors) {
	if (selectAge.value === '0') setError('Too young', errors, selectAge);
}

function setError(msg, errors, elementError) {
	errors.push({ msg, elementError });
}
window.addEventListener('DOMContentLoaded', init);
