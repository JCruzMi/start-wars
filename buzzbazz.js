function buzzbazz() {
    var Argument = 100
    for (var i = 0; i < Argument; i++) {
        if(i % 2 == 0 && i % 5 == 0){
            console.log(`${i} buzzbazz`)
        } else if(i % 2 == 0){
            console.log(`${i} buzz`)
        } else if(i % 5 == 0){
            console.log(`${i} bazz`)
        } else { 
            console.log(`${i}`) }
    }
}

buzzbazz()