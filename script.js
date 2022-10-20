const getQuote = () =>
  fetch("https://programming-quotes-api.herokuapp.com/Quotes/random")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // console.log(data);

      displayQuote(data);
    });

getQuote();

const displayQuote = (data) => {
  $("#quote").text(data.en);
  $("#author").text("- " + data.author);
};

var id = "";

const submitQuote = (e) => {
  e.preventDefault();

  var body = {
    author: $("#authorInput").val(),
    en: $("#quoteInput").val(),
  };

  fetch("https://programming-quotes-api.herokuapp.com/Quotes/", {
    method: "POST",
    headers: { "Content-type": "application/json; charset=UTF-8" },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      id = data.id;

      $("#alert-additional-content-5").removeClass("hidden");
      $("#modal-close").click();
    })
    .catch((err) => console.log(err));
};

const showQuote = () =>
  fetch(`https://programming-quotes-api.herokuapp.com/Quotes/${id}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      // console.log(data);

      displayQuote(data);
    });

$("#nextQuote").click(getQuote);
$("#showQuote").click(showQuote);
$("#submit").click(submitQuote);
