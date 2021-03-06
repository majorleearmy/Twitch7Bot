// majorlee @ http://github.com/majorleearmy
const myModule = require('./login.js'); // Public define, for github
const tmi = require('tmi.js');
const activeWin = require('active-win');
var player = require('play-sound')(soundopts = {});

var version = "v1.03";
const opts = {
  identity: {
    username: myModule.username(),
    password: myModule.password()
  },
  channels: [
    'majorlee_army'
  ]
};
(async () => { 
	data = await activeWin();
    	console.log(data.title);
})(); //initilize data


// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandName = msg.trim();

console.log(`* RX: ${commandName}`);
switch(commandName){
	case 'discord':
		client.say(target, `discord.gg/D4f6CTT`);
   		console.log(`discord.gg/D4f6CTT`);
		break;
	case 'alert':
		client.say(target, `sound the alarm`);
   		console.log(`sound the alarm`);
		player.player = 'play';
		player.play('../alarm.wav', { timeout: 300 });
		break;
	case 'version':
		client.say(target, `${version}`);
   		console.log(`${version}`);
		break;
	case 'help':
		client.say(target, `Commands (help,what,dice,reboot,test,main,version,alert,discord)`);
		client.say(target, `savvy ${target}?`);
	    break;
	case 'dice':
	    const num = rollDice(commandName);
	    client.say(target, `You rolled a ${num}.`);
	    console.log(`${target}* Executed ${commandName} command`);
		break;
	    break;
	case 'what': 
		(async () => { 
		data = await activeWin();
		client.say(target, data.title);
		})();
	    break;
	case 'test': 
		console.log(`${target} => test`);
	    break;
	case 'main': 
		main();
	    break;
	case 'reboot':
		client.say(target, `we not there yet, you goto do it manual`);
	    break;
	default:
   		console.log(`${target} Unknown command ${commandName}`);
		break;
}}

// main loop for message timmer
setInterval(main,600000);
function main(){
	client.say(opts.channels[0], `hello there, need help? say help.`);
}

// Function called when the "dice" command is issued
function rollDice () {
  const sides = 20;
  return Math.floor(Math.random() * sides) + 1;
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

