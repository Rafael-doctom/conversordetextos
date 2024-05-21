let txt = document.querySelector("#floatingTextarea2");
let btn_copy = document.querySelector("#copy");
let responseInner = document.querySelector("#response");
let btnClear = document.querySelector("#clear");
let capitalLetters = document.querySelector('#capital-letters');
let smallLetters = document.querySelector('#small-letters');
let qtdLength = document.querySelector('#qtd-length');

// copiar texto
btn_copy.addEventListener('click', (e) => {
    txt.select();
    document.execCommand("copy");
    e.target.focus();

    if (txt.value !== '') {
        responseInner.innerHTML = ` ${txt.value}`;


    } else {
        responseInner.innerHTML = 'Caixa vazia!';
    }

});

// LETRAS MAIÚSCULAS
capitalLetters.addEventListener('click', () => {

    let letter = txt.value.toUpperCase();
    txt.value = letter
    responseInner.innerHTML = `${letter}`;

});

// small letter
smallLetters.addEventListener('click', () => {

    let letter = txt.value.toLowerCase();
    txt.value = letter
    responseInner.innerHTML = `${letter}`;

});

// count lenght
qtdLength.addEventListener('click', () => {
    responseInner.innerHTML = `${txt.value.length}`;
})


// Limpar texto
btnClear.addEventListener('click', () => {
    if (txt.value !== '') {
        txt.value = '';
        responseInner.innerHTML = '';
    }
});

