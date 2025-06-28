
## 📝 Kanban Board with Filtering

A simple and interactive **Kanban board** built with **React**, **Tailwind CSS**, and **Dnd-kit**, supporting:

* 🧩 Drag and drop of cards between lanes
* 🔍 Filtering by priority and assignee
* 🗂️ Dynamic lane and card creation
* 🎯 User-friendly UI with clear structure and flow

---

### ✨ Features

* ✅ **Add/Remove Lanes**
* ✅ **Add/Remove Cards**
* ✅ **Filter by Priority (High, Medium, Low)**
* ✅ **Filter by Assignee**
* ✅ **Deadline Picker for Tasks**
* ✅ **Responsive, Clean UI with Tailwind CSS**
* ✅ **Drag-and-Drop Support with dnd-kit**

---

### 🛠️ Tech Stack

| Tech               | Purpose                      |
| ------------------ | ---------------------------- |
| React              | Frontend Framework           |
| TypeScript         | Type safety                  |
| Tailwind CSS       | UI styling                   |
| Dnd-kit            | Drag and Drop functionality  |
| react-datepicker   | Date selection in cards      |
| react-multi-select | Multi-select user assignment |
| Lucide-react       | Iconography                  |

---

### 📸 Preview

> *Here's what the board looks like (screenshot placeholder)*
> ![Kanban Preview](https://via.placeholder.com/600x300.png?text=Kanban+Board+Preview)

---

### 🚀 Getting Started

#### 📦 Prerequisites

* Node.js (v16+)
* npm / yarn

#### 🔧 Installation

```bash
git clone https://github.com/your-username/kanban-board.git
cd kanban-board
npm install
npm run dev
```

Open your browser and navigate to:
`http://localhost:5173` (or appropriate port)

---

 📂 Project Structure

```bash
src/
│
├── components/
│   ├── drag.tsx         # Draggable card component
│   ├── drop.tsx         # Droppable lane area
│
├── App.tsx              # Main application
├── App.css              # Tailwind + custom styles
├── main.tsx             # Entry point
└── ...

