'use client'
export default function Inputebutton({ tarefa, setTarefa, tarefas, setTarefas }: any) {
    function add() {
        if (!tarefa) return alert("Can't do in an empty space can we?");
        const novasTarefas = [...tarefas, tarefa];
        setTarefas(novasTarefas);
        localStorage.setItem('tarefas', JSON.stringify(novasTarefas))
        setTarefa("");
        console.log(novasTarefas)
    }
    return (
        <div>
            <input onKeyDown={(event) => {
                if (event.key === "Enter") return add();
            }} onChange={(e) => setTarefa(e.target.value)} value={tarefa} placeholder="Insert a task.." type="text" />
            <button onClick={add}>ADD</button>
        </div>
    )
}