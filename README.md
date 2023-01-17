# Viewer Bot

Made with [Node](https://nodejs.org/en/), [Express](https://expressjs.com/), [**Replit**](https://replit.com/@jeremy-serenne/viewer-twitch-bot) and [**Uptimerobot**](https://uptimerobot.com/)

## Description

Handling actions as a viewer.

# How to install

- Create a `.env` file in the root of your project and check the .env [model](model.env) to write it.

:warning: **If you are not using Replit**: you can't execute the program! The project is currently using the database from Replit.

# How to use

## The console

To write a command in the console, follow this format `!cmd:nb`
- cmd -> command's name registered in the var env [`LIST_OF_CMDS_LINE`](model.env)
- nb -> number of occurrences




# Next versions' steps
:warning: MIGRATION Soon - Use real db instead of Replit, use docker, host on a free (or not) server.

# Backlog
- clean code and split it in new files
- add comments and add args type everywhere
- add daily msgs
- replace console with web interface
- add customer trigger for a chat
