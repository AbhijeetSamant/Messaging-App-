app.service('MessageService', function() {
	var to;
	var from;
	var allUser;
	var setallid;
	var messageArray = [];
	//Message Function

	var addto = function(x){
		//console.log(x);
		to=x;
	};

	var getto = function(){
		return to;
	};


	var addfrom = function(x){
		//console.log(x);
		to=x;
	};

	var getfrom = function(){
		return to;
	};



	// Display all Users
	var addallUser = function(x){
		allUser=x;
	};

	var getallUser = function(){
		return to;
	};

	var setallUserid = function(id){
		setallid = allUser[id].id;
	};

	var getallUserid = function(){
		return setallid;
	};


	//Display Messages
	var addData = function(x){
		messageArray.push(x);
	};

	var getData = function(){
		return messageArray;
	};


	return {
		addto: addto,
		getto: getto,
		addfrom: addfrom,
		getfrom: getfrom,
		addallUser: addallUser,
		getallUser: getallUser,
		getallUserid: getallUserid,
		setallUserid: setallUserid,
		addData: addData,
		getData: getData
	};
});




// Create message
app.controller('home', function($scope , $http , MessageService , SuperService) {
	$scope.msg ="";
	$scope.cipher = {};
	$scope.sendData = function() {
		$scope.cipher.to = MessageService.getallUserid();
		$scope.cipher.from = SuperService.getid();
		$scope.cipher.status = 0;
		$scope.cipher.mess = $scope.msg;
		console.log($scope.cipher);
		$("#main").append("<div class=\"panel panel-default\" ><div class=\"panel-body\" style=\"background-color:green;\">"+$scope.cipher.mess+"</div></div>");
		MessageService.addData($scope.cipher.mess);
		$http({
			method  : 'POST',
			url     : 'http://localhost:3000/messages.json',
			data    : $scope.cipher,
			headers : { 'Content-Type': 'application/json' } 
		})
		.then(function(data) {
			if (data.errors) {
				$scope.errorName = data.errors.name;
				$scope.errorUserName = data.errors.username;
				$scope.errorEmail = data.errors.email;
			} else {
				$scope.message = data.status;
				if($scope.message == 201){
					console.log("User created successfully");
					$scope.msg = "";
				}
				else
					$scope.msg = "User not created";
			}
		});
	};

	$scope.allUser = {};
	$scope.showUser = function(){

		$http({
			method  : 'GET',
			url     : 'http://localhost:3000/all',
			data    : $scope.user,
			headers : { 'Content-Type': 'application/json' } 
		})
		.then(function(data) {
			if (data.errors) {
				var errorName = data.errors.name;
				var errorUserName = data.errors.username;
				var errorEmail = data.errors.email;
			} else {
				$scope.allUser = data.data;
				$scope.user = $scope.allUser;
				MessageService.addallUser($scope.allUser);
			}
		});
	}

	$scope.setUserid = function(index){
		MessageService.setallUserid(index);
		var id = MessageService.getallUserid();
		var my = SuperService.getid();
		console.log(my);
		$("#Users li:eq("+index+")").css("background-color","blue");
		$("#main").empty();
		setInterval(function(){  
			$.post("/notice",
			{
				to: my,
				from: id,
				status: 0
			},
			function(data, status){
				console.log("Data: " + data.mess + "\nStatus: " + status);
				MessageService.addData(data.mess);
				$("#main").append("<div class=\"panel panel-default\" ><div class=\"panel-body\" style=\"background-color:red;\" >"+data.mess+"</div></div>");
			});
		}, 3000)};
	});

