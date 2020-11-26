const { SinhVien, validateSinhVien } = require('../models/sinhvien');
const express = require('express');
const router = express.Router();
const validator = require('validator');


router.get('/', async (req, res, next) => {
  const sinhvien = await SinhVien.find();
  res.render('index', {
    sinhvien: sinhvien
  });
  next();
});

router.get('/:id', async (req, res, next) => {
  if (!validator.isMongoId(req.params.id)) {
    // err
    return;
  } else {
    const sinhvien = await SinhVien.findById(req.params.id);
    res.render('change', {
      sinhvien: sinhvien
    })
  }
});

router.post('/', async (req, res, next) => {
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

router.put('/:id', async (req, res, next) => {
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

router.delete('/:id', async (req, res, next) => {
  const sinhvien = await SinhVien.findByIdAndRemove(req.params.id);

  if (!sinhvien) return res.status(404).send(`Sinh vien co ma ${req.params.id} khong ton tai`);
  res.redirect('/');
  next();
});

module.exports = router;