import { useEffect, useState } from 'react';
import './Admin.css'
import ProdutoFormUI from './../components/ProdutoFormUI/ProdutoFormUI'
import ProdutoListaUI from './../components/ProdutoListaUI/ProdutoListaUI'
import { ProdutoData } from './../interfaces/ProdutoData';

function Admin() {

  const produtoObj = {
    id: 0,
    nome: '',
    foto: '',
    preco: 0.0,
    quantidade: 0
  }

  const [btnStatus, setBtnStatus] = useState(false);
  const [produtoLista, setProdutoLista] = useState<ProdutoData[]>([]);
  const [produto, setProduto] = useState(produtoObj);

  useEffect(()=>{
    fetch("http://localhost:8080/produto")
    .then(response => response.json())
    .then(response_json => setProdutoLista(response_json))
  }, []);

  const aoDigitar = (e: { target: any; }) => {
    setProduto({...produto, [e.target.name]: e.target.value});
  }

  const alterar = () => {
    fetch("http://localhost:8080/produto", {
      method: 'put',
      body: JSON.stringify(produto),
      headers: {
        'Content-type': 'application/json',
      }
    })
    .then(response => {
      if (response.ok) {
        alert("Produto excluído com sucesso");

        let listaTemp = [...produtoLista];
        let indice = listaTemp.findIndex((p: any) => {
          return p.id === produto.id;
        })
        listaTemp[indice] = produto;
        setProdutoLista(listaTemp);

        limparForm();      
      } else {
        alert("Erro: " + response.text);
      }
    })
  }

  const excluir = () => {
    fetch("http://localhost:8080/produto/" + produto.id, {
      method: 'delete',
      headers: {
        'Content-type': 'application/json',
      }
    })
    .then(response => {

      if (response.ok) {
        alert("Produto excluído com sucesso");

        let listaTemp = [...produtoLista];
        let indice = listaTemp.findIndex((p: ProdutoData) => {
          return p.id === produto.id;
        });
        listaTemp.splice(indice, 1);
        setProdutoLista(listaTemp);
        limparForm();      
      } else {
        alert("Erro ao excluir");
      }
    })
  }

  const limparForm = () => {
    setProduto(produtoObj);
    setBtnStatus(false);
  }

  const selecionarProduto = (i: number) => {
    setProduto(produtoLista[i]);
    setBtnStatus(true);
  }

  return (
    <div className="container">
      <h1>ShowPI - Administração do estoque</h1>
      <div className="produto-lista">
        <ProdutoFormUI
          produto={produto} 
          btnStatus={btnStatus}
          eventoAoDigitar={aoDigitar}
          alterar={alterar}
          excluir={excluir}
          cancelar={limparForm}
        />
        <ProdutoListaUI
         produtoLista={produtoLista}
         selecionar={selecionarProduto}
        />
      </div>
    </div>
  )
}

export default Admin
