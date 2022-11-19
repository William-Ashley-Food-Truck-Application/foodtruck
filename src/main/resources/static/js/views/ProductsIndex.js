import createView from "../createView.js";




const PRODUCT_URI = "http://localhost:8080/products";
export default function Products(props) {
    console.log(props)

    return `<div id="products-container">
    ${props.products.map(products =>
        `
           <h3>${products.name}</h3> 
           /* This is where you may want to add the post's content, etc*/
        `)
        .join('')}   
</div>
    `
}

export function ProductsEvent() {
}

