'use strict';

angular.module('manchiApp')
  .controller('WritingController', ['$scope', 'writingFactory',
    function($scope, writingFactory) {
      $scope.lessons = writingFactory.getLessons();
    }
  ])
  .controller('WritingLessonController', ['$scope', '$stateParams', 'writingFactory',
    function($scope, $stateParams, writingFactory) {
      var shengci = [];
      var lessonId = $stateParams.lessonId - 1;
      $scope.lessonId = lessonId + 1;
      var words = writingFactory.getNewWords(lessonId);
      $scope.lessonTopic = writingFactory.getLesson(lessonId).topic;
      shengci = shengci.concat(words);
      $scope.shengci = shengci;
      $scope.playAudio = function(audioPath) {
        var audio = new Audio(audioPath);
        audio.play();
      }
    }
  ])
  .controller('WritingQuestionController', ['$scope', '$stateParams', '$state', 'writingFactory',
    function($scope, $stateParams, $state, writingFactory) {
      var lessonId = $stateParams.lessonId - 1;
      $scope.lessonId = lessonId;
      $scope.lessonTopic = writingFactory.getLesson(lessonId).topic;
      var questionId = $stateParams.questionId - 1;
      $scope.value = '';
      $scope.questionId = questionId;
      $scope.word = writingFactory.getQuestion(lessonId, questionId);
      $scope.questionLength = writingFactory.getLesson(lessonId).writeWords.length;
      $scope.accepted = false;
      $scope.warning = false;
      $scope.checkAns = '';
      console.log($scope.value.$pristine);
      $scope.check = function() {
        if ($scope.value !== '') {
          if ($scope.value == $scope.word.hanzi) {
            $("#answer").addClass('has-success');
            var success = new Audio('./audio/success.mp3');
            success.play();
            $scope.accepted = true;
            console.log("Good game, well played!");
            setTimeout(function() {
              if (questionId + 1 < $scope.questionLength) {
                $state.go('app.writing.lesson.question', {
                  lessonId: lessonId + 1,
                  questionId: questionId + 2
                });
              } else {
                $state.go('app.writing.done', {
                  lessonId: lessonId + 1
                })
              }
            }, 2000);
          } else {
            $scope.warning = true;
            $('#answer').addClass('has-warning');
            console.log("Egrrrrr! Goodluck next time!")
          }
        } else {
          $("#answer").removeClass('has-warning');
          $scope.warning = false;
        }
      }

      $scope.playAudio = function(audioPath) {
        var audio = new Audio(audioPath);
        $('.fa-volume-up').addClass('playing');
        audio.addEventListener('ended', function() {
          $('.fa-volume-up').removeClass('playing');
        })
        audio.play();
      }
    }
  ])
  .controller('WritingDoneController', ['$scope', '$stateParams', 'writingFactory', '$state',
    function($scope, $stateParams, $state, writingFactory) {
      var lessonId = $stateParams.lessonId - 1;
      $scope.lessonId = lessonId;
      //$scope.lessonTopic = writingFactory.getLesson(lessonId).topic;

    }
  ])
