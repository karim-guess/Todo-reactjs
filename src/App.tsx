import { useEffect, useState } from "react";
import Todoitem from "./Todoitem";


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
              <div className="flex flex-wrap gap-4">
                    <button className={`btn btn-soft ${filter === "Tous" ? "btn-primary" : ""}`} onClick={() => setFilter("Tous")}   
                    >
                      Tous  
                    </button>

              </div>

            {filteredTodos.length > 0 ? (
              <ul className="divide-y divide-primary/20" >
                
              {filteredTodos.map((todo) => (
                 
                 <li key={todo.id} >
                 < Todoitem todo={todo} />
                  </li>
              ))}

                
              </ul>
              ) : ( 
                <div>test 2</div>
            )}

            </div>


         </div>

      </div>
   
  )
}

export default App
