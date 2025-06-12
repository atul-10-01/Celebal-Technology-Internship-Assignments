import { useState } from 'react';
import { X, Save, AlertTriangle } from 'lucide-react';

const TodoForm = ({ todo = null, onSubmit, onCancel, isEditing = false }) => {
  const [formData, setFormData] = useState({
    title: todo?.title || '',
    description: todo?.description || '',
    priority: todo?.priority || 'medium',
    dueDate: todo?.dueDate || '',
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Title validation
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters long';
    } else if (formData.title.trim().length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }

    // Description validation
    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }

    // Due date validation
    if (formData.dueDate) {
      const selectedDate = new Date(formData.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.dueDate = 'Due date cannot be in the past';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const processedData = {
        ...formData,
        title: formData.title.trim(),
        description: formData.description.trim(),
      };
      
      onSubmit(processedData);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto 
                      shadow-2xl border border-white/50">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-800">
            {isEditing ? 'Edit Task' : 'Create New Task'}
          </h2>          <button
            onClick={onCancel}
            className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg p-2 
                     transition-all duration-150 focus:outline-none"
          >
            <X className="w-6 h-6" />
          </button>
        </div>        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-semibold text-slate-700">
              Task Title *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl bg-white/70 backdrop-blur-sm transition-all duration-200
                         focus:outline-none focus:border-blue-400 ${
                errors.title ? 'border-rose-300 bg-rose-50/50' : 'border-slate-200'
              }`}
              placeholder="What needs to be done?"
              maxLength={100}
            />
            {errors.title && (
              <div className="flex items-center gap-2 text-rose-600 text-sm">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                {errors.title}
              </div>
            )}
            <div className="text-xs text-slate-500 text-right">
              {formData.title.length}/100 characters
            </div>
          </div>          {/* Description */}
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-semibold text-slate-700">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              className={`w-full px-4 py-3 border rounded-xl bg-white/70 backdrop-blur-sm transition-all duration-200
                         resize-none focus:outline-none focus:border-blue-400 ${
                errors.description ? 'border-rose-300 bg-rose-50/50' : 'border-slate-200'
              }`}
              placeholder="Add more details (optional)..."
              maxLength={500}
            />
            {errors.description && (
              <div className="flex items-center gap-2 text-rose-600 text-sm">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                {errors.description}
              </div>
            )}
            <div className="text-xs text-slate-500 text-right">
              {formData.description.length}/500 characters
            </div>
          </div>

          {/* Priority and Due Date Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Priority */}
            <div className="space-y-2">
              <label htmlFor="priority" className="block text-sm font-semibold text-slate-700">
                Priority Level
              </label>
              <select
                id="priority"
                value={formData.priority}
                onChange={(e) => handleInputChange('priority', e.target.value)}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-white/70 backdrop-blur-sm
                         focus:outline-none focus:border-blue-400 transition-all duration-200"
              >
                <option value="low">🟢 Low Priority</option>
                <option value="medium">🟡 Medium Priority</option>
                <option value="high">🔴 High Priority</option>
              </select>
            </div>            {/* Due Date */}
            <div className="space-y-2">
              <label htmlFor="dueDate" className="block text-sm font-semibold text-slate-700">
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                value={formData.dueDate}
                onChange={(e) => handleInputChange('dueDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full px-4 py-3 border rounded-xl bg-white/70 backdrop-blur-sm transition-all duration-200
                           focus:outline-none focus:border-blue-400 ${
                  errors.dueDate ? 'border-rose-300 bg-rose-50/50' : 'border-slate-200'
                }`}
              />
              {errors.dueDate && (
                <div className="flex items-center gap-2 text-rose-600 text-sm">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  {errors.dueDate}
                </div>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-6">            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-xl 
                       hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 font-medium
                       focus:outline-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 
                       text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 
                       shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 font-medium
                       focus:outline-none"
            >
              <Save className="w-4 h-4" />
              {isEditing ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;
