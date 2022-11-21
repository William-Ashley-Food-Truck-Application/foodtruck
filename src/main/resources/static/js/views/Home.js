export default function Home(props) {
    let products = props.products;
    console.log(products)
    //language=html
    return `
        <header>
            <h1>Menu</h1>
        </header>
        <main>
            <div class="menu-container">
                ${products.map(product => productHtml(product)).join("")}
            </div>
        </main>
    `;
}

export function HomeEvent() {

}

function productHtml(product) {
    //language=html
    console.log(product.name)
    return `
        <div class="card background-card-dark" style="width: 18rem;">
            <img src=${product.image} class="card-img-top" alt="..." width="400px" height="250px">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <p class="card-text">$${product.price.toFixed(2)}</p>
                <a href="#" class="btn btn-primary">Order</a>
            </div>
        </div>
    `
}