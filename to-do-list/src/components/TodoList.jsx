import { useState, useEffect } from 'react';
import { Plus, Search, Filter, X } from 'lucide-react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, completed, pending
  const [sortBy, setSortBy] = useState('newest'); // newest, oldest, alphabetical

  // Load todos from localStorage on component mount
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        const parsedTodos = JSON.parse(savedTodos);
        setTodos(parsedTodos);
      } catch (error) {
        console.error('Error parsing todos from localStorage:', error);
      }
    }
  }, []);

  // Save todos to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Add new todo
  const addTodo = (todoData) => {
    const newTodo = {
      id: Date.now().toString(),
      title: todoData.title,
      description: todoData.description,
      priority: todoData.priority,
      dueDate: todoData.dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos(prev => [newTodo, ...prev]);
    setShowForm(false);
  };

  // Toggle todo completion
  const toggleTodo = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  // Edit todo
  const editTodo = (id, updatedData) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, ...updatedData } : todo
      )
    );
  };

  // Filter todos based on search and status
  const filteredTodos = todos.filter(todo => {
    const matchesSearch = todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         todo.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' ||
                         (filterStatus === 'completed' && todo.completed) ||
                         (filterStatus === 'pending' && !todo.completed);
    
    return matchesSearch && matchesFilter;
  });

  // Sort todos
  const sortedTodos = [...filteredTodos].sort((a, b) => {
    switch (sortBy) {
      case 'oldest':
        return new Date(a.createdAt) - new Date(b.createdAt);
      case 'alphabetical':
        return a.title.localeCompare(b.title);
      case 'newest':
      default:
        return new Date(b.createdAt) - new Date(a.createdAt);
    }
  });

  const stats = {
    total: todos.length,
    completed: todos.filter(todo => todo.completed).length,
    pending: todos.filter(todo => !todo.completed).length,
  };  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Todo List
          </h1>
          <p className="text-slate-600 text-xl font-normal max-w-md mx-auto">
            Stay organized and boost your productivity
          </p>
        </div>        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-2xl p-8 text-center shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-4xl font-bold text-blue-600 mb-2">{stats.total}</div>
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Total Tasks</div>
          </div>
          <div className="bg-white rounded-2xl p-8 text-center shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-4xl font-bold text-emerald-500 mb-2">{stats.completed}</div>
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Completed</div>
          </div>
          <div className="bg-white rounded-2xl p-8 text-center shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="text-4xl font-bold text-amber-500 mb-2">{stats.pending}</div>
            <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Pending</div>
          </div>
        </div>        {/* Controls */}
        <div className="bg-white rounded-2xl p-10 mb-12 shadow-xl border border-gray-100">
          <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md w-full">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-14 pr-12 py-4 border border-gray-200 rounded-xl bg-gray-50 
                         hover:bg-white focus:bg-white transition-all duration-200 placeholder:text-gray-400
                         text-gray-700 font-medium"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 
                           p-2 rounded-lg hover:bg-gray-100 transition-all duration-150"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter and Sort */}
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-6 py-4 border border-gray-200 rounded-xl bg-gray-50 hover:bg-white
                         transition-all duration-200 text-gray-700 font-medium min-w-[160px]"
              >
                <option value="all">All Tasks</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-6 py-4 border border-gray-200 rounded-xl bg-gray-50 hover:bg-white
                         transition-all duration-200 text-gray-700 font-medium min-w-[160px]"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="alphabetical">Alphabetical</option>
              </select>
            </div>

            {/* Add Todo Button */}
            <button
              onClick={() => setShowForm(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 
                       text-white px-8 py-4 rounded-xl flex items-center gap-3 transition-all duration-200 
                       shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
                       font-semibold w-full sm:w-auto justify-center text-base"
            >
              <Plus className="w-5 h-5" />
              Add Task
            </button>
          </div>
        </div>

        {/* Todo Form Modal */}
        {showForm && (
          <TodoForm
            onSubmit={addTodo}
            onCancel={() => setShowForm(false)}
          />
        )}        {/* Todo List */}
        <div className="space-y-6">
          {sortedTodos.length === 0 ? (
            <div className="bg-white rounded-2xl p-16 text-center shadow-xl border border-gray-100">
              <div className="max-w-md mx-auto">
                {searchTerm || filterStatus !== 'all' ? (
                  <div className="space-y-6">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                      <Search className="w-12 h-12 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">No matches found</h3>
                      <p className="text-gray-500 leading-relaxed">
                        Try adjusting your search terms or filters to find what you're looking for.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                      <Plus className="w-12 h-12 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">Ready to get productive?</h3>
                      <p className="text-gray-500 leading-relaxed mb-8">
                        Create your first task and start organizing your day like a pro.
                      </p>
                      <button
                        onClick={() => setShowForm(true)}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 
                                 text-white px-8 py-4 rounded-xl transition-all duration-200 
                                 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 
                                 font-semibold text-lg"
                      >
                        Create Your First Task
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            sortedTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
