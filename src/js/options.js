import "../css/options.css";
var $ = require('jQuery')
var ready = require('document-ready')
var showdown  = require('showdown')
var converter = new showdown.Converter()

ready(function () {
  $("#githubTitle").on('input', function(event){
    var text = event.target.value
    var html = converter.makeHtml(text)
    $("#previewGithubTitle").html(html);
  })
  $("#githubBody").on('input', function(event){
    var text = event.target.value
    var html = converter.makeHtml(text)
    $("#previewGithubBody").html(html);
  })
})


