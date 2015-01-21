angular.module('driodCommand')
.controller('bluetoothController', ['$scope', '$location', '$http', '$timeout', function ($scope, $location, $http, $timeout) {

    $scope.deviceList = [];
    $scope.feedback = "";

    try{
        if (typeof bluetoothSerial != 'undefined')
        {
            $scope.deviceList.push({ address: '123456789', name: 'Searching...' });            
            bluetoothSerial.list(function (devices) {
                $scope.$apply(function () {
                    $scope.deviceList = []; // clear the list and restart
                    devices.forEach(function (device) {
                        $scope.deviceList.push({ address: device.address, name: device.name });
                    })
                });                
            }, function (msg) {
                alert('Failed listing Bluetooth devices. ' + msg);
            });
        } else
        {
            $scope.deviceList.push({ address: '123456789', name: 'Test 1' });
            $scope.deviceList.push({ address: '112233445', name: 'Test 2' });
            $scope.deviceList.push({ address: '667788990', name: 'Test 3' });
        }
    } catch (ex)
    {
        alert(ex.message);
    }

    $scope.connect = function (address) {
        if (typeof bluetoothSerial != 'undefined') {
            bluetoothSerial.connect(address,
                function () {
                    alert('Successfully Connected to device ' + address);
                    $timeout(function () {
                        bluetoothSerial.write("hello from device!",
                            function ()
                            {
                                $scope.$apply(function () { $location.path('/'); });                                
                            },
                            function (msg)
                            {
                                $scope.$apply(function () { $scope.feedback = "message failed"; });
                            });
                    }, 100);
                },
            function (msg) {
                alert('Bluetooth connection failed. ' + msg);
            });
        } else
        {
            alert('Fake connect...');
        }
    };


    
}]);