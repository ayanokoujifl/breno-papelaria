import express from "express"
import * as funcionario from "../dao/funcionario.js"
import { notFoundPage } from "../status_responses/not_found.js"

const router = express.Router()

router.get("/findAll", async (req, res) => {
  res.send(await funcionario.findAll())
})

router.get("/:id", async (req, res) => {
  const result = await funcionario.findById(req.params.id)
  result
    ? res.send(await funcionario.findById(req.params.id))
    : res.status(404).send(notFoundPage)
})

router.post("/", async (req, res) => {
  res.send(
    await funcionario
      .create(req.body)
      .then((result) => funcionario.findById(result.dataValues.id_func))
  )
})

router.put("/:id", async (req, res) => {
  try {
    const result = await funcionario.update(req.params.id, req.body)
    res.status(204).send(result)
  } catch (error) {
    res.status(500).send({ error: "Erro ao atualizar Funcionario. " + error })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    await funcionario.deleteById(req.params.id)
    res.status(202).send("Funcionario deletado com sucesso.")
  } catch (error) {
    res.status(500).send({ error: "Erro ao deletar Funcionario. " + error })
  }
})

export default router
