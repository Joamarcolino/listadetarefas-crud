export default function Inputebutton({tarefa, setTarefa, tarefas, setTarefas} : any){
    function add(){
        if (!tarefa) return alert("Can't do in an empty space can we?");
        const novasTarefas = [...tarefas, tarefa];
        setTarefas(novasTarefas);
        localStorage.setItem('tarefas', JSON.stringify(novasTarefas));
        setTarefa("");
        console.log(novasTarefas)
    }
    function deleter(index:Number){
        tarefas.filter((i, _) =>  i !== index )
    }
    return(
        <div>
            <input onChange={(e) => setTarefa(e.target.value)} value={tarefa} placeholder="Insert a task.." type="text" />
            <button onClick={add}>ADD</button>
        </div>
    )}