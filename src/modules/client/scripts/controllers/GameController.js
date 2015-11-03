angular.module('lvlup.client')
.controller('GameController', function($rootScope, $scope, game) {

	var ctrl = this;

	game.connect($scope);

	ctrl.answer = function(answer) {
		if (!ctrl.answeringEnabled) return;

		ctrl.answeringEnabled = false;
		// TODO: show transmitting indicator
		game.setAnswer(answer).then(function() {
			// TODO: hide transmitting indicator
			ctrl.chosenAnswer = answer;
		})
		.catch(function() {
			// TODO: Could not set answer (should be output anything)
		});
	};

	ctrl.timeUp = function() {
		ctrl.answeringEnabled = false;
	};

	$scope.$on('game:answer-chosen', function(ev, answer) {
		ctrl.answeringEnabled = false;
		ctrl.chosenAnswer = answer;
	});

	$scope.$on('game:player', function(ev, player) {
		ctrl.player = player;
	});

	$scope.$on('game:player:update', function(ev, update) {
		for (var key in update) {
			ctrl.player[key] = update[key];
		}
	});

	$scope.$on('game:question', function(ev, question, timeRemaining) {
		ctrl.chosenAnswer = null;
		ctrl.answeringEnabled = true;
		ctrl.question = question;
		ctrl.questionEndTime = Date.now() + timeRemaining;
		ctrl.solution = null;
	});

	$scope.$on('game:highscore', function(ev, highscore) {
		ctrl.highscore = highscore;
	});

	$scope.$on('game:solution', function(ev, solution) {
		ctrl.solution = solution;
		ctrl.answeringEnabled = false;
	});

	$scope.$on('game:connect', function() {
		console.log("onConnect in controller");
		// TODO: hide loading spinner
	});

	$scope.$on('game:disconnect', function() {
		console.log("onDisconnect in controller");
		// TODO: show loading spinner of some kind
	});

});