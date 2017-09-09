'use strict';

module.exports = ['$q', '$log', '$window', '$http', 'authService', folderService];

function folderService($q, $log, $window, $http, authService){
  $log.debug('folderService');

  let service = {};

  service.createRootFolder = function(folderData){
    $log.debug('service.createfolder');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/rootfolder`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.post(url, folderData, config);
    })
    .then( res => {
      $log.log('created an root directory');
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to create an root directory',err);
      return $q.reject(err);
    });
  };

  service.createFolder = function(folderData){
    $log.debug('service.createfolder');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/folder`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.post(url, folderData, config);
    })
    .then( res => {
      $log.log('created an directory');
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to create an directory',err);
      return $q.reject(err);
    });
  };


  service.fetchFolder = function(folderID){
    $log.debug('service.upvotefolder');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/folder/${folderID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.get(url, config);
    })
    .then( res => {
      $log.log('fetched a folder');
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to fetch a folder',err);
      return $q.reject(err);
    });
  };

  service.fetchFolderPath = function(pathData){
    $log.debug('service.upvotefolder');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/folderpath`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.post(url, pathData, config);
    })
    .then( res => {
      $log.log('fetched a folder');
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to fetch a folder',err);
      return $q.reject(err);
    });
  };

  

  service.deleteFolder = function(folderID){
    $log.debug('service.deleteReply');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/folder/deletefolder/${folderID}`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.delete(url, config);
    })
    .then( res => {
      $log.log('deleted an folder');
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to delete an folder',err);
      return $q.reject(err);
    });
  };


  return service;
}