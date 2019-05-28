// ItemService.js

import { db } from '../config/db';

export const addItem =  (nome_input, valor_input, img_input, destaque_input) => {
    db.ref('/produtos').push({
        "nome": nome_input,
        "valor": valor_input,
        "img": img_input,
        "destaque": destaque_input
    });
}