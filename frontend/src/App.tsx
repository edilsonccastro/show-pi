import { useState, useEffect } from 'react';
import './App.css'
import { ProdutoData } from './interfaces/ProdutoData';
import { NumericFormat } from 'react-number-format';
import { useNavigate } from 'react-router-dom';
import { ProdutoQtde } from './interfaces/ProdutoQtde';

function App() {

  const [produtoLista, setProdutoLista] = useState<ProdutoData[]>([]);
  const [carrinho, setCarrinho] = useState<ProdutoQtde[]>([]);

  useEffect(()=>{
    fetch("http://localhost:8080/produto")
    .then(response => response.json())
    .then(response_json => setProdutoLista(response_json))
  }, []);

  const indiceNoCarrinho = (id: number) => {
    return carrinho.findIndex((p: ProdutoQtde) => {
      return p.id === id;
    });
  }

  const alterarCarrinho = (id: number) => {
    let listaTemp = [...carrinho];
    let indice = indiceNoCarrinho(id);
    if (indice < 0) {
      listaTemp.push({id: id, quantidade: 1})
    } else {
      listaTemp.splice(indice, 1);    
    }
    setCarrinho(listaTemp);
  }

  const nav = useNavigate();
  const navToCarrinho = () => {
    nav('/cart', {state: {carrinho: carrinho, produtoLista: produtoLista}})
  }

  return (
    <div className="container">
      <h1>ShowPI - Sua loja de produtos eletrônicos</h1>
      <nav className="navbar navbar-expand-lg navbar-dark bg-danger border-bottom shadow-sm mb-3">
        <ul className="navbar-nav">
          <li className="nav-item">
            {
              carrinho.length?
                <span className="badge rounded-pill bg-light text-danger position-absolute ms-4 mt-0"
                      title={carrinho.length + " produto(s) no carrinho"}><small>{carrinho.length}</small></span>
              :
                <span/>
            }
            <a onClick={() => {navToCarrinho()}} className="nav-link">
                <i className="bi-cart" style={{fontSize:'24px',lineHeight:'24px'}}></i>
            </a>
          </li>
        </ul>
      </nav>
      <main className="flex-fill">
        <div className="row g-3"> {
          produtoLista.map((p: any, i: number) => (
            <div key={i} className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-4">
                <div className="card text-center bg-light">
                    <div className="card-header">
                        <img src={p.foto} className="card-img-top" />
                        <p>
                          <NumericFormat displayType="text" valueIsNumericString
                           prefix="R$ "
                           value={p.preco}
                           decimalSeparator=',' decimalScale={2} fixedDecimalScale
                          />
                        </p>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{p.nome}</h5>
                    </div>
                    <div className="card-footer">
                        {
                          indiceNoCarrinho(p.id) >= 0? 
                          <a className="btn btn-danger mt-2 d-block" onClick={() => {alterarCarrinho(p.id)}}>
                              Remover do carrinho
                          </a>
                          :
                          <a className="btn btn-success mt-2 d-block" onClick={() => {alterarCarrinho(p.id)}}>
                              Adicionar ao carrinho
                          </a>
                        }
                        <small className="text-success">{p.quantidade} em estoque</small>
                    </div>
                </div>
            </div>
          ))
        }
        </div>
      </main>
    </div>
  )
}

export default App
