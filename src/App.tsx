import { useState } from "react";







type Priority = 'Urgente' | 'Moyenne' | 'Petite';

type Todo = {
  id:number;
  text:string;
  priority :Priority;
}

function App() {

 const [ input , setInput ] = useState("");
 const [ priority , setPriority ] = useState<Priority>("Moyenne");

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
<button className="btn btn-primary" >
  Ajouter
</button>
        </div>

         </div>

      </div>
   
  )
}

export default App
