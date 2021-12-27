```
 _ _ ___ _ _ ___  _          _
| | |_  ) | |_  )| |_ ___ __| |_
|_  _/ /|_  _/ / |  _/ -_) _| ' \
  |_/___| |_/___(_)__\___\__|_||_|

███████╗██╗  ██╗██████╗ ██████╗ ███████╗███████╗███████╗
██╔════╝╚██╗██╔╝██╔══██╗██╔══██╗██╔════╝██╔════╝██╔════╝
█████╗   ╚███╔╝ ██████╔╝██████╔╝█████╗  ███████╗███████╗
██╔══╝   ██╔██╗ ██╔═══╝ ██╔══██╗██╔══╝  ╚════██║╚════██║
███████╗██╔╝ ██╗██║     ██║  ██║███████╗███████║███████║
╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝
```

**4242.tech** is a simple command-line markdown wiki to access command line cheatsheets, to simplify your life at 42 School.
To use it, you just have to:
```
curl 4242.tech/help
```
## How does it works?
It simply uses an express server to serve ansi text files.
Use `curl -X GET "4242.tech/help?json=true"` to get the output in JSON.

## Dependencies
* dotenv: `^10.0.0`,
* express: `^4.17.2`,
* express-useragent: `^1.0.15`,
* fs: `^0.0.1-security`,
* image-to-ascii: `^3.0.13`,
* pug: `^3.0.2`,
* superagent: `^6.1.0`

**This project require graphicsmagick:**

MacOS
```
brew install graphicsmagick
```
Debian/Ubuntu
```
sudo apt install graphicsmagick
```

## Authors
👤 [Conobi](https://kiyo.ooo/)

👤 [X3ne](https://narcisserael.xyz)

## Contributing
**Feel free to contribute and add your own markdown sheets!**

## Show your support
Give a ⭐️ and tell the person next to you if the project helped you!

## License
Copyright © 2021 [Conobi](https://kiyo.ooo/).
This project is GPL-3.0-or-later licensed.
