var app = angular.module('wiki', ['ui.router']);

function WikiPage(title, content) {
  this.title = title;
  this.content = content;
}

var pages = {
  Python: new WikiPage('Python', 'Python is a fun to use programming language. It is also a snake.'),
  HTML: new WikiPage('HTML', 'HTML is the markup language used for making pages on the Internet.')
};

app.run(function($rootScope) {
  $rootScope.page_list = pages;
});

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state({
      name: 'home',
      url: '/',
      templateUrl: 'home.html',
      controller: 'PageViewControler'
    })
    .state({
      name: 'page_view',
      url: '/{page_name}',
      templateUrl: 'page_view.html',
      controller: 'PageViewControler'
    })
    .state({
      name: 'page_edit',
      url: '/{page_name}/edit',
      templateUrl: 'page_edit.html',
      controller: 'EditPageController'
    });

    $urlRouterProvider.otherwise('/');
});
app.controller('PageViewControler', function($scope, $stateParams) {

  $scope.pages = $stateParams.page_name;
  $scope.page = pages[$stateParams.page_name];

});

app.controller('EditPageController', function($scope, $stateParams) {

  $scope.pages = $stateParams.page_name;
  $scope.page = pages[$stateParams.page_name];
  if (!$scope.page) {
    var newPage = new WikiPage($scope.pages, "");
    console.log(newPage);
    pages[$scope.pages] = newPage;
    $scope.page = pages[$stateParams.page_name];
  }

});
