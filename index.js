// Command start: npm start, key is already configured as per the requirements.
const child_process = require("child_process");
const yargs = require("yargs");

const access = {
	key: 123,
};

const argv = yargs
	.command(
		"access",
		"Command to access the server.",
		{
			key: {
				describe: "Password",
				demand: true,
				alias: "k",
			},
		},
		(args) => {
			args.key == access.key
				? child_process.exec("node access.js", console.log("The key you entered is correct, you are in. The server is up and listening at http://localhost:3000."), (err, stdout) => {
						err ? console.log(err) : console.log(`stdout: ${stdout}`);
				  })
				: console.log("Incorrect key, try again.");
		}
	)
	.help().argv;
