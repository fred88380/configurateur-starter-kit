const optionsTissu = [
    { couleur: 'Jaune', code: '#e2d047', image: './images/option-1-jaune.png', price: 12.30 },
    { couleur: 'Orange', code: '#f1722f', image: './images/option-1-orange.png', price: 12.00 },
    { couleur: 'Violet', code: '#bd3ad8', image: './images/option-1-violet.png', price: 12.10 }
];

const optionsPoche = [
    { couleur: 'Bleu', code: '#11119e', image: './images/option-2-bleu.png', price: 8.30 },
    { couleur: 'Fuchsia', code: '#991157', image: './images/option-2-fuchsia.png', price: 8.50 },
    { couleur: 'Rouge', code: '#d31431', image: './images/option-2-rouge.png', price: 8.10 },
    { couleur: 'Vert', code: '#a1cc16', image: './images/option-2-vert.png', price: 8.75 }
];

let selectedTissu = 'Violet';
let selectedPoche = 'Rouge';
let customText = '';
let useText = true;
const prixLettre = 1.80;

function calculatePrice() {
    let tissuPrice = 0;
    let pochePrice = 0;
    optionsTissu.forEach(function(option) {
        if (option.couleur === selectedTissu) {
            tissuPrice = option.price;
        }
    });

    optionsPoche.forEach(function(option) {
        if (option.couleur === selectedPoche) {
            pochePrice = option.price;
        }
    });

    let textLength = 0;
    if (useText) {
        textLength = customText.replace(/\s/g, '').length;
    }
    const textPrice = textLength * prixLettre;

    const totalPrice = (tissuPrice + pochePrice + textPrice).toFixed(2);
    document.querySelector('.price').textContent = totalPrice + " €";
}

function createColorOptions(containerId, options, selectedColor, callback) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    options.forEach(function(option) {
        const wrapper = document.createElement('div');
        wrapper.style.display = 'inline-block';
        wrapper.style.textAlign = 'center';
        wrapper.style.margin = '10px';

        const circle = document.createElement('div');
        circle.style.width = '40px';
        circle.style.height = '40px';
        circle.style.backgroundColor = option.code;
        circle.style.borderRadius = '50%';
        circle.style.border = option.couleur === selectedColor ? '4px solid green' : '2px solid black';
        circle.style.cursor = 'pointer';

        circle.addEventListener('click', function() {
            callback(option.couleur);
            calculatePrice();
        });

        const label = document.createElement('div');
        label.textContent = option.couleur;
        label.style.fontSize = '12px';
        label.style.marginTop = '5px';
        label.style.fontWeight = option.couleur === selectedColor ? 'bold' : 'normal';

        wrapper.appendChild(circle);
        wrapper.appendChild(label);
        container.appendChild(wrapper);
    });
}

function updateUI() {
    createColorOptions('tissu', optionsTissu, selectedTissu, function(color) {
        selectedTissu = color;
        document.getElementById('displayTissu').textContent = color;
        document.getElementById('optionTissuImage').src = optionsTissu.find(function(opt) {
            return opt.couleur === color;
        }).image;
        calculatePrice();
    });

    createColorOptions('optionPoche', optionsPoche, selectedPoche, function(color) {
        selectedPoche = color;
        document.getElementById('displayPoche').textContent = color;
        document.getElementById('optionPocheImage').src = optionsPoche.find(function(opt) {
            return opt.couleur === color;
        }).image;
        calculatePrice();
    });

    const textInput = document.getElementById('customText');
    textInput.addEventListener('input', function() {
        customText = textInput.value;
        updateDisplayedText();
        calculatePrice();
    });

    const textOptions = document.querySelectorAll('input[name="UseText"]');
    textOptions.forEach(function(option) {
        option.addEventListener('change', function() {
            useText = option.value === 'true';
            updateDisplayedText();
            calculatePrice();
        });
    });

    updateDisplayedText();
    calculatePrice();
}

function updateDisplayedText() {
    const textElement = document.querySelector('.textePerso');
    if (useText) {
        textElement.textContent = customText || 'Votre texte ici...';
    } else {
        textElement.textContent = '';
    }
}

window.addEventListener('load', updateUI);
