'use client'
export default function Inputebutton({ saveTarefas, tarefa, setTarefa, tarefas, setTarefas }: any) {
    function add(){
    if (!tarefa) return alert("Dont do a empty input please.")
    const novasTarefas = [...tarefas, tarefa]
    setTarefas(novasTarefas)
    saveTarefas(novasTarefas)
    setTarefa("")
}
    return (
        <form onSubmit={(e) => add()}>
            <input onChange={(e) => setTarefa(e.target.value)} value={tarefa} placeholder="Insert a task.." type="text" />
            <button type="submit">ADD</button>
        </form>
    )
}