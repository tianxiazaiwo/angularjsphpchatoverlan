var app = angular.module('myApp', []);
var url='../api/controller.php?f=';
var lastId=0;
var refreshInterval=1000;
var requestInProgress=false;
app.filter('getLastId', function() {
  return function(message) {
    lastId=message.id;
    return message.text;
  };
});
app.directive('refreshMessages',["$interval", function($interval) {
        // return the directive link function. (compile function not needed)
        return function(scope, element, attrs) {
        	if(attrs.refreshMessages=="true")
        	{
        		function updateTime() {
                  	if(requestInProgress==false)
                    	scope.getNewMessages();         
                }
                $interval(updateTime, refreshInterval);
            }
        }
      }]);
app.controller('includeCtrl', function($scope, $http) {
	$scope.aho=function(){
		console.log("aho ni aho");
	}
});
app.controller('messageCtrl', function($scope, $http, $location, $anchorScroll) {
	$scope.lastId=0;
    // clear variable / form values
	$scope.clearForm = function(){
	   
	    $scope.draft = "";
	    
	}
	//get all messages
	$scope.getAll= function(){
		$http({
	        method: 'GET',
	        url: url+'getlist'
	    }).then(function successCallback(response) {
	    	// tell the user new product was created
	        Materialize.toast(response.data.length+" Messages Loaded", 1000);
	
	    	$scope.messages=response.data;
	    });
	}	
	//get new messages only
	$scope.getNewMessages= function(){
		requestInProgress=true;
		
		$http({
	        method: 'POST',
	        data:{'id':lastId},
	        url: url+'getMore'
	    }).then(function successCallback(response) {
	    	// tell the user new product was created
	    	if(response.data.length){
	    		Materialize.toast(response.data.length+" New Messages Loaded", 1000);
	    		for(x in response.data)
	    			$scope.messages.push(response.data[x]);
	    	}	
	    	requestInProgress=false;
			// the element you wish to scroll to.
			$location.hash('footer');

			// call $anchorScroll()
			$anchorScroll();
	    });
	}
	//
	$scope.messages = $scope.getAll();

	// create message
	$scope.sendMessage = function(){
	 
		$http({
	        method: 'POST',
	        data: {
	            'text' : $scope.draft,
	        },
	        url: url+'addMessage'
	    }).then(function successCallback(response) {
	 
	        // tell the user new product was created
	        Materialize.toast(response.data, 1000);
	
	        // clear modal content
	        $scope.clearForm();
	 
	        // refresh the list
	        $scope.getNewMessages();
	    });
	}

});