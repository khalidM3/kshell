'use strict';

require('./_navbar.scss');

module.exports = {
  template: require('./navbar.html'),
  controller: ['$log', '$window', '$location', '$rootScope', 'authService', NavbarController],
  controllerAs: 'navbarCtrl'
};

function NavbarController($log, $window, $location, $rootScope, authService) {
  $log.debug('NavbarController');

  this.goSignUp = function() {
    $log.debug('NavbarController.goSignUp()');

    $location.url('/join');
  };

  this.goLogin = function() {
    $log.debug('NavbarController.goLogin()');

    $location.url('/signin');
  };

  this.myRecipes = function() {
    $log.debug('NavbarController.myRecipes()');

    let userID = $window.localStorage.getItem('userID');
    $location.url(`/myrecipes/${userID}`);
  };

  this.goHome = function() {
    $log.debug('NavbarController.goHome()');

    $location.url('/');
  };

  this.home = function() {
    $log.debug('NavbarController.home()');

    let userID = $window.localStorage.getItem('userID');
    $location.url(`/home/${userID}`);
  }

  this.logout = () => {
    $log.debug('NavbarController.logout()');

    authService.logout()
    .then( () => {
      $location.url('/');
    });
  };

  this.checkPath = () => {
    $log.debug('NavbarController.checkPath()');

    let pathArray = $location.path().split('/');
    let path = `/${pathArray[1]}`;
    if (pathArray.length === 1) path = '/';

    if (path === '/' || path === '/landing') {
      this.hideLoginBtn = false;
      this.hideSignupBtn = false;
      this.hideLogout = true;
      this.hideMyRecipesBtn = true;
      this.hideHomeBtn = true;
    }

    if (path === `/home`) {
      this.hideLoginBtn = true;
      this.hideSignupBtn = true;
      this.hideLogout = false;
      this.hideMyRecipesBtn = false;
      this.hideHomeBtn = true;
    }


    if (path === '/join') {
      this.hideSignupBtn = false;
      this.hideLoginBtn = false;
      this.hideLogout = true;
      this.hideMyRecipesBtn = true;
      this.hideHomeBtn = true;
    }

    if (path === '/signin') {
      this.hideLoginBtn = false;
      this.hideSignupBtn = false;
      this.hideLogout = true;
      this.hideMyRecipesBtn = true;
      this.hideHomeBtn = true;
    }
  };

  this.checkPath();

  $rootScope.$on('$locationChangeSuccess', () => this.checkPath());
}