const inputNum = document.getElementById("inputNum");
const randomTextElement = document.getElementById("randomText");
const lbResult = document.getElementById("lbResult");
const lbWrongWords = document.getElementById("lbWrongWords");
const timerElement = document.getElementById("timer");
const btResetGame = document.getElementById("btResetGame");
const backgroundMusic = document.getElementById("backgroundMusic");

const timeLimit = 20; // 20 giây
let timer;
let timeLeft = timeLimit;
let wordCount = 0;
let wrongWordCount = 0;
let isGameActive = false;
let startedTyping = false;

const paragraphs = [
  "Ngày hôm nay trời trong xanh đẹp như tranh mình cùng dạo vòng cả thế giới đừng vội nhanh một hành trình nhật ký yêu thương đời mình hát vu vơ về tình đầu em ơi ngày hôm ấy là cô bé tuổi đôi mươi vậy mà giờ đã lớn trưởng thành hơn mặc váy cưới chẳng điều gì dừng bước em tôi vì người mãi kiêu sa đẹp tuyệt ngời",
  "Anh ở vùng quê khu nghèo khó đó có trăm điều khó muốn lên thành phố nên phải cố sao cho bụng anh luôn no thế rồi gặp em những vụn vỡ đã lỡ đêm lại nhớ nằm mơ gọi tên em thiên Lý ơi em có thể ở lại đây không biết chăng ngoài trời mưa giông nhiều cô đơn lắm em thiên lý ơi anh chỉ mong người bình yên thôi nắm tay ghị chặt đôi môi, rồi ngồi giữa lưng đồi",
  "Em yêu ai em đang yêu thương ai hay em đang cô đơn chờ mai sau cho tương lai sao không yêu ngay bây giờ mang cho anh những ngây thơ đêm nay nay có nằm mơ anh bơ vơ như kẻ làm thơ ngồi một mình để rồi lại ngẩn ngơ người thì về người ở lại mà lòng thì ngẩn ngơ bầu trời nào mình từng ngọt ngào rồi khẽ tay nắm tay áo em khẽ bay nhẹ lây",
  "Em về chưa đang ở đâu ngoài trời thì đỗ mưa bước chân người đi xa dần xa lệ nhòe trên khóe mi em nói thương anh yêu anh vì anh nắng hay mưa vẫn ở cạnh nhau sao giờ đành khuất lối chìm bóng tối lệ chia phôi hoa bàng rơi mây mù giăng tạm biệt hương tóc thơm chúc em bình yên mong tình duyên ngọt ngào đôi cánh tay",
  "Cô bé năm xưa yêu anh giờ đây hóa lung linh cơn gió nhẹ lầy em dịu dàng biết mấy tà áo trắng chiều tung bay sao em vô tình anh quá em ơi con tim đau lòng thương lắm em ơi tìm về lại một chút hương thơm tìm về lại một chút ngây ngô đợi chờ ai á ai đợi chờ ai á bên kia sông buồn mây trắng êm trôi",
  "Bao năm hẹn thề em có thương tôi mình hãy ngồi lại với nhau kia chuyện trò một chút mai khi dòng thời gian vô tình người mang nơi đó anh chờ em chúng ta sẽ yêu nhưng đáng tiếc là ai khác không phải nhìn nhau nữa đâu duyên tình ta giờ phai nhạt nơi cánh chim ùa về nơi nỗi đau gần kề chẳng đi cùng lề vì thế như thằng hề",
  "Kệ cuộc đời này trôi cứ như áng mây ngày bay đến nơi đó đây xây giấc mơ với nhau mà đau lắm em có hay thương thân ai bờ bai ngày xưa yêu thương mà giờ đành xa xăm muôn phương cuối con đường ngày hôm ấy người đã nói lời chia tay lệ hoen cay lòng đau nhói chẳng thể khóc vì còn thương vì còn yêu",
  "Giá như em đừng đi giá như em ở đây lắng nghe anh vài câu trái tim anh đậm sâu nhưng sao bây giờ khuất lối chìm bóng tối lệ chia phôi sao em vô tình anh quá em ơi con tim đau lòng thương lắm em ơi tìm về lại một chút yêu thương tìm về lại một chút ngây ngô đợi chờ ai á ai đợi chờ ai á bên kia sông buồn mây trắng êm trôi bao năm hẹn thì em có thương tôi",
];

function startGame() {
  if (isGameActive) return;

  isGameActive = true;
  wordCount = 0;
  wrongWordCount = 0;
  timeLeft = timeLimit;
  inputNum.disabled = false;
  lbResult.textContent = "Kết quả: 0 từ đúng";
  lbWrongWords.textContent = "Từ sai: 0";
  btResetGame.disabled = false;
  inputNum.value = "";

  setRandomText();
  updateTimer();
  backgroundMusic.currentTime = 0; // Đặt lại thời gian phát nhạc về 0
  backgroundMusic.play();
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    updateTimer();

    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

function endGame() {
  isGameActive = false;
  inputNum.disabled = true;
  btResetGame.disabled = false; // Cho phép nhấn nút reset khi trò chơi kết thúc
  lbResult.textContent = `Kết quả: ${wordCount} từ đúng`;
  backgroundMusic.pause();
}

function setRandomText() {
  const randomParagraph =
    paragraphs[Math.floor(Math.random() * paragraphs.length)];
  randomTextElement.textContent = randomParagraph;
  inputNum.placeholder = "Nhập văn bản ở trên đây...";
}

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  timerElement.textContent = `Thời gian: ${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}

function checkInput() {
  if (!isGameActive) return;

  if (!timer) {
    startTimer(); // Bắt đầu đếm ngược khi người dùng bắt đầu nhập
  }

  const userInput = inputNum.value.trim();
  const currentText = randomTextElement.textContent.trim();

  const userWords = userInput.split(" ");
  const currentWords = currentText.split(" ");

  // Đếm số từ đúng và từ sai
  wordCount = 0;
  wrongWordCount = 0;

  const highlightedText = currentWords
    .map((word, index) => {
      if (index < userWords.length) {
        if (userWords[index] === word) {
          wordCount++;
          return `<u>${word}</u>`;
        } else {
          wrongWordCount++;
          return `<span style="color: red;">${word}</span>`;
        }
      }
      return word;
    })
    .join(" ");

  randomTextElement.innerHTML = highlightedText;

  lbResult.textContent = `Kết quả: ${wordCount} từ đúng`;
  lbWrongWords.textContent = `Từ sai: ${wrongWordCount}`;
}

function resetGame() {
  clearInterval(timer);
  timer = null; // Đặt lại bộ đếm thời gian để bắt đầu lại khi người dùng nhập
  endGame();
  startGame();
}

inputNum.addEventListener("input", checkInput);
btResetGame.addEventListener("click", resetGame);
inputNum.addEventListener("focus", startGame);
