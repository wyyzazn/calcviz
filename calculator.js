let tirSize,
  pricePaper = 0,
  priceForma = 0,
  pricePrint = 0,
  sum = 0,
  color_format = "";

let typePaper = {
  "Выберите бумагу": 0,
  "Мелованная бумага": 4.5,
  "Мелованный картон": 40.5,
  "Дизайнерский картон": 45,
  "Тонкий пластик": 70,
};

let typeColor = {
  "Выберите цветность": { file: 0, print: 0 },
  "Односторонняя чёрно-белая": { file: 110, print: 14 },
  "Двусторонняя чёрно-белая": { file: 220, print: 28 },
  "Односторонняя цветная": { file: 110, print: 37 },
  "Лицевая-цветная, оборотная - ч/б": { file: 220, print: 51 },
  "Двусторонняя цветная": { file: 220, print: 74 },
};

let card_color = document.getElementById("card-color");
let card_paper = document.getElementById("card-paper");
let card_quantity = document.getElementById("card-quantity");

insertPaper();
insertColor();

function insertPaper() {
  let html = "";
  for (let type in typePaper) {
    html += '<option value="' + type + '">' + type + "</option>";
  }
  card_paper.innerHTML = html;
}

function insertColor() {
  let html = "";
  for (let color in typeColor) {
    html += '<option value="' + color + '">' + color + "</option>";
  }
  card_color.innerHTML = html;
}

function calculate() {
  tirSize = card_quantity.value / 30;
  pricePaper = typePaper[card_paper.value] * tirSize;
  let old_color_format = color_format;
  color_format = card_color.value;
  priceForma = typeColor[color_format].file || 0;
  pricePrint = typeColor[color_format].print * tirSize || 0;
  sum = pricePaper + priceForma + pricePrint;
  sum = sum.toFixed(2);
  document.getElementById("final_price").innerHTML = sum;

  if (color_format !== old_color_format) {
    let images = document.querySelectorAll(".color-image");
    images.forEach((img) => (img.style.display = "none"));

    let formatKey = color_format
      .replace("Односторонняя чёрно-белая", "1_0")
      .replace("Двусторонняя чёрно-белая", "1_1")
      .replace("Односторонняя цветная", "4_0")
      .replace("Лицевая-цветная, оборотная - ч/б", "4_1")
      .replace("Двусторонняя цветная", "4_4");

    let selectedImage = document.getElementById(`card_${formatKey}`);
    if (selectedImage) selectedImage.style.display = "block";
  }
}

card_color.onchange = calculate;
card_paper.onchange = calculate;
card_quantity.oninput = calculate;
