// COMP 3450: Joel Canonico, Hamza Ahmad, Fernando Ferrufino 


//Music player done by Fernando Ferrufino
    // Creating the audio element
    const audio = new Audio();
  
    // Playlist of songs
    const playlist = ['calm_track1.mp3', 'calm_track2.mp3', 'calm_track3.mp3','song1.mp3']; // add your song files here
    let currentSongIndex = 0;
  
    // Load the first song
    audio.src = playlist[currentSongIndex];


const maxTaskCount = 3; // sets the maximum allowed task count

let current = { minutes: 25, seconds: 0 };
let seconds = current.seconds;
let minutes = current.minutes;
let timerInterval;
let test = document.getElementById("SB");

function update() {
    const num = document.getElementById("number");
    num.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

document.getElementById("Start").addEventListener("click", function () {
    startTimer();
    document.getElementById("ST").innerHTML = timerRunning ? "PAUSE" : "START";
});

document.getElementById("ST").addEventListener("click", function () {
    startTimer();
    document.getElementById("ST").innerHTML = timerRunning ? "PAUSE" : "START";
});

document.getElementById("pom").addEventListener("click", function () {
    current = { minutes: 25, seconds: 0 };
    resetTimer();
    document.getElementById('selB').style.left = "6.81rem";
});

document.getElementById("SB").addEventListener("click", function () {
    current = { minutes: 10, seconds: 0 };
    resetTimer();
    document.getElementById('selB').style.left = "21rem";
});

document.getElementById("LB").addEventListener("click", function () {
    current = { minutes: 15, seconds: 0 };
    resetTimer();
    document.getElementById('selB').style.left = "35.5rem";
});

let timerRunning = false;

function startTimer() {
    if (!timerRunning) {
        clearInterval(timerInterval);
        timerRunning = true;
        timerInterval = setInterval(() => {
            if (minutes === 0 && seconds === 0) {
                clearInterval(timerInterval);
                alert("Time's up!");
                timerRunning = false;
            } else {
                if (seconds === 0) {
                    minutes--;
                    seconds = 59;
                } else {
                    seconds--;
                }
                update();
            }
        }, 1000);
    } else {
        clearInterval(timerInterval);
        timerRunning = false;
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    minutes = current.minutes;
    seconds = current.seconds;
    update();
}

const taskList = document.getElementById("task-list");
const newTaskInput = document.getElementById("new-task");
const addTaskButton = document.getElementById("add-task-button");

function addTask(taskText) {
    if (taskCount >= maxTaskCount) {
        alert("You can't add more than 3 tasks at once. This is intended to help keep you on track!");
        return;
    }

    const li = document.createElement("li");
    li.textContent = taskText;
    li.draggable = true;

    const deleteButton = document.createElement("img");
    deleteButton.src = "./public/delete.png"; 
    deleteButton.alt = "Delete";
    deleteButton.className = "delete-icon";

    // click event handler for the delete image
    deleteButton.addEventListener("click", function () {
        taskList.removeChild(li);
        taskCount--;
        updateTaskCount();
    });

    li.appendChild(deleteButton);

    li.addEventListener('dragstart', (event) => {
        event.dataTransfer.setData('text/plain', event.target.textContent);
    });

    li.addEventListener('dragover', (event) => {
        event.preventDefault();
        const draggedItem = document.querySelector('li[draggable="true"][data-dragging="true"]');
        if (draggedItem !== null && li !== draggedItem) {
            if (event.clientY < li.getBoundingClientRect().top + li.offsetHeight / 2) {
                taskList.insertBefore(draggedItem, li);
            } else {
                taskList.insertBefore(draggedItem, li.nextSibling);
            }
        }
    });

    li.addEventListener('drop', (event) => {
        event.preventDefault();
    });

    // appends the task to the task list within the task container
    taskList.appendChild(li);
    taskCount++;
    updateTaskCount();
}

let taskCount = 0;

function updateTaskCount() {
    const taskCountElement = document.getElementById("task-count");
    taskCountElement.textContent = taskCount;
}

addTaskButton.addEventListener("click", function () {
    const taskText = newTaskInput.value;
    if (taskText.trim() !== "") {
        addTask(taskText);
        newTaskInput.value = "";
    }
    else
    {
        alert("You cannot add an empty task, please input a task and try again.");
        return;
    }
});

taskList.addEventListener('dragstart', function (event) {
    event.target.setAttribute('data-dragging', 'true');
    event.dataTransfer.setData('text/plain', event.target.textContent);
});

taskList.addEventListener('dragend', function (event) {
    event.target.removeAttribute('data-dragging');
});

updateTaskCount();


//Music player done by Fernando Ferrufino
document.addEventListener("DOMContentLoaded", function() {
    // Selecting necessary elements
    const player = document.querySelector('.player1');
    const playIcon = document.querySelector('music-player-item');
    const playButton = document.querySelector('.player-child-button');
    const prevButton = document.querySelector('.left-seek-icon');  // Previous song button
    const nextButton = document.querySelector('.right-seek-icon');  // Next song button
    const slider = document.querySelector('.slider1');
    const currentTimeDisplay = document.querySelector('.div3');
    const durationDisplay = document.querySelector('.div2');
  
    // Creating the audio element
    const audio = new Audio();
  
    // Playlist of songs
    const playlist = ['song1.mp3','song2.mp3','song3.mp3','song4.mp3']; // add your song files here
    let currentSongIndex = 0;
  
    // Load the first song
    audio.src = playlist[currentSongIndex];
  
    // Event listeners
    playButton.addEventListener('click', function() {


        if (audio.paused) {
            audio.play();
            document.getElementById("play").style.display = "none";
            document.getElementById("pause").style.display = "block";
        } else {
            audio.pause();
            document.getElementById("play").style.display = "block";
            document.getElementById("pause").style.display = "none";
        }
    });
  
    prevButton.addEventListener('click', function() {  // Previous song
      currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
      audio.src = playlist[currentSongIndex];
      audio.play();
      document.getElementById("play").style.display = "none";
      document.getElementById("pause").style.display = "block";
    });
  
    nextButton.addEventListener('click', function() {  // Next song
      currentSongIndex = (currentSongIndex + 1) % playlist.length;
      audio.src = playlist[currentSongIndex];
      audio.play();
      document.getElementById("play").style.display = "none";
      document.getElementById("pause").style.display = "block";
    });
  
    slider.addEventListener('input', function() {
      audio.currentTime = audio.duration * (slider.value / 100);
    });
  
    audio.addEventListener('timeupdate', function() {
      const progress = (audio.currentTime / audio.duration) * 100;
      slider.value = progress;
      currentTimeDisplay.textContent = formatTime(audio.currentTime);
    });
  
    audio.addEventListener('loadedmetadata', function() {
      durationDisplay.textContent = formatTime(audio.duration);
    });
  
    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }


    // Reference to the volume image and volume slider
    const volumeImage = document.querySelector('.music-volume');
    const volumeSlider = document.querySelector('.volume-slider');

    // Variable to store the last non-muted volume value
    let lastVolume = volumeSlider.value;

    // Add event listener to the volume image
    volumeImage.addEventListener('click', function() {
        if (!audio.muted) {
            audio.muted = true;
            lastVolume = volumeSlider.value; // Store the current volume
            volumeSlider.value = 0; // Set slider to 0
            audio.volume = 0; // Mute the audio
            // Change the image to indicate that the sound is muted
            volumeImage.src = './public/volume-mute.svg'; // Path to your mute icon
        } else {
            audio.muted = false;
            volumeSlider.value = lastVolume; // Restore the volume slider to the stored volume
            audio.volume = lastVolume / 100; // Unmute the audio to the last volume
            // Change the image back to the volume icon
            volumeImage.src = './public/volume.svg'; // Path to your volume icon
        }
    });

    // Add input event listener to the volume slider to handle volume changes
    volumeSlider.addEventListener('input', function(e) {
        if (audio.muted) {
            audio.muted = false; // Unmute if currently muted
            volumeImage.src = './public/volume.svg'; // Change back to volume icon
        }
        const volume = e.target.value;
        lastVolume = volume; // Update the lastVolume whenever the slider is changed
        audio.volume = volume / 100; // Update the audio volume
    });
  });





  

