export function paginar(produtos, qtdProdPag) {
  const qtdDeProdutos = produtos?.length;
  const qtdPaginas = qtdDeProdutos
    ? Math.ceil(qtdDeProdutos / qtdProdPag)
    : null;
  let inicio = 0;
  const arrayEstruturada = [];
  if (produtos && produtos.length) {
    for (let contador = 1; contador <= qtdPaginas; contador++) {
      if (contador === qtdPaginas) {
        arrayEstruturada.push(produtos.slice(inicio));
      } else {
        const fim = contador * qtdProdPag;
        arrayEstruturada.push(produtos?.slice(inicio, fim));
        inicio = fim;
      }
    }
    return {
      qtdPaginas,
      arrProds: arrayEstruturada,
    };
  } else {
    return {
      qtdPaginas,
      arrProds: null,
    };
  }
}

export function createPag(tamanho) {
  if (tamanho >= 0) {
    const arr = [];
    for (let cont = 1; cont <= tamanho; cont++) {
      arr.push(cont);
    }
    return arr;
  } else {
    return null;
  }
}
