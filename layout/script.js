const url = "http://localhost:3000";

let array = []

const formatar = () => {
  let html = ""
  array.map((item) => {
    html += `<div class="comentarios" style="padding:20px 10px; border-bottom:2px solid black">
    <p class="col-10">${item.comentario}</p>
    <div class="col-5">    
    </div>    
    <audio preload="none" id="audio${item.id}">                
      <source src="${url}/comentarios/ouvir/${item.id}" type="audio/wav">
    </audio>
    <button type="button" class="btn btn-light" style="float: right; margin-top: -40px" 
    onclick="ouvir(${item.id})"><i class="fas fa-volume-up"></i></button>  
  </div>`;
  })

  document.getElementById("comentarios").innerHTML = html
}

const lista = async () => {
  const res = await axios.get(`${url}/comentarios`)
  array = res.data
  formatar()
}

const cadastro = () => {
  const formulario = document.getElementById("formComentario")
  formData = new FormData(formulario)
  console.log(formulario)
  const body = { comentario: formData.get("comentario") }
  axios
    .post(`${url}/comentarios`, body)
    .then((res) => {
      array.unshift(res.data);
      formatar();
    })
    .catch((err) => {
      alert(err.response.data)
    });
}

const ouvir = id => document.getElementById(`audio${id}`).play()

lista()