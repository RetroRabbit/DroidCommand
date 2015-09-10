angular.module('driodCommand')
.controller('DifferentialControlRightController', ['$scope', '$location', '$http', '$swipe', function ($scope, $location, $http, $swipe) {

    $scope.onHammer = function (event) {
        console.log("onHammer");
    }


}]);