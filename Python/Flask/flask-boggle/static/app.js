let secs = 60
let score = 0
const words = new Set()
let nplays = 0

function showTimer() {
    $('.timer').text(secs)
}

async function tick() {
    secs -= 1;
    showTimer();
    
    if (secs === 0) {
        clearInterval(timer);
        await scoreGame();
    }
}

const timer = setInterval(tick, 1000)

async function scoreGame() {
    $(".word-form").hide();
    const res = await axios.post("/post-score", { score: score });
    if (res.data.newRecord) {
      showMessage(`New record: ${score}`, "ok");
    } else {
      showMessage(`Final score: ${score}`, "ok");
    }
  }

$(".word-form").on("submit", (e)=>{
    e.preventDefault()
    wordSubmit();
});

function showMessage(msg, cls) {
    $(".msg")
        .text(msg)
        .removeClass()
        .addClass(`msg ${cls}`);
}

function showWord(word) {
    $(".words").append($("<li>", { text: word }));
}

function showScore() {
    $('.score').text(score)
}

async function wordSubmit() {
    const $word = $('.word')
    const word = $word.val()

    if (!word){
        return
    }
    if (words.has(word)) {
        showMessage(`Already found ${word}`, "err");
        return;
    }
    const res = await axios.get('/handle_word', { params: { word: word }})
    console.log(res)
    if (res.data.result === 'not-word'){
        showMessage(`Already found ${word}`, "err")
    }
    else if (res.data.result === "not-on-board") {
        showMessage(`${word} is not a valid word on this board`, "err");
    }
    else {
        showWord(word)
        score += word.length;
        showScore();
        words.add(word);
        showMessage(`Added: ${word}`, "ok")
    }
    $($word).val('').focus()
}

