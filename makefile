.PHONY: build

env:
	@echo node version `node --version`
	@echo npm version `npm --version`
	@git --version

clear_build:
	rm -fr dist

start:
	node node_modules/webpack-dev-server/bin/webpack-dev-server --host=0.0.0.0 --content-base=dist --hot --inline --watch --history-api-fallback

build: clear_build
	NODE_ENV=production CORE_SERVICE_API_URL=core.effectivemeasure.com node node_modules/webpack/bin/webpack --progress

