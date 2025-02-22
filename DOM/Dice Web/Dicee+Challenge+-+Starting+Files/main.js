var randomNum1 = Math.floor(Math.random() * 6) + 1;
var randomNum2 = Math.floor(Math.random() * 6) + 1;
var imgSrc1 = "./images/dice" + randomNum1 + ".png";
var imgSrc2 = "./images/dice" + randomNum2 + ".png";

if (randomNum1>randomNum2) document.getElementsByTagName("h1")[0].textContent = "🚩Player 1 Wins!";
else if (randomNum1<randomNum2) document.getElementsByTagName("h1")[0].textContent = "Player 2 Wins!🚩";
else document.getElementsByTagName("h1")[0].textContent = "Draw!";

document.getElementsByTagName("img")[0].setAttribute("src",imgSrc1);
document.getElementsByTagName("img")[1].setAttribute("src",imgSrc2);