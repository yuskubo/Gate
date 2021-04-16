<img src="https://raw.githubusercontent.com/wiki/zetton-31/Gate/images/readme-top.png" alt="application-icon" width="200" height="100">

Gate is an application for opening a folder on Finder.
By using this application 'Gate', you can open the path of Windows with Mac.You don't have to care about difference between path delimiters of Mac and Windows.
![description gif](https://raw.githubusercontent.com/wiki/zetton-31/Gate/images/description.gif)

## Description
You can open not only the path of local folder but also the path of the folder on Google Drive and NAS mounted under '/Volumes'.
Therefore, Gate is particularly effective for sharing a path on the team that Mac users and Windows users belong on.

How To Use:
When you input a path and click the "Open" button or press "Enter", Finder of Mac opens.
In addition, when you type the file name that you would like to open, the file is selected on Finder in opening the folder.

This application enables to open the following examples.

For Example:
When accessing a folder on your PC, it is necessary to start writing the path from "/" or "¥" or "\\".
```
/users/hoge/demo/demo.rtf
¥users¥hoge¥demo¥demo.rtf
\users\hoge\demo\demo.rtf
```

You can access folders on the network by starting to write the path with "//" or "¥¥" or "\\\\" or "A to Z alphabet:".
However, when opening folders on the network, you need to mount the target folder under '/Volumes' in advance.
```
//G:/teamdrive/share
¥¥G:¥teamdrive¥share
\\G:\teamdrive\share
\\G:\teamdrive\share\demo.rtf
G:\teamdrive\share

//tera/team/share
¥¥tera¥team¥share
\\tera\team\share
\\tera\team\share\demo.rtf
```

## Contributing
Any contributions to Gate are welcome!!If you have comments, ideas, suggestions, please open an issue.
If you would like to fix the Gate to incorporate your ideas or suggestions into the program, please create the GitHub pull request as follows:

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature origin/main`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request to main branch

## Environments
* npm:  6.1.0
* node: 10.5.0
* electron: 2.0.8

## Development
Running the following commands, at the top of the project directory, will start Gate.
```
$ npm start
```

## Build
Running the following commands, at the top of the project directory, will be created the package directory Gate-darwin-x64.
"Gate.app" exists in this directory.
```
$ npm install electron-packager --save-dev
$ npx electron-packager src Gate --platform=darwin --arch=x64 --overwrite --icon=resources/icon/Gate.icns --out=releases/package
```

## License
[MIT License](https://github.com/zetton-31/Gate/blob/main/LICENSE)
