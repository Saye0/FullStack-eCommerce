const router = require("express").Router();
const Product = require("../models/nargile");

router.post("/adminpage", async (req, res) => {
  const { username, password } = req.body;
  if (username === "admin" && password === "password") {
    res.status(200).json({ message: "Giriş başarılı" });
  } else {
    res.status(401).json({ message: "Geçersiz kullanıcı adı veya şifre" });
  }
});
router.delete("/delete-product/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const silinecekUrun = await Product.findByIdAndDelete(id);

    if (silinecekUrun) {
      res
        .status(200)
        .json({ mesaj: "Ürün başarıyla silindi", urun: silinecekUrun });
    } else {
      res.status(404).json({ mesaj: "Silinecek ürün bulunamadı" });
    }
  } catch (hata) {
    res.status(500).json({
      mesaj: "Ürün silinirken bir hata oluştu",
      hata: hata.message,
    });
  }
});

router.get("/get-products", async (req, res) => {
  try {
    const urunler = await Product.find();
    res.status(200).json(urunler);
  } catch (hata) {
    res.status(500).json({
      mesaj: "Ürünleri getirirken bir hata oluştu",
      hata: hata.message,
    });
  }
});

router.get("/get-product/:id", async (req, res) => {
  try {
    const id = req.params.id;
    // console.log("Aranan ürün ID'si:", id);

    const product = await Product.findById(id);
    // console.log("Bulunan ürün:", product);

    if (product) {
      res.status(200).json(product);
    } else {
      //   console.log("Ürün bulunamadı");
      res.status(404).json({ mesaj: "Ürün bulunamadı" });
    }
  } catch (error) {
    // console.error("Ürün getirme hatası:", error);
    res.status(500).json({ mesaj: "Sunucu hatası", hata: error.message });
  }
});

router.post("/create-product", async (req, res) => {
  try {
    const yeniUrun = new Product(req.body);
    await yeniUrun.save();
    res.status(201).json(yeniUrun);
  } catch (error) {
    res
      .status(400)
      .json({ mesaj: "Yeni ürün oluşturulamadı", hata: error.message });
  }
});

module.exports = router;
