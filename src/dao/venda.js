import connection from "../connection.js"
import { default as venda } from "../models/venda.js"

export const findByCliente = (id) => {
  return new Promise((resolve, reject) => {
    venda
      .findAll({ where: { id_cli: id } })
      .then((result) => resolve(result))
      .catch((err) => reject(err))
  })
}

// Buscar todas as vendas
export const findAll = () => {
  return new Promise((resolve, reject) => {
    venda
      .findAll()
      .then((result) => resolve(result))
      .catch((err) => reject(err))
  })
}

// Buscar uma venda pelo ID
export const findById = (id) => {
  return new Promise((resolve, reject) => {
    venda
      .findByPk(id)
      .then((result) => resolve(result))
      .catch((err) => reject(err))
  })
}

// Criar uma nova venda
export const create = (vendaData) => {
  console.log(vendaData)
  return new Promise((resolve, reject) => {
    venda
      .create({
        id_cli: vendaData.id_cli,
        id_func: vendaData.id_func,
        formapagamento: vendaData.formapagamento,
        valortotal: vendaData.valortotal,
        mes: vendaData.mes,
      })
      .then((result) => resolve(result))
      .catch((err) => reject(err))
  })
}

// Deletar uma venda pelo ID
export const deleteById = (id) => {
  return new Promise((resolve, reject) => {
    venda
      .destroy({
        where: { id_venda: id },
      })
      .then((result) => {
        if (result === 0) {
          reject(new Error(`Venda com ID ${id} nao encontrada.`))
        }
      })
  })
}

// Atualizar uma venda pelo ID
export const update = (id, vendaData) => {
  return new Promise((resolve, reject) => {
    venda
      .update(
        {
          id_cli: vendaData.id_cli,
          id_func: vendaData.id_func,
          formapagamento: vendaData.formapagamento,
          valortotal: vendaData.valortotal,
        },
        {
          where: { id_venda: id },
        }
      )
      .then((result) => resolve(result))
      .catch((err) => reject(err))
  })
}

export const findByDate = (minDate, maxDate) => {
  return new Promise((resolve, reject) => {
    connection
      .query(
        `SELECT * FROM "Vendas" WHERE "createdAt"::DATE BETWEEN :minDate AND :maxDate`,
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
