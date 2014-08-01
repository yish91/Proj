/*!
 *
 *  Web Starter Kit
 *  Copyright 2014 Google Inc. All rights reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License
 *
 */

var drop;

if ($(".drop-target")[0]) {
  $('.popover').each(function() {
    var $popover, $target, content, drop, openOn, theme;
    $popover = $(this);
    theme = $popover.data('theme');
    openOn = $popover.data('open-on') || 'click';
    $target = $popover.find('.drop-target');
    $target.addClass(theme);
    content = $popover.find('.drop-content').html();
    return drop = new Drop({
      target: $target[0],
      classes: theme,
      position: 'bottom right',
      constrainToWindow: true,
      constrainToScrollParent: false,
      openOn: openOn,
      content: content
    });
  });
}

(function () {
  'use strict';

  // var position = 0;
  var menuButton = document.getElementById("menu");
  var notificationsButton = document.getElementById("notifications");
  var searchButton = document.getElementById("search");
  var leftDrawer = document.getElementById("leftDrawer");
  var rightDrawer = document.getElementById("rightDrawer");
  var searchDrawer = document.getElementById("searchDrawer");
  var vignetteDrawer = document.getElementById("vignetteDrawer");

  function closeDrawers (argument) {
    leftDrawer.classList.remove("open");
    rightDrawer.classList.remove("open");
    searchDrawer.classList.remove("open");
    vignetteDrawer.classList.remove("open");
  }

  function hasOpenDrawers () {
    return (leftDrawer.classList.contains("open") || rightDrawer.classList.contains("open") || searchDrawer.classList.contains("open"));
  }

  function toggleLeft(evt) {
    if (leftDrawer.classList.contains("open")) {
      closeDrawers();
      return;
    }

    if (hasOpenDrawers()) {
      closeDrawers();
      // return;
    }

    vignetteDrawer.classList.add("open");
    leftDrawer.classList.add("open");
  }

  function toggleRight(evt) {
    if (rightDrawer.classList.contains("open")) {
      closeDrawers();
      return;
    }

    if (hasOpenDrawers()) {
      closeDrawers();
      // return;
    }

    vignetteDrawer.classList.add("open");
    rightDrawer.classList.add("open");
  }

  function toggleSearch(evt) {
    if (searchDrawer.classList.contains("open")) {
      closeDrawers();
      return;
    }

    if (hasOpenDrawers()) {
      closeDrawers();
      // return;
    }

    searchDrawer.classList.add("open");
  }

  function closeDrawer() {
    $(document).on('click', function(event){
      if (!$(event.target).closest('#rightDrawer').length) {
        rightDrawer.classList.remove("open");
        $(document).unbind('click');
        console.log("closed rightDrawer");
      }
    });
  }

  menuButton.addEventListener("click", toggleLeft);
  if (notificationsButton) { // means the use is logged in
    notificationsButton.addEventListener("click", toggleRight);
  }
  searchButton.addEventListener("click", toggleSearch);
  vignetteDrawer.addEventListener("click", closeDrawers);

  // removes text in the search box when user clicks on X
  $('input.deletable').wrap('<span class="deleteicon" />').after($('<span/>').click(function() {
      $(this).prev('input').val('').focus();
  }));

})();


