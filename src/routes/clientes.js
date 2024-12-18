import express from "express"
import * as cliente from "../dao/cliente.js"
import { notFoundPage } from "../status_responses/not_found.js"
import { notFoundClient } from "../status_responses/not_found_client.js"

const router = express.Router()

router.get("/findAll", async (req, res) => {
  res.send(await cliente.findAll())
})

router.get("/:id", async (req, res) => {
  const result = await cliente.findById(req.params.id)
  result
    ? res.send(await cliente.findById(req.params.id))
    : res.status(404).send(notFoundPage)
})

router.get("/findByCpf/:cpf", async (req, res) => {
  const result = await cliente.findByCpf(req.params.cpf)
  result
    ? res.send(await cliente.findByCpf(req.params.cpf))
    : res.status(404).send(notFoundClient)
})

router.post("/", async (req, res) => {
  res.send(
    await cliente
      .create(req.body)
      .then((result) => cliente.findById(result.dataValues.id_cli))
  )
})

router.put("/:id", async (req, res) => {
  try {
    const result = await cliente.update(req.params.id, req.body)
    res.status(204).send(result)
  } catch (error) {
    res.status(500).send({ error: "Erro ao atualizar cliente. " + error })
  }
})

router.delete("/:id", async (req, res) => {
  try {
    await cliente.deleteById(req.params.id)
    res.status(202).send("Cliente deletado com sucesso.")
  } catch (error) {
    res.status(500).send({ error: "Erro ao deletar cliente. " + error })
  }
})

export default router
