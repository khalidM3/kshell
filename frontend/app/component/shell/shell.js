'use strict';

require('./_shell.scss');

module.exports = {
  template: require('./shell.html'),
  controller: ['$log', '$location', '$stateParams', 'profileService', 'folderService', 'fileService', ShellController],
  controllerAs: 'shellCtrl',
};

function ShellController($log, $location, $stateParams, profileService, folderService, fileService) {
  $log.debug('ShellController');

  this.input = null;
  this.collumsArr = [];
  this.showVim = $stateParams.status === 'vim';
  this.commands = {};


  let cmds = 

  this.$onInit = () => {
    let greeting = 'WELCOME TO KHALID-SHELL';
    this.collumsArr.push(greeting);
    profileService.fetchProfile()
    .then( root => {
      console.log('root', root);
      this.curr = root;
      this.root = root;
    });
  };
  
  this.commands.mkdir =  (input) => {
    // let first = input.trim();
    input = input.trim().split('/');
    let name = input.pop();
    let path = this.curr.path//+'/'+input.join('/');

    console.log('currpath', this.curr.path);

    console.log('path', path);
    console.log('name', name);
    let pathData = { path: path, name: name}; 
    folderService.createFolder(pathData)
    .then( folder => console.log('folder =======>', folder));
  };

  this.commands.touch = (input) => {
    input = input.trim().split('/');
    let name = input.pop();
    let path = this.curr.path//+'/'+input.join('/');

    let newfile = {name: name, path:path};

    console.log('new file', newfile);
    fileService.createFile(newfile)
    .then( file => {
      console.log('file', file);
    });
  };

  this.commands.cd = (input) => {
    if(!input) return this.curr = this.root;
    console.log('input ===> ', input);
    let path = this.curr.path+'/'+input.trim();

    let pathData = { path: path};
    folderService.fetchFolderPath(pathData)
    .then( folder =>  {
      this.curr = folder;
      console.log('this.curr ', folder);
    });
  };



  this.commands.ls = () => {
    console.log('curr    ', this.curr);
    let dirs = [];
    folderService.fetchFolder(this.curr._id)
    .then( folder => {
      console.log('flders =>', folder);
      folder.folders.forEach( ( folder, index) => {
        dirs.push(folder.name);
        if(index === folder.folders.length-1) return folder;
      });
      return folder;
    })
    .then( folder => {
      folder.files.forEach( (file, index) => {
        dirs.push(file.name);
        if(index === folder.folders.length-1) return;
      });
      dirs = dirs.join(' ');
      this.collumsArr.push(dirs);
      console.log('ls ', dirs);
      // console.log('clms', this.collumsArr);
      return;
    });
    console.log('ls ', dirs);
    return;
  };

  this.commands.clear = () => {
    return this.collumsArr = [];
  };
  
  this.commands.rmd = (input) => {
    // let sec = input.split(' ')[0]
    // input = input.split(sec)
    // console.log('path',);
    let path = this.curr.path+'/'+input.trim();
    console.log('path is going to be', path);
    let pathData = {path: path};
    folderService.fetchFolderPath(pathData)
    .then( folder => {
      console.log('fetched folder', folder);
      folderService.deleteFolder(folder._id)
      .then( () => console.log('successfully deleted folder'));
    });
    
  };

  this.commands.rmf = (input) => {
    // let sec = input.split(' ')[0]
    // input = input.split(sec)
    // console.log('path',);
    let path = this.curr.path+'/'+input.trim();
    console.log('path is going to be', path);
    let pathData = {path: path};
    fileService.fetchFilePath(pathData)
    .then( folder => {
      console.log('fetched folder', folder);
      // fileService.deleteFile(folder._id)
      // .then( () => console.log('successfully deleted folder'));
    });
    
  };

  this.commands.vim = (input) => {
    if(!input) return this.curr = this.root;
    let path = this.curr.path+'/'+input.trim();
    console.log('path is going to be', path);
    let pathData = {path: path};
    fileService.fetchFilePath(pathData)
    .then( file => {
      console.log('fetched folder', file);
      this.vimFile = file;
      // this.showVim = true;
      $location.url('/home/vim');
    });
  };


  this.commands.help = () => {
    let cmds = ['mkdir : makes a directory',
                'touch : makes a file\n',
                'cd    : changes to a directory\n',
                'ls    : view the current directory\n',
                'rmd  : removes a directory\n',
                'rmf  : removes a file\n',
                'vim  : opens a file in vim\n',
                'clear : clears the screen'];
    cmds.forEach(cmd => this.collumsArr.push(cmd));
    // this.collumsArr.push(cmds);;
  };
    

  

  this.shellCmd = () => {
    console.log('arr      ', this.collumsArr);
    console.log('input', this.input);
    let col = '$'+this.curr.name+ ' ' + this.input;
    this.collumsArr.push(col);
    let cmd = this.input.trim().split(' ')[0];
    let input = this.input.trim().split(' ')[1];
    this.input = null;
    if(this.commands[cmd])return this.commands[cmd](input);
    return console.error('command ', cmd, input, 'is not a valid input');
  };



}

