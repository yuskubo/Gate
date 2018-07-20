<!-- <h1 align="center"><img src="https://raw.githubusercontent.com/wiki/zetton-31/Gate/images/icon.png" alt="application-icon" width="64" height="64">Gate</h1> -->
<img src="https://raw.githubusercontent.com/wiki/zetton-31/Gate/images/readme-top.png" alt="application-icon" width="200" height="100">

Gate is an application for opening a path without concern for the difference between Mac and Windows.
![description gif](https://raw.githubusercontent.com/wiki/zetton-31/Gate/images/description.gif)

## Description
By using this application 'Gate', you can open the directory path of windows PC with mac PC.  
When you type a directory path and click the open button, the Finder of Mac opens.  
If you type the full pathname of the file that you would like to open, you can open the file.  
The Gate enables to open the following examples.  
For Example:  
```
G:¥teamdrive¥development¥test
G:\teamdrive\development\test
G:\teamdrive\development\test\specification.xlsx
¥¥tera¥team¥development¥test
\\tera\team\development\test
\\tera\team\development\test\specification.xlsx
```

## Contributing
Any contributions to Gate are welcome!!If you have comments, ideas, suggestions, please open an issue.  
If you would like to fix the Gate to incorporate your ideas or suggestions into the program, please create the GitHub pull request as follows:  

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature origin/master`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request to master branch

## Environments
* npm:  6.1.0
* node: 10.5.0
* electron: 2.0.5

## Development
Running the following commands, at the top of the project directory, will start Gate.
```
$ npm run start
```

## Build
Running the following commands, at the top of the project directory, will be created the package directory Gate-darwin-x64.
"Gate.app" exists in this directory.
```
$ npm install electron-packager --save-dev
$ npx electron-packager src Gate --platform=darwin --arch=x64 --overwrite
```

## License
[MIT License](https://github.com/zetton-31/Gate/blob/master/LICENSE)
