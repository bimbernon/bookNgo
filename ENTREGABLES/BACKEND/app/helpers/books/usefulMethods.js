'use strict';
function formatArrayBooks(array) {
const booksFormateados = array.map((book)=>{
    const bookFormated={
        titulo:book.titulo,
        stock:book.stock,
        precio:book.precio,
        editorial:book.editorial,
        Categoria:{
            nombre:book.nombrecategoria,
            descripcion:book.descripcioncategoria
        },
        Usuario:{
            nombreUsuario:book.nombreusuario,
            nombrePerfil:book.nombreperfilusuario,
            apellido1:book.apellido1usuario,
            apellido2:book.apellido2usuario,
            email:book.email
        },
        Autor:{
            nombreAutor:book.nombreautor,
            apellido1:book.apel1,
            apellido2:book.apel2
        }
    }
    return bookFormated;
});
return booksFormateados;

}
module.exports={formatArrayBooks}