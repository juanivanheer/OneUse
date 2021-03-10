import { Injectable } from '@angular/core';

@Injectable()
export class UploadService {
    public url: string;

    constructor() {
        this.url = "https://localhost:4201/api/";
        //this.url = "https://oneuse-backend.herokuapp.com/api/";
    }

    makeFileRequest(url: string, params: Array<string>, files: Array<File>, name: string) {
        return new Promise(function (resolve, reject) {
            //FormData permite simular un formulario en un objeto
            var formData: any = new FormData();
            //xhr es un sinónimo de AJAX
            var xhr = new XMLHttpRequest(); //Objeto de peticiones asincronas de JS

            for (var i = 0; i < files.length; i++) {
                formData.append(name, files[i], files[i].name);
            }

            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) { //==4 porque son valores por defecto
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    }
                    else {
                        reject(xhr.response);
                    }
                }
            }

            xhr.open('POST', url, true); //open sirve para hacer la petición AJAX; true es para que se haga la petición
            xhr.send(formData); //se envía todo el formulario
        })
    }
}