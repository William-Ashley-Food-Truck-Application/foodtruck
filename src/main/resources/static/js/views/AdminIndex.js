const USER_URI = 'http://localhost:8080/api/users';
const POST_URI = 'http://localhost:8080/api/posts';

export default function Admin(props) {
    console.log(props)
    //language=html
    return `
        <div id="admin-container" class="">
            <div class="row">
                <div id="tabs-container" class="col-3 background-card-dark">
                        <ul id="tabs" class="">
                            <li class="admin-tab d-flex">
                                <div class="w-25 highlight-container">
                                    <div class="highlight"></div>
                                </div>
                                <div class="w-75">
                                    <i class="bi bi-box"></i>
                                    <span class="title mx-3">Dashboard</span>
                                </div>
                            </li>
                            <li class="admin-tab d-flex">
                                <div class="w-25 highlight-container">
                                    <div class="highlight"></div>
                                </div>
                                <div class="w-75">
                                    <i class="bi bi-cup-straw"></i>
                                    <span class="title mx-3">Items</span>
                                </div>
                            </li>
                        </ul>
                    
                </div>
                <div class="col-9">
                    yuh
                </div>
            </div>
        </div>
    `;
}

export function AdminEvents() {
    // populateChart()
    adminTabListeners()
}

function adminTabListeners() {
    $(".admin-tab").click(function (){
        //reset all background colors ar begining
        $(".admin-tab").children(".highlight-container").children().css("background-color", "#404040")

        //sets the color of the tab you click to green
        $(this).children(".highlight-container").children().css("background-color", "#709775");
    })
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