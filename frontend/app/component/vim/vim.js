'use strict';

require('./_vim.scss');

module.exports = {
  template: require('./vim.html'),
  controller: ['$log', '$window', '$location', 'profileService', 'folderService', 'fileService', VimController],
  controllerAs: 'vimCtrl',
  bindings: {
    file: '<'
  }
};

function VimController($log, $window, $location, profileService, folderService, fileService) {
  $log.debug('vimController');

  this.$onChanges = (changes) => {
    this.input = null;
    console.log('changes', changes);
    console.log('vim file', this.file);

    // console.log('show vim ', this.showVim);
  };

  this.vimCmd = () => {
    console.log('this input', this.input);
    let cmd = this.input.trim().split(' ')[0];
    if(cmd === ':wq') return this.save(); 
    if(cmd === ':q') return $location.url('/home/shell');

    console.error('command not found');
  };

  this.save = () => {
    fileService.saveFile(this.file)
    .then( file => {
      console.log('saved file ', file);
      $location.url('/home');
    });
  };



}