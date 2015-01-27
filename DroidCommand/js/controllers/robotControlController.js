angular.module('driodCommand')
.controller('RobotControlController', ['$scope', '$location', '$http', function ($scope, $location, $http) {

    $scope.viewName = "robotControl";
    $scope.getViewName = function () {
        return $scope.viewName;
    }

}]);