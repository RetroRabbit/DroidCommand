﻿angular.module('driodCommand')
.controller('RobotControlController', ['$scope', '$rootScope', '$location', '$http', '$state', '$interval', 'bluetoothService', 'cordovaDeviceMotionService', function ($scope, $rootScope, $location, $http, $state, $interval, bluetoothService, cordovaDeviceMotionService) {

    $scope.viewName = "";
    $scope.getViewName = function () {
        return $scope.viewName;
    }


    $scope.wrapFunction = function (fn, context, params) {
        return function () {
            fn.apply(context, params);
        };
    }

    $scope.CommandExecutionInterval = null;
    //start interval that executes commands to the droids
    $scope.StartCommandExecutionInterval = function()
    {
        if ($scope.CommandExecutionInterval == null) {
            $scope.CommandExecutionInterval = $interval($scope.executeCommandInQueue, 100);
        }
    }

    //function that executes the next command within the queue
    $scope.executeCommandInQueue = function () {

        if ($scope.commandQueue.length > 0 && $scope.isFreeToExecute()) {

            //$scope.setFreeToExecute(false);
            console.log("command");
            //get the command object from the command queue
            var commandObj = $scope.commandQueue.shift();
            //assemble the device details
            var device = { "address": commandObj.droid.address, "name": commandObj.droid.name, "info": commandObj.droid.info };
            //execute the command on the appController reconnecting if necessary
            $scope.reconnectAndExecuteCommand(device, commandObj.command);
        }

    }


    //this function create an array of default behaviour for a robot
    $scope.createDefaultBehaviour = function () {

        //$scope.MoveCommand = function (speedLeft, speedRight, time) 

        // Create an array and append your functions to them
        var defaultBehaviourArray = [];
        defaultBehaviourArray.push({ command: $scope.MoveCommand, params: [127, 127, 1000], duration: 1000 });
        defaultBehaviourArray.push({ command: $scope.ToggleCommand, params: [0, 2, 1000, 1000], duration: 5000 });
        defaultBehaviourArray.push({ command: $scope.MoveCommand, params: [0, 127, 700], duration: 1000 });
        defaultBehaviourArray.push({ command: $scope.ToggleCommand, params: [1, 2, 1000, 1000], duration: 1000 });
        defaultBehaviourArray.push({ command: $scope.MoveCommand, params: [127, 127, 1000], duration: 1000 });
        defaultBehaviourArray.push({ command: $scope.ToggleCommand, params: [2, 2, 1000, 1000], duration: 5000 });
        defaultBehaviourArray.push({ command: $scope.MoveCommand, params: [0, 127, 700], duration: 1000 });
        defaultBehaviourArray.push({ command: $scope.ToggleCommand, params: [3, 2, 1000, 1000], duration: 1000 });
        defaultBehaviourArray.push({ command: $scope.MoveCommand, params: [127, 127, 1000], duration: 1000 });
        defaultBehaviourArray.push({ command: $scope.ToggleCommand, params: [4, 2, 1000, 1000], duration: 5000 });
        defaultBehaviourArray.push({ command: $scope.MoveCommand, params: [0, 127, 700], duration: 1000 });
        defaultBehaviourArray.push({ command: $scope.ToggleCommand, params: [0, 2, 1000, 1000], duration: 5000 });
        defaultBehaviourArray.push({ command: $scope.MoveCommand, params: [127, 127, 1000], duration: 1000 });

        return defaultBehaviourArray;
    }

    $scope.getRemoteBehaviour = function () {

        // Create an array and append your functions to them
        var defaultBehaviourArray = [];

        defaultBehaviourArray = updateService.getUpdatedData();
        for (var i = 0; i < defaultBehaviourArray.length; i++) {
            defaultBehaviourArray[i].command = eval("$scope." + defaultBehaviourArray[i].command);
        }


        return defaultBehaviourArray;
    }



    $scope.commandIndex = -1;
    $scope.incrementCommandIndex = function () {
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

    //interval that handles differential movement
    $scope.DifferentialMovementInterval = null;
    $scope.startDifferentialMovement = function () {
        if ($scope.DifferentialMovementInterval == null) {
            $scope.StartCommandExecutionInterval();
            $scope.DifferentialMovementInterval = $interval($scope.ExecuteDifferentialMovement, 200);
        }
    }

    $scope.MoveLeft = 0;
    $scope.MoveRight = 0;
    $scope.LastCommand = null;
    //creates movement command based off of differential movement object
    $scope.ExecuteDifferentialMovement = function () {

        var leftWeight = 0;
        var rightWeight = 0;

        if ($scope.MoveLeft != 0) {
            leftWeight = $scope.MoveLeft < 0 ? -127 : 127;
        }

        if ($scope.MoveRight != 0) {
            rightWeight = $scope.MoveRight < 0 ? -127 : 127;
        }

        if ($scope.MoveLeft != 0 || $scope.MoveRight != 0) {
            $scope.LastCommand = { command: $scope.wrapFunction($scope.MoveCommand, this, [leftWeight, rightWeight, 500]), droid: $scope.getSelectedDroid() };
            $scope.commandQueue.push($scope.LastCommand);
        }
        else if ($scope.IsStillPanning == true && $scope.LastCommand != null)
        {
            $scope.commandQueue.push($scope.LastCommand);
        }

        $scope.MoveLeft = 0;
        $scope.MoveRight = 0;
    }
    

    
    $scope.OnPanAll = function (event) {
        $scope.startDifferentialMovement();

        switch (event.direction) {

            case 2:
                console.log('Left');
                if (!(event.distance + 10 > $scope.DistanceAll && event.distance - 10 < $scope.DistanceAll)) {
                    $scope.MoveLeft = 0;
                    $scope.MoveRight++;
                }
                break;
            case 4:
                console.log('Right');
                if (!(event.distance + 10 > $scope.DistanceAll && event.distance - 10 < $scope.DistanceAll)) {
                    $scope.MoveLeft++;
                    $scope.MoveRight = 0;
                }
                break;
            case 8:
                console.log('Up');
                if (!(event.distance + 10 > $scope.DistanceAll && event.distance - 10 < $scope.DistanceAll)) {
                    $scope.MoveLeft++;
                    $scope.MoveRight++;
                }
                break;
            case 16:
                console.log('Down');
                if (!(event.distance + 10 > $scope.DistanceAll && event.distance - 10 < $scope.DistanceAll)) {
                    $scope.MoveLeft--;
                    $scope.MoveRight--;
                }
                break;
            case 1:
                console.log('None');
                $scope.DistanceAll = event.distance;
                break;
            case 6:
                console.log('DIRECTION_HORIZONTAL');
                break;
            case 24:
                console.log('DIRECTION_VERTICAL');
                break;
            case 30:
                console.log('DIRECTION_ALL');
                break;
        }
        console.log('Distance: ' + event.distance);
    }

    $scope.onPanleft = function (event) {
        $scope.startDifferentialMovement();

        switch (event.direction) {
            case 8:
                if (!(event.distance + 10 > $scope.DistanceLeft && event.distance - 10 < $scope.DistanceLeft)) {
                    console.log('left Up');
                    $scope.MoveLeft++;
                }
                break;
            case 16:
                if (!(event.distance + 10 > $scope.DistanceLeft && event.distance - 10 < $scope.DistanceLeft)) {
                    console.log('Left Down');
                    $scope.MoveLeft--;
                }
                break;
            case 1:
                console.log('Distance Left: None');
                $scope.DistanceLeft = event.distance;
                break;
        }
        console.log('Left Distance: ' + event.distance);
    };

    $scope.onPanRight = function (event) {
        $scope.startDifferentialMovement();

        switch (event.direction) {
            case 8:
                if (!(event.distance + 10 > $scope.DistanceRight && event.distance - 10 < $scope.DistanceRight)) {
                    console.log('Up');
                    $scope.MoveRight++;
                }
                break;
            case 16:
                if (!(event.distance + 10 > $scope.DistanceRight && event.distance - 10 < $scope.DistanceRight)) {
                    console.log('Down');
                    $scope.MoveRight--;
                }
                break;
            case 1:
                console.log('Distance Right: None');
                $scope.DistanceRight = event.distance;
                break;

        }
        console.log('Right Distance: ' + event.distance);
    }

    $scope.IsStillPanning = false;

    $scope.OnPanStart = function (event) {
        console.log('Pan start ');
        $scope.IsStillPanning = true;
    }

    $scope.OnPanEnd = function (event) {
        console.log('Pan End ');
        $scope.IsStillPanning = false;
    }

    $scope.OnPanCancel = function (event) {
        console.log('Pan Cancel ');
        $scope.IsStillPanning = false;
    }

    //distance storage on pan event
    $scope.DistanceAll = 0;
    $scope.DistanceLeft = 0;
    $scope.DistanceRight = 0;

    //sends command to bluetoothservice
    //so I only have to change it in one place
    $scope.sendToBluetoothService = function (commandDataView) {

        bluetoothService.sendCommand({ "serviceUuid": "6e400001-b5a3-f393-e0a9-e50e24dcca9e", "characteristicUuid": "6e400002-b5a3-f393-e0a9-e50e24dcca9e", "commandDataView": commandDataView });
    }

    //movement of the robot
    $scope.MoveCommand = function (speedLeft, speedRight, time) {

        var commandIndex = $scope.incrementCommandIndex();
        var commandBehaviour = 0;

        var CommandType = 'M'; // indicator M for move

        //length of the command payload is 6 bytes header is always eight bytes
        var commandLength = 14; //2 bytes

        //create an array buffer of commandLength bytes
        //create a dataview for the buffer
        var dataView = new DataView(new ArrayBuffer(commandLength));

        //header = bytes 0 to 7
        dataView.setUint8(0, commandIndex);
        dataView.setUint8(1, commandBehaviour);
        dataView.setUint16(2, commandLength);
        dataView.setUint8(7, CommandType.charCodeAt());
        //commandPayload = bytes 8 to 20
        dataView.setInt8(8, speedLeft);
        dataView.setInt8(9, speedRight);

        dataView.setInt8(10, speedLeft > 0 ? 0 : 1);
        dataView.setInt8(11, speedRight > 0 ? 0 : 1);

        dataView.setUint16(12, time);

        $scope.sendToBluetoothService(dataView);
    }

    //stops of the robot
    $scope.StopCommand = function (speedLeft, speedRight, time) {

        var commandIndex = $scope.incrementCommandIndex();
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
        dataView.setUint8(7, CommandType.charCodeAt());

        $scope.sendToBluetoothService(dataView);
    }

    $scope.ShiverCommand = function (intensity, onTime, repeat, delay) {

        var commandIndex = $scope.incrementCommandIndex();
        var commandBehaviour = 0;

        var CommandType = '????'; // indicator M for move

        //length of the command payload is 6 bytes header is always eight bytes
        var commandLength = 14; //2 bytes

        //create an array buffer of commandLength bytes
        //create a dataview for the buffer
        var dataView = new DataView(new ArrayBuffer(commandLength));

        //header = bytes 0 to 7
        dataView.setUint8(0, commandIndex);
        dataView.setUint8(1, commandBehaviour);
        dataView.setUint16(2, commandLength);
        dataView.setUint8(7, CommandType.charCodeAt());
        //commandPayload = bytes 8 to 20
        dataView.setUint8(8, intensity);
        dataView.setUint16(9, onTime);
        dataView.setUint8(11, repeat);
        dataView.setUint16(12, delay);

        $scope.sendToBluetoothService(dataView);
    }

    $scope.MateCommand = function (deviceID) {

        var commandIndex = $scope.incrementCommandIndex();
        var commandBehaviour = 0;

        var CommandType = 'XXX'; // indicator M for move

        //length of the command payload is 4 bytes header is always eight bytes
        var commandLength = 9; //2 bytes

        //create an array buffer of commandLength bytes
        //create a dataview for the buffer
        var dataView = new DataView(new ArrayBuffer(commandLength));

        //header = bytes 0 to 7
        dataView.setUint8(0, commandIndex);
        dataView.setUint8(1, commandBehaviour);
        dataView.setUint16(2, commandLength);
        dataView.setUint8(7, CommandType.charCodeAt());
        //commandPayload = bytes 8 to 20
        dataView.setUint8(8, deviceID);

        $scope.sendToBluetoothService(dataView);
    }

    $scope.GreetCommand = function (deviceID) {

        var commandIndex = $scope.incrementCommandIndex();
        var commandBehaviour = 0;

        var CommandType = 'XXX'; // indicator M for move

        //length of the command payload is 4 bytes header is always eight bytes
        var commandLength = 9; //2 bytes

        //create an array buffer of commandLength bytes
        //create a dataview for the buffer
        var dataView = new DataView(new ArrayBuffer(commandLength));

        //header = bytes 0 to 7
        dataView.setUint8(0, commandIndex);
        dataView.setUint8(1, commandBehaviour);
        dataView.setUint16(2, commandLength);
        dataView.setUint8(7, CommandType.charCodeAt());
        //commandPayload = bytes 8 to 20
        dataView.setUint8(8, deviceID);

        $scope.sendToBluetoothService(dataView);
    }

    $scope.WaggleCommand = function (intensity, onTime, repeat, delay) {
        //waggle robot
        var commandIndex = $scope.incrementCommandIndex();
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
        dataView.setUint8(7, CommandType.charCodeAt());
        //commandPayload = bytes 8 to 20
        dataView.setUint8(8, intensity);
        dataView.setUint16(9, onTime);
        dataView.setUint8(11, repeat);
        dataView.setUint16(12, delay);

        $scope.sendToBluetoothService(dataView);
    }

    $scope.RecoilCommand = function (intensity, onTime, repeat, delay) {
        //recoil of robot
        var commandIndex = $scope.incrementCommandIndex();
        var commandBehaviour = 0;

        var CommandType = '??';

        //length of the command payload is 6 bytes, header is always eight bytes
        var commandLength = 14; //2 bytes

        //create an array buffer of commandLength bytes
        //create a dataview for the buffer
        var dataView = new DataView(new ArrayBuffer(commandLength));

        //header = bytes 0 to 7
        dataView.setUint8(0, commandIndex);
        dataView.setUint8(1, commandBehaviour);
        dataView.setUint16(2, commandLength);
        dataView.setUint8(7, CommandType.charCodeAt());
        //commandPayload = bytes 8 to 20
        dataView.setUint8(8, intensity);
        dataView.setUint16(9, onTime);
        dataView.setUint8(11, repeat);
        dataView.setUint16(12, delay);

        $scope.sendToBluetoothService(dataView);
    }

    $scope.ToggleCommand = function (deviceFlags, state, onTime, offTime) {
        //toggle robot
        var commandIndex = $scope.incrementCommandIndex();
        var commandBehaviour = 0;

        var CommandType = 'T';

        //length of the command payload is 7 bytes, header is always eight bytes
        var commandLength = 15; //2 bytes

        //create an array buffer of commandLength bytes
        //create a dataview for the buffer
        var dataView = new DataView(new ArrayBuffer(commandLength));

        //header = bytes 0 to 7
        //commandIndex
        dataView.setUint8(0, commandIndex);
        dataView.setUint8(1, commandBehaviour);
        dataView.setUint16(2, commandLength);
        dataView.setUint8(7, CommandType.charCodeAt());
        //commandPayload = bytes 8 to 20
        dataView.setUint16(8, deviceFlags);
        dataView.setUint8(10, state);
        dataView.setUint16(11, onTime);
        dataView.setUint16(13, offTime);

        //debug code
        var dcommandIndex = dataView.getUint8(0);
        var dcommandBehaviour = dataView.getUint8(1);
        var dcommandLength = dataView.getUint16(2);
        var dCommandType = String.fromCharCode(dataView.getUint8(7));
        var ddeviceFlags = dataView.getUint16(8);
        var dstate = dataView.getUint8(10);
        var donTime = dataView.getUint16(11);
        var doffTime = dataView.getUint16(13);

        $scope.sendToBluetoothService(dataView);
    }

    $scope.PlayCommand = function (SoundIdx, repeat, delay) {

        var commandIndex = $scope.incrementCommandIndex();
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
        dataView.setUint8(7, CommandType.charCodeAt());
        //commandPayload = bytes 8 to 20
        dataView.setUint8(8, SoundIdx);
        dataView.setUint8(9, repeat);
        dataView.setUint16(10, delay);

        $scope.sendToBluetoothService(dataView);
    }

    $scope.InteractCommand = function (interactionType, sourceID, destinationID) {

        var commandIndex = $scope.incrementCommandIndex();
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
        dataView.setUint8(7, CommandType.charCodeAt());
        //commandPayload = bytes 8 to 20
        dataView.setUint8(8, interactionType);
        dataView.setUint8(9, sourceID);
        dataView.setUint32(10, destinationID);

        $scope.sendToBluetoothService(dataView);
    }

    $scope.ShootCommand = function (intensity, targetID) {

        var commandIndex = $scope.incrementCommandIndex();
        var commandBehaviour = 0;

        var CommandType = 'X';

        //length of the command payload is 5 bytes, header is always 8 bytes
        var commandLength = 13; //2 bytes

        //create an array buffer of commandLength bytes
        //create a dataview for the buffer
        var dataView = new DataView(new ArrayBuffer(commandLength));

        //header = bytes 0 to 7
        dataView.setUint8(0, commandIndex);
        dataView.setUint8(1, commandBehaviour);
        dataView.setUint16(2, commandLength);
        dataView.setUint8(7, CommandType.charCodeAt());
        //commandPayload = bytes 8 to 20
        dataView.setUint8(8, intensity);
        dataView.setUint32(9, targetID);

        $scope.sendToBluetoothService(dataView);
    }

    $scope.ShootCommand = function (targetID) {

        var commandIndex = $scope.incrementCommandIndex();
        var commandBehaviour = 0;

        var CommandType = 'X';

        //length of the command payload is 4 bytes, header is always 8 bytes
        var commandLength = 12; //2 bytes

        //create an array buffer of commandLength bytes
        //create a dataview for the buffer
        var dataView = new DataView(new ArrayBuffer(commandLength));

        //header = bytes 0 to 7
        dataView.setUint8(0, commandIndex);
        dataView.setUint8(1, commandBehaviour);
        dataView.setUint16(2, commandLength);
        dataView.setUint8(7, CommandType.charCodeAt());
        //commandPayload = bytes 8 to 20
        dataView.setUint32(8, targetID);

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

        //$scope.MoveCommand(100, 100, 10000);

        var commandObj = { command: $scope.wrapFunction($scope.MoveCommand, this, [127, 127, 2000]), droid: $scope.getSelectedDroid() };
        $scope.commandQueue.push(commandObj);
    }

    $scope.clickJoytickBottom = function () {
        //move Backward
        //$scope.MoveCommand(-100, -100, 10000);

        var commandObj = { command: $scope.wrapFunction($scope.MoveCommand, this, [-127, -127, 2000]), droid: $scope.getSelectedDroid() };
        $scope.commandQueue.push(commandObj);
    }
    //

    /*Differential Specific Methods*/
    $scope.clickDifferentialLeftForward = function () {
        var commandObj = { command: $scope.wrapFunction($scope.MoveCommand, this, [127, 0, 1000]), droid: $scope.getSelectedDroid() };
        $scope.commandQueue.push(commandObj);
    }

    $scope.clickDifferentialLeftReverse = function () {
        var commandObj = { command: $scope.wrapFunction($scope.MoveCommand, this, [-127, 0, 1000]), droid: $scope.getSelectedDroid() };
        $scope.commandQueue.push(commandObj);
    }

    $scope.clickDifferentialRightReverse = function () {
        var commandObj = { command: $scope.wrapFunction($scope.MoveCommand, this, [0, -127, 500]), droid: $scope.getSelectedDroid() };
        $scope.commandQueue.push(commandObj);
    }

    $scope.clickDifferentialRightForward = function () {

        var commandObj = { command: $scope.wrapFunction($scope.MoveCommand, this, [0, 127, 500]), droid: $scope.getSelectedDroid() };
        $scope.commandQueue.push(commandObj);
    }

    /*Motion Specific Methods*/
    $scope.MotionMovementInterval = null;

    //postition variables
    $scope.postitionX = 0;
    $scope.postitionY = 0;
    $scope.motionMovementCommand = null;
    $scope.motionCounter = 0;

    $scope.startMotionControl = function (event) {

        console.log('startMotionControl');

        $scope.StartCommandExecutionInterval();

        //to set current position in space
        cordovaDeviceMotionService.getCurrentAcceleration(function (acceleration) {
            console.log('Starting positions:\n Acceleration X: ' + acceleration.x + '\n' +
                    'Acceleration Y: ' + acceleration.y + '\n' +
                    'Acceleration Z: ' + acceleration.z + '\n *****************************************************'
            );
        });

        console.log('start MotionMovementInterval');
        $scope.MotionMovementInterval = $interval($scope.getAccelerometerInfo, 200);
    }

    $scope.stopMotionControl = function (event) {

        $interval.cancel($scope.MotionMovementInterval);
        console.log('stopMotionControl');
        $scope.postitionX = 0;
        $scope.postitionY = 0;
        $scope.previousMovement = null;
        console.log('stop MotionMovementInterval');
    }

    $scope.getAccelerometerInfo = function () {

        cordovaDeviceMotionService.getCurrentAcceleration(function (acceleration) {
            console.log('\nnr ' + $scope.motionCounter++ + '\nAcceleration X: ' + acceleration.x + '\n' +
                  'Acceleration Y: ' + acceleration.y + '\n' +
                  'Acceleration Z: ' + acceleration.z + '\n ---------------------------------------------'
            );

            if (Math.round(acceleration.x) == 0 && Math.round(acceleration.y) == 0) {
                return;
            }
            else if (Math.round(acceleration.x) >= 1 && Math.round(acceleration.y) == 0) {
                //$scope.motionMovementCommand = $scope.clickJoytickBottom();
                $scope.motionMovementCommand = function () {
                    $scope.commandQueue.push({ command: $scope.wrapFunction($scope.MoveCommand, this, [-127, -127, (Math.round(acceleration.x)+ 2) * 100]), droid: $scope.getSelectedDroid() });
                }
            }
            else if (Math.round(acceleration.x) < 0 && Math.round(acceleration.y) == 0) {
                //$scope.motionMovementCommand = $scope.clickJoystickTop();
                $scope.motionMovementCommand = function () {
                    $scope.commandQueue.push({ command: $scope.wrapFunction($scope.MoveCommand, this, [127, 127, (Math.abs(Math.round(acceleration.x))+ 2) * 100]), droid: $scope.getSelectedDroid() });
                }
            }
            else if (Math.round(acceleration.y) >= 1 && Math.round(Math.round(acceleration.x)) >= 0) {
                //$scope.motionMovementCommand = $scope.clickDifferentialRightReverse();
                $scope.motionMovementCommand = function () {
                    $scope.commandQueue.push({ command: $scope.wrapFunction($scope.MoveCommand, this, [0, -127, Math.round(acceleration.y) * 100]), droid: $scope.getSelectedDroid() });
                }
            }
            else if (Math.round(acceleration.y) < 0 && Math.round(Math.round(acceleration.x)) >= 0) {   
                //$scope.motionMovementCommand = $scope.clickDifferentialLeftReverse();
                $scope.motionMovementCommand = function () {
                    $scope.commandQueue.push({ command: $scope.wrapFunction($scope.MoveCommand, this, [-127, 0, Math.abs(Math.round(acceleration.y)) * 100]), droid: $scope.getSelectedDroid() });
                };
            }
            else if (Math.round(acceleration.y) >= 1 && Math.round(Math.round(acceleration.x)) <= 0) {
                //$scope.motionMovementCommand = $scope.clickDifferentialLeftForward();
                $scope.motionMovementCommand = function () {
                    $scope.commandQueue.push({ command: $scope.wrapFunction($scope.MoveCommand, this, [127, 0, Math.round(acceleration.y)*100]), droid: $scope.getSelectedDroid() });
                }
            }
            else if (Math.round(acceleration.y) < 0 && Math.round(Math.round(acceleration.x)) <= 0) {
                $scope.motionMovementCommand = function () {
                    $scope.commandQueue.push({ command: $scope.wrapFunction($scope.MoveCommand, this, [0, 127, Math.abs(Math.round(acceleration.y)) * 100]), droid: $scope.getSelectedDroid() });
                };
            }

            if ($scope.motionMovementCommand != null)
            { $scope.motionMovementCommand(); }
        });
    }
    
    //this doesnt belong here. Must move. Function for precise rounding of decimals
    function round(value, exp) {
        if (typeof exp === 'undefined' || +exp === 0)
            return Math.round(value);

        value = +value;
        exp = +exp;

        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
            return NaN;

        // Shift
        value = value.toString().split('e');
        value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
    }



    /*Robot Command Methods*/
    $scope.clickMoreCommands = function () {

        bluetoothService.sendMessage("more");
    }

    $scope.clickShootCommand = function () {
        $scope.StartCommandExecutionInterval();
        //$scope.ToggleCommand(0, 2, 1000, 1000);
        var commandObj = { command: $scope.wrapFunction($scope.ToggleCommand, this, [0, 2, 1000, 1000]), droid: $scope.getSelectedDroid() };
        $scope.commandQueue.push(commandObj);


        // bluetoothService.sendMessage("Shoot");
    }

    $scope.clickWaggleCommand = function () {
        $scope.StartCommandExecutionInterval();
        //        $scope.ToggleCommand(1, 2, 1000, 1000);
        $scope.commandQueue.push({ command: $scope.wrapFunction($scope.ToggleCommand, this, [1, 2, 1000, 1000]), droid: $scope.getSelectedDroid() });
        //waggle robot

        // $scope.WaggleCommand(100, 5000, 2, 5000)
    }

    $scope.clickspinCommand = function () {
        $scope.StartCommandExecutionInterval();
        //        $scope.ToggleCommand(2, 2, 1000, 1000);
        $scope.commandQueue.push({ command: $scope.wrapFunction($scope.ToggleCommand, this, [2, 2, 1000, 1000]), droid: $scope.getSelectedDroid() });
        //bluetoothService.sendMessage("Spin");
    }

    $scope.clickRecoilCommand = function () {
        $scope.StartCommandExecutionInterval();
        //       $scope.ToggleCommand(3, 2, 1000, 1000);
        $scope.commandQueue.push({ command: $scope.wrapFunction($scope.ToggleCommand, this, [3, 2, 1000, 1000]), droid: $scope.getSelectedDroid() });
        //bluetoothService.sendMessage("Recoil");
    }

    $scope.clickDanceCommand = function () {
        $scope.StartCommandExecutionInterval();
        //        $scope.ToggleCommand(4, 2, 1000, 1000);
        $scope.commandQueue.push({ command: $scope.wrapFunction($scope.ToggleCommand, this, [4, 2, 1000, 1000]), droid: $scope.getSelectedDroid() });
        // bluetoothService.sendMessage("Dance");
    }

    $scope.clickToggleCommand = function () {
        $scope.StartCommandExecutionInterval();
        // TODO NB check device flags, may have to set bit ugh
        //    deviceFlags = [0, 0, 0, 0, 0, 0, 0, 0];
        //    state = 0;
        //    onTime = 0;
        //    offTime = 0;

        $scope.ToggleCommand(1, 2, 1000, 1000);
    }

    $scope.clickPlayCommand = function () {
        $scope.StartCommandExecutionInterval();
        //play sound on robot
        $scope.PlayCommand(1, 0, 0);
    }

    //destroy intervals and timeouts
    $scope.$on('$stateChangeStart',
    function (event, toState, toParams, fromState, fromParams) {

        if ($scope.CommandExecutionInterval != null) {
            $interval.cancel($scope.CommandExecutionInterval);
            $scope.CommandExecutionInterval = null;
            console.log("CommandExecutionInterval canceled");
        }
        if ($scope.DifferentialMovementInterval != null) {
            $interval.cancel($scope.DifferentialMovementInterval);
            $scope.DifferentialMovementInterval = null;
        }
        if ($scope.MotionMovementInterval != null) {
            $scope.isMotionControlEnabled = false;
            $interval.cancel($scope.MotionMovementInterval);
            $scope.MotionMovementInterval = null;
        }

        //set free to execute to true
        $scope.setFreeToExecute(true);
    });


}]);