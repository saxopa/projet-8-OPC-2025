//faire une calculatrice
// 1. Demander à l'utilisateur de rentrer un premier nombre
// 2. Demander à l'utilisateur de rentrer un deuxième nombre
// 3. Demander à l'utilisateur de rentrer un opérateur (+, -, *, /)
// 4. Faire le calcul et afficher le résultat
// 5. Demander à l'utilisateur s'il veut faire un autre calcul
// 6. Si oui, recommencer à l'étape 1
// 7. Si non, afficher "Au revoir"

// Créez votre fonction ici

function calculateResult(){
let calcule = document.getElementById("display").value;

    if(calcule.includes(`/0`)){
        document.getElementById("display").value ="Division by zero is not allowed";
    }else{
        let result = eval(calcule);
        document.getElementById("display").value =result;
        
        }
   
}


 



function appendToDisplay(value) {
    document.getElementById("display").value += value;
}

function clearDisplay() {
    document.getElementById("display").value = "";
}

