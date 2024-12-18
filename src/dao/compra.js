import compras from "../models/Compra.js" // Certifique-se de que o modelo já está configurado

export const findAll = () => {
  return compras.findAll() // Retorna todas as entradas da tabela 'compras'
}

export const findById = (id) => {
  return compras.findByPk(id) // Busca uma compra pelo ID
}

export const create = (compra) => {
  return compras.create({
    id_forn: compra.id_forn,
    id_func: compra.id_func,
    datadodia: compra.datadodia,
    horadodia: compra.horadodia,
    formapagamento: compra.formapagamento,
    valortotal: compra.valortotal,
  })
}

export const deleteById = (id) => {
  return compras.destroy({
    where: {
      id_compra: id, // Deleta uma compra pelo ID
    },
  })
}

export const update = (id, compra) => {
  return compras.update(
    {
      id_forn: compra.id_forn,
      id_func: compra.id_func,
      datadodia: compra.datadodia,
      horadodia: compra.horadodia,
      formapagamento: compra.formapagamento,
      valortotal: compra.valortotal,
    },
    {
      where: { id_compra: id }, // Atualiza a compra pelo ID
    }
  )
}
