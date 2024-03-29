import './Cart.css'

import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import { ProdutoData } from '../interfaces/ProdutoData';
import { ProdutoQtde } from '../interfaces/ProdutoQtde';

function Cart() {
 
    const nav = useNavigate();
    const navToApp = () => {
      nav('/')
    }

    const location = useLocation();
    let produtoLista = location.state.produtoLista;
    const [carrinho, setCarrinho] = useState<ProdutoQtde[]>(location.state.carrinho);
    // const [total, setTotal] = useState(0);

    const indiceNoCarrinho = (id: number) => {
      return carrinho.findIndex((pq: ProdutoQtde) => {
        return pq.id === id;
      });
    }

    const atualizarProdutosNoCarrinho = () => {
      let aux = produtoLista.filter(
        (p: ProdutoData) => {
          let indice = indiceNoCarrinho(p.id);
          return (indice >= 0);
        }
      )
      return aux;
    };

    const [produtosNoCarrinho, setProdutosNoCarrinho] = useState<ProdutoData[]>(atualizarProdutosNoCarrinho());

    // const atualizarTotal = () => {
    //   let aux = 0;
    //   produtosNoCarrinho.map((p: ProdutoData, i: number) => {
    //     aux += carrinho[i].quantidade * p.preco;
    //   });
    //   setTotal(aux);
    // }

    const comprar = () => {
      fetch("http://localhost:8080/compra", {
        method: 'post',
        body: JSON.stringify(carrinho),
        headers: {
          'Content-type': 'application/json',
        }
      })
      .then(response => {
        if (response.ok) {
          alert("Compra efetuada com sucesso"); 
          navToApp();  
        } else {
          return response.text();
        }
      })
      .then(text => {
        if (text)
          alert("Erro: " + text); 
      })
    }  

    const eventoAoDigitar = (e: { target: any; }) => {
      let listaTemp = [...carrinho];
      listaTemp[parseInt(e.target.id)].quantidade = e.target.value;
      setCarrinho(listaTemp);
    }
    
    const excluir = (id: number) => {
      if (confirm("Confirma a retirada do item?")) {
        let listaTemp = [...carrinho];
        let indice = indiceNoCarrinho(id);
        listaTemp.splice(indice, 1);    
        setCarrinho(listaTemp);
        setProdutosNoCarrinho(atualizarProdutosNoCarrinho());
        // atualizarTotal();
      }
    }

    return (
      <div className="carrinho">
        <h1>ShowPI - Sua loja de produtos eletrônicos</h1>
        <nav className="navbar navbar-expand-lg navbar-dark bg-info border-bottom shadow-sm mb-3">
          <ul className="navbar-nav">
            <li className="nav-item">Seu carrinho de compras</li>
          </ul>
        </nav>

        <table className='table'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Imagem</th>
                    <th>Preço</th>
                    <th>Qtde.</th>
                    <th>Excluir</th>
                </tr>
            </thead>

            <tbody> {
                produtosNoCarrinho.length?
                  produtosNoCarrinho.map((p: any, i: number) => (
                      <tr key={i}>
                          <td>{i+1}</td>
                          <td>{p.nome}</td>
                          <td><img src={p.foto} className="card-img-top" /></td>
                          <td>
                            <NumericFormat displayType="text" valueIsNumericString
                              prefix="R$ "
                              value={p.preco}
                              decimalSeparator=',' decimalScale={2} fixedDecimalScale
                            />
                          </td>
                          <td>
                            <NumericFormat id={i.toString()}
                              displayType="input" valueIsNumericString
                              value={carrinho[i].quantidade}
                              onChange={eventoAoDigitar}
                              decimalScale={0} fixedDecimalScale
                            />
                          </td>
                          <td>
                              <button className="btn btn-danger" onClick={() => {excluir(p.id)}}>
                                  Excluir
                              </button>
                          </td>
                      </tr>
                  ))
                :
                  <tr>
                  <p>Seu carrinho está vazio</p>
                  </tr>
            }
            {/* <tr key={-1}>
              <td/>
              <td/>
              <td>Total</td>
              <td>
                <NumericFormat displayType="text" valueIsNumericString
                  prefix="R$ "
                  value={total}
                  decimalSeparator=',' decimalScale={2} fixedDecimalScale
                />
              </td>
              <td/>
              <td/>
            </tr> */}
          </tbody>
        </table>
        <button className="btn btn-success" disabled={!produtosNoCarrinho.length} onClick={() => {comprar()}}>
          Comprar
        </button>
      </div>
  )
}

export default Cart;
