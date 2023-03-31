

const verificaTipo = (type) => {
  const tipoString = Reflect.apply(Object.prototype.toString, type, [])
  return tipoString.slice(
    tipoString.indexOf(' ') + 1,
    tipoString.indexOf(']')
  ).toLowerCase()
};

const clonaArray = (elemento) => {
  (verificaTipo(elemento) != 'array') ?  elemento : elemento.map(clonagemProfunda)
};

const clonaObjeto = (elemento) => {
  (verificaTipo(elemento) != "object") ? elemento : Object.fromEntries(Object.keys(elemento).map(key => [key, clonagemProfunda(elemento[key])]))
};

const clonagemProfunda = (elemento) => {
  switch (verificaTipo(elemento)){
    case 'array':
      return congela(clonaArray(elemento))
    case 'object':
      return congela(clonaObjeto(elemento))
    default:
      return elemento
  }
};

const congela = (dados) => Object.freeze(dados);