const 정답 = "APPLE";

let index = 0;
let attepmts = 0;
let timer;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료됐습니다.";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:30vh; left:35vw; background-color:white; width: 200px; height:200px;";
    document.body.appendChild(div);
  };

  const nextLine = () => {
    if (attepmts === 5) return gameover();
    attepmts++;
    index = 0;
  };

  const keyBoardHandle = () => {
    const keyBlocks = document.querySelectorAll(".key-block");
    for (let i = 0; i < 26; i++) {
      if (정답.includes(keyBlocks[i].innerText)){
        keyBlocks[i].style.background = "#6AAA64";
      }
    }

  }

  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    keyBoardHandle();
    displayGameover();
    clearInterval(timer);
  };

  const handleEnterKey = () => {
    let 맞은_갯수 = 0;

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attepmts}${i}']`
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i];

      if (입력한_글자 === 정답_글자) {
        맞은_갯수++;
        block.style.background = "#6AAA64";
        block.className += " right-shake"
      } else if (정답.includes(입력한_글자)) block.style.background = "#C9B458";
      else {
        block.style.background = "#787C7E"; 
        block.className += " wrong-shake"
      }
    }
    if (맞은_갯수 === 5) gameover();
    else nextLine();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attepmts}${index - 1}']`
      );
      preBlock.innerText = "";
      index -= 1;
    }
  };

  const handleKeydown = (e) => {
    const key = e.key.toUpperCase();
    const keyCode = e.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attepmts}${index}']`
    );
    if (e.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (e.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index++;
    }
  };

  const handleKeyClick = (e) => {
    const key = e.target.innerText;
    if (!key) return;

    if (key === "ENTER") {
      if (index === 5) handleEnterKey();
      return;
    }

    if (key === "BACK") {
      handleBackspace();
      return;
    }

    if (index < 5) {
      const thisBlock = document.querySelector(
        `.board-block[data-index='${attepmts}${index}']`
      );
      thisBlock.innerText = key;
      index++;
    }
  };

  const addKeyboardClickEvents = () => {
    const keyBlocks = document.querySelectorAll(
      ".key-block, .enter-key-block, .backspace-key-block"
    );
    keyBlocks.forEach((block) => {
      block.addEventListener("click", handleKeyClick);
    });
  };

  const startTime = () => {
    const 시작_시간 = new Date();

    // 타이머
    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);
      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector("#timer");
      timeDiv.innerText = `걸린시간: ${분} : ${초}`;
    }

    timer = setInterval(setTime, 1000);
  };
  startTime();
  window.addEventListener("keydown", handleKeydown);
  addKeyboardClickEvents();
}

appStart();
