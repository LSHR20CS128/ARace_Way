
const beginnerBtn = document.querySelector(".btn");
beginnerBtn.addEventListener("click", () => {
   window.location.href = 'Intermediate.html';
});

const intermediateBtn = document.querySelector(".btn");
intermediateBtn.addEventListener("click", () => {
   window.location.href = 'Advance.html';
});


let videoList = document.querySelectorAll('.video-list-container .list');

videoList.forEach(vid =>{
   vid.onclick = () =>{
      videoList.forEach(remove =>{remove.classList.remove('active')});
      vid.classList.add('active');
      let src = vid.querySelector('.list-video').src;
      let title = vid.querySelector('.list-title').innerHTML;
      document.querySelector('.main-video-container .main-video').src = src;
      document.querySelector('.main-video-container .main-video').play();
      document.querySelector('.main-video-container .main-vid-title').innerHTML = title;
   };
});