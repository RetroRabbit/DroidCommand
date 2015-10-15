angular.module('driodCommand')
.controller('motionController', ['$scope', '$location', '$http', function ($scope, $location, $http) {


    //$scope.isMotionControlEnabled = false;
    //$scope.toggleMotionControl = function (event) {

    //    $scope.isMotionControlEnabled = !$scope.isMotionControlEnabled;
    //    if ($scope.isMotionControlEnabled) {
    //        $scope.MotionMovementInterval = $interval($scope.getAccelerometerInfo, 100);
    //    }
    //    else
    //    {
    //        $scope.DestroyMotionMovementInterval();
    //    }
    //}


    //$scope.getAccelerometerInfo = function()
    //{
        
    //}

    //$scope.MotionMovementInterval = null;

    //$scope.DestroyMotionMovementInterval = function()
    //{
    //    $scope.isMotionControlEnabled = false;
    //    $interval.cancel($scope.MotionMovementInterval);
    //    $scope.MotionMovementInterval = null;
    //}

    ////destroy intervals and timeouts
    //$scope.$on('$stateChangeStart',
    //function (event, toState, toParams, fromState, fromParams) {
    //    $scope.DestroyMotionMovementInterval();
    //}

}]);