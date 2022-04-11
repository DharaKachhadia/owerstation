const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const emailValidator = require("email-validator");
const jwtKey =
  "eyJhbGciOiJIUzI1NiIffsInR5cCI6IkpXVCJ1.eyJ1c2VySWQiOiI2MWJjNWRlMzEyODRlN2ZjYTM3OGMwMzAiLCJffpYXQiOjE2Mzk3MzQ3NTV2.bHygAffPHN6AUUldKvEyvLLdtWvjGYPdaxjtrPnYw88Vo";
const router = express.Router();
require("../models/owner");
const Owner = mongoose.model("owner");
const PASS_SEC = "rutvik";

router.get("/owner.json", (req, res) => {
  Owner.find().then((data) => {
    res.status(200).json(data);
  });
});

router.post("/owner/signup", async (req, res) => {
  try {
    const owner = new Owner({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      contactNo: req.body.contactNo,
      password: CryptoJS.AES.encrypt(req.body.password, PASS_SEC).toString(),
      confirmPassword: CryptoJS.AES.encrypt(
        req.body.confirmPassword,
        PASS_SEC
      ).toString(),
    });
    const hashedPassword = CryptoJS.AES.decrypt(owner.password, PASS_SEC);
    const hashedConfirmPassword = CryptoJS.AES.decrypt(
      owner.confirmPassword,
      PASS_SEC
    );
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    const originalConfirmPassword = hashedConfirmPassword.toString(
      CryptoJS.enc.Utf8
    );

    if (emailValidator.validate(req.body.email)) {
      if (originalPassword !== originalConfirmPassword) {
        res.status(400).send("password and confirm password are not match!");
      } else {
        owner.save();
        const token = jwt.sign({ ownerId: owner._id }, jwtKey);
        res.send({ token });
      }
    } else {
      res.status(500).json(err.message);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.post("/owner/signin", async (req, res) => {
  try {
    const owner = await Owner.findOne({
      contactNo: req.body.contactNo,
    });
    const hashedPassword = CryptoJS.AES.decrypt(owner.password, PASS_SEC);

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    console.log(originalPassword);
    console.log(req.body.password);
    const inputPassword = req.body.password;

    if (!owner) {
      res.status(401).json("User are not found");
    } else {
      if (originalPassword === inputPassword) {
        const token = jwt.sign({ ownerId: owner._id }, jwtKey);
        res.status(200).json({ token });
      } else {
        res.status(401).json("Wrong Password");
      }
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.put("/owner/update", async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      PASS_SEC
    ).toString();
  }
  if (req.body.confirmPassword) {
    req.body.confirmPassword = CryptoJS.AES.encrypt(
      req.body.confirmPassword,
      PASS_SEC
    ).toString();
  }
  try {
    const contactNo = req.body.contactNo;
    const owner = await Owner.findOneAndUpdate(
      { contactNo },
      {
        $set: {
          password: req.body.password,
          confirmPassword: req.body.confirmPassword,
        },
      }
    );
    owner.save();
    res.status(200).json(owner);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

router.put("/OwnerData/update", async (req, res) => {
  try {
    const contactNo = req.body.contactNo;

    const user = await Owner.findOneAndUpdate(
      { contactNo },

      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          contactNo: req.body.newcontactNo,
        },
      }
    );

    user.save();

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
module.exports = router;