# Developing Locally

This page outlines how to launch the Django backend on your local machine.

## Set Up Environment

```bash
# Set up virtual environment
cd backend
python -m venv .venv
source .venv/bin/activate

# Install dependencies
python -m pip install -r requirements.txt

# Set up environment variables
cp .example.development.env .development.env

# Set up database
python manage.py migrate
python manage.py createsuperuser --no-input
python manage.py collectstatic --no-input

## Run the Development Server
python manage.py runserver
```

Login at http://127.0.0.1:8000/backside to use the Django admin interface.

## Managing Packages

```bash
# Freeze dependencies
uv pip compile requirements.in > requirements.txt

# Upgrade dependencies
uv pip compile --upgrade requirements.in > requirements.txt

# Sync your local dependencies with the requirements.txt file
uv pip sync requirements.txt
```

## Deployment

GitHub Actions is configured to run a `deploy.yml` workflow.

This will update `apt` packages and `git pull` the code to the server.

### Database Backups

The `johndusel.com` user is running cronjobs for backing up the database.

To view them:

```shell
sudo crontab -u johndusel.com -l
```

One command uses the sqlite3 `.backup` command to backup the production database to the `/var/opt/johndusel.com/db-backups` directory.

A second command syncs this folder with the `johndusel.com/db-backups/` S3 bucket.

There is currently a cronjob which deletes all but the newest 30 files from this folder once per week.
