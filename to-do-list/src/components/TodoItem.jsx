import { useState } from 'react';
import { Check, Edit2, Trash2, Calendar, AlertCircle, Clock } from 'lucide-react';
import TodoForm from './TodoForm';

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const priorityColors = {
    low: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    medium: 'bg-amber-50 text-amber-700 border-amber-200',
    high: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  const priorityIcons = {
    low: <Clock className="w-3 h-3" />,
    medium: <AlertCircle className="w-3 h-3" />,
    high: <AlertCircle className="w-3 h-3" />,
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    const today = new Date();
    const due = new Date(dueDate);
    return due < today && !todo.completed;
  };

  const handleEdit = (updatedData) => {
    onEdit(todo.id, updatedData);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <TodoForm
        todo={todo}
        onSubmit={handleEdit}
        onCancel={() => setIsEditing(false)}
        isEditing={true}
      />
    );
  }  return (
    <div className={`bg-white rounded-2xl p-8 shadow-xl border border-gray-100
                     transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 group ${
      todo.completed 
        ? 'opacity-75' 
        : isOverdue(todo.dueDate)
          ? 'border-l-4 border-l-red-400'
          : ''
    }`}>
      <div className="flex items-start gap-6">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 w-7 h-7 rounded-xl border-2 flex items-center justify-center 
                     transition-all duration-200 mt-1 ${
            todo.completed
              ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg'
              : 'border-gray-300 hover:border-emerald-400 hover:bg-emerald-50'
          }`}
        >
          {todo.completed && <Check className="w-4 h-4" />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1 space-y-4">
              <h3 className={`text-xl font-bold leading-relaxed ${
                todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
              }`}>
                {todo.title}
              </h3>
              
              {todo.description && (
                <p className={`text-base leading-relaxed ${
                  todo.completed ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {todo.description}
                </p>
              )}

              {/* Meta information */}
              <div className="flex flex-wrap items-center gap-4">
                {/* Priority */}
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border ${
                  priorityColors[todo.priority]
                }`}>
                  {priorityIcons[todo.priority]}
                  {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)} Priority
                </span>

                {/* Due date */}
                {todo.dueDate && (
                  <span className={`inline-flex items-center gap-2 text-sm font-medium px-3 py-1 rounded-lg ${
                    isOverdue(todo.dueDate)
                      ? 'text-red-600 bg-red-50'
                      : todo.completed
                        ? 'text-gray-400'
                        : 'text-gray-600 bg-gray-50'
                  }`}>
                    <Calendar className="w-4 h-4" />
                    Due {formatDate(todo.dueDate)}
                    {isOverdue(todo.dueDate) && (
                      <span className="text-red-600 font-bold ml-1">(Overdue)</span>
                    )}
                  </span>
                )}

                {/* Created date */}
                <span className="text-sm text-gray-400 font-medium">
                  Created {formatDate(todo.createdAt)}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={() => setIsEditing(true)}
                className="p-3 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl 
                         transition-all duration-150"
                title="Edit task"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => onDelete(todo.id)}
                className="p-3 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl 
                         transition-all duration-150"
                title="Delete task"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
