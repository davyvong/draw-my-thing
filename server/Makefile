DOCKER_COMPOSE = docker-compose \
	--file docker-compose.yml \
	--file docker-compose.local.yml

prod:
	${DOCKER_COMPOSE} pull
	${DOCKER_COMPOSE} up --detach --no-build
