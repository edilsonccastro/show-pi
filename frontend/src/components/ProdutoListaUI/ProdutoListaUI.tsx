function ProdutoListaUI({produtoLista, selecionar}: any) {
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Selecionar</th>
                    <th>Nome</th>
                    <th>URL da imagem</th>
                    <th>Preço</th>
                    <th>Qtde.</th>
                </tr>
            </thead>

            <tbody> {
                produtoLista.map((p: any, i: number) => (
                    <tr key={i}>
                        <td>{p.id}</td>
                        <td>
                            <button className="btn btn-success" onClick={() => {selecionar(i)}}>
                                Selecionar
                            </button>
                        </td>
                        <td>{p.nome}</td>
                        <td>{p.foto}</td>
                        <td>{p.preco}</td>
                        <td>{p.quantidade}</td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    )
}

export default ProdutoListaUI;