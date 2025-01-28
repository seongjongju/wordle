const 정답 = "APPLE"

let attempts = 0;
let index = 0;

function appStart() {
    const displayGameover = () => {
        const div= document.createElement("div");
        div.innerText = "게임이 종료됐습니다."
        div.style = "display:flex; justify-content:center; align-items: center; position: absolute; top: 40vh; left: 50%; transform: translateX(-50%); width: 200px; background-color: #fff;";
        document.body.appendChild(div);
    }

    //게임종료
    const gameover = () => {
        window,removeEventListener("keydown", handleKeydown);
        displayGameover();
        clearInterval(timer); //타이머 종료
    };

    //다음줄로 이동
    const nextLine = () => {
        if(attempts === 5) return gameover();
        attempts ++;
        index = 0;
    };

    //정답확인
    const handleEnterkey = () => {
        let 맞은_갯수 = 0;
        for(let i=0; i<5; i++) {
            const block = document.querySelector(`.board-column[data-index='${attempts}${i}']`);
            const 입력한_글자 = block.innerText;
            const 정답_글자 = 정답[i];

            if(입력한_글자===정답_글자) {
                맞은_갯수 ++;
                block.style.backgroundColor = "#6aaa64";
            }
            else if (정답.includes(입력한_글자)) block.style.backgroundColor = "#c9b458";
            else block.style.backgroundColor = "#787c7e";
            block.style.color = "#fff";
        };

        if(맞은_갯수 === 5) gameover();
        else nextLine();
    };

    //글자 지우기
    const handleBackspace = () => {
        if(index > 0) {
            const preBlock = document.querySelector(`.board-column[data-index='${attempts}${index - 1}']`);
            preBlock.innerText = "";
        }
        
        if(index !== 0 ) index -= 1;
    };

    //키보드를 누르면
    const handleKeydown = (event) => {
        const key = event.key;
        const keyCode = event.keyCode;
        const thisBlock = document.querySelector(`.board-column[data-index='${attempts}${index}']`);

        //글자 지우기
        if(event.key === "Backspace") handleBackspace();
        //보드판에 나타내기
        else if (index === 5) {
            if (event.key === "Enter") handleEnterkey();
            else return;
        } 
        else if (event.key === "Enter") handleEnterkey();
        else if (65 <= keyCode && keyCode <= 90) {
            thisBlock.innerText = key;
            index ++;
        }
    };  

    const startTimer = () => {
        const 시작_시간 = new Date();

    function setTime() {
        const 현재_시간 = new Date();
        const 흐른_시간 = new Date(현재_시간 - 시작_시간)
        const 분 = 흐른_시간.getMinutes().toString();
        const 초 = 흐른_시간.getSeconds().toString();
        const timeH2 = document.querySelector(".time");
        timeH2.innerText = `${분.padStart(2, "0")}:${초.padStart(2, "0")}`;
        };

        //주기성
        timer = setInterval(setTime, 1000);
    };

    startTimer();
    window.addEventListener("keydown", handleKeydown);
};

appStart();