GAS = 2000000;

function getContractSource(){

    return "CONTRACT_SOURCE_CODE"     
}

function getContractQuestions(){
	return [
		"Êtes-vous satisfait(e) de l’ambiance de travail au sein de l’agence ?",
		"Êtes-vous satisfait(e) des informations qui vous sont transmises, concernant la situation et les perspectives de l’agence et du groupe ?",
		"Êtes-vous satisfait(e) de votre mission actuelle ?"
	];
}

function getContractProposals(){
	return [
		"satisfait",
		"neutre",
		"déçu"
	];
}