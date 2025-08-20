var navigation = document.querySelector(".navigation");
var bubble_holder = document.querySelector(".bubble_holder");
var audio = document.querySelector("audio");
audio.volume = 1;
var fanfare = document.querySelector(".fanfare");
var score = document.querySelector("#score");
var restart = document.querySelector(".restart");
restart.addEventListener("click", () => {
     if (bubble.popped != 0) {
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

function saveScore() {
    localStorage.setItem("bubbleScore", bubble.popped);
}

function loadScore() {
    let savedScore = localStorage.getItem("bubbleScore");
    if (savedScore !== null) {
        bubble.popped = parseInt(savedScore);
        score.innerHTML = bubble.popped;
    }
}

function add_bubbles() {
     bubble_holder.innerHTML = "";
     var x = Math.floor(bubble_holder.clientWidth / bubble.w);
     var y = Math.floor(bubble_holder.clientHeight / bubble.h);
     bubble.total += (x * y);
     for (var j = 0; j < y; j++) {
          var row = document.createElement("div");
          row.classList.add("row");
          for (var i = 0; i < x; i++) {
               var div = document.createElement("div");
               div.classList.add("bubble", "unpopped");

               if ((j + 1) % 2 != 0) {
                    if ((i + 1) == 1) {
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
     bubbles.forEach(e => {
          e.addEventListener("click", () => {
               audio.play()
               e.classList.remove("unpopped");
               e.classList.add("popped");
               bubble.popped++;
               score.innerHTML = bubble.popped;
               saveScore();
               if (bubble.popped == bubble.total) {
                    fanfare.volume = 1;
                    fanfare.play();
                    fanfare.onended = () => {
                         add_bubbles();
                    };
               }
               restart.classList.remove("disable");
          })
     })
}
audio.addEventListener("load", () => {
     add_bubbles()
})

function restart_() {
     bubble_holder.style.width = navigation.clientWidth + "px";
     bubble_holder.style.height = (window.innerHeight - navigation.clientHeight - 10) + "px";
     bubble_holder.style.marginTop = "5px";
     bubble.total = 0;
     add_bubbles()
     restart.classList.add("disable");
} restart_()

window.addEventListener("resize", () => {
     restart_()
});

particlesJS.load('particles-js', '/script/particlesjs-config.json', function () {
     console.log('callback - particles.js config loaded');
});


// menu
var menu = document.querySelector(".main_menu");
var menubtn = document.querySelector(".menu");
menubtn.addEventListener("click", () => {
     menu.classList.toggle("d-none");
})
var start = document.querySelector(".start");
start.addEventListener("click", () => {
     menu.classList.toggle("d-none");
})

var instructions = document.querySelectorAll(".instructions");
var instructions_menu = document.querySelector("#instructions");
instructions.forEach(e => {
     e.addEventListener("click", () => {
          instructions_menu.classList.toggle("d-none");
     })
})

var settings = document.querySelector(".settings");
var settings_menu = document.querySelector("#settings");
settings.addEventListener("click", () => {
     settings_menu.classList.toggle("d-none");
})

// --- SETTINGS LOGIC --- //
var volumeSlider = document.querySelector("#volumeSlider");
var sliderFill = document.querySelector(".bubble-slider-fill");
var allBackgroundAudio = document.querySelector('audio.backgroundaudio');

// play + loop background audio
allBackgroundAudio.loop = true;
allBackgroundAudio.volume = 1;
allBackgroundAudio.play()

// Sync slider fill
function updateSliderFill() {
     let percent = volumeSlider.value * 100;
     sliderFill.style.width = percent + "%";
}

// Save settings to localStorage
function saveSettings() {
     let settings = {
          volume: volumeSlider.value,
          size: document.querySelector(".size-option.active")?.dataset.size || 50,
          color: document.querySelector(".color-option.selected")?.dataset.color || "#e0ecf2"
     };
     localStorage.setItem("bubbleSettings", JSON.stringify(settings));
}

// Load settings from localStorage
function loadSettings() {
     let saved = localStorage.getItem("bubbleSettings");
     if (!saved) return;

     let settings = JSON.parse(saved);

     // Apply volume
     volumeSlider.value = settings.volume;
     audio.volume = settings.volume;
     fanfare.volume = settings.volume;

     allBackgroundAudio.loop = true;
     allBackgroundAudio.volume =  settings.volume;
     allBackgroundAudio.play()
     updateSliderFill();

     // Apply bubble size
     bubble.w = parseInt(settings.size);
     bubble.h = parseInt(settings.size);
     document.documentElement.style.setProperty("--bubble-size", settings.size + "px");
     sizeOptions.forEach(b => {
          b.classList.toggle("active", b.dataset.size == settings.size);
     });

     // Apply bubble color
     document.documentElement.style.setProperty("--bubble-bg", settings.color);
     colorOptions.forEach(c => {
          c.classList.toggle("selected", c.dataset.color == settings.color);
     });

     restart_(); // regenerate bubbles with updated size & color
}

// Volume control
volumeSlider.addEventListener("input", () => {
     audio.volume = volumeSlider.value;
     fanfare.volume = volumeSlider.value;
     allBackgroundAudio.forEach(e => e.volume = volumeSlider.value);
     updateSliderFill();
});

// Bubble size options
var sizeOptions = document.querySelectorAll(".size-option");
sizeOptions.forEach(btn => {
     btn.addEventListener("click", () => {
          sizeOptions.forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          let newSize = parseInt(btn.dataset.size);
          bubble.w = newSize;
          bubble.h = newSize;
          document.documentElement.style.setProperty("--bubble-size", newSize + "px");
          restart_();
     });
});

// Bubble color options
var colorOptions = document.querySelectorAll(".color-option");
colorOptions.forEach(opt => {
     opt.addEventListener("click", () => {
          colorOptions.forEach(c => c.classList.remove("selected"));
          opt.classList.add("selected");
          let color = opt.dataset.color;
          document.documentElement.style.setProperty("--bubble-bg", color);
     });
});

// Save settings button
var saveBtn = document.querySelector(".close-settings");
saveBtn.addEventListener("click", () => {
     saveSettings();
     settings_menu.classList.add("d-none");
});

// Load saved settings on page load
loadSettings();
loadScore();
