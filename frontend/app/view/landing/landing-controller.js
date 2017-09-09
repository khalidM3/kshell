'use strict';

require('./_landing.scss');


module.exports = ['$log', '$rootScope', '$stateParams', '$location', '$uibModal', 'profileService', 'fileService','folderService', LandingController];

function LandingController($log, $rootScope, $stateParams, $location, $uibModal, profileService, fileService, folderService) {
  $log.debug('LandingController');

  
}