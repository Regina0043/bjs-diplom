'use strict';
const userForm = new UserForm();

userForm.loginFormCallback = data => {
	const xhr = new XMLHttpRequest();

	xhr.onreadystatechange = ApiConnector.login(data, (response) => {
		if(response.success === false){
			console.log(response.error);
			return userForm.setLoginErrorMessage(response.error);
		}

		document.location.reload();
	});
	xhr.open('GET', 'package.json', true);
	xhr.send();
}

userForm.registerFormCallback = data => {
	const xhr = new XMLHttpRequest();

	xhr.onreadystatechange = ApiConnector.register(data, (response) => {
		if(response.success === false){
			console.log(response.error);
			return userForm.setRegisterErrorMessage(response.error);
		}

		document.location.reload();
	});
	xhr.open('GET', 'package.json', true);
	xhr.send();
}
