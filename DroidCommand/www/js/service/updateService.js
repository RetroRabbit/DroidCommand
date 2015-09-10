angular.module('driodCommand')
.service('updateService', function ($location, $rootScope, $http,$q) {

    return ({
        getUpdatedData: getUpdatedData
    });

    function getUpdatedData() {

        $http({
            url: "http://54.77.11.98/Blockly/webservice/DroidBehaviourService.asmx/UpdateDroidBehaviour",
            method: "POST",
            data: {}
        }).success(function (data, status, headers, config) {
            $scope.newupdateData = data;
        }).error(function (data, status, headers, config) {
            return null;
        });

    }

});