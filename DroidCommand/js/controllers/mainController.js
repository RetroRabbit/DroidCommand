angular.module('driodCommand')
.controller('MainController', ['$scope', '$location', '$http', '$state', 'bluetoothService', function ($scope, $location, $http, $state, bluetoothService) {

    $scope.navigate = function (destination) {
        if (destination == 'pair') {
            $state.go('odyssey.bluetoothSelection');
        }
        else
        {
            alert(destination);
        }
    }


    }]);