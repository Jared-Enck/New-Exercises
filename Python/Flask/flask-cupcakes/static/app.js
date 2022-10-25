const BASE_API_URL = 'http://localhost:5000/api'

createCupcakeHTML = (cupcake) => {
    return `
    <div data-cupcake-id=${cupcake.id}>
      <li>
        <b class="flavor">${cupcake.flavor}</b> / ${cupcake.size} / ${cupcake.rating}
        <button class="delete-btn">X</button>
      </li>
      <div class="img-container">
      <img  src="${cupcake.image}"
            alt="${cupcake.flavor} cupcake">
        </div>
    </div>
  `;
}

async function showCupcakes() {
    const res = await axios.get(`${BASE_API_URL}/cupcakes`)
    const cupcakesData = res.data.cupcakes

    for (let cupcake of cupcakesData) {
        let newCupcake = $(createCupcakeHTML(cupcake))
        $('#list-cupcakes').append(newCupcake);
    }
}

$("#cupcake_form").on("submit", async function (evt) {
    evt.preventDefault();
  
    let flavor = $("#flavor").val();
    let rating = $("#rating").val();
    let size = $("#size").val();
    let image = $("#image").val();
  
    const newCupcakeResponse = await axios.post(`${BASE_API_URL}/cupcakes`, 
                                                {flavor, rating, size, image});
  
    let newCupcake = $(createCupcakeHTML(newCupcakeResponse.data.cupcake));
    $("#list-cupcakes").append(newCupcake);
    $("#cupcake_form").trigger("reset");
  });

$('#list-cupcakes').on('click', '.delete-btn', async function(evt) {
    evt.preventDefault();
    let $cupcake = $(evt.target).closest('div')
    let cupcakeID = $cupcake.attr('data-cupcake-id')

    await axios.delete(`${BASE_API_URL}/cupcakes/${cupcakeID}`);
    $cupcake.remove()
})

showCupcakes();