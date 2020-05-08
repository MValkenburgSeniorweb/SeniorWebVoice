'use strict';

// Importeer de Dialogflow Module uit de Actions On Google Client Library.
const {dialogflow, Suggestions} = require('actions-on-google');

// Importeer de firebase-functions package voor deployment.
const functions = require('firebase-functions');

// Maak een instantie van de Dialogflow client.
const app = dialogflow({debug: true});

// Intent 'Welcome Intent'
app.intent('Welcome Intent', (conv) => {
	conv.ask('Welkom bij de Seniorweb Test Quiz, zeg Quiz om te starten');
});

// Intent: 'Quiz Start'
app.intent('Quiz Start', (conv) => {
	const testvraag = 'Is de lucht blauw?';
	conv.ask(testvraag);
	conv.ask(new Suggestions('Ja', 'Nee'));
});
//kijk even hoe het zit met context,
//zodat niet elke ja en nee direct refereerd naar de goed en fout intents

// Intent: 'Fout Antwoord'
app.intent('Fout Antwoord', (conv) => {
	conv.ask('Dit is incorrect');
});

//Intent: 'Goed Antwoord'
app.intent('Goed Antwoord', (conv) => {
	conv.ask('Dit is correct');
});

//Intent: 'Close Intent'
app.intent('Close Intent', (conv) => {
conv.close("Dankjewel voor het meedoen aan de TestQuiz");
});


// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);