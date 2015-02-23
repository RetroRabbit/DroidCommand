angular.module('driodCommand')
.service('bluetoothService', function ($location, $rootScope,$q) {this.ConnectedDeviceInfo

    var deviceList = [];
    var ConnectedDeviceInfo = null;
    var feedback = "feedback";
    var FoundDevices = [];

    this.deviceMethods = {};
    this.deviceMethods.deviceList = this.deviceList;
    this.deviceMethods.ConnectedDeviceInfo = this.ConnectedDeviceInfo;

    var disconnectCounter = 0;

    //temp
    var reconnectingCounter = 0;
    var reconnectWaitingCounter = 0;

    return ({

        getDevicelist: getDevicelist,
        setDevicelist: setDevicelist,
        getConnectedDeviceInfo: getConnectedDeviceInfo,
        setConnectedDeviceInfo: setConnectedDeviceInfo,
        getFeedback: getFeedback,
        setFeedback: setFeedback,
        getFoundDevices: getFoundDevices,
        setFoundDevices:setFoundDevices,

        DetectDevices: DetectDevices,
        sendMessage: sendMessage,
        initialize: initialize,
        enable: enable,
        disable: disable,
        startScan: startScan,
        stopScan: stopScan,
        connect: connect,
        isScanning: isScanning,
        reconnect: reconnect,
        disconnect: disconnect,
        close: close,
        write: write,
        reconnect: reconnect

    });

    function DetectDevices()
    {
        initialize(startScan, initializeError);   
    }

    function sendMessage(message) {

        //write(address, serviceUuid, characteristicUuid, value)
        /*
        if (ConnectedDeviceInfo != null) {

            reconnectingCounter = 0;

            reconnect(ConnectedDeviceInfo.address, function (obj) {

                console.log("Reconnect Success : " + JSON.stringify(obj));
                //connection success
                if (obj.status == "connected") {
                    if (reconnectingCounter == 0) {
                        reconnectingCounter++;
                        writeToAllCharacteristics(message);
                    }
                }
                else if (obj.status == "connecting") {
                    reconnectWaitingCounter = 0;
                    waitForReconnection(message);
                }

            }, reconnectError);
        }
        */
        if (ConnectedDeviceInfo != null) {

            //try to send message without reconnecting the whole time

            bluetoothle.isConnected(function (obj) {
                //if connected call write
                if (obj.isConnected) {
                    write(ConnectedDeviceInfo.address, message.serviceUuid, message.characteristicUuid, bluetoothle.bytesToEncodedString(bluetoothle.stringToBytes(message.message)));
                }
                else {

                    reconnectingCounter = 0;

                    reconnect(ConnectedDeviceInfo.address, function (obj) {

                        console.log("Reconnect Success : " + JSON.stringify(obj));
                        //connection success
                        if (obj.status == "connected") {
                            if (reconnectingCounter == 0) {
                                reconnectingCounter++;
                                writeToAllCharacteristics(message);
                            }
                        }
                        else if (obj.status == "connecting") {
                            reconnectWaitingCounter = 0;
                            waitForReconnection(message);
                        }

                    }, reconnectError);
                }
            }, { address: ConnectedDeviceInfo.address });
        }
    }

    function waitForReconnection(message)
    {
        reconnectWaitingCounter++;
        if (reconnectWaitingCounter > 5) {
            return;
        }

        setTimeout(function () {

            var paramsObj = { address: ConnectedDeviceInfo.address };
            //check if connected now
            bluetoothle.isConnected(function (obj) {
                //if connected call write
                if (obj.isConnected) {
                    writeToAllCharacteristics(message);
                }
                else {
                    
                    waitForReconnection(message);
                }
            }, paramsObj);

        }, 1000);
    }

    //bulk message send
    function writeToAllCharacteristics(message)
    {
        disconnectCounter = 0;

        //get the number of calls to be made
        //for (var i = 0; i < ConnectedDeviceInfo.services.length; i++) {
        //    disconnectCounter += ConnectedDeviceInfo.services[i].characteristics.length;
        //}

        //iterate through each characteritic and write the message to it //todo specify correct service and characteristic
        //for (var i = 0; i < ConnectedDeviceInfo.services.length; i++) {

        //    for (var j = 0; j < ConnectedDeviceInfo.services[i].characteristics.length; j++) {
        //        if (ConnectedDeviceInfo.services[i].characteristics[j].properties.write == true)
        //        {
        //            write(ConnectedDeviceInfo.address, ConnectedDeviceInfo.services[i].serviceUuid, ConnectedDeviceInfo.services[i].characteristics[j].characteristicUuid, bluetoothle.stringToBytes(message));
        //        }
        //        else
        //        {
        //            disconnectCounter--;
        //        }
        //    }

        //}
        write(ConnectedDeviceInfo.address, message.serviceUuid, message.characteristicUuid, bluetoothle.bytesToEncodedString(bluetoothle.stringToBytes(message.message)));
    }

    // initialises bluetoothle must happen
    function initialize(initializeSuccessMethod, initializeErrorMethod)
    {
        var paramsObj = { request: true };

        bluetoothle.initialize(initializeSuccessMethod, initializeErrorMethod, paramsObj);

        return false;
    }

    
    function initializeSuccess(obj)
    {
        console.log("Initialize Success : " + JSON.stringify(obj));

        if (obj.status == "enabled") {
            console.log("Enabled");
        }
        else {
            console.log("Unexpected Initialize Status");
        }
    }

    function initializeError(obj) {
        console.log("Initialize Error : " + JSON.stringify(obj));
    }

    //enables bluetooth on android devices
    function enable() {
        console.log("Enable");

        bluetoothle.enable(enableSuccess, enableError);

        return false;
    }

    function enableSuccess (obj) {
        console.log("Enable Success : " + JSON.stringify(obj));

        if (obj.status == "enabled") {
            console.log("Enabled");
        }
        else {
            console.log("Unexpected Enable Status");
        }
    }

    function enableError (obj) {
        console.log("Enable Error : " + JSON.stringify(obj));
    }

    // disables bluetooth android
    function disable() {
        console.log("Disable");

        bluetoothle.disable(disableSuccess, disableError);

        return false;
    }

    function disableSuccess (obj) {
        console.log("Disable Success : " + JSON.stringify(obj));

        if (obj.status == "disabled") {
            console.log("Disabled");
        }
        else {
            console.log("Unexpected Disable Status");
        }
    }

    function disableError (obj) {
        console.log("Disable Error : " + JSON.stringify(obj));
    }

    function startScan () {
        //TODO Disconnect / Close all addresses and empty

        var paramsObj = { serviceUuids: [] };

        console.log("Start Scan : " + JSON.stringify(paramsObj));

        
        bluetoothle.startScan(startScanSuccess, startScanError, paramsObj);

        setTimeout(stopScan, 60000);
        return false;
    }

    function startScanSuccess(obj) {

        if (obj.status == "scanResult") {
            console.log("Scan Result");

            if (!getFoundDevices()[device.address])
            {
                getFoundDevices()[device.address] = true;
                addDevice(obj.address, obj.name);
            }
        }
        else if (obj.status == "scanStarted") {
            console.log("Scan Started");
        }
        else {
            console.log("Unexpected Start Scan Status");
        }
    }

    function startScanError(obj) {
        console.log("Start Scan Error : " + JSON.stringify(obj));
    }

    //adds a device to devicelist arrays
    function addDevice(address, name)
    {
        getDevicelist().push({ "address": address, "name": name });
    }

    function stopScan() {
        console.log("Stop Scan");

        bluetoothle.stopScan(stopScanSuccess, stopScanError);

        return false;
    }

    function stopScanSuccess (obj) {
        console.log("Stop Scan Success : " + JSON.stringify(obj));

        if (obj.status == "scanStopped") {
            console.log("Scan Stopped");
        }
        else {
            console.log("Unexpected Stop Scan Status");
        }
    }

    function stopScanError (obj) {
        console.log("Stop Scan Error : " + JSON.stringify(obj));
    }

    //detects if is scanning for devices
    function isScanning ()
    {
        console.log("Is Scanning");
	
        bluetoothle.isScanning(isScanningSuccess);
  
        return false;
    }

    function isScanningSuccess (obj) {
    
        console.log("Is Scanning Success : " + JSON.stringify(obj));
	
        if (obj.isScanning)
        {
            console.log("Is Scanning : true");
        }
        else
        {
            console.log("Is Scanning : false");
        }
    }

    //Connect to a Bluetooth LE device. one device at a time
    function connect (address)
    {
        var paramsObj = {address:address};
 	
        console.log("Connect : " + JSON.stringify(paramsObj));
 	
        bluetoothle.connect(connectSuccess, connectError, paramsObj);
  
        return false;
    }

    function connectSuccess (obj)
    {
        console.log("Connect Success : " + JSON.stringify(obj));

        //currently connecting set to one device
        

        discover(obj.address);

        if (obj.status == "connected")
        {
            console.log("Connected");
            //custom
            setConnectedDeviceInfo(obj);

        }
        else if (obj.status == "connecting")
        {
            console.log("Connecting");
        }
        else
        {
            console.log("Unexpected Connect Status");
        }
    }

    function connectError (obj)
    {
        console.log("Connect Error : " + JSON.stringify(obj));
    }

    //Reconnect to a previously connected Bluetooth device.
    function reconnect(address, reconnectSuccessVar, reconnectErrorVar)
    {
        var paramsObj = {address:address};
		
        console.log("Reconnect : " + JSON.stringify(paramsObj));

        bluetoothle.reconnect(reconnectSuccessVar, reconnectErrorVar, paramsObj);
  
        return false;
    }

    function reconnectSuccess (obj)
    {
        console.log("Reconnect Success : " + JSON.stringify(obj));
	
        if (obj.status == "connected")
        {
            console.log("Connected");
        }
        else if (obj.status == "connecting")
        {
            console.log("Connecting");
        }
        else
        {
            console.log("Unexpected Reconnect Status");
        }
    }

    function reconnectError (obj)
    {
        console.log("Reconnect Error : " + JSON.stringify(obj));
    }

    //Disconnect from a Bluetooth LE device
    function disconnect(address)
    {
        var paramsObj = {address:address};
	
        console.log("Disconnect : " + JSON.stringify(paramsObj));
	
        bluetoothle.disconnect(disconnectSuccess, disconnectError, paramsObj);
	
        return false;
    }

    function disconnectSuccess(obj)
    {
        console.log("Disconnect Success : " + JSON.stringify(obj));
	
        if (obj.status == "disconnected")
        {
            console.log("Disconnected");
        }
        else if (obj.status == "disconnecting")
        {
            console.log("Disconnecting");
        }
        else
        {
            console.log("Unexpected Disconnect Status");
        }
    }

    function isConnected(address,isConnectedSuccessVar) {
        var paramsObj = { address: address };

        console.log("Is Connected : " + JSON.stringify(paramsObj));

        bluetoothle.isConnected(isConnectedSuccessVar, paramsObj);

        return false;
    }

    function isConnectedSuccess(obj) {
        console.log("Is Connected Success : " + JSON.stringify(obj));

        if (obj.isConnected) {
            console.log("Is Connected : true");
        }
        else {
            console.log("Is Connected : false");
        }
    }

    function disconnectError(obj)
    {
        console.log("Disconnect Error : " + JSON.stringify(obj));
    }

    //Close/dispose a Bluetooth LE device. Must disconnect before closing.
    function close(address)
    {
        var paramsObj = {address:address};
	
        console.log("Close : " + JSON.stringify(paramsObj));
	
        bluetoothle.close(closeSuccess, closeError, paramsObj);
  
        return false;
    }

    function closeSuccess(obj)
    {
        console.log("Close Success : " + JSON.stringify(obj));
	
        if (obj.status == "closed")
        {
            console.log("Closed");
        }
        else
        {
            console.log("Unexpected Close Status");
        }
    }

    function closeError(obj)
    {
        console.log("Close Error : " + JSON.stringify(obj));
    }

    //Discover all the devices services, characteristics and descriptors. 
    //Doesn't need to be called again after disconnecting and then reconnecting. Android support only.
    function discover(address)
    {
        var paramsObj = {address:address};
		
        console.log("Discover : " + JSON.stringify(paramsObj));
		
        isConnected(address, function (obj) {
            if (obj.isConnected) {
                console.log("Is Connected : true");

                bluetoothle.discover(discoverSuccess, discoverError, obj);
            }
            else {

                reconnect(obj.address, function (obj) {
                    bluetoothle.discover(discoverSuccess, discoverError, obj);
                },
                reconnectError);
                
                console.log("Is Connected : false");
            }
        });


        
	
        return false;
    }

    function discoverSuccess(obj)
    {
        console.log("Discover Success : " + JSON.stringify(obj));
	
        if (obj.status == "discovered")
        {
            console.log("Discovered");

            setConnectedDeviceInfo(obj);
            disconnect(obj.address);

        }
        else
        {
            console.log("Unexpected Discover Status");
        }
    }

    function discoverError(obj)
    {
        console.log("Discover Error : " + JSON.stringify(obj));
    }

    //Write a particular service's characteristic.
    function write(address, serviceUuid, characteristicUuid, value)
    {
        var paramsObj = { address: address, serviceUuid: serviceUuid, characteristicUuid: characteristicUuid, value: value, "type": "response" };
	
        console.log("Write : " + JSON.stringify(paramsObj));
	
        bluetoothle.write(writeSuccess, writeError, paramsObj);

        return false;
    }

    function writeSuccess(obj)
    {
        console.log("Write Success : " + JSON.stringify(obj));
	
        if (obj.status == "written")
        {
            console.log("Written");
        }
        else
        {
            console.log("Unexpected Write Status");
        }

        console.log(bluetoothle.bytesToString(bluetoothle.encodedStringToBytes(obj.value)))

        //decrements a value and then disconnects if it is zero
        //coundownToDisconnect(obj);
    }

    function writeError(obj)
    {
        console.log("Write Error : " + JSON.stringify(obj));

        console.log(bluetoothle.bytesToString(bluetoothle.encodedStringToBytes(obj.value)))


        //decrements a value and then disconnects if it is zero
        //coundownToDisconnect(obj);
    }

    //decrements a value and then disconnects if it is zero
    function coundownToDisconnect(obj) {
        disconnectCounter--;
        if (disconnectCounter <= 0) {
            disconnect(obj.address)
        }
    }

    //getters and setters

    function getDevicelist() {
        return deviceList;
    }

    function setDevicelist(sdeviceList) {
        deviceList = sdeviceList;
    }
    //
    function getConnectedDeviceInfo() {
        return ConnectedDeviceInfo;
    }

    function setConnectedDeviceInfo(sConnectedDeviceInfo) {
        ConnectedDeviceInfo = sConnectedDeviceInfo;
    }
    //
    function getFeedback() {
        return feedback;
    }

    function setFeedback(sfeedback) {
        feedback = sfeedback;
    }
    //
    function getFoundDevices() {
        return FoundDevices;
    }

    function setFoundDevices(sFoundDevices) {
        FoundDevices = sFoundDevices;
    }

});