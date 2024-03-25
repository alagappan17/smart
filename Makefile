
### COMMANDS ###
.PHONY: serve-all
serve-all:
	@echo "Serving all projects via nx"
	npx nx run-many --projects=backend,smart --targets serve,serve

.PHONY: serve-backend
serve-backend:
	@echo "Serving backend via nx"
	npx nx run backend:serve

.PHONY: serve-smart
serve-smart:
	@echo "Serving smart via nx"
	npx nx run smart:serve

.PHONY: test-smart
test-smart:
	@echo "Running smart tests"
	npx nx e2e smart-e2e


.PHONY: test-backend
test-backend:
	@echo "Running backend tests"
	npx nx e2e backend-e2e
