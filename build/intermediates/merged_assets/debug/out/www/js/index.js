document.addEventListener('deviceready', onDeviceReady, false);

async function checkedChange(e) {
      try{
          let payload = {id: e.getAttribute("data-id"),durum: e.checked}

          let response = await fetch('https://davutiotsunucu.herokuapp.com/api/kilit-guncelle', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
          });

          let result = await response.json();


      }catch(ea){
           document.getElementById("hata").classList.toggle("show");
      }
}

async function kilitSil(e) {
      try{
          let payload = {id: e.getAttribute("data-id")}

          let response = await fetch('https://davutiotsunucu.herokuapp.com/api/kilit-sil', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
          });

          let result = await response.json();
          if(result.deletedCount === 1){
            document.getElementById(e.getAttribute("data-id")).remove();
          }

      }catch(ea){
          document.getElementById("hata").classList.toggle("show");
      }
}

async function kilitEkle(e) {


      const isimValue = document.getElementById("isim").value;
      if(isimValue.includes(')')){
        eval("var isim = "+isimValue+";");
      }else{
        var isim = isimValue;
      }


      const bolumValue = document.getElementById("bolum").value;


      try{
          let payload = {
              bolum : bolumValue,
          	  durum : false,
          	  isim : isim
          }

          let response = await fetch('https://davutiotsunucu.herokuapp.com/api/kilit-ekle', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {
                'Content-Type': 'application/json'
            }
          });

          let result = await response.json();
          if(result._id !== undefined && result._id !== null){
                    const element = document.createElement("li");
                    element.className = "list-group-item d-flex justify-content-between align-items-start";
                    element.setAttribute("id", result._id);
                    element.innerHTML = '<div class="ms-2 me-auto">'+
                                        '<div class="fw-bold">'+result.bolum + ' - ' +result.isim+'</div>'+
                                        result.updatedAt +
                                        '</div>'+
                                        '<span class="badge rounded-pill">'+
                                        '<label class="switch">'+
                                        '<input data-id="'+result._id+'" onchange="checkedChange(this);" type="checkbox" '+(result.durum === true ? "checked" : "")+'>'+
                                        '<span class="slider round"></span>'+
                                        '</label>'+
                                        '</span>'+
                                        '<button data-id="'+result._id+'" onclick="kilitSil(this)" class="btn text-danger">'+
                                        '<i class="gg-trash"></i>'+
                                        '</button></li>';
                    list.prepend(element);


          }

      }catch(ea){
          document.getElementById("hata").classList.toggle("show");
      }
}

async function arama(e) {

      const list = document.getElementById("list");
      list.innerHTML = "";

      const isimValue = document.getElementById("arama-kutusu").value;

      try{
         $('#list').append("Aradığınız kelime : " + e.value);

      }catch(ea){
          document.getElementById("hata").classList.toggle("show");
      }
}


async function initialize(){
    const list = document.getElementById("list");
    list.innerHTML = "";

    fetch('https://davutiotsunucu.herokuapp.com/api/kilit-listesi', {
            method: "GET",
            headers: {"Content-type": "application/json; charset=UTF-8"}
          })
             .then(response => response.json())
             .then(json => {

                //alert(JSON.stringify(json));
                const array = json;
                array.forEach( (kilit, index) => {

                    const element = document.createElement("li");
                    element.className = "list-group-item d-flex justify-content-between align-items-start";
                    element.setAttribute("id", kilit._id);
                    element.innerHTML = '<div class="ms-2 me-auto">'+
                                        '<div class="fw-bold">'+kilit.bolum + ' - ' +kilit.isim+'</div>'+
                                        kilit.updatedAt +
                                        '</div>'+
                                        '<span class="badge rounded-pill">'+
                                        '<label class="switch">'+
                                        '<input data-id="'+kilit._id+'" onchange="checkedChange(this);" type="checkbox" '+(kilit.durum === true ? "checked" : "")+'>'+
                                        '<span class="slider round"></span>'+
                                        '</label>'+
                                        '</span>'+
                                        '<button data-id="'+kilit._id+'" onclick="kilitSil(this)" class="btn text-danger">'+
                                        '<i class="gg-trash"></i>'+
                                        '</button></li>';

                    $('#list').append(element);
                    //list.append(element);


                });


             })
             .catch(err => {
                document.getElementById("hata").classList.toggle("show");
             });
}

function onDeviceReady() {
    initialize();

}
