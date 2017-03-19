lint:
	@./node_modules/.bin/eslint ./app/src --debug

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--harmony \
		--compilers js:babel-register

deploy: css-build
	@NODE_ENV=production ./node_modules/.bin/webpack -p \
		--config webpack-production.config.js \
		--progress \
		--colors

dev-webserver:
	@NODE_ENV=development node --harmony server.js

dev-apiserver:
	@NODE_ENV=development node --harmony apiserver.js

prod-webserver:
	@NODE_ENV=production node --harmony server.js

prod-apiserver:
	@NODE_ENV=production node --harmony apiserver.js

dev: css-watch dev-webserver dev-apiserver

prod: prod-webserver prod-apiserver

css-build:
	@compass compile

css-watch:
	@compass watch


.PHONY: lint test
