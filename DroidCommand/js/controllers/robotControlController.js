﻿angular.module('driodCommand')
.controller('RobotControlController', ['$scope', '$location', '$http', '$state', 'bluetoothService', function ($scope, $location, $http, $state, bluetoothService) {

    $scope.viewName = "";
    $scope.getViewName = function () {
        return $scope.viewName;
    }

    $scope.commandIndex = -1;
    $cope.incrementCommandIndex()
    {
        $scope.commandIndex++;
        if ($scope.commandIndex > 255) {
            $scope.commandIndex = 0;
        }
        return $scope.commandIndex;
    }

    $scope.controlSelected = "";
    $scope.getControlSelected = function () {
        return $scope.controlSelected;
    }
    $scope.setControlSelected = function (newControl) {
        $scope.controlSelected = newControl;
    }

    $scope.navigateBetweenControls = function (newControl) {
        $scope.setControlSelected(newControl);
        $state.go('robotControl' + newControl);
    }

    $scope.isControlSelected = function (controlType) {
        //return $location.path().indexOf(viewLocation) > -1;
        return $scope.getControlSelected() === controlType;
    }

    //sends command to bluetoothservice
    //so I only have to change it in one place
    $scope.sendToBluetoothService = function (commandDataView) {

        bluetoothService.sendCommand({ "commandDataView": commandDataView, "serviceUuid": "6e400001-b5a3-f393-e0a9-e50e24dcca9e", "characteristicUuid": "6e400002-b5a3-f393-e0a9-e50e24dcca9e" });
    }


    //movement of the robot
    $scope.MoveCommand = function (speedLeft, speedRight, time) {

        var commandIndex = $cope.incrementCommandIndex();
        var commandBehaviour = 0;
        
        var CommandType = 'M'; // indicator M for move

        //length of the command payload is 4 bytes header is always eight bytes
        var commandLength = 12; //2 bytes

        //create an array buffer of commandLength bytes
        //create a dataview for the buffer
        var dataView = new DataView(new ArrayBuffer(commandLength));

        //header = bytes 0 to 7
        dataView.setUint8(0, commandIndex);
        dataView.setUint8(1, commandBehaviour);
        dataView.setUint16(2, commandLength);
        dataView.setUint8(7, CommandType);
        //commandPayload = bytes 8 to 20
        dataView.setInt8(8, speedLeft);
        dataView.setInt8(9, speedRight);
        dataView.setUint16(10, time);

        $scope.sendToBluetoothService(dataView);
    }

    //stops of the robot
    $scope.StopCommand = function (speedLeft, speedRight, time) {

        var commandIndex = $cope.incrementCommandIndex();
        var commandBehaviour = 0;

        var CommandType = 'S'; // indicator M for move

        //length of the command payload is 4 bytes header is always eight bytes
        var commandLength = 8; //2 bytes

        //create an array buffer of commandLength bytes
        //create a dataview for the buffer
        var dataView = new DataView(new ArrayBuffer(commandLength));

        //header = bytes 0 to 7
        dataView.setUint8(0, commandIndex);
        dataView.setUint8(1, commandBehaviour);
        dataView.setUint16(2, commandLength);
        dataView.setUint8(7, CommandType);

        $scope.sendToBluetoothService(dataView);
    }

    $scope.WaggleCommand(intensity, onTime, repeat, delay)
    {
        //waggle robot
        var commandIndex = $cope.incrementCommandIndex();
        var commandBehaviour = 0;
        //commandLength //2 bytes
        ////3 reserved bytes
        var CommandType = 'W'; // indicator M for move

        //length of the command payload is 6 bytes header is always eight bytes
        var commandLength = 14; //2 bytes

        //create an array buffer of commandLength bytes
        //create a dataview for the buffer
        var dataView = new DataView(new ArrayBuffer(commandLength));

        //header = bytes 0 to 7
        dataView.setUint8(0, commandIndex);
        dataView.setUint8(1, commandBehaviour);
        dataView.setUint16(2, commandLength);
        dataView.setUint8(7, CommandType);
        //commandPayload = bytes 8 to 20
        dataView.setUint8(8, intensity);
        dataView.setUint16(9, onTime);
        dataView.setUint8(11, repeat);
        dataView.setUint16(12, delay);

        $scope.sendToBluetoothService(dataView);
    }

    $scope.ToggleCommand(deviceFlags, state, onTime, offTime)
    {
        //toggle robot
        var commandIndex = $cope.incrementCommandIndex();
        var commandBehaviour = 0;

        var CommandType = 'T';

        //length of the command payload is 7 bytes, header is always eight bytes
        var commandLength = 15; //2 bytes

        //create an array buffer of commandLength bytes
        //create a dataview for the buffer
        var dataView = new DataView(new ArrayBuffer(commandLength));

        //header = bytes 0 to 7
        dataView.setUint8(0, commandIndex);
        dataView.setUint8(1, commandBehaviour);
        dataView.setUint16(2, commandLength);
        dataView.setUint8(7, CommandType);
        //commandPayload = bytes 8 to 20
        dataView.setUint16(8, deviceFlags);
        dataView.setUint8(10, state);
        dataView.setUint16(11, onTime);
        dataView.setUint16(13, offTime);

        $scope.sendToBluetoothService(dataView);
    }

    $scope.PlayCommand = function (SoundIdx, repeat, delay) {

        var commandIndex = $cope.incrementCommandIndex();
        var commandBehaviour = 0;

        var CommandType = 'P';

        //length of the command payload is 4 bytes, header is always 8 bytes
        var commandLength = 12; //2 bytes

        //create an array buffer of commandLength bytes
        //create a dataview for the buffer
        var dataView = new DataView(new ArrayBuffer(commandLength));

        //header = bytes 0 to 7
        dataView.setUint8(0, commandIndex);
        dataView.setUint8(1, commandBehaviour);
        dataView.setUint16(2, commandLength);
        dataView.setUint8(7, CommandType);
        //commandPayload = bytes 8 to 20
        dataView.setUint8(8, SoundIdx);
        dataView.setUint8(9, repeat);
        dataView.setUint16(10, delay);

        $scope.sendToBluetoothService(dataView);
    }

    $scope.InteractCommand = function (interactionType, sourceID, destinationID) {

        var commandIndex = $cope.incrementCommandIndex();
        var commandBehaviour = 0;

        var CommandType = 'I';

        //length of the command payload is 6 bytes, header is always 8 bytes
        var commandLength = 14; //2 bytes

        //create an array buffer of commandLength bytes
        //create a dataview for the buffer
        var dataView = new DataView(new ArrayBuffer(commandLength));

        //header = bytes 0 to 7
        dataView.setUint8(0, commandIndex);
        dataView.setUint8(1, commandBehaviour);
        dataView.setUint16(2, commandLength);
        dataView.setUint8(7, CommandType);
        //commandPayload = bytes 8 to 20
        dataView.setUint8(8, interactionType);
        dataView.setUint8(9, sourceID);
        dataView.setUint32(10, destinationID);

        $scope.sendToBluetoothService(dataView);
    }

    /*Joystick Specific Methods*/

    $scope.clickJoystickLeft = function () {

        $scope.clickDifferentialLeftForward();
        //bluetoothService.sendMessage({ "message": "left", "serviceUuid": "6e400001-b5a3-f393-e0a9-e50e24dcca9e", "characteristicUuid": "6e400002-b5a3-f393-e0a9-e50e24dcca9e" });
    }

    $scope.clickJoystickRight = function () {

        $scope.clickDifferentialRightForward();
        //bluetoothService.sendMessage({ "message": "right", "serviceUuid": "6e400001-b5a3-f393-e0a9-e50e24dcca9e", "characteristicUuid": "6e400002-b5a3-f393-e0a9-e50e24dcca9e" });
    }

    $scope.clickJoystickTop = function () {
        //move forward

        $scope.MoveCommand(100, 100, 10000);
        //bluetoothService.sendMessage({ "message": "up", "serviceUuid": "6e400001-b5a3-f393-e0a9-e50e24dcca9e", "characteristicUuid": "6e400002-b5a3-f393-e0a9-e50e24dcca9e" })
    }

    $scope.clickJoytickBottom = function () {
        //move Backward
        $scope.MoveCommand(-100, -100, 10000);

        //bluetoothService.sendMessage({ "message": "down", "serviceUuid": "6e400001-b5a3-f393-e0a9-e50e24dcca9e", "characteristicUuid": "6e400002-b5a3-f393-e0a9-e50e24dcca9e" })
    }
    //

    /*Differential Specific Methods*/
    $scope.clickDifferentialLeftForward = function () {
        //move left forward
        $scope.MoveCommand(-100, 0, 1000);

        //bluetoothService.sendMessage("clickDifferentialLeftForward");
    }

    $scope.clickDifferentialLeftReverse = function () {
        //move left reverse
        $scope.MoveCommand(-100, 0, 1000);

        //bluetoothService.sendMessage("clickDifferentialLeftReverse");
    }

    $scope.clickDifferentialRightReverse = function () {

        //move right reverse
        $scope.MoveCommand(0, -100, 1000);

        //bluetoothService.sendMessage("clickDifferentialRightReverse");
    }

    $scope.clickDifferentialRightForward = function () {

        //move right forward
        $scope.MoveCommand(0, 100, 1000);

        //bluetoothService.sendMessage("clickDifferentialRightForward");
    }

    //

    /*Motion Specific Methods*/

    //

    /*Robot Command Methods*/
    $scope.clickMoreCommands = function () {

        bluetoothService.sendMessage("more");
    }

    $scope.clickspinCommand = function () {

        bluetoothService.sendMessage("Spin");
    }

    $scope.clickWaggleCommand = function () {

        //waggle robot
        
        $scope.WaggleCommand(100, 5000, 2, 5000)
    }

    $scope.clickToggleCommand = function () {

        // TODO NB check device flags, may have to set bit ugh
        //    deviceFlags = [0, 0, 0, 0, 0, 0, 0, 0];
        //    state = 0;
        //    onTime = 0;
        //    offTime = 0;

        $scope.ToggleCommand([0, 0, 0, 0, 0, 0, 0, 0], 0, 0, 0);
    }

    $scope.clickPlayCommand = function () {

        //play sound on robot
        $scope.PlayCommand(1, 0, 0);
    }

    $scope.clickShootCommand = function () {

        bluetoothService.sendMessage("Shoot");
    }

    $scope.clickRecoilCommand = function () {

        bluetoothService.sendMessage("Recoil");
    }

    $scope.clickDanceCommand = function () {

        bluetoothService.sendMessage("Dance");
    }
    //

}]);