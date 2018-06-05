ptBossApp.controller('ZmsStockInController', function($scope,$http,$translate,parameterService,$location,homerService,commonService) {

	
	$scope.zmsProducts;
	$scope.zmsProduct;
	
	$scope.zmsStockIns;
	$scope.zmsStockIn=new Object();
	$scope.zmsStockIn.stokInDate=new Date();
	$scope.zmsStockIn.productId="0";
	
	$scope.productIn=true;
	$scope.newStokIn=false;
	
	
	toastr.options = {
	        "debug": false,
	        "newestOnTop": false,
	        "positionClass": "toast-top-center",
	        "closeButton": true,
	        "toastClass": "animated fadeInDown",
	    };
	
	$scope.init = function(){
     	$("[data-toggle=popover]").popover();
    		commonService.pageName=$translate.instant("SportTitle");
		commonService.pageComment=$translate.instant("defSportDefinitionComment");
		commonService.normalHeaderVisible=true;
		commonService.setNormalHeader();
		findAllZmsStockIn();
		
    };
    
    $scope.addNewZmsStockIn =function(){
		
    	findAllZmsProduct().then(function(zmsProducts){
    		$scope.zmsProducts=zmsProducts;
    		$scope.zmsStockIn=new Object();
			$scope.zmsStockIn.stockInDate=new Date();
			$scope.zmsStockIn.productName="";
			$scope.zmsStockIn.productComment="";
			$scope.zmsStockIn.productId="0";
			
			$scope.productIn=false;
			$scope.newStokIn=true;
    	});
	};
    
	
	function findAllZmsProduct(){
		return $http({
		  method: 'POST',
		  url: "/bein/zms/product/findAll"
		}).then(function successCallback(response) {
			return response.data;
		}, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
    }
	
	$scope.deleteZmsStockIn =function(zmsStockIn){
		$http({
			  method: 'POST',
			  url: "/bein/zms/stockin/delete",
			  data:angular.toJson(zmsStockIn)
			}).then(function successCallback(response) {
				toastr.success($translate.instant(response.data.resultMessage))
				findAllDefSport();
			}, function errorCallback(response) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			});
	};
	
	
	$scope.createZmsStockIn =function(){
		$http({
			  method: 'POST',
			  url: "/bein/zms/stockin/create",
			  data:angular.toJson($scope.zmsStockIn)
			}).then(function successCallback(response) {
				$scope.zmsProduct=response.data.resultObj;
				
				$scope.willZmsStockInCreate=true;
				findAllZmsStockIn();
			}, function errorCallback(response) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			});
	};
		
	
	
	$scope.showZmsStockIn =function(productId){
		$http({
			  method: 'POST',
			  url: "/bein/zms/stockin/findById/"+productId
			}).then(function successCallback(response) {
				$scope.zmsProduct=response.data;
				$scope.willZmsStockInCreate=true;
			}, function errorCallback(response) {
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			});
		
	};
	
    function findAllZmsStockIn(){
		$http({
		  method: 'POST',
		  url: "/bein/zms/stockin/findAllZmsStock"
		}).then(function successCallback(response) {
			$scope.zmsStockIns=response.data;
			if($scope.zmsStockIns.length!=0){
				$scope.noStok=false;
			}else{
				$scope.noStok=true;
			}
			
		}, function errorCallback(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		});
    }
	
});