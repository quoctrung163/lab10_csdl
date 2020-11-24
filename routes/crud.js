const { SinhVien, validateSinhVien } = require('../models/sinhvien');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
  const sinhvien = await SinhVien.find();
  res.render('get/index', {
    sinhvien: sinhvien
  });
  next();
});

router.post('/', async (req, res, next) => {
  const { error } = await validateSinhVien(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let sinhvien = new SinhVien({
    MSSV: req.body.MSSV,
    Hoten: req.body.Hoten,
    NamSinh: req.body.NamSinh,
    DiemMon1: req.body.DiemMon1,
    DiemMon2: req.body.DiemMon2,
    DiemMon3: req.body.DiemMon3,
    Email: req.body.Email,
    DienThoai: req.body.DienThoai
  });

  sinhvien = await sinhvien.save();
  res.redirect('/crud');
  next();
})
module.exports = router;