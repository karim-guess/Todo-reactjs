import { useEffect, useState } from "react";
import Todoitem from "./Todoitem";
import { Construction } from "lucide-react";


type Priority = 'Urgente' | 'Moyenne' | 'Petite';

type Todo = {
  id:number;
  text:string;
  priority :Priority;
}

function App() {

 const [ input , setInput ] = useState("");
 const [ priority , setPriority ] = useState<Priority>("Moyenne");

 const savedTodos = localStorage.getItem("todos");
 const initialTodos = savedTodos ? JSON.parse(savedTodos) : [];
 const [todos, setTodos] = useState<Todo[]>(initialTodos);
 const [filter, setFilter] = useState<Priority | "Tous">("Tous");

 useEffect(() => {
 localStorage.setItem("todos", JSON.stringify(todos));
 }, [todos])

 function addTodo() {
  if (input.trim() == "") {
    alert("Veuillez entrer une tâche.");
    return;
  }


  const newTodo: Todo = {
    id: Date.now(),
    text: input,
    priority: priority,
  };



 const  newTodos = [newTodo, ...todos];
 setTodos(newTodos);
  setInput("");
  setPriority("Moyenne");
}

let filteredTodos: Todo[] = [];
if (filter === "Tous") {
  filteredTodos = todos;
} else {
  filteredTodos = todos.filter(todo => todo.priority === filter);
}

const urgenteCount = todos.filter(todo => todo.priority === "Urgente").length;
const MoyenneCount = todos.filter(todo => todo.priority === "Moyenne").length;
const PetiteCount = todos.filter(todo => todo.priority === "Petite").length;
const totalCount = todos.length;

function handleDelete(id: number) {
  const newTodos = todos.filter(todo => todo.id !== id);
  setTodos(newTodos);
}

const [selectedTodos, setSelectedTodos] = useState<Set<number>>(new Set());


function toggleSelectTodo(id: number) {
const newSelected = new Set(selectedTodos)
if (newSelected.has(id)) {
    newSelected.delete(id);
  } else {
    newSelected.add(id);

}
  setSelectedTodos(newSelected);
}

function finishSelected() {
  const newTodos = todos.filter((todo) => {
    if (selectedTodos.has(todo.id)) {
      return false; 
    } else {
      return true; 
    }
  });
  setTodos(newTodos);
  setSelectedTodos(new Set());
  
}

  return (
    
      <div className="flex justify-center" >

         <div className="w-2/3 flex flex-col gap-4 my-16 bg-base-300 p-5 rounded-2xl" >

        <div className="flex gap-4 ">
 <input type="text"
 className="input w-full"
 placeholder="Ajouter une tache ..."
 value={input}
 onChange={(e) => setInput(e.target.value)}
 />
<select 
className="select w-full" value={priority}
onChange={(e) => setPriority(e.target.value as Priority)}
>
<option value="Urgente">Urgente</option>
<option value="Moyenne">Moyenne</option>
<option value="Petite">Petite</option>
</select>
<button onClick={addTodo} className="btn btn-primary" >
  Ajouter
</button>
        </div> 

            <div className="space-y-2 flex-1 h-fit" >
              <div className="flex justify-between items-center mb-4">
                <div className="flex flex-wrap gap-4">
                    <button className={`btn btn-soft ${filter === "Tous" ? "btn-primary" : ""}`} onClick={() => setFilter("Tous")}   
                    >
                      Tous ({totalCount})  
                    </button>

                    <button className={`btn btn-soft ${filter === "Urgente" ? "btn-primary" : ""}`} onClick={() => setFilter("Urgente")}   
                    >
                      Urgente ({urgenteCount})  
                    </button>

                    <button className={`btn btn-soft ${filter === "Moyenne" ? "btn-primary" : ""}`} onClick={() => setFilter("Moyenne")}   
                    >
                      Moyenne ({MoyenneCount})  
                    </button>

                    <button className={`btn btn-soft ${filter === "Tous" ? "btn-primary" : ""}`} onClick={() => setFilter("Petite")}

                    >
                      Petite ({PetiteCount})  
                    </button>
             
              
              </div>

              <button onClick={finishSelected} className="btn btn-primary" 
              disabled={selectedTodos.size == 0}>
                Finir la selection ({selectedTodos.size})
              </button>
              </div>

            {filteredTodos.length > 0 ? (
              <ul className="divide-y divide-primary/20" >
                
              {filteredTodos.map((todo) => (
                 
                 <li key={todo.id} >
                 < Todoitem 
                   todo={todo}
                   isSelected={selectedTodos.has(todo.id)}
                   onDelete={()=>handleDelete(todo.id)}
                   onToggleSelect={() => toggleSelectTodo(todo.id)}
                  
                  />
                  </li>
              ))}

                
              </ul>
              ) : ( 
                <div className="flex justify-center items-center flex-col p-5">
                  <Construction className="w-40 h-40 text-primary"/>
                  <p className="text-sm">Aucune tache pour ce filtre</p>
                </div>
            )}

            </div>


         </div>

      </div>
   
  )
}

export default App
