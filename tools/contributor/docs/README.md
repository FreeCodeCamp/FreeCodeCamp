## Local Setup

- Follow the steps below to get this running on your local machine

### 1. Copy .env

- Copy the `sample.env` file into `.env`. The command below will do that in the terminal if your CWD(current working directory) is the `contribute` folder.

```bash
cp sample.env .env
```

- If you do not want to populate the database with the freeCodeCamp PR's you can [skip to step 5](#5-start-the-app-in-developemnt-mode)

### 2. Update .env

- Use your GitHub username as the `GITHUB_USERNAME` variable of the `.env` file
- Use your GitHub Personal Access Token as the `GITHUB_ACCESS_TOKEN` variable of the `.env` file

### 3. Run mongoDB

- Make sure a mongoDB instance is running by running the command below in the terminal.

```bash
mongod —dbpath=./database_folder
```

### 4. Update the Database

- Run the command below to populate your local database with PR’s from the freeCodeCamp repo. Note that you must have mongoDB running.

```bash
node dashboard-app/server/tools/update-db.js
```

- This will take a while. If it stops running partway through, it's probably a timeout error. Run the command again and it should finish

### 5. Start the app in development mode

- In a new terminal window or tab, run these three commands to start the program. Wait for one command to finish running before starting the next.

```bash
npm ci
npm run develop
```

### 6. Start the app in production mode

- In a new terminal window or tab, run these three commands to start the program. Wait for one command to finish running before starting the next.

```bash
npm ci
npm run build
npm start
```

## Caveats & Notes

### Local Ports when developing locally

Using `npm run develop` will start both the api server and the Create React App(Dashboard) in development mode. The app server runs on port 3001 and the React app runs on port 3000.

### The one-off scripts will error out on actions performed by repository admins

For example, if an admin removes a label from a Pull Request, the script can not add that label back. This is usually because the script is acting on behalf of a non-admin user with write access.
This is usually the case with the use of access tokens for scripts.

### Setting up Cron jobs for Sweeper Scripts

For updating dashboard data we use PM2 like so:

```bash
pm2 start --no-autorestart dashboard-app/server/tools/update-db.js --cron "*/10 * * * *"
```

This will start the script in the "no restart" mode and re-run it every 10 minutes.
A useful link to calculate a Cron expression: <https://crontab.guru/every-10-minutes>

### Starting the express server (via probot)

```bash
pm2 start "npm start" --name "contribute-app"
```

**Note:** Start only one instance of this app, you can't have multiple probot apps running. Starting multiple instances will crash the app.
