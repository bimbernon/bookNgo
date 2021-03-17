drop database if exists proyectoFinalBookNGo;
create schema proyectoFinalBookNGo;

Use proyectoFinalBookNGo;

create table usuario (
  idusuario int(6) not null primary key,
  admin boolean not null  default false,
  nombreusuario varchar(20) not null,
  nombreperfilusuario varchar(20) not null unique,
  contraseña varchar (200) not null,
  apel1 varchar (40) not null,
  apel2 varchar (40) not null,
  email varchar(40) not null unique,
  direccion varchar(80) not null,
  codFoto varchar (20) null,
  monedero int(6) not null default 0
);

create table tarjeta (
  idtarjeta int(6) not null primary key,
  numerotarjeta varchar(19)  not null,
  idusuario int (6) not null,
  fechaExpiracion varchar(5) not null,
  csv int(3) not null,
  constraint `fk_UsuarioTarjeta` FOREIGN KEY (`idusuario`) REFERENCES `proyectoFinalBookNGo`.`usuario` (`idusuario`) on delete cascade
);

create table categoria (
  idcategoria int(6) not null primary key,
  nombrecategoria varchar(20)
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
  idautor int(6) not null,
  titulo varchar(100) not null unique,
  stock int not null default 0,
  sinopsis varchar(2000) not null,
  precio float(8,2),
  editorial varchar(40) not null,
  añopublicacion int (6) not null,
  constraint `fk_Categoria` FOREIGN KEY (`idcategoria`) REFERENCES `proyectoFinalBookNGo`.`categoria` (`idcategoria`) on delete cascade,
  constraint `fk_Autor` FOREIGN KEY (`idautor`) REFERENCES `proyectoFinalBookNGo`.`autor` (`idautor`) on delete cascade
);


Create table reserva (
    idusuario int(6) not null,
    idlibro int(6) not null,
    fechareserva datetime,
    fechadevolucion datetime,
	rating int null,
    primary key (idusuario,idlibro,fechareserva),
	constraint `fk_UsuarioReserva` FOREIGN KEY (`idusuario`) REFERENCES `proyectoFinalBookNGo`.`usuario` (`idusuario`) on delete cascade,
    constraint `fk_LibroReserva` FOREIGN KEY (`idlibro`) REFERENCES `proyectoFinalBookNGo`.`libro` (`idlibro`) on delete cascade
);


create table donacion (
iddonacion int (6) not null,
idusuario int (6) not null,
titulo varchar(40) not null,
nombreautor varchar (40) not null,
fechadonacion datetime,
revisado boolean not null default false,
correcto boolean not null default false,
primary key (iddonacion),
constraint `fk_UsuarioDonacion` FOREIGN KEY (`idusuario`) REFERENCES `proyectoFinalBookNGo`.`usuario` (`idusuario`) on delete cascade
);

create table factura (
  idfactura int(6)  not null primary key,
  idusuario int(6) not null references usuario (idusuario),
  fecha datetime,
  iva float(4,2) not null,
  precioenvio float (4,2) not null,
  total float (4,2),
constraint `fk_UsuarioFactura` FOREIGN KEY (`idusuario`) REFERENCES `proyectoFinalBookNGo`.`usuario` (`idusuario`) on delete cascade
);

create table detalle ( 
  idfactura int(6) not null references factura(idfactura),
  iddetalle int(6) unsigned not null, 
  idlibro int(6) references libro(idlibro),
  precio float (8,2), 
  primary key (idfactura,iddetalle),
  constraint `fk_LibroDetalle` FOREIGN KEY (`idlibro`) REFERENCES `proyectoFinalBookNGo`.`libro` (`idlibro`) on delete cascade,
  constraint `fk_idFactura` FOREIGN KEY (`idfactura`) REFERENCES `proyectoFinalBookNGo`.`factura` (`idfactura`) on delete cascade
);

INSERT INTO proyectoFinalBookNGo.usuario values (1,true,'Jose','jlopez','$2a$04$FfIcjxmF5dXNEo1h1XtfbuLEOeI.U/xjZ7teTldS3b0mqJkYA9DmW','Lopez','Fernandez','usuario1@gmail.com','Avenida Marina n2',0,3);
INSERT INTO proyectoFinalBookNGo.usuario values (2,true,'Barbara','bimbernon','$2a$04$k6OogGlq2FzRonqfB8rZhuqvKY3H0vzmiYcOq/w/25JI9V1rEQ56y','Imbernon','Fuentes','usuario2@gmail.com','Avenida Marina n2',0,1);
INSERT INTO proyectoFinalBookNGo.usuario values (3,true,'Pepe','jsantos','$2a$04$fXQBegRXwKX9VFR6J6MKdO7JxVuLQ4fVs8lmmJD/NzKcaTbPV5Rqu','Santos','Iglesias','usuario3@gmail.com',"Avenida Marina n2",0,2);
INSERT INTO proyectoFinalBookNGo.usuario values (4,0,'Irene','imedin','$2a$04$kGnIdBVqiyTY/nL3yE690ead4Y9sRl/uEaIvCbRGMIt1YaUKc8FCi','Medin','Blanco','usuario4@gmail.com',"Avenida Marina n2",0,4);
INSERT INTO proyectoFinalBookNGo.usuario values (5,0,'Hamilton','hmercado','$2a$04$fecTLgq0lQWDa93ZCBU94OOAOTQf6byZUevvXz0BETlfofV1t6yAG','Mercado','Cuellar','usuario5@gmail.com',"Avenida Marina n2",0,5);
INSERT INTO proyectoFinalBookNGo.usuario values (6,0,'Alberto','abujan','$2a$04$euE9zzJRVIqoMgrXC45A1uZg7fNywe9LngDDzjXYFmiY6ZlozD7Le','Bujan','Seoane','usuario6@gmail.com',"Avenida Marina n2",0,6);
INSERT INTO proyectoFinalBookNGo.usuario values (7,0,'Armando','anuma','$2a$04$xt59IJ/jthbYIhSsyZtJUOnzDCjgy05LKilBu4zXKhnM5hEu4g7KW','Numa','Medina','usuario7@gmail.com',"Avenida Marina n2",0,7);
INSERT INTO proyectoFinalBookNGo.usuario values (8,0,'Martin','msieiro','$2a$04$p3seHEyX4tegyZNNNj1EUu/3Qx9VyHQdFtieyKe1d6vy6MugGmr4m','Sieiro','Gutierrez','usuario8@gmail.com',"Avenida Marina n2",0,8);
INSERT INTO proyectoFinalBookNGo.usuario values (9,0,'Pablo','pdiaz','$2a$04$iLNgOkOZ9WLW1y6IbcN0ze5YX11nznzzs8GQmlBqWY0AQgWP.Ij0K','Diaz','Garcia','usuario9@gmail.com',"Avenida Marina n2",0,9);
INSERT INTO proyectoFinalBookNGo.usuario values (10,0,'Laura','lperez','$2a$04$XaNcRmh3W.RquO4ex3jUeuxVoj2H1JretDdcTulwGUPg3N8yyQ8Oe','Perez','Marin','usuario10@gmail.com',"Avenida Marina n2",0,10);
INSERT INTO proyectoFinalBookNGo.usuario values (11,0,'Roberta','rfranco','$2a$04$DonKrR8DfLPWliXIO4zyyuxWmy1vP29AGM/8U4M2FZHoe1KRCFbOS','Franco','Martinez','usuario11@gmail.com',"Avenida Marina n2",0,11);

INSERT INTO proyectoFinalBookNGo.categoria values (1,"Historia");
INSERT INTO proyectoFinalBookNGo.categoria values (2,"Poesia");
INSERT INTO proyectoFinalBookNGo.categoria values (3,"Romance");
INSERT INTO proyectoFinalBookNGo.categoria values (4,"Autoayuda");
INSERT INTO proyectoFinalBookNGo.categoria values (5,"Cocina");
INSERT INTO proyectoFinalBookNGo.categoria values (6,"Ciencia");
INSERT INTO proyectoFinalBookNGo.categoria values (7,"Humor");
INSERT INTO proyectoFinalBookNGo.categoria values (8,"Novela");

INSERT INTO proyectoFinalBookNGo.autor values (1,"Elisabet","Benavent",null);
INSERT INTO proyectoFinalBookNGo.autor values (2,"Bebi","Fernandez", null);
INSERT INTO proyectoFinalBookNGo.autor values (3,"Ana","Frank", null);
INSERT INTO proyectoFinalBookNGo.autor values (4,"Albert","Espinosa", null);
INSERT INTO proyectoFinalBookNGo.autor values (5,"Carlos","Ríos", null);
INSERT INTO proyectoFinalBookNGo.autor values (6,"Máximo","Huerta", null);
INSERT INTO proyectoFinalBookNGo.autor values (7,"Melanie","Joy", null);
INSERT INTO proyectoFinalBookNGo.autor values (8,"Laura","Norton", null);

INSERT INTO proyectoFinalBookNGo.libro values (1,2,2,"Amor y Asco",1,"Bebi. Y su cuenta de Twitter. Una de las cuentas anónimas más influyentes del país. Toda una auténtica heroína generacional. Asomarse al borde de sus acantilados emocionales, supone un acto tan valiento como suicida y de irreverencia social al mismo tiempo. Por ello sé, que lo que tengo hoy entre las manos para mí (y seguramente para muchos de vosotros), no es exatamente un libro. Es otra cosa muy distinta.",1,"Frida",2016);
INSERT INTO proyectoFinalBookNGo.libro values (2,2,2,"Indomable. Diario de una chica en llamas.",2,"Si estás leyendo esto, probablemente seas una o un inflamable. El porque, ya lo entenderás.Ahora ojealo: Esto no es un libro, es una granada.Que empiecen las explosiones.",1,"Montena",2017);
INSERT INTO proyectoFinalBookNGo.libro values (3,7,8,"No culpes al karma de lo que te pasa por gilipollas",1,"Un antes y un después en la literatura de humor. Te mantendrá durante un buen rato la sonrisa en la cara, agradecerás que te lo recomienden... y lo recomendarás.Te podríamos contar con más o menos gracia de qué va la cosa: que si la protagonista, Sara, tiene un trabajo muy interesante (es plumista, ¿a que nunca lo habías oído?), que si es un pelín obsesiva y alérgica a los sobresaltos, que si la vida se le complica hasta límites insospechados... Que si su piso se convierte en una especie de camarote de los hermanos Marx cuando en la misma semana se meten a vivir con ella su padre deprimido, su hermana rebelde y su excéntrico prometido, y, sobre todo, el novio al que lleva mucho tiempo sin ver. Pero no te contamos lo mejor porque te gustará leerlo.",1,"ESPASA",2014);
INSERT INTO proyectoFinalBookNGo.libro values (4,3,1,"Seremos recuerdos",1,"Macarena ha conseguido poner su vida y su trabajo en orden.Macarena cree que Candela es la ayudante que necesita.Macarena empieza de nuevo.Leo sigue presente... como amigo.Y mientras Macarena vuela...Jimena se obsesiona con el pasado de Samuel,Adriana no puede seguir luchando contra ella misma.Porque las canciones que fuimos se convierten en pasado.Porque los recuerdos que seremos son el futuro.Elísabet Benavent, @BetaCoqueta, con más de 1.000.000 de ejemplares vendidos de su obra, pone el broche de oro a Canciones y recuerdos, una bilogía que reivindica el amor sin prejuicios externos, sin complejos internos.Seremos recuerdos habla de lo que sucede cuando nos damos cuenta de que lo que fuimos no afecta a lo que seremos. Una historia llena de risas, llantos, letras y melodías...Una obra escrita para las personas valientes que se atrevan a aceptarse como son.",1,"SUMA",2018);
INSERT INTO proyectoFinalBookNGo.libro values (5,1,3,"Diario de Ana Frank",2,"Un testimonio único sobre el horror y la barbarie nazi, y sobre los sentimientos y experiencias que vivió una niña judía recluida con su familia para huir del Holocausto. Tras la invasión de Holanda, los Frank, comerciantes judíos alemanes emigrado a Amsterdam en 1933, se ocultaron de la Gestapo en una buhardilla anexa al edificio donde el padre de Anne tenía sus oficinas. Eran ocho personas y permanecieron recluidas desde junio de 1942 hasta agosto de 1944, fecha en que fueron detenidas y enviadas a campos de concentración. En ese lugar y en las más precarias condiciones, Anne, a la sazón una niña de trece años, escribió su estremecedor Diario: un testimonio único en su genero sobre el horror y la barbarie nazi, y sobre los sentimientos y experiencias de la propia Anne y sus acompañantes. Anne murió en el campo de Bergen-Belsen en marzo de 1945. Su Diario nunca morirá.",1,"lucemar",1947);
INSERT INTO proyectoFinalBookNGo.libro values (6,4,4,"Lo que te diré cuando te vuelva a ver",1,"Lo que te dire cuando te vuelva a ver, la quinta novela de Albert Espinosa, nos introduce de nuevo en su particular mundo a través de una narración trepidante, cargada de emoción y vida. El autor construye un relato en el que un padre y un hijo emprenden juntos una búsquedaque los lleará a enfrentarse con su pasado. Una novela que atrapa, llena de valentía y acción, que emocionará y sorprenderá al lector por su estilo original y los giros inesperados de una trama única.",1,"DEBOLS!LLO",2017);
INSERT INTO proyectoFinalBookNGo.libro values (7,4,4,"Lo mejor de ir es volver",3,"Hay un día en la vida en que debes decidir si deseas tener la razón o la tranquilidad.",1,"DEBOLS!ILLO",2019);
INSERT INTO proyectoFinalBookNGo.libro values (8,4,4,"El mundo amarillo.",1,"Los «amarillos» esas personas que se sitúan entre el amor y la amistad, esas personas que dan sentido a nuestra vida. «El mundo amarillo es un mundo fantástico que quiero compartir contigo. Es el mundo de los descubrimientos que hice durante los diez años que estuve enfermo de cáncer. Es curioso, pero la fuerza, la vitalidad y los hallazgos que haces cuando estás enfermo sirven también cuando estás bien, en el día a día. Este libro pretende que conozcas y entres en este mundo especial y diferente; pero, sobre todo, que descubras a los amarillos. Ellos son el nuevo escalafón de la amistad, esas personas que no son ni amantes ni amigos, esa gente que se cruza en tu vida y que con una sola conversación puede llegar a cambiártela. No te adelanto más: tendrás que leer este libro para poder empezar a encontrar tus amarillos. Quizás uno de ellos sea yo... El mundo amarillo habla de lo sencillo que es creer en los sueños para que estos se creen. Y es que el creer y el crear están tan sólo a una letra de distancia. ¿Qué esperas a saber quiénes son tus amarillos?»",1,"DEBOLS!ILLO",2008);
INSERT INTO proyectoFinalBookNGo.libro values (9,3,1,"Un cuento perfecto",1,"¿Qué sucede cuando descubres que el final de tu cuento no es como soñabas? Érase una vez una mujer que lo tenía todo y un chico que no tenía nada. Érase una vez una historia de amor entre el éxito y la duda. Érase una vez un cuento perfecto.",1,"SUMA",2020);
INSERT INTO proyectoFinalBookNGo.libro values (10,3,1,"Fuimos canciones",5,"Macarena vive en Madrid y es asistente de una influencer de moda. Macarena disfruta la vida a sorbos e intenta ser feliz. Macarena tiene dos amigas: Adriana y Jimena. Macarena guarda un secreto que deletrea a escondidas. Ese secreto tiene tres letras: L-E-O. Macarena no sabe que Leo está en Madrid. Macarena teme, Macarena sueña, Macarena ama, Macarena vuela... Y en este juego del destino intenta aceptar que lo que fuimos no puede ser lo que seremos... ¿O quizás sí?",1,"SUMA",2018);
INSERT INTO proyectoFinalBookNGo.libro values (11,6,7,"Por qué amamos a los perros, nos comemos a los cerdos y nos vestimos con las vacas.",2,"Esta obra revolucionaria explora por qué en nuestra cultura nos mostramos tan dispuestos a comer algunos animales mientras que ni se nos pasa por la cabeza comernos a otros. Melanie Joy, psicóloga social, afirma que este fenómeno se explica por un proceso de negación. Hacemos caso omiso de los hechos: de la capacidad de conciencia de los animales, de su capacidad para sentir dolor, de las crueles prácticas ganaderas, de que no necesitamos comer carne y de que, por lo general, sin ella viviríamos más y mejor. Una lectura obligada para todo el que esté interesado en saber más acerca de qué comemos y por qué.",1,"PYV EDITORES",2013);
INSERT INTO proyectoFinalBookNGo.libro values (12,5,5,"Come Comida Real.",1,"Una guía práctica para combatir y desterrar los ultraprocesados de nuestra alimentación y volver a comer comida real. En la actualidad, la mayoría de la población vive engañada con respecto a su alimentación. Utilizando la metáfora de la películaMatrix, vivimos en un mundo en el que «no comemos comida real, sino productos que han puesto ante nuestros ojos». Un entorno perfectamente diseñado para el consumo de comestibles insanos: los ultraprocesados. Este entorno está controlado por el lado oscuro de la industria alimentaria, la cual mantiene a la población comprando sus productos en contra de su salud. En este libro, Carlos Ríos nos ofrece el conocimiento científico necesario para cuestionar, indagar y profundizar en nuestra alimentación y en todo lo que la rodea. Nos explica cuáles son las bases del Realfooding, un estilo de vida que persigue desterrar de nuestra dieta los productos ultraprocesados, y nos ofrece consejos prácticos, trucos y recetas para comer saludablemente de forma fácil, rápida y rica. Matrix no se puede enseñar, has de verla con tus propios ojos. ¿Te atreves a despertar?",1,"PAIDÓS",2019);
INSERT INTO proyectoFinalBookNGo.libro values (13,8,6,"La noche soñada",7,"En la víspera de San Juan de 1980, los habitantes de Calabella, en la Costa Brava, esperan a la mítica Ava Gardner, que va a inaugurar el cine de verano del pueblo. Todo el mundo está pendiente de la actriz, salvo Justo, el benjamín de la peculiar familia Brightman. En el día más mágico del año, el muchacho ha decidido que, en vez de pedir un deseo, va a hacer todo lo que esté en su mano por cambiar el destino de los suyos.La noche soñada es una historia sobre la búsqueda de la felicidad.De la mano de Màxim Huerta, el lector descubrirá que el viaje más arriesgado es el que se emprende hacia el amor, tantas veces doloroso e imposible, pero con el que nunca deberíamos dejar de soñar.",1,"ESPASA",2014);

INSERT INTO proyectoFinalBookNGo.tarjeta values (1,"5274 3400 1562 9875",4,"04/21",245);
INSERT INTO proyectoFinalBookNGo.tarjeta values (2,"1682 1234 5673 3327",5,"01/26",265);
INSERT INTO proyectoFinalBookNGo.tarjeta values (3,"4000 1578 3594 3333",6,"05/22",489);
INSERT INTO proyectoFinalBookNGo.tarjeta values (4,"1516 2258 8647 0012",7,"11/22",378);
INSERT INTO proyectoFinalBookNGo.tarjeta values (5,"0245 0142 5673 3245",8,"06/21",145);
INSERT INTO proyectoFinalBookNGo.tarjeta values (6,"4000 3400 5453 1684",9,"11/24",328);
INSERT INTO proyectoFinalBookNGo.tarjeta values (7,"1682 2156 6465 8799",10,"04/23",245);
INSERT INTO proyectoFinalBookNGo.tarjeta values (8,"0123 5156 5151 9546",11,"12/25",343);

INSERT INTO proyectoFinalBookNGo.reserva values (4,1,"2021-03-03",null,0);
INSERT INTO proyectoFinalBookNGo.reserva values (5,6,"2021-02-27",null,0);
INSERT INTO proyectoFinalBookNGo.reserva values (5,9,"2021-02-27",null,0);
INSERT INTO proyectoFinalBookNGo.reserva values (11,3,"2021-03-08",null,0);
INSERT INTO proyectoFinalBookNGo.reserva values (8,8,"2021-02-28",null,0);

INSERT INTO proyectoFinalBookNGo.factura values (1,4,"2021-03-03",21.00,3,1.21);
INSERT INTO proyectoFinalBookNGo.factura values (2,5,"2021-02-27",21.00,3,1.21);
INSERT INTO proyectoFinalBookNGo.factura values (3,11,"2021-03-08",2.00,3,1.21);
INSERT INTO proyectoFinalBookNGo.factura values (4,8,"2021-02-28",21.00,3,1.21);

INSERT INTO proyectoFinalBookNGo.detalle  values (1, 1, 1, 20.0);
INSERT INTO proyectoFinalBookNGo.detalle  values (2, 1, 6, 20.0);
INSERT INTO proyectoFinalBookNGo.detalle  values (3, 1, 3, 20.0);
INSERT INTO proyectoFinalBookNGo.detalle  values (4, 1, 8, 20.0);

-- Se inserta el libro enviado por el usuario 
INSERT INTO proyectoFinalBookNGo.donacion  values (1,4,"Seremos recuerdos" ,"Elisabet Benavent","2020-05-10",1,0)
-- Se revisa (modificando el atributo revisado) y a continuacion se modifica el atributo correcto