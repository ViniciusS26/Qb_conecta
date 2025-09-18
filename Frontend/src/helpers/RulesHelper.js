export const ruleRequired = (v) => !!v || "Campo obrigatório.";

export const ruleFullName = (v) =>
  (v && /^[A-Za-zÀ-ÿ]+(?: [A-Za-zÀ-ÿ]+){0,50}$/.test(v)) ||
  "Max 50 caracteres, caracteres especiais e números não são aceitos.";

export const ruleEmail = (v) =>
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/.test(
    v
  ) || "Email inválido.";

export const ruleURL = (v) =>
  /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w-]*)*(\?.*)?$/.test(v) ||
  "URL inválida.";

export const rulePassword = (v) =>
  (v &&
    /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[0-9]){1})(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%;*(){}_+^&]*$/.test(
      v
    )) ||
  "Min 8 caracteres, sendo letras e números, uma letra maiúscula e um caracter especial.";

export const rulePhone = (v) => 
	/^\(\d{2}\) \d{4,5}-\d{4}$/.test(v) || "Formato inválido. Use (XX) XXXXX-XXXX ou (XX) XXXX-XXXX.";