// import { ProdutoData } from "../../interfaces/ProdutoData"
import "./produto.css"

interface ProdutoProps {
    preco: number,
    nome: string,
    imagem: string,
    qtde: number
}

export function Produto({preco, nome, imagem, qtde}: ProdutoProps) {
    return (
        <div className="produto">
            <img src={imagem}/>
            <h2>{nome}</h2>
            <p id="preco">Preço: <b>{preco}</b></p>
            <p id="qtde">Qtde. disponível: <i>{qtde}</i></p>
        </div>
    )
}