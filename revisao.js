const express = require("express")
const app = express()
const port = 3000
app.use(express.json())
const fs = require('fs')

app.get("/musicas/id ", (req, res) => {
    try{
        const bd = JSON.parse(fs.readFileSync('bd.json','utf8'))
        res.status(200).json({resposta: bd})
    } catch(error){
        res.status(500).json({resposta: error.message})
    }
})
app.get("/musicas", (req, res) => {
    const id = req.params.id
    try{
        const bd = JSON.parse(fs.readFileSync('bd.json','utf8'))
        const musica_encontrada = bd.find((musica) => musica.id == id)
        if(!musica_encontrada){
            return res.status(404).json({erro: "Música não encontrada no BD"})
        }
        res.status(200).json({resposta: musica_encontrada})
    } catch(error){
        res.status(500).json({resposta: error.message})
    }
})
app.post("/musico", (req, res) => {
    const musica = req.body
    try{
        const bd = JSON.parse(fs.readFileSync('bd.json', 'utf8'))
        bd.push(muisca)
        fs.writeFileSync('bd.json', JSON.stringify(bd))
        res.status(201).json({resposta: "Musica cadastrada com sucesso!!"})
    } catch(error) {
        res.status(500).json({resposta: error.message})
    }
})

app.delete("/musicas/:id", (req, res) => {
    const id = req.params.id 
    try{
        const bd = JSON.parse(fs.readFileSync('bd.json', 'utf'))
        const indiceMusica = bd.findIndex((musica) => musica.id == id)
        if(indiceMusica == -1) {
            return res.status(404).json({erro: "Erro ao excluir, música não existe"})
        }
        bd.splice(indiceMusica, 1)
        fs.writeFileSync('bd.json', JSON.stringify(bd))
        res.status(200).json({resposta: "Música removida com sucesso"})
    } catch (error) {
        res.status(500).json({erro: error.message})
    }
})

app.get("musicas/estilo/:estilo",(req, res) => {
    const estilo = req.params.estilo
    try{
        const bd = JSON.parse(fs.readFileSync('bd.json','utf8'))
        const musicas = bd.filter((musica) => musica.estilo == estilo)
        if(musicas.length == 0){
            return res.status(404).json({erro: "Estilo de música não encontrado!"})
        }
        res.status(200).json({resposta: musicas})
    } catch(error){
        res.status(500).json({resposta: error.message})
    }
})
app.listen(port, ()=>{
    console.log("API rodando na porta" + port)
})
