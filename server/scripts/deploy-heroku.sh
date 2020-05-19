npm run build

heroku container:login

heroku container:push web -a $1

heroku container:release web -a $1
