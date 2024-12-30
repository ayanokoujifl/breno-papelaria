import express from "express"
import * as vendas from "../dao/venda.js"
import { notFoundPage } from "../status_responses/not_found.js"

const router = express.Router()

router.get("/findByDate", async (req, res) => {
  const { minDate, maxDate } = req.query
  console.log(minDate, maxDate)
  minDate && maxDate
    ? res.send(await vendas.findByDate(minDate, maxDate))
    : res.status(404).send([])
})

router.get("/findAll", async (req, res) => {
  res.send(await vendas.findAll())
})

router.get("/:id", async (req, res) => {
  const result = await vendas.findById(req.params.id)
  result
    ? res.send(await vendas.findById(req.params.id))
    : res.status(404).send(notFoundPage)
})

router.post("/", async (req, res) => {
  try {
    res
      .status(201)
      .send(
        await vendas
          .create(req.body)
          .then((result) => vendas.findById(result.dataValues.id_venda))
      )
  } catch (err) {
    err.name === "SequelizeForeignKeyConstraintError"
      ? res
          .status(400)
          .send(
            "Falha na venda! Corrija as informações de funcionario e/ou cliente."
          )
      : res.status(500).send({ error: err })
  }
})

router.put("/:id", async (req, res) => {
  try {
    const result = await vendas.update(req.params.id, req.body)
    res.status(204).send(result)
  } catch (error) {
    error.errno === 1452
      ? res
          .status(400)
          .send(
            "Falha na atualização de compra! Corrija as informações de venda."
          )
      : res.status(500).send({ error: err })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    await vendas.deleteById(req.params.id)
    res.status(202).send("Venda deletada com sucesso.")
  } catch (error) {
    res.status(500).send({ error: "Erro ao deletar venda. " + error })
  }
})

export default router
