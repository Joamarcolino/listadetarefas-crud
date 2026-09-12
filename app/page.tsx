'use client'

import {useState} from 'react'
import Lista from './components/lista'
import Inputebutton from './components/inputebutton'
export default function Home(){  
const [tarefa, setTarefa] = useState<String>("")
const [tarefas, setTarefas] = useState<String[]>(() => {
  const saved = localStorage.getItem('tarefas');
  return saved ? JSON.parse(saved) : [];
})
return(
  <section className='flex justify-center  text-center flex-col border-amber-50'>
    <Inputebutton  tarefa={tarefa} setTarefa={setTarefa} tarefas={tarefas} setTarefas={setTarefas} />
    <Lista tarefa={tarefa} tarefas={tarefas} setTarefas={setTarefas} />
  </section>
)
}