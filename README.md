```
 _ _ ___ _ _ ___  _          _    
| | |_  ) | |_  )| |_ ___ __| |_  
|_  _/ /|_  _/ / |  _/ -_) _| ' \ 
  |_/___| |_/___(_)__\___\__|_||_|
```

**4242.tech** is a simple command-line markdown wiki to access command line cheatsheets, to simplify your life at 42 School.
To use it, you just have to:
```
curl 4242.tech/help
```

## How does it works?
It simply uses a Makefile to build static ansi text files, using the [cli-markdown](https://www.npmjs.com/package/cli-markdown) NPM module.
The Nginx configuration then redirects the user depending on the user agent he uses.

## Authors
👤 [Conobi](https://kiyo.ooo/)

## Contributing
**Feel free to contribute and add your own markdown sheets!**

## Show your support
Give a ⭐️ and tell the person next to you if the project helped you!

## License
Copyright © 2021 [Conobi](https://kiyo.ooo/).
This project is GPL-3.0-or-later licensed.