const $container = $(".gif-container");
const $input = $("#gif-category");
const api_key = "E3WXqK7mBNPuvw97JK37Lv53Fm3f0Axe";

function createGif(res) {
  const resArrLength = res.data.length;
  if (resArrLength) {
    const randoIdx = Math.floor(Math.random() * resArrLength);
    const $gifDiv = $("<div>");
    const $gif = $("<img>", { src: res.data[randoIdx].images.original.url });
    $gifDiv.append($gif);
    $container.append($gifDiv);
  }
}

$("form").on("submit", async function (e) {
  e.preventDefault();
  let search = $input.val();
  const res = await axios.get("http://api.giphy.com/v1/gifs/search", {
    params: { q: search, api_key },
  });
  console.log(res);
  createGif(res.data);
  $input.val("");
});

$("#remove").on("click", () => {
  $container.empty();
});
