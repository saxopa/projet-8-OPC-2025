function calculateAverage(x) {
    // Vérifier si x est défini et si c'est un tableau avec des éléments
    if (!x || !x.length) {
        return 'No numbers to calculate average';
    }
    
   return x.reduce((acc, curr) => acc + curr, 0) / x.length;
}



// Correction de l'appel de fonction
console.log(calculateAverage([9, 3, 9, 8])); // retourne 7.25

// Exemples d'utilisation de la fonction
console.log(calculateAverage([5, 10, 15])); // retourne 10
console.log(calculateAverage([10, 20, 30, 20])); // retourne 20
console.log(calculateAverage()); // No numbers to calculate average

export default calculateAverage;