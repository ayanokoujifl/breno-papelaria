import connection from "../connection.js"

export const findAll = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM venda", (err, results) => {
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
      "SELECT * FROM venda WHERE id_venda = ?",
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

export const create = (venda) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO venda(id_cli,id_func,datadodia,horadodia,formapagamento,valortotal) values (?, ?, ?, ?, ?, ?)",
      [
        venda.id_cli,
        venda.id_func,
        venda.datadodia,
        venda.horadodia,
        venda.formapagamento,
        venda.valortotal,
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
      "DELETE FROM venda WHERE id_venda = ?",
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

export const update = (id, venda) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE venda SET id_cli = ?, id_func = ?, datadodia = ?, horadodia = ?, formapagamento = ?, valortotal = ? WHERE id_venda = ?",
      [
        venda.id_cli,
        venda.id_func,
        venda.datadodia,
        venda.horadodia,
        venda.formapagamento,
        venda.valortotal,
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
