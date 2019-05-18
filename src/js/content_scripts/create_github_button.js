import { NEWLINE, GITHUB_URL_KEY, GITHUB_TITLE_KEY, GITHUB_BODY_KEY, GITHUB_TITLE_TEMPLATE,
  GITHUB_BODY_TEMPLATE, NAME_ID_MAPPING, SPECIAL_CHAR_MAPPING, BREAKLINE } from '../constants'
import _ from 'lodash'

let ready = require('document-ready')
let $ = require('jQuery')

ready(function () {
  function findInnerTextByColumnName(tr, colName) {
    let element = $(tr).children("td[data-column-name='" + colName + "']")[0]
    if (element) {
      if (colName == 'priority') {
        return $($(element).children("span")[0]).data('tooltip');
      }
      return element.innerText
    }
    return '';
  }

  function convertToText(markdownFormat, tr) {
    let result = markdownFormat
    _.each(_.keys(NAME_ID_MAPPING), function(keyName) {
      let nameWithQuote = "`" + keyName + "`"
      if (markdownFormat.indexOf(nameWithQuote) != -1) {
        let innerText = findInnerTextByColumnName(tr, NAME_ID_MAPPING[keyName])
        result = _.replace(result, new RegExp(nameWithQuote, 'g'), innerText)
      }
    })
    return result;
  }

  function replaceSpecialChar(input) {
    let result = input
    _.each(_.keys(SPECIAL_CHAR_MAPPING), function(keyName) {
      result = _.replace(result, new RegExp(keyName, 'g'), SPECIAL_CHAR_MAPPING[keyName])
    })
    return result;
  }

  function onTableChange() {
    let targetTrs = $("#issues-table tbody tr")
    for (let i = 0; i < targetTrs.length; i++) {
      // Find td
      let issueTypeTd = $(targetTrs[i]).children("td[data-column-name='issueType']")[0]
      let issueKeyTd = $(targetTrs[i]).children("td[data-column-name='issueKey']")[0]
      let issueSummaryTd = $(targetTrs[i]).children("td[data-column-name='summary']")[0]
      let issueKey =  $(issueKeyTd).children('a')[0].innerText

      // Create button
      let githubLink = document.createElement('a');
      githubLink.setAttribute('class', 'button button--primary github_issue')
      githubLink.setAttribute('href', 'javascript:void(0)')

      githubLink.onclick = function(event){
        chrome.storage.sync.get([GITHUB_URL_KEY, GITHUB_TITLE_KEY, GITHUB_BODY_KEY], function(result){
          let url = result[GITHUB_URL_KEY]
          let title = result[GITHUB_TITLE_KEY] || GITHUB_TITLE_TEMPLATE
          let body = result[GITHUB_BODY_KEY] || GITHUB_BODY_TEMPLATE

          title = replaceSpecialChar(convertToText(title, targetTrs[i]))
          body = replaceSpecialChar(convertToText(body, targetTrs[i]))
          window.open(`${url}/issues/new?title=${title}&body=${body}`)
        })
      }

      issueKeyTd.appendChild(githubLink)
    }
  }

  onTableChange();

  // observer
  let target = document.getElementById("issues-table");
  if (target) {
    let observere = new MutationObserver((mutations) => {
      onTableChange();
    });
    let config = {
      characterData: true,
      childList: true
    };

    observere.observe(target, config);
  }

  // 詳細
  if (window.location.pathname.indexOf('view') != -1) {
    let targetDiv = $('.copy-key-btn')[0]

    let githubButton = document.createElement('button');
    githubButton.setAttribute('class', 'button button--primary detail_page')
    githubButton.innerText = "To Github"
    targetDiv.appendChild(githubButton)

    githubButton.onclick = function() {
      let ticket = window.location.pathname.split('/view/')[1]
      let project = ticket.split('-')[0]

      let newWindow = window.open(`${window.location.origin}/find/${project}?condition.query=${ticket}&to_github_issue=true`)
    }
  }

  if (window.location.search.indexOf('to_github_issue') != -1) {
    $('.github_issue')[0].click();
    window.close();
  }
})