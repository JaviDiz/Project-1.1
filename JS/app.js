// Information about players. Array with example data 
let players = [
	["43127678F", "Juan", "Pérez Gómez", "692403829", "jperez@gmail.com", "12/12/1980", "ES6621000418401234567891", "PRO"],
	["43125043G", "Adolfo", "Gutiérrez Lorma", "692403829", "agutierrez@gmail.com", "12/12/1985", "ES6000491500051234567892", "PRO"],
	["43125430I", "Carles", "Vich Sacelo", "692403829", "cvich@gmail.com", "12/12/1981", "ES9420805801101234567891", "PRO"],
	["43124345J", "Gustavo", "Cander More", "692403829", "gmore@gmail.com", "12/12/1995", "ES9000246912501234567891", "PRO"],
	["43127678F", "Alicia", "Pérez Gómez", "692403829", "jperez@gmail.com", "12/12/1980", "ES6621000418401234567891", "BEG"],
	["43125043G", "David", "Gutiérrez Lorma", "692403829", "agutierrez@gmail.com", "12/12/1985", "ES6000491500051234567892", "BEG"],
	["43125430I", "Patricia", "Vich Lorem", "692403829", "cvich@gmail.com", "12/12/1981", "ES9420805801101234567891", "BEG"],
	["43124345J", "Pepa", "Vivancos Leia", "692403829", "pleia@gmail.com", "12/12/1995", "ES9000246912501234567891", "BEG"]
];

// Containers and global objects 
const containerPlayersBeg = document.getElementById('c_beginner_list');
const containerPlayersPro = document.getElementById('c_professional_list');
const buttonAdd = document.getElementById('btn-enviar');

init();

//TODO
// Main function. 
function init() {
	populateListPlayers();
	buttonAdd.addEventListener("click", (e)=>{
		e.preventDefault();
		addPlayer();
	});
}

//TODO
// This function adds a new player on the list
/******************************************************************************/
function addPlayer() {
	if (validateForm()){
		const formPlayer = document.getElementById("frmPlayer");
		const [dni , name, surname, date, phone, email, account, category] = formPlayer.elements;

		let newPlayer = [dni.value, name.value, surname.value, date.value, phone.value, email.value, account.value, category.value];
		players.push(newPlayer);

		document.getElementById("frmPlayer").reset();
		populateListPlayers();

		alert("Nuevo jugador añadido");
	}
}

//TODO
// Checks data from the form fields
function validateForm(){

	const formPlayer = document.getElementById("frmPlayer");
	const [dni , name, surname, date, phone, email, account, category] = formPlayer.elements;
	let txtCat = category.options[category.selectedIndex].value;

	if (!validateDNI(dni.value) || dni.value == "" ) {
		alert("DNI erróneo");
		return false;
	}
	if (name.value == "" ) {
		alert("Nombre erróneo");
		return false;
	}if (surname.value == "" ) {
		alert("Apellido erróneo");
		return false;
	}
	if (!validateDate(date.value) || date.value == "" ) {
		alert("Fecha errónea");
		return false;
	}
	if (!validatePhone(phone.value) || phone.value == "" ) {
		alert("Teléfono erróneo");
		return false;
	}
	if (!validateEmail(email.value) || email.value == "" ) {
		alert("Email erróneo");
		return false;
	}
	if (account.value == "" ) {
		alert("Cuenta errónea");
		return false;
	}
	if (!isValidAgePlayer(date.value, 18) && txtCat === "PRO" ) {
		alert("Mínimo 18");
		return false;
	} else if (!isValidAgePlayer(date.value, 16) && txtCat === "BEG") {
		alert("Mínimo 16");
		return false;
	}
	return true;
}

//TODO
// Create two separate lists depens on category. it uses two different containers
function populateListPlayers() {
	containerPlayersBeg.innerHTML = "";
	containerPlayersPro.innerHTML = "";

	for (let i = 0; i < players.length; i++) {
		var cat = players[i][7];
		var info = document.createElement("p");
		info.className = "playerData";

		var infoNom = document.createElement("span");
		var infoEmail = document.createElement("span");
		var infoCat = document.createElement("span");
		infoNom.classList.add('player-col');
		infoEmail.classList.add('player-col');
		infoCat.classList.add('player-col');

		var nodeNom = document.createTextNode(players[i][1] + " " + players[i][2]);
		var nodeEmail = document.createTextNode(players[i][4]);
		var nodeCat = document.createTextNode(players[i][7]);
		infoNom.appendChild(nodeNom);
		infoEmail.appendChild(nodeEmail);
		infoCat.appendChild(nodeCat);

		info.appendChild(infoNom);
		info.appendChild(infoEmail);
		info.appendChild(infoCat);

		let container = (cat == "BEG" ? containerPlayersBeg : containerPlayersPro);
		container.appendChild(info);

		
	}
}

//TODO
// This function returns true whether the player is 16 years old (for beginners) or 18 years old (for professionals)
function isValidAgePlayer(sDate, minAge) {

	let aDate = sDate.split("/");
	let bornDate = new Date(aDate[2], aDate[1] -1, aDate[0]);
	let currentDate = new Date();
	let age = diffAnys(currentDate, bornDate);

	return (age >= minAge);
}


