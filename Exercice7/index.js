function convertToBinary() {
    // Récupérer les éléments du DOM
    const output = document.getElementById("binaryResult");
    const input = document.getElementById("decimalInput");
    
    // Récupérer la valeur et la nettoyer
    const inputValue = input.value.trim();
    
    // Vérifier si l'entrée est un nombre valide
    // /^[0-9]+$/ vérifie que l'entrée contient uniquement des chiffres
    if (inputValue && /^[0-9]+$/.test(inputValue)) {
        // Convertir en binaire
        let binary = parseInt(inputValue).toString(2);
        
        // Afficher le résultat
        output.innerHTML = binary;
    } else {
        // Effacer le résultat pour les entrées non numériques
        output.innerHTML = "";
    }
}