"use strict";

const Joi = require("joi");

const reserveRepository = require("../../repositories/reserve-repository");
const { checkStockBook } = require("../../repositories/books-repository");
const { addDateDays } = require("../../helpers/date");

// const schema = Joi.object().keys({
//   idlibro: Joi.number().positive().required(),
// });

// const schema2 = Joi.object().keys({
//   idusuario: Joi.number().positive().required(),
// });

async function createReserve(req, res) {
  try {
    const { idusuario } = req.auth;

    const { idlibro } = req.body;

    // await schema.validateAsync(req.body);
    // await schema2.validateAsync(req.auth);

    let lookPurse = await reserveRepository.checkPurse(idusuario);

    if (lookPurse < 1) {
      const error = new Error(
        "Saldo insuficiente. Recarga tu monedero para continuar con la reserva"
      );
      throw error;
    }

    let updatePurse = await reserveRepository.decreasePurse(idusuario);

    const reserveStock = await checkStockBook(idlibro);

    if (reserveStock === 0) {
      console.log("entro en el if");
      const newReserveDate = await reserveRepository.findFirstReserveToEnd(
        idlibro
      );
      console.log(newReserveDate, "vuelvo del respositorio");
      const validReserveDate = newReserveDate[0].fechadevolucion;
      console.log(validReserveDate, "validReserveDate");

      const reserveDevolution = addDateDays(
        newReserveDate[0].fechadevolucion,
        30
      );
      console.log(reserveDevolution, "vuelvo de formatearme la fecha");
      const rating = null;

      const reserve = {
        idusuario: idusuario,
        idlibro,
        fechareserva: validReserveDate,
        fechadevolucion: reserveDevolution,
        valoracion: rating,
      };
      console.log(reserve, "datos enteros de la reserva");

      await reserveRepository.addReserve(reserve);

      await reserveRepository.decreaseBookStock(idlibro);

      res.status(200).send({
        idusuario: idusuario,
        idlibro,
        fechareserva: validReserveDate.toLocaleDateString(),
        fechadevolucion: reserveDevolution,
        valoracion: rating,
      });
      // const error = new Error("Este libro no esta disponible actualmente.");
      // throw error;
    } else {
      await reserveRepository.decreaseBookStock(idlibro);

      const reserveDate = new Date();
      console.log(reserveDate.toISOString);
      const reserveDevolution = addDateDays(new Date(), 30);
      const rating = null;
      const reserve = {
        idusuario: idusuario,
        idlibro,
        fechareserva: reserveDate,
        fechadevolucion: reserveDevolution,
        valoracion: rating,
      };
      await reserveRepository.addReserve(reserve);
      res.status(200).send({
        idusuario: idusuario,
        idlibro,
        fechareserva: reserveDate.toLocaleDateString(),
        fechadevolucion: reserveDevolution,
        valoracion: rating,
      });
    }

    // const reserveDate = new Date();

    // console.log(reserveDate.toISOString);
    // const reserveDevolution = addDateDays(new Date(), 30);
    // const rating = null;

    // const reserve = {
    //   idusuario: idusuario,
    //   idlibro,
    //   fechareserva: reserveDate,
    //   fechadevolucion: reserveDevolution,
    //   valoracion: rating,
    // };

    // await reserveRepository.addReserve(reserve);

    // res.status(200).send({
    //   idusuario: idusuario,
    //   idlibro,
    //   fechareserva: reserveDate.toLocaleDateString,
    //   fechadevolucion: reserveDevolution,
    //   valoracion: rating,
    // });
  } catch (err) {
    res.status(err.status || 500);
    res.send({ error: err.message });
  }
}

module.exports = {
  createReserve,
};
