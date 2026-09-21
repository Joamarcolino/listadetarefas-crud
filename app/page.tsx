
'use client'

import {useState, useEffect} from 'react'
import Lista from './components/lista'
import Inputebutton from './components/inputebutton'
export default function Home(){  
const [tarefa, setTarefa] = useState<String>("")
const [tarefas, setTarefas] = useState<String[]>(() => {
  const saved = localStorage.getItem('tarefas');
  return saved ? JSON.parse(saved) : [];
})
const [editingIndex, setEditingIndex] = useState<number | null>(null)
const [editValue, setEditValue] = useState('') 


// Salva as tarefas no localStorage, transformando em string para ser identificado
function saveTarefas(novasTarefas:any){
  localStorage.setItem('tarefas', JSON.stringify(novasTarefas))
}

// Adicione as tarefas na lista.  
function add(){
    if (!tarefa) return alert("Dont do a empty input please.")
    const novasTarefas = [...tarefas, tarefa]
    setTarefas(novasTarefas)
    saveTarefas(novasTarefas)
    setTarefa("")
}

useEffect(() => {
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
}, [tarefas]);

return(
  <section className='flex justify-center  text-center flex-col border-amber-50'>
    <Inputebutton saveTarefas={saveTarefas}  tarefa={tarefa} setTarefa={setTarefa} tarefas={tarefas} setTarefas={setTarefas} />
    <Lista add={add} saveTarefas={saveTarefas} setEditValue={setEditValue} setEditingIndex={setEditingIndex} editValue={editValue} editingIndex={editingIndex} tarefas={tarefas} setTarefas={setTarefas} />
  </section>
)
}