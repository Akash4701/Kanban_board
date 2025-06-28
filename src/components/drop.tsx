import {useDroppable} from '@dnd-kit/core';
import * as React from "react"


function Droppable({laneId,children}:{ laneId: any; children: React.ReactNode }) {
  const {setNodeRef} = useDroppable({
    id: `${laneId}`,
  });
  
  return (
    <div ref={setNodeRef}>
     {children}
    </div>
  );
}
export default Droppable