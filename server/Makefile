DOCKER_COMPOSE = docker-compose \
	--file docker-compose.yml \
	
ifneq ($(env),ci)
DOCKER_COMPOSE := ${DOCKER_COMPOSE} \
	--file docker-compose.local.yml
endif

build:
	${DOCKER_COMPOSE} build

detach:
	${DOCKER_COMPOSE} up --detach

down:
	${DOCKER_COMPOSE} down

prod:
	${DOCKER_COMPOSE} pull
	${DOCKER_COMPOSE} up --detach --no-build

push:
	${DOCKER_COMPOSE} push

up:
	${DOCKER_COMPOSE} up
