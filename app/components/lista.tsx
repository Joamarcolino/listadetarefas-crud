'use client'

import { useState } from 'react'
import { AsyncLocalStorage } from 'async_hooks'

export default function Lista({saveTarefas, setEditValue, setEditingIndex,editingIndex,editValue, tarefas, setTarefas}: any) {

 function deleter(index:number){
    const novasTarefas = tarefas.filter((_:any, i:number) => i !== index)
    setTarefas(novasTarefas)
    saveTarefas(novasTarefas)
 }
    function startEditing(index: number, currentValue: string) {
        setEditingIndex(index)
        setEditValue(currentValue)
    }

    function saveEdit(index: number) {
        if (!editValue) return alert("Do not leave it an empty space.");
        const novasTarefas = tarefas.map((t: string, i: number) =>
            i === index ? editValue : t
        ) 
        setTarefas(novasTarefas)
        saveTarefas(novasTarefas)
        setEditingIndex(null)
    }

    return (
        <div>
            <ul>
                {tarefas.length === 0 && <p>Sua lista esta vazia...</p>}
                {tarefas.map((tarefa: string, i: number) => (

                    <div className='flex-row' key={i}>
                        {editingIndex === i ? (
                           <form onSubmit={(e) => saveEdit(i)}>
                                <input
                                 value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    />
                                <button type='submit' className="bg-green-600 text-white" >
                                    Save
                                </button>
                            </form>
                            
                        ) : (

                            <section>
                                <ul>

                                <li >{i + 1} {tarefa}</li>
                                <button className="bg-red-600 text-white" onClick={() => deleter(i)}>Delete</button>
                                <button className="bg-green-600 text-white" onClick={() => startEditing(i, tarefa)}>
                                    Edit?
                                </button>
                                </ul>
                            </section>
                        )}
                    </div>
                ))}
            </ul>
        </div>
    )
}