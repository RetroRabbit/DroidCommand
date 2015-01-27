angular.module('driodCommand')
.controller('NavigatorController', ['$scope', '$location', '$http', '$state', function ($scope, $location, $http, $state) {

    //navigates to the correct view
    $scope.navigate = function (destination) {
        if (destination == "odyssey") {
            $state.go('odyssey');
        }
        else if (destination == "robotControl") {
            $state.go('robotControl');
        }
        else if (destination == "games") {
            $state.go('games');
        }
        else if (destination == "central") {
            $state.go('central');
        }
        else if (destination == "droidWars") {
            $state.go('droidWars');
        }
    }

    //shows the selected view in the nave bar
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
    $scope.isNotActive = function (viewLocation) {
        return !(viewLocation === $location.path());
    };

}]);