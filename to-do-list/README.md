# React Todo List Application

A modern, responsive todo list application built with React, Tailwind CSS, and Vite. This application provides a comprehensive task management system with features like task prioritization, due dates, filtering, sorting, and local storage persistence.

## 🚀 Features

### Core Functionality
- ✅ **Add Tasks**: Create new tasks with title, description, priority, and due date
- ✅ **Mark Complete**: Toggle task completion status with visual feedback
- ✅ **Edit Tasks**: Inline editing of existing tasks
- ✅ **Delete Tasks**: Remove tasks with confirmation
- ✅ **Input Validation**: Comprehensive form validation with error messages

### Advanced Features
- 🔍 **Search**: Real-time search through task titles and descriptions
- 🎛️ **Filtering**: Filter tasks by status (All, Pending, Completed)
- 📊 **Sorting**: Sort by creation date (newest/oldest) or alphabetically
- 💾 **Local Storage**: Automatic persistence of tasks across browser sessions
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- 🎨 **Modern UI**: Clean, beautiful, and intuitive interface built with Tailwind CSS, featuring enhanced empty states and a refined visual hierarchy.
- ⚡ **Priority System**: Visual priority indicators (Low, Medium, High)
- 📅 **Due Dates**: Set and track task due dates with overdue warnings
- 📈 **Statistics**: Dashboard showing total, completed, and pending tasks

### Technical Features
- ⚛️ Built with React 19 and modern hooks
- 🎨 Styled with Tailwind CSS v4
- 🔧 Powered by Vite for fast development
- 📦 Icons from Lucide React
- 🏗️ Component-based architecture
- ♿ **Accessibility-focused design**: Ensures usability for all, including keyboard navigation, semantic HTML structure, and non-disruptive focus indicators.

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd to-do-list
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 🧪 Testing Guidance

### Manual Testing Checklist

#### 🎯 Core Functionality Testing

**1. Task Creation**
- [ ] Click "Add Task" button to open the form
- [ ] Try submitting without a title (should show validation error)
- [ ] Enter a title with less than 3 characters (should show validation error)
- [ ] Enter a title with more than 100 characters (should show validation error)
- [ ] Enter a valid title and submit (task should be created)
- [ ] Test all priority levels (Low, Medium, High)
- [ ] Test with and without description
- [ ] Test with and without due date
- [ ] Try setting a past due date (should show validation error)

**2. Task Management**
- [ ] Click checkbox to mark task as complete
- [ ] Verify completed tasks show with strikethrough text
- [ ] Click checkbox again to mark as incomplete
- [ ] Click edit button to modify a task
- [ ] Verify all fields are populated in edit form
- [ ] Make changes and save
- [ ] Click delete button to remove a task
- [ ] Test editing validation (same rules as creation)

**3. Search Functionality**
- [ ] Enter text in search box
- [ ] Verify tasks are filtered in real-time
- [ ] Test searching by title
- [ ] Test searching by description
- [ ] Test case-insensitive search
- [ ] Clear search using X button
- [ ] Verify all tasks reappear when search is cleared

**4. Filtering & Sorting**
- [ ] Test "All Tasks" filter (default)
- [ ] Test "Pending" filter (only incomplete tasks)
- [ ] Test "Completed" filter (only completed tasks)
- [ ] Test "Newest First" sorting (default)
- [ ] Test "Oldest First" sorting
- [ ] Test "Alphabetical" sorting
- [ ] Combine filters with sorting

#### 📱 Responsive Design Testing

**Desktop (1920x1080)**
- [ ] Verify layout uses full width appropriately
- [ ] Check all buttons and inputs are properly sized
- [ ] Ensure hover effects work on interactive elements

**Tablet (768x1024)**
- [ ] Verify search and controls stack appropriately
- [ ] Check touch targets are adequate size
- [ ] Ensure no horizontal scrolling

**Mobile (375x667)**
- [ ] Verify single-column layout
- [ ] Check form modal fits screen
- [ ] Test touch interactions
- [ ] Verify text remains readable

#### 🔄 Data Persistence Testing

**Local Storage**
- [ ] Create several tasks
- [ ] Refresh the browser
- [ ] Verify all tasks persist
- [ ] Complete some tasks and refresh
- [ ] Verify completion status persists
- [ ] Edit tasks and refresh
- [ ] Verify edits persist

**Data Validation**
- [ ] Open browser developer tools
- [ ] Go to Application > Local Storage
- [ ] Verify 'todos' key exists with valid JSON data
- [ ] Manually corrupt the data and refresh
- [ ] Verify app handles corrupted data gracefully

#### ⚡ Performance Testing

**Loading**
- [ ] Measure initial page load time
- [ ] Test with 50+ tasks for performance
- [ ] Verify smooth scrolling with many tasks

**Interactions**
- [ ] Test rapid clicking of checkboxes
- [ ] Test rapid typing in search box
- [ ] Verify no lag in real-time filtering

#### ♿ Accessibility Testing

**Keyboard Navigation**
- [ ] Tab through all interactive elements
- [ ] Use Enter to activate buttons
- [ ] Use Escape to close modals
- [ ] Verify focus indicators are visible

**Screen Reader Testing** (if available)
- [ ] Use screen reader to navigate the app
- [ ] Verify all buttons have descriptive labels
- [ ] Check form validation errors are announced

#### 🎨 Visual Testing

**UI Components**
- [ ] Verify priority badges display correct colors
- [ ] Check overdue tasks show red indicators
- [ ] Verify completed tasks have reduced opacity
- [ ] Test dark/light theme consistency (if implemented)

**Icons & Graphics**
- [ ] Verify all Lucide React icons display correctly
- [ ] Check icon alignment with text
- [ ] Test icon visibility at different sizes

### 🔧 Testing Scenarios

#### Scenario 1: New User Experience
1. Open the app for the first time
2. Verify empty state message appears
3. Click "Create Your First Task"
4. Fill out the form completely
5. Submit and verify task appears
6. Verify statistics update correctly

#### Scenario 2: Power User Workflow
1. Create 10+ tasks with different priorities and due dates
2. Mark some as complete
3. Use search to find specific tasks
4. Filter by status and sort by different criteria
5. Edit multiple tasks
6. Verify all operations work smoothly

#### Scenario 3: Data Recovery
1. Create several tasks
2. Close browser completely
3. Reopen and verify tasks persist
4. Complete some tasks
5. Refresh page
6. Verify completion status maintained

#### Scenario 4: Edge Cases
1. Create task with maximum character limits
2. Set due date for today
3. Test with empty search terms
4. Test rapid form submissions
5. Test browser back/forward buttons

### 🐛 Bug Reporting

When reporting bugs, please include:
- Browser and version
- Screen size/device
- Steps to reproduce
- Expected vs actual behavior
- Console errors (if any)
- Screenshots (if visual bug)

### 🔍 Automated Testing (Future Enhancement)

Consider implementing:
- **Unit Tests**: Jest + React Testing Library
- **Integration Tests**: Testing user workflows
- **E2E Tests**: Cypress or Playwright
- **Visual Regression Tests**: Percy or Chromatic
- **Performance Tests**: Lighthouse CI

## 📁 Project Structure

```
src/
├── components/
│   ├── TodoList.jsx      # Main container component
│   ├── TodoItem.jsx      # Individual task component
│   └── TodoForm.jsx      # Task creation/editing form
├── App.jsx               # Root application component
├── index.css            # Base CSS and Tailwind imports
└── main.jsx             # Application entry point
```

## 🎨 Dependencies

### Core Dependencies
- **React** (^19.1.0) - UI library
- **React DOM** (^19.1.0) - DOM rendering
- **Tailwind CSS** (^4.1.8) - Utility-first CSS framework
- **Lucide React** (latest) - Beautiful icons

### Development Dependencies
- **Vite** (^6.3.5) - Build tool and dev server
- **ESLint** - Code linting
- **@vitejs/plugin-react** - React plugin for Vite

## 🚀 Build & Deployment

### Development
```bash
npm run dev          # Start development server
npm run lint         # Run ESLint
```

### Production
```bash
npm run build        # Build for production
npm run preview      # Preview production build
```

### Deployment Options
- **Vercel**: Connect your GitHub repo for automatic deployments
- **Netlify**: Drag and drop the `dist` folder after building
- **GitHub Pages**: Use GitHub Actions for automated deployment
- **Firebase Hosting**: Deploy with Firebase CLI

## 🔮 Future Enhancements

- [ ] Dark/Light theme toggle
- [ ] Task categories/tags
- [ ] Task sharing and collaboration
- [ ] Reminders and notifications
- [ ] Data export/import
- [ ] Drag and drop reordering
- [ ] Subtasks support
- [ ] Calendar view
- [ ] Progress tracking
- [ ] Task templates

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you encounter any issues or have questions, please create an issue in the repository.
