DOCKER_COMPOSE = docker-compose \
	--file docker-compose.yml \
	--file docker-compose.local.yml

detach:
	${DOCKER_COMPOSE} up --build --detach $(services)

up:
	${DOCKER_COMPOSE} up --build $(services)
