import "../css/options.css";
import { GITHUB_TITLE_KEY, GITHUB_BODY_KEY, GITHUB_TITLE_TEMPLATE, GITHUB_BODY_TEMPLATE } from './constants';

let $ = require('jQuery')
let ready = require('document-ready')
let showdown  = require('showdown')
let converter = new showdown.Converter()

ready(function () {
  // On input
  $("#githubTitle").on('input', function(event){
    let text = event.target.value
    let html = converter.makeHtml(text)
    $("#previewGithubTitle").html(html);
    let titleObj = {}
    titleObj[GITHUB_TITLE_KEY] = event.target.value
    chrome.storage.sync.set(titleObj)
  })

  $("#githubBody").on('input', function(event){
    let text = event.target.value
    let html = converter.makeHtml(text)
    $("#previewGithubBody").html(html);
    let bodyObj = {}
    bodyObj[GITHUB_BODY_KEY] = event.target.value
    chrome.storage.sync.set(bodyObj)
  })

  // On pageload
  chrome.storage.sync.get([GITHUB_TITLE_KEY], function(result) {
    $("#githubTitle").val(result[GITHUB_TITLE_KEY] || GITHUB_TITLE_TEMPLATE)
    $("#githubTitle").trigger('input')
  })
  chrome.storage.sync.get(GITHUB_BODY_KEY, function(result) {
    $("#githubBody").val(result[GITHUB_BODY_KEY] || GITHUB_BODY_TEMPLATE)
    $("#githubBody").trigger('input')
  })
})


