const comp = "O";
const human = "X";

let board_complete = false;
let game_area = ["", "", "", "", "", "", "", "", ""];

const container = document.querySelector(".game_board");
const game_result = document.querySelector(".winner");

boardcomplete = () => {
  let flag = true;
  game_area.forEach((element) => {
    if (element != comp && element != human) {
      flag = false;
    }
  });
  board_complete = flag;
};

const check = (a, b, c) => {
  return (
    game_area[a] == game_area[b] &&
    game_area[b] == game_area[c] &&
    (game_area[a] == comp || game_area[a] == human)
  );
};

const match_c = () => {
  for (i = 0; i < 9; i += 3) {
    if (check(i, i + 1, i + 2)) {
      document.querySelector(`#cell_${i}`).classList.add("win");
      document.querySelector(`#cell_${i + 1}`).classList.add("win");
      document.querySelector(`#cell_${i + 2}`).classList.add("win");
      return game_area[i];
    }
  }

  for (i = 0; i < 3; i++) {
    if (check(i, i + 3, i + 6)) {
      document.querySelector(`#cell_${i}`).classList.add("win");
      document.querySelector(`#cell_${i + 3}`).classList.add("win");
      document.querySelector(`#cell_${i + 6}`).classList.add("win");
      return game_area[i];
    }
  }

  if (check(0, 4, 8)) {
    document.querySelector("#cell_0").classList.add("win");
    document.querySelector("#cell_4").classList.add("win");
    document.querySelector("#cell_8").classList.add("win");
    return game_area[0];
  }
  if (check(2, 4, 6)) {
    document.querySelector("#cell_2").classList.add("win");
    document.querySelector("#cell_4").classList.add("win");
    document.querySelector("#cell_6").classList.add("win");
    return game_area[2];
  }
  return "";
};

const winner_check = () => {
  let res = match_c();
  if (res == comp) {
    winner.innerText = "Computer Won!!";
    winner.classList.add("compWin");
    board_complete = true;
  } else if (res == human) {
    winner.innerText = "Human Won!!";
    winner.classList.add("humanWin");
    board_complete = true;
  } else if (board_complete) {
    winner.innerText = "Draw!!";
    winner.classList.add("draw");
  }
};

const render_board = () => {
  container.innerHTML = "";
  game_area.forEach((e, i) => {
    container.innerHTML += `<div id="cell_${i}" class="cell" onclick="addPlayerMove(${i})">${game_area[i]}</div>`;
    if (e == comp || e == human) {
      document.querySelector(`#cell_${i}`).classList.add("locked");
    }
  });
};

const game_loop = () => {
  render_board();
  boardcomplete();
  winner_check();
};

const addPlayerMove = (e) => {
  if (!board_complete && game_area[e] == "") {
    game_area[e] = human;
    game_loop();
    addComputerMove();
  }
};

const addComputerMove = () => {
  if (!board_complete) {
    do {
      selected = Math.floor(Math.random() * 9);
    } while (game_area[selected] != "");
    game_area[selected] = comp;
    game_loop();
  }
};

const game_reset = () => {
  game_area = ["", "", "", "", "", "", "", "", ""];
  board_complete = false;
  winner.classList.remove("playerWin");
  winner.classList.remove("compWin");
  winner.classList.remove("draw");
  winner.innerText = "";
  render_board();
};

render_board();
