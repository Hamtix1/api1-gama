const url2 = 'https://promocionalesenlinea.net/api/all-stocks';
const data2 = {
    user: "COL0812",
    password: "vZff8PK1DbrDlSzdyivg",
    sku: "61900"
};
fetch(url2, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data2)
}).then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}).then(products => {
    console.log(products)
})

// const url2 = 'https://promocionalesenlinea.net/api/all-products';
// const data2 = {
//     user: "COL0812",
//     password: "vZff8PK1DbrDlSzdyivg"
// };
// fetch(url2, {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data2)
// }).then(response => {
//     if (!response.ok) {
//         throw new Error('Network response was not ok');
//     }
//     return response.json();
// }).then(products => {
//     console.log(products)
// })