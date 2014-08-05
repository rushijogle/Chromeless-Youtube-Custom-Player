  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  var player;

  function onYouTubeIframeAPIReady() {
      player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: 'D3DqzM4ii1Y',
          playerVars: {
              'autoplay': 0,
              'controls': 0
          },
          events: {
              'onReady': onPlayerReady,
              'onStateChange': onPlayerStateChange
          }
      });
  }

  var done = false;

  function updatePlayerInfo() {
      if (player && player.getDuration) {
          var Volvalue = $('.ui-slider-handle').attr('style');
          var sliderWidth = $('#progressbar').width();
          var videoDuration = player.getDuration();
          var videoCurrent = player.getCurrentTime();
          var videoSec = videoCurrent / videoDuration;
          var updatedVideoLen = videoSec * 100;
          $("#progressbar").progressbar({
              value: updatedVideoLen
          });

          /*** volume **/

          /*** volume **/
      }
  }

  function stopVideo() {
      player.stopVideo();
  }

  function onPlayerStateChange(event) {
      switch (event.data) {
          case YT.PlayerState.ENDED:
              $('.appinfo').append('Video has ended.</br>');
              break;
          case YT.PlayerState.PLAYING:
              $('.appinfo').append('Video is playing.</br>');
              break;
          case YT.PlayerState.PAUSED:
              $('.appinfo').append('Video is paused.</br>');
              break;
          case YT.PlayerState.BUFFERING:
              $('.appinfo').append('Video is buffering.</br>');
              break;
          case YT.PlayerState.CUED:
              $('.appinfo').append('Video is cued.</br>');
              break;
      }
  }

  function onPlayerReady(event) {
      setInterval(updatePlayerInfo, 250);
      setInterval(Volumeprofile, 250);
      event.target.playVideo();
      event.target.setVolume(50);
      // bind events
      var playButton = document.getElementById("play-button");
      playButton.addEventListener("click", function() {
          player.playVideo();
      });

      var pauseButton = document.getElementById("pause-button");
      pauseButton.addEventListener("click", function() {
          player.pauseVideo();
      });

  }

  function Volumeprofile() {
      $("#audioSlider").slider({
          range: 'min',
          min: 0,
          max: 100,
          change: function() {
              var value = $("#audioSlider").slider("value");
              player.setVolume(value);
          }
      });
  }
