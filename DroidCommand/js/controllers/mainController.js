angular.module('driodCommand')
.controller('MainController', ['$scope', '$location', '$http', function ($scope, $location, $http) {    

    $scope.navigate = function (destination) {
        alert(destination);
    }

    }]);