# Viewer Bot

Made with [Node](https://nodejs.org/en/), [Express](https://expressjs.com/), [**Replit**](https://replit.com/@jeremy-serenne/viewer-twitch-bot) and [**Uptimerobot**](https://uptimerobot.com/)

## Description

Handling actions as a viewer.

# How to install

- Create a `.env` file in the root of your project and check the .env [model](model.env) to write it.

# How to use

## The console

To write a command in the console, follow this format `!cmd:nb`
- cmd -> command's name registered in the var env [`LIST_OF_CMDS_LINE`](model.env)
- nb -> number of occurrences




# Next versions' steps

- clean code and split it in new files
- add comments and add args type everywhere
- add daily msgs
- replace console with web interface
- add trigger when stats.txt is edited to upload it in google sheet (webhook imo)