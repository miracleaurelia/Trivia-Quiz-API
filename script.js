var btn = document.getElementById('btn');
btn.addEventListener('click', nextItem);
var answers = {
    'correct': 0, 
    'wrong': 0
}

var output = document.getElementById('output');
var selAnswer = document.getElementById('selAnswers');

function nextItem() {
    btn.style.display = 'none';
    correctDis.style.display = 'none';
    wrongDis.style.display = 'none';
    var url = 'https://opentdb.com/api.php?amount=1';
    var html = ' ';
    requestAJAX(url, function (data) {
        console.log(data.results[0]);
        var obj = data.results[0];
        html += '<div><div class="category">' + obj.category + '</div>';
        html += '<div class="question">' + obj.question + '</div>';
        html += '</div>';
        output.innerHTML = html;
        questionBuilder(obj.correct_answer,obj.incorrect_answers);
    })
}

function correctAnswerIs() {
    var els = document.querySelectorAll('#selAnswers div');
    for (x = 0; x < els.length; x++) {
        if (els[x].getAttribute('data-cor') == "true") {
            return els[x].innerText;
        }
    }
}

var correctDis = document.getElementById('correct-display');
var correctAns = document.getElementById('correct-ans');
var wrongDis = document.getElementById('wrong-display');
function sendAnswer() {
    var res = event.target.getAttribute('data-cor');
    var corectAnswerValue = correctAnswerIs();
    btn.style.display = 'block';
    if (res == 'true') {
        answers.correct++;
        selAnswer.innerHTML = '';
        correctDis.style.display = 'flex';
    }
    else {
        answers.wrong++;
        selAnswer.innerHTML = '';
        correctAns.innerHTML = 'Wrong, it was  ' + corectAnswerValue;
        wrongDis.style.display = 'flex';
    }
    document.getElementById('right').innerHTML = answers.correct;
    document.getElementById('wrong').innerHTML = answers.wrong;
}

function questionBuilder(cor, incor) {
    var holder = incor;
    holder.push(cor);
    holder.sort();
    
    selAnswer.innerHTML = '';
    for (var x = 0; x < holder.length; x++) {
        var el = document.createElement('div');
        var checker = holder[x] == cor ? true : false;
        el.setAttribute('data-cor', checker);
        el.innerHTML= holder[x];
        el.addEventListener('click', sendAnswer);
        selAnswer.appendChild(el);
    }
}

// ajax call without jquery
function requestAJAX(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            callback(JSON.parse(xhr.responseText));
        }
    }
    xhr.open('GET', url, true);
    xhr.send();
}