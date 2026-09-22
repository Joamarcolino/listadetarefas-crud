
'use client'

import {useState, useEffect} from 'react'
import Lista from './components/lista'
import Inputebutton from './components/inputebutton'
export default function Home(){  
const [tarefa, setTarefa] = useState<String>("")
const [tarefas, setTarefas] = useState<String[]>([])
const [editingIndex, setEditingIndex] = useState<number | null>(null)
const [editValue, setEditValue] = useState('') 

useEffect(() => {
  const saved = localStorage.getItem('tarefas');
  if (saved) setTarefas(JSON.parse(saved));
}, [tarefas]);
// Salva as tarefas no localStorage, transformando em string para ser identificado
function saveTarefas(novasTarefas:any){
  localStorage.setItem('tarefas', JSON.stringify(novasTarefas))
}

// Adicione as tarefas na lista.  
return(
  <section className='flex justify-center  text-center flex-col border-amber-50'>
    <Inputebutton saveTarefas={saveTarefas}  tarefa={tarefa} setTarefa={setTarefa} tarefas={tarefas} setTarefas={setTarefas} />
    <Lista  saveTarefas={saveTarefas} setEditValue={setEditValue} setEditingIndex={setEditingIndex} editValue={editValue} editingIndex={editingIndex} tarefas={tarefas} setTarefas={setTarefas} />
  </section>
)
}