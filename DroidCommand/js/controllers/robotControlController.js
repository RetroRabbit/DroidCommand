angular.module('driodCommand')
.controller('RobotControlController', ['$scope', '$location', '$http', '$state', 'bluetoothService', '$swipe', function ($scope, $location, $http, $state, bluetoothService, $swipe) {

    $scope.viewName = "";
    $scope.getViewName = function () {
        return $scope.viewName;
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

    //use $swipe service to get swipe evens on the elements
    $swipe.bind($('#DifferentialDriveRight'), {
        'start': function (coords) {
            console.log("DifferentialDriveRight start x co-ord: " + coords.x);
            console.log("DifferentialDriveRight start y co-ord: " + coords.y);
        },
        'move': function (coords) {
            console.log("DifferentialDriveRight move x co-ord: " + coords.x);
            console.log("DifferentialDriveRight move y co-ord: " + coords.y);
        },
        'end': function (coords) {
            console.log("DifferentialDriveRight end x co-ord: " + coords.x);
            console.log("DifferentialDriveRight end y co-ord: " + coords.y);
        },
        'cancel': function (coords) {
            console.log("DifferentialDriveRight cancel x co-ord: " + coords.x);
            console.log("DifferentialDriveRight cancel y co-ord: " + coords.y);
        }
    });

    $swipe.bind($('#DifferentialDriveLeft'), {
        'start': function (coords) {
            console.log("DifferentialDriveLeft start x co-ord: " + coords.x);
            console.log("DifferentialDriveLeft start y co-ord: " + coords.y);
        },
        'move': function (coords) {
            console.log("DifferentialDriveLeft move x co-ord: " + coords.x);
            console.log("DifferentialDriveLeft move y co-ord: " + coords.y);
        },
        'end': function (coords) {
            console.log("DifferentialDriveLeft end x co-ord: " + coords.x);
            console.log("DifferentialDriveLeft end y co-ord: " + coords.y);
        },
        'cancel': function (coords) {
            console.log("DifferentialDriveLeft cancel x co-ord: " + coords.x);
            console.log("DifferentialDriveLeft cancel y co-ord: " + coords.y);
        }
    });

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
        dataView.setUint8(7, CommandType);

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
        dataView.setUint8(7, CommandType);
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
        dataView.setUint8(7, CommandType);
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
        dataView.setUint8(7, CommandType);
        //commandPayload = bytes 8 to 20
        dataView.setUint8(8, deviceID);

        $scope.sendToBluetoothService(dataView);
    }

    $scope.WaggleCommand = function(intensity, onTime, repeat, delay)
    {
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
        dataView.setUint8(7, CommandType);
        //commandPayload = bytes 8 to 20
        dataView.setUint8(8, intensity);
        dataView.setUint16(9, onTime);
        dataView.setUint8(11, repeat);
        dataView.setUint16(12, delay);

        $scope.sendToBluetoothService(dataView);
    }

    $scope.RecoilCommand = function(intensity, onTime, repeat, delay)
    {
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
        dataView.setUint8(7, CommandType);
        //commandPayload = bytes 8 to 20
        dataView.setUint8(8, intensity);
        dataView.setUint16(9, onTime);
        dataView.setUint8(11, repeat);
        dataView.setUint16(12, delay);

        $scope.sendToBluetoothService(dataView);
    }

    $scope.ToggleCommand = function (deviceFlags, state, onTime, offTime)
    {
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
        dataView.setUint8(7, CommandType);
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
        dataView.setUint8(7, CommandType);
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
        dataView.setUint8(7, CommandType);
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
        dataView.setUint8(7, CommandType);
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

    $scope.clickShootCommand = function () {

        $scope.ToggleCommand(0, 2, 1000, 1000);

       // bluetoothService.sendMessage("Shoot");
    }

    $scope.clickWaggleCommand = function () {

        $scope.ToggleCommand(1, 2, 1000, 1000);

        //waggle robot
        
       // $scope.WaggleCommand(100, 5000, 2, 5000)
    }

    $scope.clickspinCommand = function () {

        $scope.ToggleCommand(2, 2, 1000, 1000);

        //bluetoothService.sendMessage("Spin");
    }

    $scope.clickRecoilCommand = function () {

        $scope.ToggleCommand(3, 2, 1000, 1000);

        //bluetoothService.sendMessage("Recoil");
    }

    $scope.clickDanceCommand = function () {

        $scope.ToggleCommand(4, 2, 1000, 1000);

       // bluetoothService.sendMessage("Dance");
    }

    $scope.clickToggleCommand = function () {

        // TODO NB check device flags, may have to set bit ugh
        //    deviceFlags = [0, 0, 0, 0, 0, 0, 0, 0];
        //    state = 0;
        //    onTime = 0;
        //    offTime = 0;

        $scope.ToggleCommand(1, 2, 1000, 1000);
    }

    $scope.clickPlayCommand = function () {

        //play sound on robot
        $scope.PlayCommand(1, 0, 0);
    }

    //

}]);