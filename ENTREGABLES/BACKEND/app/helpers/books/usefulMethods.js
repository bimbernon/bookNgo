'use strict';
function formatArrayBooks(array) {
    const booksFormateados = array.map((book) => {
        const bookFormated = {
            title: book.titulo,
            stock: book.stock,
            price: book.precio,
            editorial: book.editorial,
            Category: {
                name: book.nombrecategoria,
                description: book.descripcioncategoria
            },
            Usuario: {
                username: book.nombreusuario,
                profilename: book.nombreperfilusuario,
                lasname1: book.apellido1usuario,
                lastname2: book.apellido2usuario,
                email: book.email
            },
            Autor: {
                nameAuthor: book.nombreautor,
                lastname1: book.apel1,
                lastname2: book.apel2
            }
        }
        return bookFormated;
    });
    return booksFormateados;

}
module.exports = { formatArrayBooks }