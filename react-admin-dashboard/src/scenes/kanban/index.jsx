import { useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme/theme";
import Header from "../../components/Header";
import { mockKanbanTasks, mockKanbanColumns, mockKanbanColumnOrder } from "../../data/mockData";
import AddIcon from "@mui/icons-material/Add";

const Kanban = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [columns, setColumns] = useState(mockKanbanColumns);
  const [columnOrder, setColumnOrder] = useState(mockKanbanColumnOrder);
  const [tasks, setTasks] = useState(mockKanbanTasks);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  
  const addTask = (columnId) => {
    const title = prompt("Enter task title:");
    if (!title) return;
    
    const newTaskId = `task-${Date.now()}`;
    const newTask = {
      id: newTaskId,
      content: title
    };
    
    // Update tasks
    const updatedTasks = {
      ...tasks,
      [newTaskId]: newTask
    };
    
    // Add task to column
    const column = columns[columnId];
    const updatedColumn = {
      ...column,
      taskIds: [...column.taskIds, newTaskId]
    };
    
    // Update columns
    const updatedColumns = {
      ...columns,
      [columnId]: updatedColumn
    };
    
    setTasks(updatedTasks);
    setColumns(updatedColumns);
  };
  
  const removeTask = (taskId, columnId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    
    // Remove task from column
    const column = columns[columnId];
    const updatedTaskIds = column.taskIds.filter(id => id !== taskId);
    
    const updatedColumn = {
      ...column,
      taskIds: updatedTaskIds
    };
    
    // Update columns
    const updatedColumns = {
      ...columns,
      [columnId]: updatedColumn
    };
    
    // Remove task from tasks
    const updatedTasks = { ...tasks };
    delete updatedTasks[taskId];
    
    setTasks(updatedTasks);
    setColumns(updatedColumns);
  };
  
  const moveTask = (taskId, sourceColumnId, destinationColumnId) => {
    // Skip if the destination is the same as the source
    if (sourceColumnId === destinationColumnId) return;
    
    // Remove from source column
    const sourceColumn = columns[sourceColumnId];
    const updatedSourceTaskIds = sourceColumn.taskIds.filter(id => id !== taskId);
    
    // Add to destination column
    const destinationColumn = columns[destinationColumnId];
    const updatedDestinationTaskIds = [...destinationColumn.taskIds, taskId];
    
    // Update columns
    const updatedColumns = {
      ...columns,
      [sourceColumnId]: {
        ...sourceColumn,
        taskIds: updatedSourceTaskIds
      },
      [destinationColumnId]: {
        ...destinationColumn,
        taskIds: updatedDestinationTaskIds
      }
    };
    
    setColumns(updatedColumns);
  };

  return (
    <Box m="20px">
      <Header title="KANBAN BOARD" subtitle="Manage Your Tasks" />
      
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{ overflowX: "auto", pb: 2 }}
      >
        {columnOrder.map((columnId) => {
          const column = columns[columnId];
          const columnTasks = column.taskIds.map(taskId => tasks[taskId]);
          
          return (
            <Box
              key={column.id}
              backgroundColor={colors.primary[400]}
              p={2}
              borderRadius="4px"
              minWidth="300px"
              mr={2}
              flex="0 0 auto"
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography
                  variant="h5"
                  fontWeight="600"
                  color={colors.grey[100]}
                >
                  {column.title}
                </Typography>
                <Typography
                  backgroundColor={colors.greenAccent[500]}
                  p="5px 10px"
                  borderRadius="4px"
                >
                  {columnTasks.length}
                </Typography>
              </Box>
              
              {/* Tasks */}
              {columnTasks.map((task) => (
                <Box
                  key={task.id}
                  backgroundColor={colors.primary[500]}
                  p={2}
                  borderRadius="4px"
                  mb={2}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData("taskId", task.id);
                    e.dataTransfer.setData("sourceColumnId", column.id);
                  }}
                  sx={{
                    cursor: "grab",
                    "&:hover": {
                      opacity: 0.8,
                    },
                  }}
                >
                  <Box display="flex" justifyContent="space-between">
                    <Typography>{task.content}</Typography>
                    <Button
                      size="small"
                      onClick={() => removeTask(task.id, column.id)}
                      sx={{ color: colors.redAccent[500], minWidth: "30px", p: 0 }}
                    >
                      ×
                    </Button>
                  </Box>
                </Box>
              ))}
              
              {/* Add task button */}
              <Button
                startIcon={<AddIcon />}
                onClick={() => addTask(column.id)}
                sx={{
                  color: colors.grey[100],
                  backgroundColor: colors.blueAccent[700],
                  "&:hover": { backgroundColor: colors.blueAccent[600] },
                  width: "100%",
                }}
              >
                Add Task
              </Button>
              
              {/* Drop area */}
              <Box
                height="100px"
                width="100%"
                mt={2}
                border={`1px dashed ${colors.grey[500]}`}
                borderRadius="4px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const taskId = e.dataTransfer.getData("taskId");
                  const sourceColumnId = e.dataTransfer.getData("sourceColumnId");
                  moveTask(taskId, sourceColumnId, column.id);
                }}
                sx={{ opacity: 0.5 }}
              >
                <Typography color={colors.grey[100]}>Drop here</Typography>
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Kanban;
