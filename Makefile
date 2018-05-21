TESTS ?= test/*.js
LINT_PATH=./app/src/*.jsx ./app/src/**/*.jsx ./*.js ./service/*.jsx ./helpers/*.jsx ./test/*.js ./test/**/*.js
REPORTER = spec

lint:
	@./node_modules/.bin/eslint $(LINT_PATH)

lint-fix:
	@./node_modules/.bin/eslint $(LINT_PATH) --fix

test-local:
	@NODE_ENV=development DB_ENV=development APIPORT=8888 NODE_TLS_REJECT_UNAUTHORIZED=0 \
		./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--timeout 5000 \
		--harmony \
		--require babel-register \
		--exit \
		$(TESTS)

test:
	@NODE_ENV=staging DB_ENV=staging APIPORT=8888 \
		./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		--timeout 5000 \
		--harmony \
		--require babel-register \
		--exit \
		$(TESTS)

deploy:
	@NODE_ENV=production DB_ENV=production \
		./node_modules/.bin/webpack \
		--config webpack-production.config.js \
		--progress \
		--colors

build:
	@NODE_ENV=staging DB_ENV=staging \
		./node_modules/.bin/webpack \
			--config webpack-production.config.js \
			--progress \
			--colors

dev:
	@NODE_ENV=development DB_ENV=development \
		./node_modules/.bin/pm2 start \
		--node-args "--harmony" webserver.js

sit:
	@PORT=80 NODE_ENV=production DB_ENV=staging \
		./node_modules/.bin/pm2 start \
		--node-args "--harmony" webserver.js

prod:
	@PORT=80 NODE_ENV=production DB_ENV=production \
		./node_modules/.bin/pm2 start \
		--node-args "--harmony" webserver.js

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


.PHONY: lint lint-fix test test-local
