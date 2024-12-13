import express from "express"
import * as fornecedor from "../dao/fornecedor.js"
import { notFoundPage } from "../status_responses/not_found.js"

const router = express.Router()

router.get("/findAll", async (req, res) => {
  res.send(await fornecedor.findAll())
})

router.get("/:id", async (req, res) => {
    const result = await fornecedor.findById(req.params.id)
    result.length > 0
      ? res.send(await fornecedor.findById(req.params.id))
      : res.status(404).send(notFoundPage)
})

router.post("/", async (req, res) => {
  res.send(
    await fornecedor
      .create(req.body)
      .then((result) => fornecedor.findById(result.insertId))
  )
})

router.put("/:id", async (req, res) => {
  try {
    const result = await fornecedor.update(req.params.id, req.body)
    res.status(204).send(result)
  } catch (error) {
    res.status(500).send({ error: "Erro ao atualizar fornecedor. " + error })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    await fornecedor.deleteById(req.params.id)
    res.status(202).send("fornecedor deletado com sucesso.")
  } catch (error) {
    res.status(500).send({ error: "Erro ao deletar fornecedor. " + error })
  }
})

export default router
