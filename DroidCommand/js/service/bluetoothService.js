angular.module('driodCommand')
.service('bluetoothService', function ($location, $rootScope) {

    function sendMessage(message) {
        if (typeof bluetoothSerial != 'undefined')
            bluetoothSerial.write(message, function () { }, function () { });
        else
            alert(message);
    }
}]);