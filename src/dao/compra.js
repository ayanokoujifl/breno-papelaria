import compras from "../models/compra.js"

export const findAll = () => {
  return compras.findAll()
}

export const findById = (id) => {
  return compras.findByPk(id)
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
