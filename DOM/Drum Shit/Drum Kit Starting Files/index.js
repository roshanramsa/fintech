function chooseAudio(key){
    switch(key){
        case "w":
            var audio = new Audio('./sounds/tom-1.mp3');
            break;
        case "a":
            var audio = new Audio('./sounds/tom-2.mp3');
            break;
        case "s":
            var audio = new Audio('./sounds/tom-3.mp3');
            break;
        case "d":
            var audio = new Audio('./sounds/tom-4.mp3');
            break;
        case "j":
            var audio = new Audio('./sounds/snare.mp3');
            break;
        case "k":
            var audio = new Audio('./sounds/crash.mp3');
            break;
        case "l":
            var audio = new Audio('./sounds/kick-bass.mp3');
            break;
    }
    audio.play();
}

for (var i = 0; i<document.querySelectorAll("button").length; i++){
    document.querySelectorAll("button")[i].addEventListener("click",function(){
        var buttonPressed = this.textContent;
        chooseAudio(buttonPressed);
    })
}

document.addEventListener("keydown", function(event){
    chooseAudio(event.key);
})