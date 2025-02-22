var n = 100;
for (var i = 0; i<2*n+1; i++){
    if (i != 0 && i!=2*n)
        console.log(" ".repeat(Math.abs(n-i)) + "*" + " ".repeat( 2*(n-Math.abs(n-i))-1) + "*");
    else
        console.log(" ".repeat(Math.abs(n-i)) + "*")
}

