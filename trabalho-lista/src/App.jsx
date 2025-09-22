import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [descricao, setDescricao] = useState("");
  const [quantidade, setQuantidade] = useState();
  const [valorUnitario, setValorUnitario] = useState();

  const total = Number(quantidade) * Number(valorUnitario);

  const [listaOrcamento, setListaOrcamento] = useState([]);

  useEffect(() => {
    setListaOrcamento(JSON.parse(localStorage.getItem("LISTA_ORCAMENTO")));
  }, []);

  useEffect(() => {
    localStorage.setItem("LISTA_ORCAMENTO", JSON.stringify(listaOrcamento));
  }, [listaOrcamento]);

  const adicionarOrcamento = () => {
    if (descricao.trim() == "") {
      return;
    }
    const novoOrcamento = {
      id: Date.now(),
      descricao: descricao,
      quantidade: quantidade,
      valorUnitario: valorUnitario,
      total: total,
    };
    setListaOrcamento([...listaOrcamento, novoOrcamento]);


    setDescricao("");
    setQuantidade("");
    setValorUnitario("");
    localStorage.setItem("LISTA_ORCAMENTO", JSON.stringify(listaOrcamento));
  };

  const excluirTarefa = (id) => {
    setListaOrcamento(listaOrcamento.filter((task) => task.id != id));

    localStorage.setItem("LISTA_ORCAMENTO", JSON.stringify(listaOrcamento));
  };

  const totalGeral = listaOrcamento.reduce((acc, item) => {
    return acc + item.quantidade * item.valorUnitario;
  }, 0);

  return (
    <>
      <div className="background">
        <h2>Orçamento</h2>
        <div className="inputs">
          <input
            type="text"
            onChange={(e) => setDescricao(e.target.value)}
            value={descricao}
            placeholder="Descrição"
          />
          <input
            type="number"
            onChange={(e) => setQuantidade(e.target.value)}
            value={quantidade}
            placeholder="Quantidade"
          />
          <input
            type="number"
            onChange={(e) => setValorUnitario(e.target.value)}
            value={valorUnitario}
            placeholder="Valor Unitário"
          />
          <button onClick={adicionarOrcamento}>✔</button>
        </div>

        <div className="tabela">
          <p>Descrição</p>
          <p>Qtd</p>
          <p>Unitário</p>
          <p>Total</p>
          <p>Ações</p>
        </div>
        <div className="lista">
          <ul>
            {listaOrcamento.map((conteudo) => (
              <li key={conteudo.id} className="organizar">
                <div className="coluna">
                  <p>{conteudo.descricao}</p>
                </div>
                <div className="coluna">
                  <p>R$ {conteudo.quantidade}</p>
                </div>
                <div className="coluna">
                  <p>R$ {conteudo.valorUnitario}</p>
                </div>
                <div className="coluna">
                  <p>R${conteudo.total}</p>
                </div>
                <div className="coluna acao">
                  <p>
                    <button
                      onClick={() => excluirTarefa(conteudo.id)}
                      className="delete-btn"
                    >
                      ❌
                    </button>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="totalGeral">
          <h3>Total Geral: R$ {totalGeral}</h3>
        </div>
      </div>
    </>
  );
}
export default App