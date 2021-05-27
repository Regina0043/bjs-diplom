const logoutButton = new LogoutButton();
logoutButton.action = (data) =>{
	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = ApiConnector.logout(response => {
		if(response.success === true){
			document.location.reload();
		}
	});

	xhr.open('GET', 'package.json', true);

	xhr.send();
}

const xhr = new XMLHttpRequest();
xhr.onreadystatechange = ApiConnector.current(response => {
	if (response.success === true) {
		ProfileWidget.showProfile(response.data);
	}
});

xhr.open('GET', 'package.json', true);

xhr.send();

const ratesBoard = new RatesBoard();
function getExchangeRates(){
	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = ApiConnector.getStocks(response => {
		if(response.success === true){
			ratesBoard.clearTable();
			ratesBoard.fillTable(response.data);
		}
	});

	xhr.open('GET', 'package.json', true);

	xhr.send();
}

getExchangeRates();

setInterval(getExchangeRates(), 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) =>{
	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = ApiConnector.addMoney(data, (response) =>{
		if(response.success === true){
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(response.success,'Баланс успешно пополнен');
		}

		moneyManager.setMessage(response.success,response.error);
	});

	xhr.open('GET', 'package.json', true);
	xhr.send();
}

moneyManager.conversionMoneyCallback = (data) =>{
	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = ApiConnector.convertMoney(data, (response) => {
		if(response.success === true){
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(response.success, 'Валюта успешно конвертировна');

		}

		moneyManager.setMessage(response.success, response.error);
	});

	xhr.open('GET', 'package.json', true);
	xhr.send();
}

moneyManager.sendMoneyCallback = (data) =>{
	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = ApiConnector.transferMoney(data, (response) =>{
	if(response.success === true){
			ProfileWidget.showProfile(response.data);
			moneyManager.setMessage(response.success, 'Перевод успешно завершён');

		}

		moneyManager.setMessage(response.success, response.error);
	});

	xhr.open('GET', 'package.json', true);
	xhr.send();
}

const favoritesWidget = new FavoritesWidget();

const xhr2 = new XMLHttpRequest();

xhr2.onreadystatechange = ApiConnector.getFavorites(response => {
	if(response.success === true){
		favoritesWidget.clearTable();
		favoritesWidget.fillTable(response.data);
		moneyManager.updateUsersList(response.data);
	}
});

xhr2.open('GET', 'package.json', true);
xhr2.send();

favoritesWidget.addUserCallback = (data) =>{
	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = ApiConnector.addUserToFavorites(data, response =>{
		if(response.success === true){
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			moneyManager.setMessage(response.success, 'Пользователь успешно добавлен');
		}

		moneyManager.setMessage(response.success, response.error);
	});
}


favoritesWidget.removeUserCallback = (data) => {
	const xhr = new XMLHttpRequest();
	xhr.onreadystatechange = ApiConnector.removeUserFromFavorites(data, response =>{
		if(response.success === true){
			favoritesWidget.clearTable();
			favoritesWidget.fillTable(response.data);
			moneyManager.updateUsersList(response.data);
			moneyManager.setMessage(response.success, 'Пользователь успешно удалён');
		}

		moneyManager.setMessage(response.success, response.error);
	});

}