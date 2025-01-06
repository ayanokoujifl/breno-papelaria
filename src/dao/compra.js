import compras from "../models/compra.js"

export const findByDate = (minDate, maxDate) => {
  return new Promise((resolve, reject) => {
    connection
      .query(
        `SELECT * FROM "Compras" WHERE "createdAt"::DATE BETWEEN :minDate AND :maxDate`,
        {
          replacements: { minDate, maxDate },
          type: connection.QueryTypes.SELECT,
        }
      )
      .then((result) => {
        console.log("Resultado da query:", result)
        resolve(result)
      })
      .catch((err) => {
        console.error("Erro na execução da query:", err)
        reject(err)
      })
  })
}

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
    formapagamento: compra.formapagamento,
    valortotal: compra.valortotal,
    mes: compra.mes,
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
      formapagamento: compra.formapagamento,
      valortotal: compra.valortotal,
    },
    {
      where: { id_compra: id }, // Atualiza a compra pelo ID
    }
  )
}
