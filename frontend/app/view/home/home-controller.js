'use strict';

require('./_home.scss');


module.exports = ['$log', '$rootScope', '$stateParams', '$location', '$uibModal', 'profileService', 'fileService','folderService', HomeController];

function HomeController($log, $rootScope, $stateParams, $location, $uibModal, profileService, fileService, folderService) {
  $log.debug('HomeController');

  
}