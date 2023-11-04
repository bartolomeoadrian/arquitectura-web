module.exports = {
	apps: [{
		name: "Arquitectura Web",
		namespace: "arquitectura-web",
		script: "./dist/main.js",
		error_file: './logs/err.log',
		out_file: './logs/out.log',
		time: true,
		env: {
			"NODE_ENV": "prod",
		}
	}]
};