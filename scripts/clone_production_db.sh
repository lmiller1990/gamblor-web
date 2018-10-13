rm latest.dump &&
heroku pg:backups:capture &&
heroku pg:backups:download &&
pg_restore --verbose --clean --no-acl --no-owner -h localhost -d web_development latest.dump

