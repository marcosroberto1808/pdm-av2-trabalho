// ItemService.js
import uuid from "uuid";
import { db } from '../config/db';
import { storage } from '../config/db';

// Adicionar item
export const addItem =  (nome_input, valor_input, img_input, destaque_input) => {
    db.ref('/produtos').push({
        "nome": nome_input,
        "valor": valor_input,
        "image": img_input,
        "destaque": destaque_input
    });
}

// Deletar item
export const removeItem =  (item_key) => {
    db.ref('/produtos/' + item_key).remove();
}

// Atualizar item
export const updateItem =  (item_key, nome_input, valor_input, img_input, destaque_input) => {
    db.ref('/produtos/' + item_key).set(
        {
        "nome": nome_input,
        "valor": valor_input,
        "image": img_input,
        "destaque": destaque_input
    });
}
// Atualizar Usuario
export const updateUser =  (item_key, nome, email, telefone, data_nascimento, imagem) => {
  db.ref('/usuarios/' + item_key).set(
      {
      "nome": nome,
      "email": email,
      "telefone": telefone,
      "data_nascimento": data_nascimento,
      "imagem": imagem,
  });
}


// Salvar Imagem

export const salvarImagemAsync = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });
  
    const ref = storage.ref().child("images/" + uuid.v4());
    const snapshot = await ref.put(blob);
  
    blob.close();
  
    return await snapshot.ref.getDownloadURL();
  }

// Apagar imagem
export const deletarImagemAsync = async (imageUrl) => {
    console.log(imageUrl);
    
    let name = imageUrl.substr(
        imageUrl.indexOf("%2F") + 3,
        imageUrl.indexOf("?") - (imageUrl.indexOf("%2F") + 3)
    );
    name = name.replace("%20", " ");
    let storagePath = storage.ref();
    return await storagePath.child(`images/${name}`).delete();
  };