import express from "express"
import * as produto from "../dao/produto.js"
import { notFoundPage } from "../status_responses/not_found.js"

const router = express.Router()

router.get("/findAll", async (req, res) => {
  res.send(await produto.findAll())
})

router.get("/:id", async (req, res) => {
  const result = await produto.findById(req.params.id)
  result
    ? res.send(await produto.findById(req.params.id))
    : res.status(404).send(notFoundPage)
})

router.post("/", async (req, res) => {
  try {
    res
      .status(201)
      .send(
        await produto
          .create(req.body)
          .then((result) => produto.findById(result.dataValues.id_prod))
      )
  } catch (err) {
    err.errno === 1452
      ? res
          .status(400)
          .send(
            "Falha na criação de produto! Corrija as informações de fornecedor."
          )
      : res.status(500).send({ error: err })
  }
})

router.put("/:id", async (req, res) => {
  try {
    const result = await produto.update(req.params.id, req.body)
    res.status(204).send(result)
  } catch (error) {
    error.errno === 1452
      ? res
          .status(400)
          .send(
            "Falha na atualização de produto! Corrija as informações de fornecedor."
          )
      : res.status(500).send({ error: err })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    await produto.deleteById(req.params.id)
    res.status(202).send("produto deletado com sucesso.")
  } catch (error) {
    res.status(500).send({ error: "Erro ao deletar produto. " + error })
  }
})

export default router
