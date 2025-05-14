var navigation = document.querySelector(".navigation");
var bubble_holder = document.querySelector(".bubble_holder");
var audio = document.querySelector("audio");
audio.volume = 1;
var score = document.querySelector("#score");
var restart = document.querySelector(".restart");
restart.addEventListener("click", ()=>{
     if(bubble.popped != 0){
          restart_()
     } else {
          restart.classList.add("disable");
     }
})

var bubble = {
     w: 50,
     h: 50,
     popped: 0,
     total: 0
}

function add_bubbles(){
     bubble_holder.innerHTML = "";
     var x = Math.floor(bubble_holder.clientWidth/bubble.w);
     var y = Math.floor(bubble_holder.clientHeight/bubble.h);
     bubble.total += (x * y);
     for (var j = 0; j < y; j++) {
          var row = document.createElement("div");
          row.classList.add("row");
          for (var i = 0; i < x; i++) {
               var div = document.createElement("div");
               div.classList.add("bubble", "unpopped");
               
               if((j+1)%2 != 0){
                    if((i+1) == 1){
                         bubble.total--;
                         continue
                    }
               }

               row.append(div)
               
          }     
          bubble_holder.appendChild(row);
     }
     score.innerHTML = bubble.popped;
     // add event listeners
     var bubbles = document.querySelectorAll(".bubble.unpopped");
     bubbles.forEach(e=>{
          e.addEventListener("click", ()=>{            
               audio.play()
               e.classList.remove("unpopped");
               e.classList.add("popped");
               bubble.popped++;
               score.innerHTML = bubble.popped;
               if(bubble.popped == bubble.total){
                    add_bubbles()
               }
               restart.classList.remove("disable");
          })
     })
}
audio.addEventListener("load", ()=>{
     add_bubbles()
})

function restart_(){
     bubble_holder.style.width = navigation.clientWidth + "px";
     bubble_holder.style.height = (window.innerHeight  - navigation.clientHeight - 10) + "px";
     bubble_holder.style.marginTop = "5px";
     bubble.total = 0;
     bubble.popped = 0;
     add_bubbles()
     restart.classList.add("disable");
} restart_()

window.addEventListener("resize", ()=>{
     restart_()
});

particlesJS.load('particles-js', '/script/particlesjs-config.json', function() {
    console.log('callback - particles.js config loaded');
});


// menu
var menu = document.querySelector(".main_menu");
var menubtn = document.querySelector(".menu");
menubtn.addEventListener("click", () => {
     menu.classList.toggle("d-none");
})
var start = document.querySelector(".start");
start.addEventListener("click", ()=>{
     menu.classList.toggle("d-none");
})

var instructions = document.querySelector(".instructions");
var instructions_menu = document.querySelector("#instructions");
instructions.addEventListener("click", ()=>{
     instructions_menu.classList.toggle("d-none");
})

var settings = document.querySelector(".settings");
var settings_menu = document.querySelector("#settings");
settings.addEventListener("click", () => {
     settings_menu.classList.toggle("d-none");
})