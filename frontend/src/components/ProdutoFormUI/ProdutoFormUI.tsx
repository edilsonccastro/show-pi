import { ChangeEventHandler } from "react";
import { ProdutoData } from "../../interfaces/ProdutoData";

interface ProdutoFormProps {
    produto: ProdutoData,
    btnStatus: boolean,
    eventoAoDigitar: ChangeEventHandler<HTMLInputElement>,
    alterar: any,
    cancelar: any,
    excluir: any
}

function ProdutoFormUI({produto, btnStatus, eventoAoDigitar, alterar, cancelar, excluir}: ProdutoFormProps) {
    return (
        <form>
            <input type='text' name='nome' value={produto.nome}
             onChange={eventoAoDigitar} className='form-control' placeholder='Nome' />
            <input type='text' name='foto' value={produto.foto}
             onChange={eventoAoDigitar} className='form-control' placeholder='URL da imagem' />
            <input type='text' name='preco' value={produto.preco}
             onChange={eventoAoDigitar} className='form-control' placeholder='Preço' />
            <input type='text' name='quantidade' value={produto.quantidade}
             onChange={eventoAoDigitar} className='form-control' placeholder='Qtde.' />

            <input type='button' className={btnStatus? 'btn btn-primary': 'btn btn-disabled'} value='Alterar'
             onClick={alterar} disabled={!btnStatus} />
            <input type='button' className={btnStatus? 'btn btn-danger': 'btn btn-disabled'} value='Remover'
             onClick={excluir} disabled={!btnStatus} />
            <input type='button' className={btnStatus? 'btn btn-warning': 'btn btn-disabled'} value='Cancelar'
             onClick={cancelar} disabled={!btnStatus} />
        </form>
    )
}

export default ProdutoFormUI;