import {getHeaders} from "../auth.js";

const USER_URI = 'http://localhost:8080/api/users';
const POST_URI = 'http://localhost:8080/api/posts';

let globalProps = {}
let isFetching = false;
export default function Admin(props) {
    globalProps = props;
    console.log(props)
    //language=html
    return `
        <div id="admin-container">
            <div class="row">
                <div id="tabs-container" class="col-2 background-card-dark">
                        <ul id="tabs" class="">
                            <li class="admin-tab d-flex py-2" data-path="dashboard">
                                <div class="w-20 highlight-container">
                                    <div class="dashboard-tab highlight"></div>
                                </div>
                                <div class="w-80">
                                    <i class="bi bi-box mx-1"></i>
                                    <span class="title mx-1">Dashboard</span>
                                </div>
                            </li>
                            <li class="admin-tab d-flex py-2" data-path="add-item">
                                <div class="w-20 highlight-container">
                                    <div class="highlight"></div>
                                </div>
                                <div class="w-80">
                                    <i class="bi bi-cup-straw"></i>
                                    <span class="title mx-3">Items</span>
                                </div>
                            </li>
                        </ul>
                </div>
                <div class="col-10" id="content-container">
                    ${dashboardHtml(props)}
                </div>
            </div>    
        </div>
    `;
}

export function AdminEvents() {
    infiniteScrollListener()
    populateBarChart()
    populateDoughnutChart()
    adminTabListeners()
}

function dashboardHtml(props) {
    console.log(props)
//language=html
    return `<div class="row">
                <div class="col-12 d-flex justify-content-between">
                        ${metricCardHtml(props.orderCount, "Order Count")}
                    
                        ${metricCardHtml('$' + props.salesTotal.toFixed(2), "Total Sales")}
                    
                        ${metricCardHtml(23423, "Test metric")}
                    
                        ${metricCardHtml(23423, "Test metric")}
                </div>
                <div class="col-12 d-flex justify-content-between">
                    <div class="card background-card-dark m-3 w-33">
                        <canvas id="donutChart"></canvas>
                    </div>
                    <div class="card background-card-dark m-3 w-66">
                        <canvas id="salesChart"></canvas>
                    </div>
                </div>
                <div class="col-12">
                    ${newestOrdersHtml(props)}
                </div>
            </div>`
}
function newestOrdersHtml(props) {
    console.log(props.orderHistory)
    return `<div class="card background-card-dark m-3">
                <div class="card-body">
                    <ul class="list-group list-group-flush order-history-list" data-page="1">
                        <li class="list-group-item d-flex justify-content-between background-card-dark row text-white my-1">
                            <span class="col-3">Email</span>
                            <span class="col-2">Phone number</span>
                            <span class="col-1">Order#</span>
                            <span class="col-2">Order Total</span>
                            <span class="col-2">Order Date</span>
                        </li>
                        ${props.orderHistory.map(order => orderListItem(order)).join("")} 
                                       
                    </ul>
                </div>
            </div>`
}
function orderListItem(order) {
    return `<li class="list-group-item d-flex justify-content-between background-card-dark text-white row my-1">
                            <span class="col-3">${order.orderOwner.email}</span>
                            <span class="col-2">${phoneNumberFormatter(order.orderOwner.phoneNumber)}</span>
                            <span class="col-1">${order.id}</span>
                            <span class="col-2">$${order.totalPrice}</span>
                            <span class="col-2">${order.dateOrdered}</span>
                        </li>`
}

function metricCardHtml(value, title) {
    return `<div class="card background-card-dark m-3" style="width: 25%;">
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${value}</p>
              </div>
            </div>`
}
function additemsHtml(props) {
    console.log(props)
    //language=html
    return`<div>
                add items stuff
            </div>`
}

function adminTabListeners() {
    $(".admin-tab").click(function (){
        //reset all background colors ar begining
        $(".admin-tab").children(".highlight-container").children().css("background-color", "#404040")

        //sets the color of the tab you click to green
        $(this).children(".highlight-container").children().css("background-color", "#709775");

        let navPath = $(this).data("path");
        let contentContainer = $("#content-container");

        switch (navPath) {
            case "dashboard" :
                contentContainer.html(dashboardHtml(globalProps));
                populateBarChart();
                populateDoughnutChart()
                break;
            case "add-item" :
                contentContainer.html(additemsHtml(globalProps));
                break;
            default:
                break;
        }
    })
}

function populateBarChart() {
    const labels = ['jan', 'feb', 'mar', 'apr', 'jun', 'jul', 'aug'];
    const data = {
        labels: labels,
        datasets: [{
            label: 'My First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: '#709775',
            tension: 0.1
        }],
    };
    const options = {
        scales : {
            x : {
                grid: {
                    color: 'rgb(92,92,92)'
                }
            },
            y : {
                grid: {
                    color: 'rgb(92,92,92)'
                }
            }
        }
    }
    const config = {
        type: 'line',
        data: data,
        options: options
    };

    let myChart = new Chart(
        document.getElementById('salesChart'),
        config
    );
}

function populateDoughnutChart() {
    const data = {
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
    const config = {
        type: 'doughnut',
        data: data,
    };
    let myChart = new Chart(
        document.getElementById('donutChart'),
        config
    );
}

function phoneNumberFormatter(noDashPhonenumber) {
    return noDashPhonenumber.slice(0, 3) + '-' + noDashPhonenumber.slice(3, 6) + '-' + noDashPhonenumber.slice(6);
}

function infiniteScrollListener() {
    document.querySelector('.order-history-list').addEventListener('scroll',()=>{
        if (isFetching) {
            return;
        }
        // console.log("scrolled")
        let container = document.querySelector('.order-history-list');
        let currentPage = container.dataset.page;
        let scrollY = container.scrollHeight - container.scrollTop;
        let height = container.offsetHeight;
        let offset = height - scrollY;
        // console.log(scrollY)
        // console.log(height)
        // console.log(offset)
        // console.log(currentPage)

        if (offset == 0 || offset >= -1) {
            isFetching = true;
            loadMoreOrders(currentPage)
        }
    })
}

function loadMoreOrders(currentPage) {
    let container = document.querySelector('.order-history-list');
    let requestObject = {
        headers: getHeaders()
    }

    let newPage = parseInt(currentPage) + 1;
    // console.log(newPage)

    fetch(`http://localhost:8080/api/orders/${newPage}`).then(resp => resp.json()).then(data => {
        let newOrderArray = data;

        for (let order of newOrderArray) {
            container.innerHTML += orderListItem(order);
        }

        container.dataset.page = newPage + "";
    }).catch(error => {
        console.log(error)
    }).finally(() => {
        isFetching = false;
    })
}