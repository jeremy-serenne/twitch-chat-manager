# Disclaimer

Please review and comply with [Twitch's terms of service](https://www.twitch.tv/p/en/legal/terms-of-service/#12-third-party-content) and [community guidelines](https://safety.twitch.tv/s/article/Community-Guidelines) before using this project. The developer and contributors of this project take no responsibility for any violations of Twitch's terms of service as a result of using this project.

# Twitch Chat Manager

Made with [Node](https://nodejs.org/en/), [Express](https://expressjs.com/), [**Replit**](https://replit.com/@jeremy-serenne/viewer-twitch-bot) and [**Uptimerobot**](https://uptimerobot.com/)

# :warning: MIGRATION (coming in the end of 02/2023) :warning:
- create db instead of using the one from Replit,
- use docker,
- add web interface
- host on a free (or not) server, or only local app.

> :warning: This project is currently in beta and I welcome any feedback or bug reports. :warning:

## Description

This project is a command line interface that allows users to interact with the chat of a Twitch channel.

It is not intended to be used to artificially inflate view count or engagement on a Twitch channel and should be used in compliance with Twitch's terms of service and community guidelines.

It is designed to:
- enhance the viewing experience for yourself
- and automate certain tasks such as responding to certain keywords or phrases in the chat.

## Installation

:warning: **If you are not using Replit**: you can't execute the program! The project is currently using the database from Replit.

1. Clone the repository
2. Install dependencies by running `npm install`
3. Create a `.env` file in the root of the project and configure the environment variables ([model](model.env))
4. Run the app with `npm start`

## Usage

To write a command in the console, follow this format `!cmd:nb`
- cmd -> command's name registered in the var env [`LIST_OF_CMDS_LINE`](model.env)
- nb -> number of occurrences

## Next Steps
- [] clean code, split it in new files
- [] add comments and types
- [] add daily messages' feature
- [ ] replace console with web interface
- [ ] add custom trigger in chat (ie: word)

## Development

Want to contribute? Great!

Dillinger uses Gulp + Webpack for fast developing.
Make a change in your file and instantaneously see your updates!

Open your favorite Terminal and run these commands.

First Tab:

```sh
node app
```

Second Tab:

```sh
gulp watch
```

(optional) Third:

```sh
karma test
```

#### Building for source

For production release:

```sh
gulp build --prod
```

Generating pre-built zip archives for distribution:

```sh
gulp build dist --prod
```

## License

MIT

**Free Software, Hell Yeah!**