// Script d'accessibilité pour améliorer l'expérience utilisateur

document.addEventListener('DOMContentLoaded', function() {
    // 1. Amélioration de la navigation au clavier
    enhanceKeyboardNavigation();
    
    // 2. Validation accessible du formulaire
    setupAccessibleFormValidation();
    
    // 3. Gestion du contraste et de la taille du texte
    setupAccessibilityControls();
});

/**
 * Améliore la navigation au clavier pour les éléments interactifs
 */
function enhanceKeyboardNavigation() {
    // Ajouter des gestionnaires d'événements pour la navigation au clavier
    const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
    
    interactiveElements.forEach(element => {
        // Améliorer la visibilité de l'élément en focus
        element.addEventListener('focus', function() {
            this.classList.add('keyboard-focus');
        });
        
        element.addEventListener('blur', function() {
            this.classList.remove('keyboard-focus');
        });
    });
    
    // Ajouter un gestionnaire pour la touche Échap
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            // Fermer les dialogues ou les menus ouverts
            const openDialogs = document.querySelectorAll('[aria-expanded="true"]');
            openDialogs.forEach(dialog => {
                dialog.setAttribute('aria-expanded', 'false');
            });
        }
    });
}

/**
 * Configure la validation accessible du formulaire
 */
function setupAccessibleFormValidation() {
    const form = document.querySelector('form');
    
    if (!form) return;
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    
    // Créer des éléments pour les messages d'erreur
    const nameError = document.createElement('div');
    nameError.id = 'name-error';
    nameError.className = 'error-message';
    nameError.setAttribute('role', 'alert');
    nameError.setAttribute('aria-live', 'assertive');
    
    const emailError = document.createElement('div');
    emailError.id = 'email-error';
    emailError.className = 'error-message';
    emailError.setAttribute('role', 'alert');
    emailError.setAttribute('aria-live', 'assertive');
    
    // Ajouter les éléments d'erreur après les champs
    nameInput.parentNode.appendChild(nameError);
    emailInput.parentNode.appendChild(emailError);
    
    // Associer les messages d'erreur aux champs
    nameInput.setAttribute('aria-describedby', 'name-error');
    emailInput.setAttribute('aria-describedby', 'email-error');
    
    // Valider le formulaire à la soumission
    form.addEventListener('submit', function(event) {
        let isValid = true;
        
        // Valider le nom
        if (!nameInput.value.trim()) {
            nameError.textContent = 'Veuillez entrer votre nom';
            nameInput.setAttribute('aria-invalid', 'true');
            isValid = false;
        } else {
            nameError.textContent = '';
            nameInput.setAttribute('aria-invalid', 'false');
        }
        
        // Valider l'email
        if (!emailInput.value.trim()) {
            emailError.textContent = 'Veuillez entrer votre adresse e-mail';
            emailInput.setAttribute('aria-invalid', 'true');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            emailError.textContent = 'Veuillez entrer une adresse e-mail valide';
            emailInput.setAttribute('aria-invalid', 'true');
            isValid = false;
        } else {
            emailError.textContent = '';
            emailInput.setAttribute('aria-invalid', 'false');
        }
        
        if (!isValid) {
            event.preventDefault();
            // Focus sur le premier champ en erreur
            if (nameInput.getAttribute('aria-invalid') === 'true') {
                nameInput.focus();
            } else if (emailInput.getAttribute('aria-invalid') === 'true') {
                emailInput.focus();
            }
        }
    });
    
    // Validation à la volée
    nameInput.addEventListener('blur', function() {
        if (!this.value.trim()) {
            nameError.textContent = 'Veuillez entrer votre nom';
            this.setAttribute('aria-invalid', 'true');
        } else {
            nameError.textContent = '';
            this.setAttribute('aria-invalid', 'false');
        }
    });
    
    emailInput.addEventListener('blur', function() {
        if (!this.value.trim()) {
            emailError.textContent = 'Veuillez entrer votre adresse e-mail';
            this.setAttribute('aria-invalid', 'true');
        } else if (!isValidEmail(this.value)) {
            emailError.textContent = 'Veuillez entrer une adresse e-mail valide';
            this.setAttribute('aria-invalid', 'true');
        } else {
            emailError.textContent = '';
            this.setAttribute('aria-invalid', 'false');
        }
    });
}

/**
 * Vérifie si une adresse e-mail est valide
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Configure les contrôles d'accessibilité (contraste, taille de texte)
 */
function setupAccessibilityControls() {
    // Créer des contrôles d'accessibilité
    const accessibilityControls = document.createElement('div');
    accessibilityControls.className = 'accessibility-controls';
    accessibilityControls.setAttribute('role', 'region');
    accessibilityControls.setAttribute('aria-label', 'Contrôles d\'accessibilité');
    
    // Bouton de contraste élevé
    const contrastButton = document.createElement('button');
    contrastButton.textContent = 'Contraste élevé';
    contrastButton.setAttribute('aria-pressed', 'false');
    
    // Bouton pour augmenter la taille du texte
    const increaseFontButton = document.createElement('button');
    increaseFontButton.textContent = 'Augmenter le texte';
    
    // Bouton pour diminuer la taille du texte
    const decreaseFontButton = document.createElement('button');
    decreaseFontButton.textContent = 'Diminuer le texte';
    
    // Ajouter les boutons aux contrôles
    accessibilityControls.appendChild(contrastButton);
    accessibilityControls.appendChild(increaseFontButton);
    accessibilityControls.appendChild(decreaseFontButton);
    
    // Ajouter les contrôles au début de la page
    const main = document.querySelector('main');
    if (main) {
        main.insertBefore(accessibilityControls, main.firstChild);
    } else {
        document.body.insertBefore(accessibilityControls, document.body.firstChild);
    }
    
    // Gérer le contraste élevé
    contrastButton.addEventListener('click', function() {
        const isHighContrast = document.body.classList.toggle('high-contrast');
        this.setAttribute('aria-pressed', isHighContrast.toString());
    });
    
    // Gérer la taille du texte
    let currentFontSize = 100; // Pourcentage de base
    
    increaseFontButton.addEventListener('click', function() {
        if (currentFontSize < 200) {
            currentFontSize += 10;
            document.body.style.fontSize = currentFontSize + '%';
            announceTextSizeChange(currentFontSize);
        }
    });
    
    decreaseFontButton.addEventListener('click', function() {
        if (currentFontSize > 70) {
            currentFontSize -= 10;
            document.body.style.fontSize = currentFontSize + '%';
            announceTextSizeChange(currentFontSize);
        }
    });
}

/**
 * Annonce le changement de taille du texte pour les lecteurs d'écran
 */
function announceTextSizeChange(size) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = 'Taille du texte modifiée à ' + size + '%';
    
    document.body.appendChild(announcement);
    
    // Supprimer l'annonce après qu'elle ait été lue
    setTimeout(function() {
        document.body.removeChild(announcement);
    }, 1000);
}