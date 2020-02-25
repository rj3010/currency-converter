/** @format */
//
var convert = document.getElementById("convert");
convert.addEventListener("click", convertCurrency);

$(document).ready(function() {
  getData();
});

// Getting data from apis
var rate = {};
function getData() {
  var currencyCode = null;
  var currencyRate = null;
  var xhr = new XMLHttpRequest();

  xhr.open(
    "GET",
    "http://api.currencylayer.com/list?access_key=f0442c756a57f105923966553f8b86f4"
  );
  xhr.send();
  xhr.onload = function() {
    if (xhr.status == 200) {
      currencyCode = JSON.parse(xhr.response);
      //    console.log(obj)
      appendCurrency(currencyCode);
    } else {
      console.log("Error code is :" + xhr.status);
    }
  };
  var xhr1 = new XMLHttpRequest();

  xhr1.open(
    "GET",
    "http://api.currencylayer.com/live?access_key=f0442c756a57f105923966553f8b86f4"
  );
  xhr1.send();
  xhr1.onload = function() {
    if (xhr1.status == 200) {
      currencyRate = JSON.parse(xhr1.response);
      rate = currencyRate.quotes;
      console.log(rate);
    } else {
      console.log("Error code is :" + xhr1.status);
    }
  };
}

// appending options in to and from
function appendCurrency(input) {
  var curr = input.currencies;
  for (key in curr) {
    $("#from").append(
      "<option value = " + key + ">" + key + " " + curr[key] + "</option>"
    );
  }
  for (key in curr) {
    $("#to").append(
      "<option value = " + key + ">" + key + " " + curr[key] + "</option>"
    );
  }
}

// converting value from one currency to another

function convertCurrency(event) {
  $("#amountDisplay").html("");
  $("#fromCurr").html("");
  $("#result").html("");
  $("#toCurr").html("");
  event.preventDefault();

  var amount = document.querySelector("#amount").value;
  var fromCrr = document.querySelector("#from").value;
  var toCrr = document.querySelector("#to").value;
  if (amount == "" || fromCrr == "" || toCrr == "") {
    alert("Can't convery if any field is blank");
  } else {
    var result = 0;
    var str = "";

    str = "USD" + fromCrr;
    str1 = "USD" + toCrr;
    for (key in rate) {
      if (key === str) {
        temp = (amount * 1) / rate[key];
        temp = temp.toFixed(6);
      }
    }
    for (key in rate) {
      if (key === str1) {
        result = temp * rate[key];
        result = result.toFixed(6);
      }
    }
    $("#amountDisplay").append(amount);
    $("#fromCurr").append(fromCrr);
    $("#result").append(result);
    $("#toCurr").append(toCrr);
  }
}
