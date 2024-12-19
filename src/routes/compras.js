import express from "express"
import * as compras from "../dao/compra.js"
import { notFoundPage } from "../status_responses/not_found.js"

const router = express.Router()

router.get("/findAll", async (req, res) => {
  res.send(await compras.findAll())
})

router.get("/:id", async (req, res) => {
  const result = await compras.findById(req.params.id)
  result
    ? res.send(await compras.findById(req.params.id))
    : res.status(404).send(notFoundPage)
})

router.post("/", async (req, res) => {
  try {
    res
      .status(201)
      .send(
        await compras
          .create(req.body)
          .then((result) => compras.findById(result.dataValues.id_compra))
      )
  } catch (err) {
    err.errno === 1452
      ? res
          .status(400)
          .send("Falha na compra! Corrija as informações de compra.")
      : res.status(500).send({ error: err })
  }
})

router.put("/:id", async (req, res) => {
  try {
    const result = await compras.update(req.params.id, req.body)
    res.status(204).send(result)
  } catch (error) {
    error.errno === 1452
      ? res
          .status(400)
          .send(
            "Falha na atualização de compra! Corrija as informações de compra."
          )
      : res.status(500).send({ error: err })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    await compras.deleteById(req.params.id)
    res.status(202).send("compra deletada com sucesso.")
  } catch (error) {
    res.status(500).send({ error: "Erro ao deletar compra. " + error })
  }
})

export default router
