var weatherApp=angular.module("weatherApp",['ngRoute','ngResource'])

weatherApp.config(function($routeProvider){
    $routeProvider
    .when("/",{
        templateUrl:"./pages/home.html",
        controller:"homeController",
        replace:true
    })
    .when("/forcast",{
        templateUrl:"./pages/forcast.html",
        controller:"forcastController",
        replace:true
    })
})

weatherApp.service("addressService",function(){
    this.address="New York"
})



weatherApp.controller("homeController",["$scope","addressService",function($scope,addressService){  
    $scope.address=addressService.address
    $scope.$watch("address",function(newValue,oldVale){
        addressService.address=$scope.address
    })
}])

weatherApp.controller("forcastController",["$scope","addressService","$resource",function($scope,addressService,$resource){
    $scope.address=addressService.address
    $scope.weatherAPI=$resource("https://api.openweathermap.org/data/2.5/weather")
    $scope.weatherResult=$scope.weatherAPI.get({q:$scope.address,appid:"8442995cbba86562eefe5f28d36f8036"})
    console.log($scope.weatherResult)
}])