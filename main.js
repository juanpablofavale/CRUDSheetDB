//NO ANDA EL METODO GUARDARPERSONA

const { createApp } = Vue

createApp({
  data() {
    return {
      datos: [],
      urlSheetDB: "https://sheetdb.io/api/v1/mxsc73jlnpu08",
      urlLectura: "https://sheets.googleapis.com/v4/spreadsheets/1YEgT86E2xjRgiyV9YB1tq1m4FDlicZt30qH9nLLS93w/values/Hoja%201/?key=AIzaSyAwqGktBBGRDMbcpwFdR-wDL2f-S7VH-W4",
      url: "",
      nom: "",
      dir: "",
      tel: "",
      idAEditar:"Automatico"
    }
  },
  methods: {
    modificarBtn(registro){
      this.nom = registro[1]
      this.dir = registro[2]
      this.tel = registro[3]
      this.id = registro[0]
      this.idAEditar= registro[0]
    },
    modificarRegistro() {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        "data": {
          "Nombre": this.nom,
          "Direccion": this.dir,
          "Telefono": this.tel
        }
      });

      var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("https://sheetdb.io/api/v1/mxsc73jlnpu08/ID/" + this.idAEditar, requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result)
          this.leerYLimpiar()
        })
        .catch(error => console.log('error', error));
    },
    borrarRegistro(id) {
      var requestOptions = {
        method: 'DELETE',
        redirect: 'follow'
      };

      fetch("https://sheetdb.io/api/v1/mxsc73jlnpu08/ID/" + id, requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result)
          this.leerYLimpiar()
        })
        .catch(error => console.log('error', error));
    },
    guardarPersona() {
      var formdata = new FormData();
      formdata.append("ID", "INCREMENT");
      formdata.append("Nombre", this.nom);
      formdata.append("Direccion", this.dir);
      formdata.append("Telefono", this.tel);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

      fetch("https://sheetdb.io/api/v1/mxsc73jlnpu08", requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(result)
          this.leerYLimpiar()
        })
        .catch(error => console.log('error', error));
    },
    leerYLimpiar(){
      this.leerDatos(this.urlLectura)
      this.nom = ""
      this.dir = ""
      this.tel = ""
      this.idAEditar = "Automatico"
    },
    leerDatos(url) {
      fetch(url)
        .then(res => res.json())
        .then(data => {
          this.datos = data.values
          this.datos.shift()
        })
    }
  },
  created() {
    this.leerYLimpiar()
  }
}).mount('#app')
