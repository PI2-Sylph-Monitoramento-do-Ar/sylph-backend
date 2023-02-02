build:
	docker compose up --build
up:
	docker compose up
down:
	docker compose down
seed: 
	docker compose exec -it api yarn seed