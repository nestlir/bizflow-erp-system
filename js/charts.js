// Chart initialization and management
let revenueChart, expenseChart;

function initializeCharts() {
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    const expenseCtx = document.getElementById('expenseChart').getContext('2d');
    
    // Revenue Chart
    revenueChart = new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: 'Revenue ($)',
                data: [12500, 14200, 13800, 16500, 18200, 17500, 19200, 21500, 23800, 26500, 29200, 32800],
                borderColor: '#2563EB',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                borderWidth: 3,
                pointBackgroundColor: '#2563EB',
                pointRadius: 4,
                pointHoverRadius: 6,
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
    
    // Expense Chart
    expenseChart = new Chart(expenseCtx, {
        type: 'doughnut',
        data: {
            labels: ['Marketing', 'Operations', 'Salaries', 'Rent', 'Utilities', 'Supplies'],
            datasets: [{
                data: [4500, 3200, 5800, 2500, 1200, 850],
                backgroundColor: [
                    '#3B82F6',
                    '#10B981',
                    '#F59E0B',
                    '#EF4444',
                    '#8B5CF6',
                    '#9333EA'
                ],
                borderWidth: 0,
                cutout: '70%'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                }
            }
        }
    });
    
    // Chart period buttons
    const chartButtons = document.querySelectorAll('.chart-btn[data-period]');
    chartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const period = this.getAttribute('data-period');
            
            // Update active button
            chartButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update chart data based on period
            updateRevenueChart(period);
        });
    });
}

function updateRevenueChart(period) {
    // This would typically fetch new data from an API
    // For demo purposes, we'll just update the labels
    let labels, data;
    
    switch(period) {
        case 'monthly':
            labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            data = [12500, 14200, 13800, 16500, 18200, 17500, 19200, 21500, 23800, 26500, 29200, 32800];
            break;
        case 'quarterly':
            labels = ['Q1', 'Q2', 'Q3', 'Q4'];
            data = [40500, 52200, 64500, 88500];
            break;
        case 'yearly':
            labels = ['2021', '2022', '2023', '2024'];
            data = [156000, 198000, 245000, 328000];
            break;
    }
    
    revenueChart.data.labels = labels;
    revenueChart.data.datasets[0].data = data;
    revenueChart.update();
}