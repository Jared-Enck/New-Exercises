const BASE_API_URL = 'http://localhost:5000/api'

createCupcakeHTML = (cupcake) => {
    return `
    <div data-cupcake-id=${cupcake.id}>
      <li>
        ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
        <button class="delete-btn">X</button>
      </li>
      <img class="Cupcake-img"
            src="${cupcake.image}"
            alt="${cupcake.flavor} cupcake">
    </div>
  `;
}

async function showCupcakes() {
    const res = await axios.get(`${BASE_API_URL}/cupcakes`)
    console.log(res)
    const cupcakesData = res.data.cupcakes

    for (let cupcake of cupcakesData) {
        console.log(cupcake)
        let newCupcake = $(createCupcakeHTML(cupcake))
        $('#list-cupcakes').append(newCupcake);
    }
}

showCupcakes();