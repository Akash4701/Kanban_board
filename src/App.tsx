import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import { Trash2 } from "lucide-react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import { Button } from "./components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MultiSelect } from "react-multi-select-component";
import {DndContext} from '@dnd-kit/core';
import Draggable from "./components/drag";
import Droppable from "./components/drop";
import * as React from "react"


type Lane = {
  id: string;
  title: string;
  cards: any[];
};

function App() {
  
  const [lanes, setLanes] = useState<Lane[]>([]);
  const [title, setTitle] = useState("");
  const [isCardFormVisible, setisCardVisible] = useState({
    visible: false,
    laneId: 0,
  });
  const [newCard, setnewCard] = useState({
    title: "",
    Users: [],
    deadline: new Date(),
    priority:''
  });

  const addLane = () => {
    if (!title.trim()) return;
    const newLane = {
      id: uuidv4(),
      title: title,
      cards: [],
    };
    setLanes([...lanes, newLane]);
    setTitle("");
  };

  const handleDelete = (laneId: any) => {
    setLanes(lanes.filter((lane) => laneId !== lane.id));
  };

  const users = [
    { value: 0, label: "Akash" },
    { value: 1, label: "Pfrnjkjk" },
    { value: 2, label: "hehbe" },
  ];

  const priority=[
    {value:'high',label:"High"},
    {value:'medium',label:"Medium"},
    {value:'low',label:"Low"},
   
  ]

  const addCards = (LaneId: any) => {
    const newestCard={
      ...newCard,

      id:uuidv4(),
      
    }
    setLanes(
      lanes.map((lane) => {
        if (lane.id === LaneId) {
          return {
            ...lane,
            cards: [...lane.cards, newestCard],
          };
        }
        return lane;
      })
    );
    setnewCard({ title: "", Users: [], deadline: new Date(),priority:"" });
    setisCardVisible({ visible: false, laneId: 0 });
  };
  function handleDragEnd(event: any) {
  const { active, over } = event;

  if (!over || active.id === over.id) return;

  const sourceLaneId = active.data.current?.laneId;
  const targetLaneId = over.id;

  if (sourceLaneId === targetLaneId) return;

  // Find the dragged card
  const card = lanes
    .find((lane) => lane.id === sourceLaneId)
    ?.cards.find((c) => c.id === active.id);

  if (!card) return;

  setLanes((prevLanes) => { 
    return prevLanes.map((lane) => {
      if (lane.id === sourceLaneId) {
        return { ...lane, cards: lane.cards.filter((c) => c.id !== card.id) };
      } else if (lane.id === targetLaneId) {
        return { ...lane, cards: [...lane.cards, card] };
      } else {
        return lane;
      }
    });
  });
}
type Checked = DropdownMenuCheckboxItemProps["checked"]

  const [showusersfilter,setusersfilter]=useState([])
 const [showpriorityfilter,setshowpriorityfilter]=useState([])


const handlestatuscheck=(p:string | Number,status:Boolean,type:string)=>{
  if(type=="priority"){
  if(status){
    setshowpriorityfilter((prev)=>[...prev,p])
  }else{
    setshowpriorityfilter((prev)=>prev.filter((item)=>item!==p))
  }
}else{
   if(status){
    setusersfilter((prev)=>[...prev,p])
  }else{
    setusersfilter((prev)=>prev.filter((item)=>item!==p))
  }


}
  

}


  return (
    
     <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-8">
      {/* Filter Controls */}
      <div className="flex flex-wrap gap-4 justify-center mb-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-white shadow-sm px-4 py-2 rounded-lg hover:bg-blue-50">
              Priority
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 rounded-xl shadow-xl border border-gray-200">
            {priority.map((p) => (
              <DropdownMenuCheckboxItem
                key={p.value}
                checked={showpriorityfilter.includes(p.value)}
                onCheckedChange={(checked) =>
                  handlestatuscheck(p.value, checked as boolean, "priority")
                }
              >
                {p.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-white shadow-sm px-4 py-2 rounded-lg hover:bg-blue-50">
              Assignee
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 rounded-xl shadow-xl border border-gray-200">
            {users.map((u) => (
              <DropdownMenuCheckboxItem
                key={u.value}
                checked={showusersfilter.includes(u.value)}
                onCheckedChange={(checked) =>
                  handlestatuscheck(u.value, checked as boolean, "user")
                }
              >
                {u.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Lane Input */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Enter lane title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 shadow-md"
            onClick={addLane}
          >
            Add Lane
          </button>
        </div>
      </div>

      {/* Lanes and Cards */}
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex flex-wrap justify-center gap-6">
          {lanes.map((lane) => (
            <div
              key={lane.id}
              className="bg-white shadow-lg rounded-2xl p-4 w-80 border border-gray-200"
            >
              <Droppable key={lane.id} laneId={lane.id}>
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-lg font-semibold text-gray-800">{lane.title}</h1>
                  <button
                    onClick={() => handleDelete(lane.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* Card Form */}
                {isCardFormVisible.visible &&
                  isCardFormVisible.laneId === lane.id && (
                    <div className="bg-gray-100 rounded-xl p-4 mb-4 shadow-inner">
                      <input
                        type="text"
                        placeholder="Card title"
                        value={newCard.title}
                        onChange={(e) =>
                          setnewCard({ ...newCard, title: e.target.value })
                        }
                        className="w-full p-2 mb-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                      <div className="mb-3">
                        <MultiSelect
                          options={users}
                          value={newCard.Users}
                          onChange={(selected: []) =>
                            setnewCard({ ...newCard, Users: selected })
                          }
                          labelledBy="Select"
                        />
                      </div>
                      <div className="mb-3">
                        <select
                          value={newCard.priority}
                          onChange={(e) =>
                            setnewCard({ ...newCard, priority: e.target.value })
                          }
                          className="w-full p-2 border border-gray-300 rounded-md"
                        >
                          <option>Select Priority</option>
                          {priority.map((p) => (
                            <option key={p.value} value={p.value}>
                              {p.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mb-3">
                        <DatePicker
                          selected={newCard.deadline}
                          onChange={(date: Date | null) =>
                            setnewCard({
                              ...newCard,
                              deadline: date ?? new Date(),
                            })
                          }
                          className="w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                      <div className="flex justify-between gap-3">
                        <button
                          onClick={() => addCards(lane.id)}
                          className="bg-green-600 text-white px-4 py-1 rounded-md hover:bg-green-700 shadow-sm"
                        >
                          Save
                        </button>
                        <button
                          onClick={() =>
                            setisCardVisible({ visible: false, laneId: lane.id })
                          }
                          className="bg-gray-300 text-gray-700 px-4 py-1 rounded-md hover:bg-gray-400"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                {/* Cards List */}
                <div className="space-y-2 mb-3">
                  {lane.cards.length > 0 ? (
                    lane.cards
                      .filter(
                        (card) =>
                          (showpriorityfilter.length === 0 ||
                            showpriorityfilter.includes(card.priority)) &&
                          (showusersfilter.length === 0 ||
                            card.Users?.some((element) =>
                              showusersfilter.includes(element.value)
                            ))
                      )
                      .map((card, index) => (
                        <Draggable
                          key={card.id}
                          card={card}
                          index={index}
                          laneId={lane.id}
                        />
                      ))
                  ) : (
                    <p className="text-sm text-gray-400">No cards yet</p>
                  )}
                </div>

                {/* Add Card Button */}
                {!(
                  isCardFormVisible.visible &&
                  isCardFormVisible.laneId === lane.id
                ) && (
                  <button
                    onClick={() =>
                      setisCardVisible({ visible: true, laneId: lane.id })
                    }
                    className="w-full bg-blue-100 text-blue-700 text-sm py-1 rounded-md hover:bg-blue-200 font-medium"
                  >
                    + Add Card
                  </button>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DndContext>
    </div>
   
  );
}

export default App;
