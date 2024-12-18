import express from "express"
import * as itens_venda from "../dao/item_venda.js"
import { notFoundPage } from "../status_responses/not_found.js"

const router = express.Router()

router.get("/findAll", async (req, res) => {
  res.send(await itens_venda.findAll())
})

router.get("/:id", async (req, res) => {
  const result = await itens_venda.findById(req.params.id)
  result
    ? res.send(await itens_venda.findById(req.params.id))
    : res.status(404).send(notFoundPage)
})

router.post("/", async (req, res) => {
  try {
    res
      .status(201)
      .send(
        await itens_venda
          .create(req.body)
          .then((result) => itens_venda.findById(result.dataValues.id_itensv))
      )
  } catch (err) {
    err.errno === 1452
      ? res.status(400).send("Falha na venda! Corrija as informações do item.")
      : res.status(500).send({ error: err })
  }
})

router.put("/:id", async (req, res) => {
  try {
    const result = await itens_venda.update(req.params.id, req.body)
    res.status(204).send(result)
  } catch (error) {
    error.errno === 1452
      ? res
          .status(400)
          .send(
            "Falha na atualização de venda! Corrija as informações do item."
          )
      : res.status(500).send({ error: err })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    await itens_venda.deleteById(req.params.id)
    res.status(202).send("Itens da venda deletada com sucesso.")
  } catch (error) {
    res.status(500).send({ error: "Erro ao deletar itens. " + error })
  }
})

export default router
