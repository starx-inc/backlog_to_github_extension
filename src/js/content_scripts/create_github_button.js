var ready = require('document-ready')
var $ = require('jQuery')
const NEWLINE = "%0A"

ready(function () {
  var targetTrs = $("#issues-table tbody tr")
  var hostWithProtocol = location.protocol + '//'+ location.hostname

  for (var i = 0; i < targetTrs.length; i++) {
    // Find td
    var issueTypeTd = $(targetTrs[i]).children("td[data-column-name='issueType']")[0]
    var issueKeyTd = $(targetTrs[i]).children("td[data-column-name='issueKey']")[0]
    var issueSummaryTd = $(targetTrs[i]).children("td[data-column-name='summary']")[0]
    var issueKey =  $(issueKeyTd).children('a')[0].innerText

    // Create button
    var githubLink = document.createElement('a');
    var brTag = document.createElement('br');
    githubLink.innerHTML = "To Github"
    githubLink.setAttribute('class', 'button button--primary github')
    githubLink.setAttribute('href', 'javascript:void(0)')

    var title = `[${issueTypeTd.innerText}]` + issueSummaryTd.innerText
    var body = `%23%23%23%20Backlog URL` + NEWLINE
    body += `- [${issueKey}](${hostWithProtocol}/view/${issueKey})` + NEWLINE

    githubLink.onclick = function(event){
      window.open(`https://github.com/starx-inc/bee-cloud/issues/new?title=${title}&body=${body}`)
    }

    issueKeyTd.appendChild(brTag)
    issueKeyTd.appendChild(githubLink)
  }
})