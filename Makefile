.PHONY: build up down start stop restart logs ps login

build:
	docker compose build

up:
	docker compose up -d

down:
	docker compose down

stop:
	docker compose stop

restart: down build up

logs:
	docker compose logs --tail=10 -f

login:
	docker compose exec myexpenses-server /bin/bash

migrate:
	docker compose exec myexpenses-server npm run db migrate:latest

seed:
	docker compose exec myexpenses-server npm run db seed:run
