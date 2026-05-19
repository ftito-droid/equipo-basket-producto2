const { setGlobalOptions } = require("firebase-functions");
const { onDocumentCreated, onDocumentUpdated } = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");
const logger = require("firebase-functions/logger");

setGlobalOptions({ maxInstances: 10 });

admin.initializeApp();

exports.notifyPlayerCreated = onDocumentCreated("players/{playerId}", async (event) => {
  logger.info("Cambio detectado en players");

  const tokensSnapshot = await admin.firestore().collection("tokens").get();

  if (tokensSnapshot.empty) {
    logger.info("No hay tokens guardados");
    return;
  }

const tokensSet = new Set();

tokensSnapshot.forEach((doc) => {
  const data = doc.data();

  if (data.token) {
    tokensSet.add(data.token);
  }
});

const tokens = Array.from(tokensSet);

  if (tokens.length === 0) {
    logger.info("No hay tokens válidos");
    return;
  }

  const message = {
    notification: {
      title: "Equipo Basket",
      body: "Se ha creado o modificado un jugador",
    },
    tokens: tokens,
  };

  const response = await admin.messaging().sendEachForMulticast(message);

  logger.info("Notificaciones enviadas", {
    successCount: response.successCount,
    failureCount: response.failureCount,
  });
});

exports.notifyPlayerUpdated = onDocumentUpdated("players/{playerId}", async (event) => {
  logger.info("Jugador actualizado");

  const afterData = event.data.after.data();

  const playerName = afterData.nombre || afterData.name || "Jugador";

  const tokensSnapshot = await admin.firestore().collection("tokens").get();

const tokensSet = new Set();

tokensSnapshot.forEach((doc) => {
  const data = doc.data();

  if (data.token) {
    tokensSet.add(data.token);
  }
});

const tokens = Array.from(tokensSet);

  if (tokens.length === 0) {
    logger.info("No hay tokens válidos");
    return;
  }

  const message = {
    notification: {
      title: "Jugador actualizado",
      body: `Se ha actualizado ${playerName}`,
    },
    tokens: tokens,
  };

  const response = await admin.messaging().sendEachForMulticast(message);

  logger.info("Notificaciones de actualización enviadas", {
    successCount: response.successCount,
    failureCount: response.failureCount,
  });
});