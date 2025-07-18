import { Trash } from 'lucide-react';

type Priority = 'Urgente' | 'Moyenne' | 'Petite';

type Todo = {
  id:number;
  text:string;
  priority :Priority;
}

type Props = {
    todo: Todo;
}

const Todoitem = ({ todo } : Props) => {
 
  return (
    <li className="p-3">
      <div className="flex justify-between items-center">
          <div  className="flex items-center gap-2">
             <input type="checkbox"  className="checkbox checkbox-primary checkbox-sm" />
             <span className="text-md font-bold" >
                <span>
                    {todo.text}
                </span>
             </span>
             <span className={`badge badge-sm badge-soft
                ${todo.priority === "Urgente" ? "badge-error" : todo.priority === "Moyenne" ? "badge-warning" : "badge-success" }`} >
                {todo.priority }
             </span>
          </div>
         <button className='btn btn-sm btn-error btn-soft '>
            <Trash className='w-4 h-4' />
         </button>
      </div>
    </li>
  )
}

export default Todoitem