export function filtroCat(produto, categoria) {
  if (categoria === 'Tudo') {
    return true;
  }
  return produto.categoria === categoria;
}

export function filtroPrecificacao(dataProd, filtroPreco) {
  switch (filtroPreco) {
    case 'Mais Relevantes':
      return dataProd.sort((a, b) => a.id - b.id);
    case 'Menor Preço':
      return dataProd.sort((a, b) => a.preco - b.preco);
    case 'Maior Preço':
      return dataProd.sort((a, b) => a.preco - b.preco).reverse();
    default:
      return dataProd;
  }
}
