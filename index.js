document.addEventListener('DOMContentLoaded', () => {
    let txt = document.querySelector("#floatingTextarea2");
    let responseInner = document.querySelector("#response");
    let mainContent = document.querySelector(".main-content");

    mainContent.addEventListener('click', (e) => {
        if (e.target.matches('#copy')) {
            txt.select();
            document.execCommand("copy");
            e.target.focus();
            responseInner.innerHTML = txt.value !== '' ? txt.value : 'Caixa vazia!';
        }
        else if (e.target.matches('#capital-letters')) {
            let letter = txt.value.toUpperCase();
            txt.value = letter;
            responseInner.innerHTML = txt.value;
        }


        else if (e.target.matches('#small-letters')) {
            let letter = txt.value.toLowerCase();
            txt.value = letter;
            responseInner.innerHTML = txt.value;
        }


        else if (e.target.matches('#qtd-length')) {
            let removeSpaces = txt.value.replace(/\s+/g, '');
            responseInner.innerHTML = `Quantidade de Caracteres: ${removeSpaces.length}`;
        }

        else if (e.target.matches('#invert-text')) {

            let invertTxt = txt.value.split('').reverse().join('')

            responseInner.innerHTML = `${invertTxt}`;
        }

        else if (e.target.matches('#remove-spaces')) {
            let newText = txt.value.replace(/\s+/g, ' ').trim();
            txt.value = newText;
            responseInner.innerHTML = 'Espaços extras removidos!';
        }

        else if (e.target.matches('#remove-spaces-all')) {
            let noSpacesText = txt.value.replace(/\s+/g, '');
            txt.value = noSpacesText;
            responseInner.innerHTML = 'Todos os espaços foram removidos!';
        }

        else if (e.target.matches('#capitalize-words')) {
            let capitalizedText = txt.value.replace(/\b\w/g, char => char.toUpperCase());
            txt.value = capitalizedText;
            responseInner.innerHTML = 'Início de cada palavra capitalizado!';
        }

        else if (e.target.matches('#clear')) {
            if (txt.value !== '') {
                txt.value = '';
                responseInner.innerHTML = '';
            }
        }
    });
});


























