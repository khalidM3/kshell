'use strict';

require('./_signup.scss');

module.exports = ['$log', '$window', '$location', 'authService', 'profileService', 'folderService', SignupController];

function SignupController($log, $window, $location, authService, profileService, folderService) {
  $log.debug('SignupController');

  this.say = function(){
    console.log('WRONG INPUTS!');
  };

  this.signup = function(user) {
    $log.debug('signupCtrl.signup');

    authService.signup(user)
    .then(res => {
      let profile = {};
      profile.name = res.config.data.username;
      console.log('PROFILE', profile);
      profileService.createProfile(profile)
      .then( () => {
        let newfolder = {name: '$examplename'};
        folderService.createRootFolder(newfolder)
        .then( () => {
          $location.url('/home/shell' );
        });
      });
    });
  };
}
