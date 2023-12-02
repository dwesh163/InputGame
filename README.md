# InputGame

A small website for input games

## Usage

- Run the container:

```bash
docker-compose up --build --no-recreate -d
```

- Launch the dev server:

```bash
docker exec -it vite_docker sh -c "npm i && npm run dev"
```

- Build the app:

```bash
docker exec -it vite_docker sh -c "rm -rf dist && npm run build"
```

- Test the builded app:

```bash
docker run --rm -t -v $PWD/dist:/var/www/localhost/htdocs/InputGameReact -p 80:80 sebp/lighttpd
firefox http://localhost/InputGameReact/
```

- Enter the container:

```bash
docker exec -it vite_docker sh
```

- Execute a command in the container:

```bash
docker exec -it vite_docker sh -c "npm i && npm run dev"
```
