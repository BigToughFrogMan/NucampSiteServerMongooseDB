const express = require("express");
const Promotion = require("../models/promotion");
const authenticate = require("../authenticate");

const promotionRouter = express.Router();

promotionRouter
  .route("/")

  .get((req, res, next) => {
    Promotion.find()
      .then((promotions) => res.status(200).json(promotions))
      .catch((err) => next(err));
  })
  .put(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(`PUT operation not supported on /promotions`);
  })
  .post(authenticate.verifyUser, (req, res, next) => {
    Promotion.create(req.body)
      .then((promotion) => res.status(200).json(promotion))
      .catch((err) => next(err));
  })
  .delete(authenticate.verifyUser, (req, res, next) => {
    Promotion.deleteMany()
      .then((promotions) => res.status(200).json(promotions))
      .catch((err) => next(err));
  });

promotionRouter
  .route("/:promotionId")
  .get((req, res, next) => {
    Promotion.findById(req.params.promotionId)
      .then((promotion) => res.status(200).json(promotion))
      .catch((err) => next(err));
  })
  .post(authenticate.verifyUser, (req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /promotions/${req.params.promotionId}/`
    );
  })
  .put(authenticate.verifyUser, (req, res, next) => {
    Promotion.findByIdAndUpdate(
      req.params.promotionId,
      {
        $set: req.body,
      },
      { new: true }
    )
      .then((promotion) => res.status(200).json(promotion))
      .catch((err) => next(err));
  })

  .delete(authenticate.verifyUser, (req, res, next) => {
    Promotion.findByIdAndDelete(req.params.promotionId)
      .then((promotion) => res.status(200).json(promotion))
      .catch((err) => next(err));
  });

module.exports = promotionRouter;
