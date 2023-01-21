![Repo state](https://img.shields.io/badge/State-Migration-f50730?style=plastic)
[![GitHub build status](https://img.shields.io/github/actions/workflow/status/jeremy-serenne/twitch-chat-manager/codeql.yml?label=Build&style=plastic)](https://github.com/jeremy-serenne/twitch-chat-manager/actions?query=branch:main)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=plastic)](https://opensource.org/licenses)

<h1 align="center">✨ Twitch Chat Manager ✨</h1>

*TwitchChatManager* is a command line interface that allows users to interact with the chat of a Twitch channel.

> It is designed to:
> - enhance the viewing experience for yourself
> - sending pre-made messages with one command, retrieving the chat history, and more.
> - and automate certain tasks such as responding to certain keywords or phrases in the chat.
> **INFO** It is not intended to be used to artificially inflate view count or engagement on a Twitch channel and should be used in compliance with Twitch's terms of service and community guidelines.

## Disclaimer

Please review and comply with [Twitch's terms of service](https://www.twitch.tv/p/en/legal/terms-of-service/#12-third-party-content) and [community guidelines](https://safety.twitch.tv/s/article/Community-Guidelines) before using this project. The developer and contributors of this project take no responsibility for any violations of Twitch's terms of service as a result of using this project.

> :warning: MIGRATION (coming in the end of 02/2023) :warning:
> - create db instead of using the one from Replit,
> - use docker,
> - add web interface,
> - host on a free (or not) server, or only provide a local app.

## Tech

Made with [Node](https://nodejs.org/en/), [Express](https://expressjs.com/), [**Replit**](https://replit.com/@jeremy-serenne/viewer-twitch-bot) and [**Uptimerobot**](https://uptimerobot.com/)

## Installation

<div style="background-color: #f50730 ; padding:10px;">
  :warning: **If you are not using Replit** : you can't execute the program! The project is currently using the database from Replit. :warning:
</div>

1. Clone the repository
2. Install dependencies by running `npm install`
3. Create a `.env` file in the root of the project and configure the environment variables ([model](model.env))
4. Run the app with `npm start`

## Usage 

:warning: This is a deprecated :warning:

To write a command in the console, follow this format `!cmd:nb`
- cmd -> command's name registered in the var env [`LIST_OF_CMDS_LINE`](model.env)
- nb -> number of occurrences

> **INFO** This project is currently in beta and I welcome any feedback or bug reports.

## Next Steps
- [ ] clean code, split it in new files
- [ ] add comments and types
- [ ] add daily messages' feature
- [ ] replace console with web interface
- [ ] add custom trigger in chat (ie: word)

## Contributing

- Fork the repository
- Create your feature branch
- Commit your changes
- Push to the branch
- Create a new Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
