const latinToMorse = {
    A: ".-",
    B: "-...",
    C: "-.-.",
    D: "-..",
    E: ".",
    F: "..-.",
    G: "--.",
    H: "....",
    I: "..",
    J: ".---",
    K: "-.-",
    L: ".-..",
    M: "--",
    N: "-.",
    O: "---",
    P: ".--.",
    Q: "--.-",
    R: ".-.",
    S: "...",
    T: "-",
    U: "..-",
    V: "...-",
    W: ".--",
    X: "-..-",
    Y: "-.--",
    Z: "--..",
};

const morseToLatin = {
    "-": "T",
    "--": "M",
    "---": "O",
    "--.": "G",
    "--.-": "Q",
    "--..": "Z",
    "-.": "N",
    "-.-": "K",
    "-.--": "Y",
    "-.-.": "C",
    "-..": "D",
    "-..-": "X",
    "-...": "B",
    ".": "E",
    ".-": "A",
    ".--": "W",
    ".---": "J",
    ".--.": "P",
    ".-.": "R",
    ".-..": "L",
    "..": "I",
    "..-": "U",
    "..-.": "F",
    "...": "S",
    "...-": "V",
    "....": "H",
};

//let message = "Hello Guys";
//let morseMessage = ".... . .-.. .-.. ---/--. ..- -.-- ...";

function getLatinCharacterList(string) {
    return string.split("");
}

function translateLatinCharacter(char) {
    let upperChar = char.toUpperCase();
    if (upperChar in latinToMorse || char === " ") {
        return latinToMorse[upperChar]; // On aurait pu faire directement return dictionnaire[char.toUpperCase] sans créer la let upperChar
    } else {
        alert(`Character '${char}' not allowed`);
        return null;
    }
}
/*retourne chaque caractère de la phrase séparé, dans un tableau
déclaration d'une variable qui est constituée des caractères transformés en majuscule
Si le caractère en majuscule est dans le dictionnaire ou qu'il s'agit d'un espace
retourne la clé du dictionnaire qui correspond au caractère dans le dictionnaire ou
Si le caractère n'est pas dans le dictionnaire ou un espace, message en alerte et retourne null*/

function getMorseCharacterList(string) {
    let words = string.split("/");
    let sentence = [];
    for (let i = 0; i < words.length; i++) {
        console.log(words);
        let letters = words[i].split(" ");
        for (let j = 0; j < letters.length; j++) {
            sentence.push(letters[j]);
        }
        if (i < words.length - 1) {
            sentence.push(" ");
        }
    }
    return sentence;
}
/* déclaration d'une variable words qui sera constitué d'un tableau de mots, découpés dans la phrase à chaque fois qu'on rencontre un /
déclaration d'une variable sentence qui est un tableau vide dans le quel on mettra la résultat de la formule suivante
Première boucle qui itère sur le nombre de mots et mets un espace après un mot tant que ce n'est pas le dernier mot
déclaration d'une variable trimmedword qui supprime les espaces en tête et en queue des mots
déclaration d'une variable lettters pour y mettre les lettres de la phrase séparés découpés à chaque fois qu'on rencontre un espace
deuxième boucle à lintérieur de la première pour itérer dans ces lettres et les ajouter au tableau sentence
retourne le tableau sentence composé des lettres en morse séparés d'un espace*/

function translateMorseCharacter(char) {
    if (char in morseToLatin) {
        return morseToLatin[char];
    } else {
        alert(`Character '${char}' not allowed`);
        return null;
    }
}
/* Si le caractère est dans le dictionnaire : retourne la clé du caractère
sinon message d'alerte que le caractère n'est pas autorisé et retourne null*/

//Mes premières fonctions avec une boucle for avant de réaliser qu'il y avait une fonction intégrée facile

function translateMorseCharacterv1(char) {
    for (let clé in morseToLatin) {
        if (clé === char) {
            return morseToLatin[clé];
        }
    }
}

function translateLatinCharacterv1(char) {
    let upperChar = char.toUpperCase();
    for (let clé in latinToMorse) {
        if (clé === upperChar) {
            return latinToMorse[clé];
        }
    }
}

//fonctions decode et encode avant d'intégrer des input et boutons :
function encodeMessagev1(givenMessage) {
    let encoding = [];
    let chars = getLatinCharacterList(givenMessage);
    for (let char of chars) {
        encoding.push(translateLatinCharacter(char));
    }
    return encoding;
}

function decodeMessagev1(givenMessage) {
    let decoding = [];
    let chars = getMorseCharacterList(givenMessage);
    for (let char of chars) {
        decoding.push(translateMorseCharacter(char));
    }
    return decoding;
}

//fonctions qui intègrent l'input et les boutons en html
function encodeMessage() {
    let textToTranslate = document.getElementById("texte");
    let translation = document.getElementById("translation");
    let encoding = [];
    let givenMessage = textToTranslate.value.toString();
    let chars = getLatinCharacterList(givenMessage);

    for (let char of chars) {
        if (char === " ") {
            encoding.push("/");
        } else {
            if (translateLatinCharacter(char) === null) {
                return;
            }
            encoding.push(translateLatinCharacter(char));
        }
    } //on aurait pu faire : return getLatinCharacterList(givenMessage).map(translateLatinCharacter) - sauf pour la gestion des espaces

    translation.textContent = encoding.join(" ");
}
/* déclaration d'une variable texttotranslate qui pointera vers la div texte du html
    déclaration d'une variable translation qui pointera vers la div translation du html 
    déclaration d'une variable encoding qui crée un tableau vide pour ensuite recevoir le message encodé
    déclaration d'une variable givenMessage qui sera en fait le texte rentré dans l'input texte devenu la variable texttotranslate
    et va faire en sorte d'etre transformé en string quoi qu'il soit au départ
    déclaration d'une variable chars qui sera un tableau des caractères latins dela phrase donnée, 
    obtenus avec la fonction getlatincharacterlist
    Pour chaque caractère de la phrase contenus dans le tableau chars
    si le cacartère n'est pas un espace et que la fonction translatelatincaractère a retourné null ->: retour sans rien
    Ce la fait en sorte que si un caractère non autorisé est détecté, aucune traduction n'aura lieu.
    Si le caractère est un espace, on ajoute un / au tableau de la phrase
    Sinon on ajoute le caractère traduit avec la fonction translatelatincaracter au tableau encoding de la phrase 
    ajoute le tableau encoding a l'élément translation du html en en faisant une string*/

function decodeMessage() {
    let textToTranslate = document.getElementById("texte");
    let translation = document.getElementById("translation");
    let decoding = [];
    let givenMessage = textToTranslate.value.toString();
    let chars = getMorseCharacterList(givenMessage);

    for (let char of chars) {
        if (char === " ") {
            decoding.push(" ");
        } else {
            if (translateMorseCharacter(char) === null) {
                return;
            }
            decoding.push(translateMorseCharacter(char));
        }
    }

    translation.textContent = decoding.join("");
}
/* déclaration d'une variable texttotranslate qui pointera vers la div texte du html
    déclaration d'une variable translation qui pointera vers la div translation du html 
    déclaration d'une variable decoding qui crée un tableau vide pour ensuite recevoir le message encodé
    déclaration d'une variable givenMessage qui sera en fait le texte rentré dans l'input texte devenu la variable texttotranslate
    et va faire en sorte d'etre transformé en string quoi qu'il soit au départ
    déclaration d'une variable chars qui sera un tableau des caractères morses de la phrase donnée, 
    obtenus avec la fonction getmorsecharacterlist
    Pour chaque caractère de la phrase contenus dans le tableau chars
    si le cacartère n'est pas un espace et que la fonction translatemorsecharactère a retourné null ->: retour sans rien
    Ce la fait en sorte que si un caractère non autorisé est détecté, aucune traduction n'aura lieu.
    Si le caractère est un espace, on ajoute un espace au tableau de la phrase
    Sinon on ajoute le caractère traduit avec la fonction translatemorsecharacter au tableau encoding de la phrase
    ajoute le tableau encoding a l'élément translation du html en en faisant une string*/

function displayOnWebPageEncode() {
    let submitButton = document.getElementById("frenchToMorseButton");
    submitButton.addEventListener("click", () => {
        encodeMessage();
    });
    submitButton;
    // fonction qui fait que le bouton de l'html applique la fonction encodemessage
}

function displayOnWebPageDecode() {
    let submitButton = document.getElementById("morseToFrenchButton");
    submitButton.addEventListener("click", () => {
        decodeMessage();
    });
    submitButton;
    // fonction qui fait que le bouton de l'html applique la fonction decodemessage
}

document.addEventListener("DOMContentLoaded", displayOnWebPageEncode);
document.addEventListener("DOMContentLoaded", displayOnWebPageDecode);

/*
solution de Tug :

function convert(dictio, chars) {
    let translation = document.getElementById("translation");

    translation.textContent = chars.map((char) => dictio[char]).join(" ");
}

function init() {
    let textToTranslate = document.getElementById("texte");
    document
        .getElementById("frenchToMorseButton")
        .addEventListener("click", () => {
            let chars = textToTranslate.value
                .toString()
                .toUpperCase()
                .split("");
            convert(latinToMorse, chars);
        });

    document
        .getElementById("morseToFrenchButton")
        .addEventListener("click", () => {
            let chars = textToTranslate.value.toString().split(" ");
            convert(morseToLatin, chars);
        });
}

document.addEventListener("DOMContentLoaded", init);
*/

/*
tests :

console.log(getLatinCharacterList(message));
console.log(translateLatinCharacter(latinToMorse, "e"));
console.log(encodeMessage(latinToMorse, message));

console.log(getMorseCharacterList(morseMessage));
console.log(translateMorseCharacter(morseToLatin, "."));
console.log(decodeMessage(morseToLatin, morseMessage));
*/
