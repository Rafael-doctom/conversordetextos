document.addEventListener('DOMContentLoaded', () => {
    let txt = document.querySelector("#floatingTextarea2");
    let btn_copy = document.querySelector("#copy");
    let responseInner = document.querySelector("#response");
    let btnClear = document.querySelector("#clear");
    let capitalLetters = document.querySelector('#capital-letters');
    let smallLetters = document.querySelector('#small-letters');
    let qtdLength = document.querySelector('#qtd-length');
    let removeSpaces = document.querySelector('#remove-spaces');
    let removeSpacesAll = document.querySelector('#remove-spaces-all');
    let capitalizeWords = document.querySelector('#capitalize-words');

    btn_copy.addEventListener('click', (e) => {
        txt.select();
        document.execCommand("copy");
        e.target.focus();

        if (txt.value !== '') {
            responseInner.innerHTML = txt.value;
        } else {
            responseInner.innerHTML = 'Caixa vazia!';
        }
    });

    capitalLetters.addEventListener('click', () => {
        let letter = txt.value.toUpperCase();
        txt.value = letter;
        responseInner.innerHTML = txt.value;
    });

    smallLetters.addEventListener('click', () => {
        let letter = txt.value.toLowerCase();
        txt.value = letter;
        responseInner.innerHTML = txt.value;
    });

    qtdLength.addEventListener('click', () => {
        responseInner.innerHTML = `Quantidade de Caracteres: ${txt.value.length}`;
    });

    removeSpaces.addEventListener('click', () => {
        // Remove todos os espaços extras e reduz múltiplos espaços para um único espaço
        let newText = txt.value.replace(/\s+/g, ' ').trim();
        txt.value = newText;
        responseInner.innerHTML = 'Espaços extras removidos!';
    });

    removeSpacesAll.addEventListener('click', () => {
        // Remove todos os espaços, incluindo espaços entre palavras
        let noSpacesText = txt.value.replace(/\s+/g, '');
        txt.value = noSpacesText;
        responseInner.innerHTML = 'Todos os espaços foram removidos!';
    });

    capitalizeWords.addEventListener('click', () => {
        // Capitaliza a primeira letra de cada palavra e mantém o restante em minúsculas
        let capitalizedText = txt.value.replace(/\b\w/g, char => char.toUpperCase());
        txt.value = capitalizedText;
        responseInner.innerHTML = 'Início de cada palavra capitalizado!';
    });

    btnClear.addEventListener('click', () => {
        if (txt.value !== '') {
            txt.value = '';
            responseInner.innerHTML = '';
        }
    });
});
