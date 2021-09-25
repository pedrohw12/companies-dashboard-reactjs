import moment from "moment-timezone";

export const slug = (str, whiteSpaces = "-") => {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaaaeeeeiiiioooouuuunc------";

  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, whiteSpaces) // collapse whitespace and replace by -
    .replace(/-+/g, "-") // collapse dashes
    .replace(/^-+/, "") // trim - from start of text
    .replace(/-+$/, ""); // trim - from end of text

  return str;
};

export const formatDate = (date) => {
  return moment(date).tz("America/Sao_Paulo").format("DD/MM/YYYY HH:mm");
};

export const formatMoney = (value, currency = "BRL", symbol = true) => {
  const money = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: currency,
  });

  value = String(value).replace(/[^\d]+/g, "");

  value = parseInt(value);

  let formattedMoney = null;

  if (!value) {
    formattedMoney = money.format(0);
  } else {
    formattedMoney = money.format(value / 100);
  }

  if (!symbol) {
    formattedMoney = formattedMoney.substr(3);
  }

  return formattedMoney;
};

export const formatCryptoCurrency = (value, currency, precision) => {
  return `${(value / Math.pow(10, precision)).toFixed(precision)} ${
    currency || ""
  }`;
};

export const cepMask = (event, value) => {
  event.currentTarget.maxLength = 9;

  return value.replace(/\D/g, "").replace(/(\d{5})(\d{3})/g, "$1-$2");
};

export const cnpjMask = (event, value) => {
  event.currentTarget.maxLength = 18;

  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, "$1.$2.$3/$4-$5");
};

export const phoneMask = (event, value) => {
  event.currentTarget.maxLength = 15;

  if (value.replace(/\D/g, "").length > 10) {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d{5})(\d{4})/g, "($1) $2-$3");
  }

  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d{4})(\d{4})/g, "($1) $2-$3");
};

export const validarCNPJ = (cnpj) => {
  cnpj = cnpj.replace(/[^\d]+/g, "");
  console.log({cnpj})
  if (cnpj === "" || cnpj.length !== 14) {
    return false;
  }

  // Elimina CNPJs invalidos conhecidos
  if (
    cnpj === "00000000000000" ||
    cnpj === "11111111111111" ||
    cnpj === "22222222222222" ||
    cnpj === "33333333333333" ||
    cnpj === "44444444444444" ||
    cnpj === "55555555555555" ||
    cnpj === "66666666666666" ||
    cnpj === "77777777777777" ||
    cnpj === "88888888888888" ||
    cnpj === "99999999999999"
  ) {
    return false;
  }

  let tamanho = cnpj.length - 2;
  let numeros = cnpj.substring(0, tamanho);
  let digitos = cnpj.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;

  // DV 1
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;

    if (pos < 2) {
      pos = 9;
    }
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  if (resultado !== parseInt(digitos.charAt(0), 10)) {
    return false;
  }

  // DV 2
  tamanho = tamanho + 1;
  numeros = cnpj.substring(0,tamanho);
  soma = 0;
  pos = tamanho - 7;

  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i), 10) * pos--;

    if (pos < 2) {
      pos = 9;
    }
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);

  if (resultado !== parseInt(digitos.charAt(1), 10)) {
    return false;
  }

  return true;
};
