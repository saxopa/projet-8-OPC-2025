//votre code ici
function pairNumbers(numO,numT){
    let pair = ""
    for (let i = numO; i <= numT; i++) {
        if (i % 2 == 0) {
            pair += i + ","
            console.log(i);
        }
         
    }
    return pair.slice(0,-1)

} 

export default pairNumbers
