var app = angular.module('myapp', []);
app.controller("myctrl", function ($scope, $http) {
      
      $http.get('http://localhost:1223/try').then(function (response) {
      	   $scope.databased = response.data.datas;
      }
   );
});