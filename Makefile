LINT_PATH=./app/src/*.jsx ./app/src/**/*.jsx ./*.js ./service/*.jsx ./helpers/*.jsx
lint:
	@./node_modules/.bin/eslint $(LINT_PATH)

lint-fix:
	@./node_modules/.bin/eslint $(LINT_PATH) --fix

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--recursive \
		--harmony \
		--compilers js:babel-register

deploy:
	@NODE_ENV=production DB_ENV=production \
		./node_modules/.bin/webpack \
		--config webpack-production.config.js \
		--progress \
		--colors

build:
	@NODE_ENV=production DB_ENV=development \
		./node_modules/.bin/webpack \
			--config webpack-production.config.js \
			--progress \
			--colors

dev-webserver:
	@NODE_ENV=development DB_ENV=development \
		./node_modules/.bin/pm2 start \
		--node-args "--harmony" webserver.js

dev-apiserver:
	@NODE_ENV=development DB_ENV=development NODE_TLS_REJECT_UNAUTHORIZED=0 \
		./node_modules/.bin/pm2 start \
		--node-args "--harmony" apiserver.js

sit-webserver:
	@PORT=80 NODE_ENV=production DB_ENV=staging \
		./node_modules/.bin/pm2 start \
		--node-args "--harmony" webserver.js

sit-apiserver:
	@NODE_ENV=production DB_ENV=staging \
		./node_modules/.bin/pm2 start \
		--node-args "--harmony" apiserver.js

prod-webserver:
	@PORT=80 NODE_ENV=production DB_ENV=production \
		./node_modules/.bin/pm2 start \
		--node-args "--harmony" webserver.js

prod-apiserver:
	@NODE_ENV=production DB_ENV=production \
		./node_modules/.bin/pm2 start \
		--node-args "--harmony" apiserver.js

dev: dev-webserver dev-apiserver

sit: sit-webserver sit-apiserver

prod: prod-webserver prod-apiserver

ps-reload-web:
	./node_modules/.bin/pm2 reload webserver

ps-reload-api:
	./node_modules/.bin/pm2 reload apiserver

ps-reload:
	./node_modules/.bin/pm2 reload all

ps-clean:
	./node_modules/.bin/pm2 delete all

ps-monit:
	./node_modules/.bin/pm2 monit

css-build:
	@compass clean
	@compass compile

css-watch:
	@compass watch


.PHONY: lint lint-fix test
