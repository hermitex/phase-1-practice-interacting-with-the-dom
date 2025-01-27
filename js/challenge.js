const counter = document.querySelector("#counter");
const minus = document.querySelector("#minus");
const add = document.querySelector("#plus");
const pause = document.querySelector("#pause");
const commentList = document.querySelector("#list");
const commentForm = document.querySelector("#comment-form");
const heart = document.querySelector("#heart");
const likeList = document.querySelector(".likes");
const controls = document.querySelectorAll(".control");
let modifiedCount = 0;
let count = 0;
let intervalId;
let counterIsPaused = false;

const startCounter = (isCounting = true) => {
  if (isCounting) {
    intervalId = setInterval(() => {
      count++;
      modifiedCount = count;
      counter.textContent = count;
    }, 1000);
  }
};

const pauseResumeCounter = () => {
  if (pause.textContent.trim() === "pause") {
    pauseCounter();
  } else {
    restartCounter();
  }
};

const pauseCounter = () => {
  clearInterval(intervalId);
  pause.textContent = "resume";
  controls.forEach((control) => control.setAttribute("disabled", true));
};

const minusCounter = () => {
  pauseCounter();
  count = count - 1;
  counter.textContent = count;
  restartCounter();
};

const addCounter = () => {
  pauseCounter();
  count = count + 1;
  counter.textContent = count;
  restartCounter();
};

const restartCounter = () => {
  pause.textContent = "pause";
  controls.forEach((control) => (control.disabled = false));
  intervalId = setInterval(() => {
    count++;
    modifiedCount = count;
    counter.textContent = count;
  }, 1000);
};

const addCounterComment = (formData) => {
  formData.preventDefault();
  let data = new FormData(formData.target);
  let comment = data.get("comment");
  if (comment.trim()) {
    let p = document.createElement("p");
    p.textContent = comment;
    commentList.appendChild(p);
  }
  formData.target.reset();
};

let likes = {};
const addALike = () => {
  let like;
  if (count in likes) {
    likes[count]++;
    like = `${count} has been liked ${likes[count]} times`;
  } else {
    likes[count] = 0;
    like = `${count} has been liked ${++likes[count]} times`;
  }
  let ul = document.createElement("ul");
  let li = document.createElement("li");
  li.textContent = like;
  ul.appendChild(li);
  likeList.appendChild(ul);
};

minus.addEventListener("click", minusCounter);
add.addEventListener("click", addCounter);
pause.addEventListener("click", pauseResumeCounter);
commentForm.addEventListener("submit", addCounterComment);
heart.addEventListener("click", addALike);

startCounter();
