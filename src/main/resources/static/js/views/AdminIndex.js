const USER_URI = 'http://localhost:8080/api/users';
const POST_URI = 'http://localhost:8080/api/posts';

export default function Admin(props) {
    console.log(props)
    //language=html
    return `
        <div class="d-flex">
            <div>
                <canvas id="myChart" class="py-2"></canvas>
            </div>
            <div>
                <canvas id="myChart1" class="py-2"></canvas>
            </div>
        </div>
    `;
}

export function AdminEvents() {
    populateChart()
}

function populateChart() {
    let labels = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
    ];

    let data = {
        labels: [
            'Red',
            'Blue',
            'Yellow'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };

    let config = {
        type: 'doughnut',
        data: data,
        options: {}
    };

    let myChart = new Chart(
        document.getElementById('myChart'),
        config
    );

    labels = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
    ];

    data = {
        labels: [
            'Red',
            'Blue',
            'Yellow'
        ],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100],
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)'
            ],
            hoverOffset: 4
        }]
    };

    config = {
        type: 'bar',
        data: data,
        options: {}
    };
    let myChart1 = new Chart(
        document.getElementById('myChart1'),
        config
    );
}