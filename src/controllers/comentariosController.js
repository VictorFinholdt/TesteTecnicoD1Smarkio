const TextToSpeechV1 = require('ibm-watson/text-to-speech/v1');
const { IamAuthenticator } = require('ibm-watson/auth');
const { dataBaseConnection } = require('../dataBase/connection')
const fs = require('fs')

const textToSpeech = new TextToSpeechV1({
    authenticator: new IamAuthenticator({
        apikey: 'UbJtvRhYcNRI_koKWlgELJNVkp7Mq8hFWAPcBwu2GnQs',
    }),
    serviceUrl: 'https://api.us-south.text-to-speech.watson.cloud.ibm.com/instances/beab22b7-b84a-41f2-8342-dccac354f772',
});

async function criarComentario(req, res) {
    if (!req.body.comentario || req.body.comentario === "") return res.status(400).json(`Você deve digitar um comentário.`)
    await dataBaseConnection('comentarios').insert({ comentario: req.body.comentario })
        .then((id) => res.json({ ...req.body, id: id[0] }))
        .catch((err) => res.status(400).json(err))
}

async function mostrarComentarios(req, res) {
    const result = await dataBaseConnection('comentarios')
        .catch((err) => res.status(400).json(err))
    return res.status(200).json(result)
}

async function mostrarComentario(req, res) {
    const result = await dataBaseConnection('comentarios').where('id', req.params.id)
        .catch((err) => res.status(400).json(err))
    return res.status(200).json(result)
}

async function deletarComentario(req, res) {
    const comentarioDeletado = await dataBaseConnection('comentarios').where('id', req.params.id).del()
        .catch((err) => res.status(400).json(err))
    if (comentarioDeletado === 0) {
        res.status(400).json(`O comentário não existe.`)
    } else res.status(200).json(`O comentário de id ${req.params.id} foi deletado.`)
}

const ouvir = async (req, res) => {
    const id = req.params.id;
    const comentario = await dataBaseConnection("comentarios").where({ id: id }).first();


    const params = {
        text: comentario.comentario,
        voice: 'pt-BR_IsabelaVoice',
        accept: 'audio/wav'
    };

    const buffer = await textToSpeech
        .synthesize(params)
        .then(response => {
            const audio = response.result;
            return textToSpeech.repairWavHeaderStream(audio);
        })
        // .then(repairedFile => {
        //     fs.writeFileSync(`./audio${comentario.id}.wav`, repairedFile);
        //     console.log('audio.wav written with a corrected wav header');
        //     return repairedFile
        // })
        .catch(err => {
            res.status(400).json(err)
        });

    await dataBaseConnection('comentarios').where({ id: id })
        .update("audio", `audio${comentario.id}`)

    res.setHeader('Content-Type', 'audio/wav');
    res.setHeader('Content-Disposition', 'inline');
    res.write(buffer);
    res.end();




    // return res.status(200).json("play");
};


module.exports = {
    criarComentario,
    mostrarComentarios,
    mostrarComentario,
    deletarComentario,
    ouvir
}