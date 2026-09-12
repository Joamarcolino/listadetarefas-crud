export default function Lista({tarefa, tarefas, setTarefas}: any){
    function deleter(index: number){
        const novasTarefas = tarefas.filter((_: any, i: number) => i !== index);
        setTarefas(novasTarefas);
        localStorage.setItem('tarefas', JSON.stringify(novasTarefas));
    }

    return(
        <div>
            <ul>
                {tarefas.map((tarefa:number, i: number) =>(
                    <div className='flex-row' key={i}>
                        <li>{i + 1} {tarefa}</li>
                        <button className="bg-red-600 text-white" onClick={() => deleter(i)}>Delete</button>
                        <button className="bg-green-600 text-white">Edit?</button>
                    </div>
                ))}
            </ul>
        </div>
    )
}