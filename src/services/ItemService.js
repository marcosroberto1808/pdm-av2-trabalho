// ItemService.js

import { db } from '../config/db';

// Adicionar item
export const addItem =  (nome_input, valor_input, img_input, destaque_input) => {
    db.ref('/produtos').push({
        "nome": nome_input,
        "valor": valor_input,
        "img": img_input,
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
        "img": img_input,
        "destaque": destaque_input
    });
}