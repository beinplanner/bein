ptBossApp.controller('PastIncomeController', function($scope,$http,$translate,parameterService,$location,homerService,commonService) {

	$scope.year;
	$scope.firmId="0";
	$scope.incomes;
	$scope.pevIncomes;
	
	$scope.firmName="";
	$scope.pimIncome;
	$scope.pimExpense;
	$scope.pimComment;
	
	$scope.ptCurrency;
	
	$scope.totalExpenseAmountYearly;
	$scope.totalIncomeAmountYearly;
	$scope.totalEarnAmountYearly;
	$scope.totalExpenseAmountMonthly;
	$scope.totalIncomeAmountMonthly;
	$scope.totalEarnAmountMonthly;
	
	$scope.monthName;
	$scope.query=true;
	
	
	$scope.incomeDetail=new Object();
	$scope.incomeDetail.totalIncome=0;
	$scope.incomeDetail.totalExpense=0;
	$scope.incomeDetail.totalEarn=0;
	
	$scope.main=true;
	$scope.ptMonthlyInOutObj=new Object();
	
	$scope.months=new Array({value:"0",name:$translate.instant("pleaseSelect")}
    ,{value:"1",name:$translate.instant("january")}
   ,{value:"2",name:$translate.instant("february")}
   ,{value:"3",name:$translate.instant("march")}
   ,{value:"4",name:$translate.instant("april")}
   ,{value:"5",name:$translate.instant("may")}
   ,{value:"6",name:$translate.instant("june")}
   ,{value:"7",name:$translate.instant("july")}
   ,{value:"8",name:$translate.instant("august")}
   ,{value:"9",name:$translate.instant("september")}
   ,{value:"10",name:$translate.instant("october")}
   ,{value:"11",name:$translate.instant("november")}
   ,{value:"12",name:$translate.instant("december")}
   );


	$scope.years=new Array();
	
	
	
	$scope.initPIC=function(){
		commonService.pageName=$translate.instant("pastIncomeTitle");
		commonService.pageComment=$translate.instant("pastIncomeTitleComment");
		commonService.normalHeaderVisible=true;
		commonService.setNormalHeader();
		
		var date=new Date();
		var year=date.getFullYear();
		
		for(var i=-10;i<10;i++){
			$scope.years.push(year+i);
		}
		
		$scope.year=year;
		
		commonService.getPtGlobal().then(function(global){
			$scope.dateFormat=global.ptScrDateFormat;
			$scope.dateTimeFormat=global.ptDateTimeFormat;
			$scope.ptCurrency=global.ptCurrency;
			
		});
	}
	
	$scope.closeDetail=function(income){
		if($scope.main){
			$scope.query=true;
		}else{
			$scope.main=true;
		}
		
		
		
		
	}
	
	$scope.editIncome=function(income){
		$(".splash").css("display",'');
		$scope.incomeDetail.totalIncome=income.totalIncome;
		$scope.incomeDetail.totalExpense=income.totalExpense;
		$scope.incomeDetail.totalEarn=income.totalEarn;
		
		var year=income.pimYear;
		var month=income.pimMonth;
		
		
		$http({
			  method:'POST',
			  url: "/bein/income/findPtInOutDetailForMonth/"+year+"/"+month,
			}).then(function successCallback(response) {
				$scope.ptMonthlyInOutObj=response.data;
				$scope.main=false;
				$(".splash").css("display",'none');
			}, function errorCallback(response) {
				$(".splash").css("display",'none');
			});
		
		
	}
	
	$scope.queryPtInCome=function(){
		$scope.query=false;
		$scope.main=true;
		findPastForYear();
		
	}
	
	
	function findPastForYear(){
		$(".splash").css("display",'');
		$http({
			  method: 'POST',
			  url: "/bein/dashboard/findPastForYear/"+$scope.year,
			}).then(function successCallback(response) {
				$scope.incomes=response.data.resultObj;
				findPrevForYear($scope.year-1);
			}, function errorCallback(response) {
				findPrevForYear($scope.year-1);
			});
	}
	
	function findPrevForYear(prevYear){
		$(".splash").css("display",'');
		
		$http({
			  method: 'POST',
			  url: "/bein/dashboard/findPastForYear/"+prevYear,
			}).then(function successCallback(response) {
				$scope.pevIncomes=response.data.resultObj;
				getDataToGraph();
				$(".splash").css("display",'none');
			}, function errorCallback(response) {
				$scope.pevIncomes=response.data.resultObj;
				$(".splash").css("display",'none');
			});
		
	}
	
	
	function getDataToGraph(){
		
		var inOut=$scope.incomes;
		
		var data1 = [ [1, inOut[0].totalIncome]
					, [2, inOut[1].totalIncome]
					, [3, inOut[2].totalIncome]
					, [4, inOut[3].totalIncome]
					, [5, inOut[4].totalIncome]
					, [6, inOut[5].totalIncome]
					, [7, inOut[6].totalIncome]
					, [8, inOut[7].totalIncome]
					, [9, inOut[8].totalIncome]
					, [10, inOut[9].totalIncome]
					, [11, inOut[10].totalIncome]
					, [12, inOut[11].totalIncome] ];
		
		var data2 = [ [1, inOut[0].totalExpense]
					, [2, inOut[1].totalExpense]
					, [3, inOut[2].totalExpense]
					, [4, inOut[3].totalExpense]
					, [5, inOut[4].totalExpense]
					, [6, inOut[5].totalExpense]
					, [7, inOut[6].totalExpense]
					, [8, inOut[7].totalExpense]
					, [9, inOut[8].totalExpense]
					, [10, inOut[9].totalExpense]
					, [11, inOut[10].totalExpense]
					, [12, inOut[11].totalExpense] ];
		
	
        var chartUsersOptions = {
            series: {
                splines: {
                    show: true,
                    tension: 0.4,
                    lineWidth: 1,
                    fill: 0.4
                },
            },
            grid: {
                tickColor: "#f0f0f0",
                borderWidth: 1,
                borderColor: 'f0f0f0',
                color: '#6a6c6f'
            },
            colors: [ "#62cb31", "#fedde4"],
        };

        $.plot($("#flot-line-chart-income"), [data1, data2], chartUsersOptions);
        
	}
	
	
	
	
	
});