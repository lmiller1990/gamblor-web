[ ! -e file ] || rm latest.dump &&
heroku pg:backups:capture --app $1 &&
heroku pg:backups:download --app $1 &&
pg_restore --verbose --clean --no-acl --no-owner -h localhost -d web_development latest.dump

