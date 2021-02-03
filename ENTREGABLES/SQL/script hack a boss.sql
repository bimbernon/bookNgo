drop database if exists proyectoFinalHACKABOSS;
create schema proyectoFinalHACKABOSS;

Use proyectoFinalHACKABOSS;


create table usuario (
  idusuario int(6) not null primary key,
  admin boolean not null  default false,
  nombreusuario varchar(20) not null,
  nombreperfilusuario varchar(20) not null unique,
  contraseña varchar (200) not null,
  apel1 varchar (40) not null,
  apel2 varchar (40) not null,
  email varchar(40) not null unique,
  codFoto varchar (20) null
  
)
;


create table tarjeta (
  idtarjeta int(6) not null primary key,
  numerotarjeta varchar(19)  not null,
  idusuario int (6) not null,
  fechaExpiracion varchar(5) not null,
  csv int(3) not null,
  constraint `fk_UsuarioTarjeta` FOREIGN KEY (`idusuario` ) REFERENCES `proyectoFinalHACKABOSS`.`usuario` (`idusuario` )
);

create table categoria (
  idcategoria int(6) not null primary key,
  nombrecategoria varchar(20),
  descripcioncategoria varchar (60)
);
create table autor (
  idautor int(6)  not null primary key,
  nombreautor varchar(40) not null,
  apel1 varchar(20) not null,
  apel2 varchar (20) null
);


create table libro (
  idlibro int(6) not null primary key,
  idcategoria int(6) not null,
  idusuario int(6) not null,
  idautor int(6) not null,
  titulo varchar(40) not null unique,
  stock int not null default 0,
  precio float(8,2),
  editorial varchar(40) not null,
  añopublicacion int (6) not null,
  constraint `fk_Categoria` FOREIGN KEY (`idcategoria` ) REFERENCES `proyectoFinalHACKABOSS`.`categoria` (`idcategoria` ) on delete restrict,
  constraint `fk_Usuario` FOREIGN KEY (`idusuario` ) REFERENCES `proyectoFinalHACKABOSS`.`usuario` (`idusuario` ),
  constraint `fk_Autor` FOREIGN KEY (`idautor` ) REFERENCES `proyectoFinalHACKABOSS`.`autor` (`idautor` )
);


Create table reserva (
    idusuario int(6) not null,
    idlibro int(6) not null,
    fechareserva datetime,
    fechadevolucion datetime,
	rating int null,
    primary key (idusuario,idlibro,fechareserva),
	constraint `fk_UsuarioReserva` FOREIGN KEY (`idusuario` ) REFERENCES `proyectoFinalHACKABOSS`.`usuario` (`idusuario` ),
    constraint `fk_LibroReserva` FOREIGN KEY (`idlibro` ) REFERENCES `proyectoFinalHACKABOSS`.`libro` (`idlibro`) on delete restrict
);

-- create table donacion (
-- 	idusuario int(6) not null,
 --    idlibro int (6) not null,
 --    fechadonacion datetime,
-- 	revisado boolean not null default false,
 --    primary key (idusuario,idlibro),
 --    constraint `fk_UsuarioDonacion` FOREIGN KEY (`idusuario` ) REFERENCES `proyectoFinalHACKABOSS`.`usuario` (`idusuario` ),
 --    constraint `fk_LibroDonacion` FOREIGN KEY (`idlibro` ) REFERENCES `proyectoFinalHACKABOSS`.`libro` (`idlibro`) on delete restrict
    
-- );

create table donacion (
iddonacion int (6) not null,
idusuario int (6) not null,
titulo varchar(40) not null,
nombreaAutor varchar (40) not null,
fechadonacion datetime,
revisado boolean not null default false,
correcto boolean not null default false,
primary key (iddonacion),
constraint `fk_UsuarioDonacion` FOREIGN KEY (`idusuario` ) REFERENCES `proyectoFinalHACKABOSS`.`usuario` (`idusuario` )

);







create table factura (
  idfactura int(6)  not null primary key,
  idusuario int(6) not null references usuario (idusuario),
  fecha datetime,
  iva float(4,2) not null,
  precioenvio float not null (4,2),
  total float (4,2),
constraint `fk_UsuarioFactura` FOREIGN KEY (`idusuario` ) REFERENCES `proyectoFinalHACKABOSS`.`usuario` (`idusuario` )
);


create table detalle ( 
  idfactura int(6) not null references factura(idfactura),
  iddetalle int(6) unsigned not null, 
  idlibro int(6) references libro(idlibro),
  precio float (8,2), 
  primary key (idfactura,iddetalle),
  constraint `fk_LibroDetalle` FOREIGN KEY (`idlibro` ) REFERENCES `proyectoFinalHACKABOSS`.`libro` (`idlibro`),
  constraint `fk_idFactura` FOREIGN KEY (`idfactura` ) REFERENCES `proyectoFinalHACKABOSS`.`factura` (`idfactura` ) on delete restrict
);

INSERT INTO proyectoFinalHACKABOSS.usuario values (1,true,"Jose","JOSELF","abc123.","Lopez","Fernandez","usuario1@gmail.com","cod1");
INSERT INTO proyectoFinalHACKABOSS.usuario values (2,true,"Barbara","BARI","abc123.","Imbernon","loquesea","usuario2@gmail.com","cod2");
INSERT INTO proyectoFinalHACKABOSS.usuario values (3,true,"Jose","JOSESI","abc123.","Santos","Iglesias","usuario3@gmail.com","cod3");
INSERT INTO proyectoFinalHACKABOSS.categoria values (1,"Terror","Categoria destinada a los libros de terror");
INSERT INTO proyectoFinalHACKABOSS.categoria values (2,"Fantasia","Categoria destinada a los libros de fantasia");
INSERT INTO proyectoFinalHACKABOSS.categoria values (3,"Aventura","Categoria destinada a los libros de aventura");
INSERT INTO proyectoFinalHACKABOSS.autor values (1,"Miguel","Cervantes","Saavedra");
INSERT INTO proyectoFinalHACKABOSS.autor values (2,"Joanne","Rowling","Rowling");
INSERT INTO proyectoFinalHACKABOSS.libro values (1,1,1,1,"Don Quijote de la Mancha",3,20,"Santillana",2003);
INSERT INTO proyectoFinalHACKABOSS.libro values (2,1,2,1,"Harry Potter",2,20,"Santillana",2006);
INSERT INTO proyectoFinalHACKABOSS.tarjeta values (1,"4000 1234 5673 9875",1,"04/21",343);

INSERT INTO proyectoFinalHACKABOSS.reserva values (1,1,"1996-07-10",null,5);

INSERT INTO `proyectofinalhackaboss`.`factura` (`idfactura`, `idusuario`, `fecha`, `iva`) VALUES ('1', '1', '2021-01-04', '20.00');

INSERT INTO `proyectofinalhackaboss`.`detalle` (`idfactura`, `iddetalle`, `idlibro`, `precio`) VALUES ('1', '1', '1', '20.0');
INSERT INTO `proyectofinalhackaboss`.`detalle` (`idfactura`, `iddetalle`, `idlibro`, `precio`) VALUES ('1', '2', '1', '30.0');
INSERT INTO `proyectofinalhackaboss`.`detalle` (`idfactura`, `iddetalle`, `idlibro`, `precio`) VALUES ('1', '3', '1', '50.0');
-- Se inserta el libro enviado por el usuario 
INSERT INTO proyectoFinalHACKABOSS.donacion  values (1,1,"Harry Potter donado" ,"Autor1","2020-05-10",1,0)
-- Se revisa (modificando el atributo revisado) y a continuacion se modifica el atributo correcto
-- Si esta todo correcto insertamos el libro con los datos completos .