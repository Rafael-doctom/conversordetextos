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
            responseInner.innerHTML = capitalizedText;
        }

        else if (e.target.matches('#clear')) {
            if (txt.value !== '') {
                txt.value = '';
                responseInner.innerHTML = '';
            }
        }
    });
});

// phrases
document.addEventListener("DOMContentLoaded", () => {
    let frases = [];

    const fraseEn = document.querySelector(".frase-en");
    const frasePt = document.querySelector(".frase-pt");
    const response = document.getElementById("response");

    const btnNovaFrase = document.getElementById("newphrase");
    const btnCopiarPt = document.getElementById("copy-pt");
    const btnCopiarEn = document.getElementById("copy-en");
    const btnLimpar = document.getElementById("clear");

    let destaqueTimeout = null;
    let cardAnterior = null;

    function gerarFrase() {
        if (frases.length === 0) {
            response.textContent = "Nenhuma frase disponível.";
            return;
        }

        const index = Math.floor(Math.random() * frases.length);
        const frase = frases[index];

        fraseEn.textContent = frase.en;
        frasePt.textContent = frase.pt;

        limparResponse(); // limpa mensagem ao gerar nova frase
    }

    function mostrarResponse(texto) {
        response.textContent = texto;
    }

    function limparResponse() {
        response.textContent = "";
    }

    function copiarTexto(texto, idioma) {
        if (!texto) {
            mostrarResponse(`Nada para copiar em ${idioma.toUpperCase()}.`);
            return;
        }
        navigator.clipboard.writeText(texto)
            .then(() => {
                mostrarResponse(`Frase em ${idioma.toUpperCase()} copiada!`);
            })
            .catch(() => {
                mostrarResponse("Erro ao copiar a frase.");
            });
    }

    function destacarCard(cardElement) {
        if (!cardElement) return;

        // Remove destaque do card anterior, se existir
        if (cardAnterior && cardAnterior !== cardElement) {
            cardAnterior.classList.remove("card-copiado");
            if (destaqueTimeout) {
                clearTimeout(destaqueTimeout);
                destaqueTimeout = null;
            }
        }

        // Aplica destaque no card atual
        cardElement.classList.add("card-copiado");
        cardAnterior = cardElement;

        // Remove destaque após 3s
        destaqueTimeout = setTimeout(() => {
            cardElement.classList.remove("card-copiado");
            destaqueTimeout = null;
            cardAnterior = null;
        }, 3000);
    }

    btnNovaFrase.addEventListener("click", gerarFrase);
    btnCopiarPt.addEventListener("click", () => {
        copiarTexto(frasePt.textContent, "português");
        destacarCard(frasePt.parentElement);
    });
    btnCopiarEn.addEventListener("click", () => {
        copiarTexto(fraseEn.textContent, "inglês");
        destacarCard(fraseEn.parentElement);
    });
    btnLimpar.addEventListener("click", () => {
        fraseEn.textContent = "";
        frasePt.textContent = "";
        limparResponse();

        // Remove destaque se tiver
        if (cardAnterior) {
            cardAnterior.classList.remove("card-copiado");
            if (destaqueTimeout) {
                clearTimeout(destaqueTimeout);
                destaqueTimeout = null;
            }
            cardAnterior = null;
        }
    });

    // Ajuste o caminho do JSON conforme sua estrutura de pastas!
    const jsonPath = "assets/json/phrases.json";

    fetch(jsonPath)
        .then(response => {
            if (!response.ok) throw new Error("Erro na resposta do fetch");
            return response.json();
        })
        .then(data => {
            frases = data;
            gerarFrase();
        })
        .catch(error => {
            console.error("Erro ao carregar frases:", error);
            mostrarResponse("Erro ao carregar frases.");
        });
});


// palavras
document.addEventListener("DOMContentLoaded", () => {
  let palavras = [];

  const palavraEn = document.querySelector(".frase-en");
  const palavraPt = document.querySelector(".frase-pt");
  const response = document.getElementById("response");

  const btnNew = document.getElementById("newphrase");
  const btnCopyEn = document.getElementById("copy-en");
  const btnCopyPt = document.getElementById("copy-pt");
  const btnClear = document.getElementById("clear");

  let destaqueTimeout = null;
  let cardAnterior = null;

  function gerarPalavra() {
    if (palavras.length === 0) {
      response.textContent = "Nenhuma palavra disponível.";
      return;
    }

    const index = Math.floor(Math.random() * palavras.length);
    const palavra = palavras[index];

    palavraEn.textContent = palavra.en;
    palavraPt.textContent = palavra.pt;

    limparResponse();
  }

  function copiarTexto(texto, idioma) {
    if (!texto) {
      response.textContent = `Nada para copiar em ${idioma}.`;
      return;
    }

    navigator.clipboard.writeText(texto)
      .then(() => {
        response.textContent = `Palavra em ${idioma} copiada!`;
      })
      .catch(() => {
        response.textContent = "Erro ao copiar.";
      });
  }

  function destacarCard(cardElement) {
    if (!cardElement) return;

    if (cardAnterior && cardAnterior !== cardElement) {
      cardAnterior.classList.remove("card-copiado");
      if (destaqueTimeout) {
        clearTimeout(destaqueTimeout);
        destaqueTimeout = null;
      }
    }

    cardElement.classList.add("card-copiado");
    cardAnterior = cardElement;

    destaqueTimeout = setTimeout(() => {
      cardElement.classList.remove("card-copiado");
      destaqueTimeout = null;
      cardAnterior = null;
    }, 3000);
  }

  function limparResponse() {
    response.textContent = "";
  }

  btnNew.addEventListener("click", gerarPalavra);

  btnCopyEn.addEventListener("click", () => {
    copiarTexto(palavraEn.textContent, "inglês");
    destacarCard(palavraEn.parentElement);
  });

  btnCopyPt.addEventListener("click", () => {
    copiarTexto(palavraPt.textContent, "português");
    destacarCard(palavraPt.parentElement);
  });

  btnClear.addEventListener("click", () => {
    palavraEn.textContent = "";
    palavraPt.textContent = "";
    limparResponse();

    if (cardAnterior) {
      cardAnterior.classList.remove("card-copiado");
      if (destaqueTimeout) {
        clearTimeout(destaqueTimeout);
        destaqueTimeout = null;
      }
      cardAnterior = null;
    }
  });

  // Caminho do JSON com as palavras
  fetch("assets/json/words.json")
    .then(res => res.json())
    .then(data => {
      palavras = data;
      gerarPalavra();
    })
    .catch(error => {
      console.error("Erro ao carregar palavras:", error);
      response.textContent = "Erro ao carregar palavras.";
    });
});




























