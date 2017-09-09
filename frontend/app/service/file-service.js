'use strict';

module.exports = ['$q', '$log', '$window', '$http', 'authService', fileService];

function fileService($q, $log, $window, $http, authService){
  $log.debug('fileService');

  let service = {};

  service.createRootFile = function(fileData){
    $log.debug('service.createRootFile');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/rootfile`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.post(url, fileData, config);
    })
    .then( res => {
      $log.log('created an root file');
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to create an root file',err);
      return $q.reject(err);
    });
  };

  service.createFile = function(fileData){
    $log.debug('service.createFile');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/file`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.post(url, fileData, config);
    })
    .then( res => {
      $log.log('created an file');
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to create an file',err);
      return $q.reject(err);
    });
  };


  service.fetchFile = function(fileID){
    $log.debug('service.upvotefile');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/file/${fileID}`;
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
      $log.log('fetched a file');
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to fetch a file',err);
      return $q.reject(err);
    });
  };

  service.fetchFilePath = function(fileData){
    $log.debug('service.createFile');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/filepath`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.put(url, fileData, config);
    })
    .then( res => {
      $log.log('fetched an file');
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to fetch an file',err);
      return $q.reject(err);
    });
  };

  service.saveFile = function(fileData){
    $log.debug('service.saveFile');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/savefile`;
      let config = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      };

      return $http.put(url, fileData, config);
    })
    .then( res => {
      $log.log('saved an file');
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to save an file',err);
      return $q.reject(err);
    });
  };

  

  service.deleteFile = function(fileID){
    $log.debug('service.deleteFile');

    return authService.getToken()
    .then( token => {
      let url = `${__API_URL__}/api/file/deletefile/${fileID}`;
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
      $log.log('deleted an file');
      return res.data;
    })
    .catch( err => {
      $log.error('Failed to delete an file',err);
      return $q.reject(err);
    });
  };


  return service;
}