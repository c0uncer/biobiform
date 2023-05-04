const isim = document.getElementById("isim");
const epostav = document.getElementById("eposta");
const okul = document.getElementById("okul");
const sinif = document.getElementById("sinif");
const bolum = document.getElementById("bolum");
const cvin = document.getElementById("cv");
const downloadLink = document.getElementById('download-link');
const downloadLin = document.getElementById('download-lin');
let cv;

async function BilgiAl(){
  let eposta = localStorage.getItem("girisb")
  await fetch('/bilgiapi', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: `{"eposta": "${eposta}"}`
})
.then(response => response.json())
.then(hash => {
    isim.innerText = hash.isim
    epostav.innerText = hash.eposta
    okul.innerText = hash.okul
    sinif.innerText = hash.sinif
    bolum.innerText = hash.bolum
    cv = hash.cv
  })
}

BilgiAl();


function showDialog2(){
    var whitebg = document.getElementById("white-background");
    var dlg = document.getElementById("dlgbox");
    whitebg.style.display = "block";
    dlg.style.display = "block";

    var winWidth = window.innerWidth;

    dlg.style.left = (winWidth/2) - 480/2 + "px";
    dlg.style.top = "150px";
}

function dlgHide(){
    var whitebg = document.getElementById("white-background");
    var dlg = document.getElementById("dlgbox");
    whitebg.style.display = "none";
    dlg.style.display = "none";
}

downloadLink.addEventListener('click', async (event) => {
    event.preventDefault();

    // Base64 kodlanmış veriyi Blob'a dönüştürme
    const blob = await b64toBlob(cv.data, cv.type);

    // Dosya adı ve MIME tipi ayarlamaları
    const filename = cv.filename;
    const type = blob.type;

    // İndirme bağlantısı oluşturma
    const url = URL.createObjectURL(blob);
    downloadLin.href = url;
    downloadLin.download = filename;

    // İndirme bağlantısını tıklama
    downloadLin.click()
    // İndirme bağlantısını temizleme
});

async function b64toBlob(b64Data, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
}

cvin.addEventListener('change', (event) => {
    const file = event.target.files[0];

    // Dosyayı base64 kodlu bir string'e dönüştürme
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result.split(',')[1];

      // Base64 kodlu string'i JSON objesinde saklama
      const fileObj = {
        filename: file.name,
        type: file.type,
        data: base64String
      };
      
      let eposta = localStorage.getItem("girisb")
      CVGuncelle(eposta, fileObj)
    }});

async function CVGuncelle(eposta="", cv={ filename: "", type: "", data: "" })
{
  let cvt = JSON.stringify(cv)
  await fetch('/cvguncelle', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ eposta: eposta, cv: cvt })
  })
  //window.location.reload();	
}