const Joi = require('joi');
const mongoose = require('mongoose');

const SinhVien = mongoose.model('SinhVien',
  new mongoose.Schema({
    MSSV: {
      type: String,
      minlength: 6,
      default: "",
      maxlength: 8
    },
    Hoten: {
      type: String,
      minlength: 0,
      default: "",
      maxlength: 50
    },
    NamSinh: {
      type: Number,
      default: 1,
      minlength: 1,
      maxlength: 10
    },
    DiemMon1: {
      type: Number,
      default: 0,
      minlength: 1,
      maxlength: 2
    },
    DiemMon2: {
      type: Number,
      default: 0,
      minlength: 1,
      maxlength: 2
    },
    DiemMon3: {
      type: Number,
      default: 0,
      minlength: 1,
      maxlength: 2
    },
    Email: {
      type: String,
      default: "",
      minlength: 0,
      maxlength: 30
    },
    DienThoai: {
      type: String,
      default: "",
      minlength: 0,
      maxlength: 30
    }
  }), 'sinhvien');

function validateSinhVien(sinhvien) {

  const schema = Joi.object({
    MSSV: Joi.string().min(6).max(8),
    Hoten: Joi.string().min(0).max(50),
    NamSinh: Joi.number(),
    DiemMon1: Joi.number(),
    DiemMon2: Joi.number(),
    DiemMon3: Joi.number(),
    Email: Joi.string().min(0).max(30),
    DienThoai: Joi.string().min(0).max(30)
  });

  return schema.validate(sinhvien);
}

module.exports = {
  SinhVien,
  validateSinhVien
}