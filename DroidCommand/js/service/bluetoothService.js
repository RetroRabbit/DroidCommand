angular.module('driodCommand')
.service('bluetoothService', function ($location, $rootScope) {

    this.deviceList = [];
    this.ConnectedDeviceInfo = null;
    this.feedback = "feedback";

    this.DetectDevices = function()
    {
        //start scanning for devices
        this.feedback = 'started scanning';
        var deviceListTemp = this.deviceList;
        evothings.ble.startScan(
	        function (device) {
	            this.feedback = 'BLE startScan found device named: ' + device.name;
	            deviceListTemp.push(device);

	        },
	        function (errorCode) {
	            this.feedback = 'BLE startScan error: ' + errorCode;
	        }
        );

        setTimeout(this.StopDetectingDevices, 60000);
        
    }

    //this stops scanning for devices
    this.StopDetectingDevices = function () {
        evothings.ble.stopScan();
        this.feedback = 'stopped scanning';
    }

    //connects to the selected bluetooth device
    this.ConnectToDevice = function (device) {

        evothings.ble.connect(
            device.address,
            function (info) {
                
                this.StopDetectingDevices();

                this.feedback = 'BLE connect status for device: ' + info.deviceHandle + ' state: ' + info.state;
            },
            function (errorCode) {
                this.feedback = 'BLE connect error: ' + errorCode;
            }
        );
    }

    //closes connection to the selected bluetooth device
    this.CloseConnectionToDevice = function () {

        if (this.ConnectedDeviceInfo == null) {
            this.feedback = 'No device connected';
        }
        else {
            evothings.ble.close(this.ConnectedDeviceInfo.deviceHandle);
            this.feedback = 'Connection Closed';
        }
    }

    //gets the signal strength - can determine distance
    this.GetRssi = function () {

        evothings.ble.rssi(
            this.ConnectedDeviceInfo.deviceHandle,
            function (rssi) {
                this.feedback = 'BLE rssi: ' + rssi;
            },
            function (errorCode) {
                this.feedback = 'BLE rssi error: ' + errorCode;
            }
        );

    }



    //sends a command to the bluetooth device if connected
    this.sendMessage = function(message) {
        if (typeof bluetoothSerial != 'undefined')
            bluetoothSerial.write(message, function () { }, function () { });
        else
            alert(message);
    }

});