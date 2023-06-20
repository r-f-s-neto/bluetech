import React from 'react';
import Table from 'react-bootstrap/Table';
import './TableProducts-styles.scss';

const produtos = [
  {
    id: 1,
    src: 'https://www.hardware.com.br/wp-content/uploads/static/wp/2022/10/21/placa-mae.jpg',
    alt: 'alt da imagem',
    name: 'produto 1',
    shortDescription: 'Descrição curta 1',
    categoria: 'Componentes',
    preco: 1000,
  },
  {
    id: 2,
    src: 'https://staticmobly.akamaized.net/p/Mobly-Cadeira-Gamer-Legends-Preta-e-Vermelha-1468-858274-12-zoom.jpg',
    alt: 'alt da imagem',
    name: 'produto 2',
    shortDescription: 'Descrição curta 2',
    categoria: 'Cadeiras',
    preco: 2000,
  },
  {
    id: 3,
    src: 'https://www.pichauarena.com.br/wp-content/uploads/2022/04/dddd.png',
    alt: 'alt da imagem',
    name: 'produto 3',
    shortDescription: 'Descrição curta 3',
    categoria: 'Gabinetes',
    preco: 500,
  },
  {
    id: 4,
    src: 'https://images.samsung.com/is/image/samsung/br-c49hg90-lc49hg90dmlxzd-black-308057473?$650_519_PNG$',
    alt: 'alt da imagem',
    name: 'produto 4',
    shortDescription: 'Descrição curta 4',
    categoria: 'Monitores',
    preco: 5000,
  },
  {
    id: 5,
    src: 'https://www.pichauarena.com.br/wp-content/uploads/2022/04/dddd.png',
    alt: 'alt da imagem',
    name: 'produto 5',
    shortDescription: 'Descrição curta 5',
    categoria: 'Gabinetes',
    preco: 900,
  },
];

const TableProducts = () => {
  return (
    <Table responsive>
      <thead>
        <tr className="tableHead">
          <th>Nome</th>
          <th>Categoria</th>
          <th>Preço</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {produtos?.map((produto) => {
          return (
            <tr
              className="tableBody"
              key={produto.id + produto.categoria + produto.name}
            >
              <td>{produto.name}</td>
              <td>{produto.categoria}</td>
              <td>
                {produto.preco.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </td>
              <td className="TableProducts__Buttons">
                <button>ver detalhes</button>
                <button>excluir</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default TableProducts;
