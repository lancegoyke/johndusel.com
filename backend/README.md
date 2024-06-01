# Developing Locally

This page outlines how to launch the Django backend on your local machine.

## Set Up Environment

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
```

## Copy `.env`

```bash
cp .example.development.env .development.env
```

You can edit `.development.env` with your preferred superuser credentials.

## Set Up Database

```bash
python manage.py migrate
python manage.py createsuperuser --no-input
python manage.py collectstatic --no-input
```

## Run the Development Server

```bash
python manage.py runserver
```

Login at http://127.0.0.1:8000/backside.

# Making Updates

GitHub Actions is configured to run a `deploy.yml` workflow.

This will update `apt` packages and `git pull` the code to the server.

# Database Backups

The `johndusel.com` user is running cronjobs for backing up the database.

To view them:

```shell
sudo crontab -u johndusel.com -l
```

One command uses the sqlite3 `.backup` command to backup the production database to the `/var/opt/johndusel.com/db-backups` directory.

A second command syncs this folder with the `johndusel.com/db-backups/` S3 bucket.

There is currently a cronjob which deletes all but the newest 30 files from this folder once per week.
