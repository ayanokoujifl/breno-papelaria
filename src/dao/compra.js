import connection from "../connection.js"

export const findAll = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM compra", (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

export const findById = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM compra WHERE id_compra = ?",
      [id],
      (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      }
    )
  })
}

export const create = (compra) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO compra(id_forn,id_func,datadodia,horadodia,formapagamento,valortotal) values (?, ?, ?, ?, ?, ?)",
      [
        compra.id_forn,
        compra.id_func,
        compra.datadodia,
        compra.horadodia,
        compra.formapagamento,
        compra.valortotal,
      ],
      (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      }
    )
  })
}

export const deleteById = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "DELETE FROM compra WHERE id_compra = ?",
      [id],
      (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      }
    )
  })
}

export const update = (id, compra) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE compra SET id_forn = ?, id_func = ?, datadodia = ?, horadodia = ?, formapagamento = ?, valortotal = ? WHERE id_compra = ?",
      [
        compra.id_forn,
        compra.id_func,
        compra.datadodia,
        compra.horadodia,
        compra.formapagamento,
        compra.valortotal,
        id,
      ],
      (err, results) => {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      }
    )
  })
}
