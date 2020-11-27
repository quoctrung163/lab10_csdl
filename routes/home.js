const { SinhVien, validateSinhVien } = require('../models/sinhvien');
const express = require('express');
const router = express.Router();
const validator = require('validator');

router.get('/', async (req, res, next) => {
  try {
    const sinhvien = await SinhVien.find();
    res.status(200).render('index', {
      sinhvien: sinhvien
    });
  } catch (err) {
    res.status(400).send(err);
  }
  next();
});

router.get('/student/:id', async (req, res, next) => {
  if (!validator.isMongoId(req.params.id)) {
    // err
    return;
  } else {
    const sinhvien = await SinhVien.findById(req.params.id);
    res.status(200).render('change', {
      sinhvien: sinhvien
    })
  }
  next();
});

router.post('/student', async (req, res, next) => {
  const { error } = await validateSinhVien(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let sinhvien = new SinhVien({
    MSSV: req.body.MSSV,
    Hoten: req.body.Hoten,
    Namsinh: req.body.Namsinh,
    DiemMon1: req.body.DiemMon1,
    DiemMon2: req.body.DiemMon2,
    DiemMon3: req.body.DiemMon3,
    Email: req.body.Email,
    DienThoai: req.body.DienThoai
  });

  sinhvien = await sinhvien.save();
  res.redirect('/');
  next();
});

router.put('/student/:id', async (req, res, next) => {
  const { error } = validateSinhVien(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const sinhvien = await SinhVien.findByIdAndUpdate(req.params.id, {
    MSSV: req.body.MSSV,
    Hoten: req.body.Hoten,
    Namsinh: req.body.Namsinh,
    DiemMon1: req.body.DiemMon1,
    DiemMon2: req.body.DiemMon2,
    DiemMon3: req.body.DiemMon3,
    Email: req.body.Email,
    DienThoai: req.body.DienThoai
  }, { new: true });

  if (!sinhvien) return res.status(404).send(`Sinh vien co ma ${req.params.id} khong ton tai`);
  res.redirect('/');
  next();
});

router.delete('/student/:id', async (req, res, next) => {
  const sinhvien = await SinhVien.findByIdAndRemove(req.params.id);

  if (!sinhvien) return res.status(404).send(`Sinh vien co ma ${req.params.id} khong ton tai`);
  res.redirect('/');
  next();
});

module.exports = router;  