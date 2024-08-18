// Mock JIRA data
let tasks = [
  { id: 1, title: 'Task 1', assignedTo: 'Alice', status: 'To Do' },
  { id: 2, title: 'Task 2', assignedTo: 'Bob', status: 'In Progress' },
  { id: 3, title: 'Task 3', assignedTo: 'Charlie', status: 'Completed' }
];

// Function to generate table rows dynamically
function generateTaskRows(filter = 'All') {
  const taskTable = document.getElementById('taskTable');
  taskTable.innerHTML = ''; // Clear existing rows

  tasks.filter(task => filter === 'All' || task.status === filter)
       .forEach(task => {
          const row = document.createElement('tr');
          row.classList.add(`status-${task.status.toLowerCase().replace(" ", "-")}`);

          row.innerHTML = `
              <td data-label="Task ID">${task.id}</td>
              <td data-label="Title">${task.title}</td>
              <td data-label="Assigned To">${task.assignedTo}</td>
              <td data-label="Status">${task.status}</td>
          `;
          taskTable.appendChild(row);
      });
}

// Handle form submission to add a new task
document.getElementById('taskForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const taskTitle = document.getElementById('taskTitle').value;
  const assignedTo = document.getElementById('assignedTo').value;
  const status = document.getElementById('status').value;

  const newTask = {
      id: tasks.length + 1,
      title: taskTitle,
      assignedTo: assignedTo,
      status: status
  };

  tasks.push(newTask);
  generateTaskRows();

  // Clear form
  document.getElementById('taskForm').reset();
});

// Handle status filter
document.getElementById('statusFilter').addEventListener('change', (e) => {
  const selectedStatus = e.target.value;
  generateTaskRows(selectedStatus);
});

// Initial task load
generateTaskRows();
