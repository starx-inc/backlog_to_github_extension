var ready = require('document-ready')
var $ = require('jQuery')
import "../css/popup.css"

ready(function () {
  chrome.storage.sync.get(['github_url'], function(result) {
    $("#githubUrl").val(result.github_url)
  })

  $("#githubUrl").on('input', function(event) {
    chrome.storage.sync.set({'github_url': event.target.value}, function() {
      console.log('Value is set to ' + event.target.value)
    })
  })
})