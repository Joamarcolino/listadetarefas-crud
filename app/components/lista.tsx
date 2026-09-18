'use client'

import { useState } from 'react'

export default function Lista({setEditValue, setEditingIndex,editingIndex,editValue, tarefas, setTarefas}: any) {

    function deleter(index: number) {
        const novasTarefas = tarefas.filter((_: any, i: number) => i !== index)
        setTarefas(novasTarefas)
        localStorage.setItem('tarefas', JSON.stringify(novasTarefas))
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
        localStorage.setItem('tarefas', JSON.stringify(novasTarefas))
        setEditingIndex(null)
    }

    return (
        <div>
            <ul>
                {tarefas.map((tarefa: string, i: number) => (
                    <div className='flex-row' key={i}>
                        {editingIndex === i ? (
                            
                            <section>
                                <input
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                    />
                                <button className="bg-green-600 text-white" onClick={() => saveEdit(i)}>
                                    Save
                                </button>
                            </section>
                        ) : (

                            <section>

                                <li >{i + 1} {tarefa}</li>
                                <button className="bg-red-600 text-white" onClick={() => deleter(i)}>Delete</button>
                                <button className="bg-green-600 text-white" onClick={() => startEditing(i, tarefa)}>
                                    Edit?
                                </button>
                            </section>
                        )}
                    </div>
                ))}
            </ul>
        </div>
    )
}