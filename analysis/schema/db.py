import os
from peewee import *


def close_db(e=None):
    db = get_connection()

    if db is not None:
        db.close()


_connection = None


def get_connection():
    global _connection
    if not _connection:
        db = PostgresqlDatabase(
                "web_development",
                # os.environ['POSTGRES_DB'],
                # user=os.environ['POSTGRES_USER'],
                # host=os.environ['POSTGRES_HOST'],
                # sslmode='require'
                )
        db.connect()
        _connection = db

    return _connection
