const arr = ["yellow", "blue", "red", "green"];
var count = 4;
const glowDuration = 1000;
const delayBetweenAnimations = 1700; // Adjust this value for more/less delay
var hasStarted = 0;
let seq;

$(document).on("keypress", function() {
    if (!hasStarted){
        hasStarted = 1;
        console.clear()
        newText = "Level " + (count-3).toString();
        $("h2").text(newText);
        seq = [];
        for (let i = 0; i < count; i++) {
            const rand = Math.floor(Math.random() * arr.length); // Ensure it selects from the array
            seq.push(arr[rand]);
            console.log(arr[rand]);
            setTimeout(function() {
                const add = "." + arr[rand];
                $(add).animate({ opacity: 1 }, glowDuration)
                    .animate({ opacity: 0.7 }, glowDuration);
            }, i * delayBetweenAnimations); // Delay between each animation
        }
    }
})

user_seq = []
pos = 0;
console.log(seq);
$("button").on("click",function(){
    if($(this).attr("class").split(' ')[0] == seq[pos])
        pos++;
    else{
        hasStarted = 0;
        count = 4;
        pos = 0;
        $("h2").text("Try Again :(");
    }
    if(pos == count){
        $("h2").text("Passed. Press any key to continue")
        user_seq = [];
        hasStarted = 0;
        pos=0;
        count++
    }
})
