build:
	docker-compose build

up:
	docker-compose up

down:
	docker-compose down

restart: down up

.phony:
    build up down restart