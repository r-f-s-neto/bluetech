export function filtroCat(produto, categoria) {
  if (categoria === 'Tudo') {
    return true;
  } else if (produto.categories[0]) {
    return produto.categories[0].name === categoria;
  } else {
    return false;
  }
}

export function filtroPrecificacao(dataProd, filtroPreco) {
  switch (filtroPreco) {
    case 'Mais Relevantes':
      return dataProd?.sort((a, b) => a.id - b.id);
    case 'Menor Preço':
      return dataProd?.sort((a, b) => a.price - b.price);
    case 'Maior Preço':
      return dataProd?.sort((a, b) => a.price - b.price).reverse();
    default:
      return dataProd;
  }
}
