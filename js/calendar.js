// Calendar functionality
let currentDate = new Date();

function initializeCalendar() {
    renderCalendar();
    
    // Calendar navigation
    document.getElementById('prevMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });
    
    document.getElementById('nextMonth').addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });
    
    // Add appointment button
    document.getElementById('addAppointment').addEventListener('click', () => {
        const title = prompt('Enter appointment title:');
        if (title) {
            alert(`Appointment "${title}" added to calendar`);
        }
    });
}

function renderCalendar() {
    const calendarDates = document.getElementById('calendarDates');
    const currentMonthElement = document.getElementById('currentMonth');
    
    // Update month title
    currentMonthElement.textContent = currentDate.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric'
    });
    
    // Get first day of month and number of days
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    // Clear previous dates
    calendarDates.innerHTML = '';
    
    // Add empty cells for previous month
    for (let i = 0; i < startingDay; i++) {
        const emptyCell = document.createElement('div');
        calendarDates.appendChild(emptyCell);
    }
    
    // Add current month dates
    const today = new Date();
    const appointments = {
        21: 'Client Meeting',
        22: 'Team Sync',
        15: 'Project Review',
        8: 'Budget Planning'
    };
    
    for (let day = 1; day <= daysInMonth; day++) {
        const dateElement = document.createElement('div');
        dateElement.className = 'calendar-date';
        dateElement.textContent = day;
        
        // Check if today
        if (day === today.getDate() && 
            currentDate.getMonth() === today.getMonth() && 
            currentDate.getFullYear() === today.getFullYear()) {
            dateElement.classList.add('today');
        }
        
        // Check for appointments
        if (appointments[day]) {
            dateElement.classList.add('appointment');
            const appointmentElement = document.createElement('span');
            appointmentElement.className = 'appointment';
            appointmentElement.textContent = appointments[day];
            dateElement.appendChild(appointmentElement);
        }
        
        // Add click event
        dateElement.addEventListener('click', () => {
            document.querySelectorAll('.calendar-date').forEach(d => d.classList.remove('active'));
            dateElement.classList.add('active');
            
            // Show appointment details or create new one
            if (appointments[day]) {
                alert(`Appointment: ${appointments[day]}\nDate: ${currentDate.getMonth() + 1}/${day}/${currentDate.getFullYear()}`);
            } else {
                const title = prompt(`Add appointment for ${currentDate.getMonth() + 1}/${day}/${currentDate.getFullYear()}:`);
                if (title) {
                    appointments[day] = title;
                    renderCalendar(); // Re-render to show new appointment
                }
            }
        });
        
        calendarDates.appendChild(dateElement);
    }
}