import {useDraggable} from '@dnd-kit/core';
import {CSS} from '@dnd-kit/utilities';
import * as React from "react"

type draggableProps={
    card:any
    index:number
    laneId:string

}
function Draggable({card,index,laneId}:draggableProps) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: `${card.id}`,
      data: {
      laneId: laneId, 
    },
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };
  
  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
        <div key={index} className="bg-white border rounded-md p-2 shadow-sm">

                      <h2 className="text-md font-medium text-gray-800">{card.title}</h2>
                      <div className="text-sm text-gray-600">
                        {card.Users.map((user: any, i: number) => (
                          <p key={i}>👤 {user.label}</p>
                        ))}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        📅 {new Date(card.deadline).toLocaleDateString()}
                      </p>
                      <p>{card.priority}</p>
                    </div>
    </button>
  );
}
  export default Draggable