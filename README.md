# SKOPSE — GitHub Pages sorunsuz kurulum

Bu ZIP içindeki `index.html` dosyası tüm veri, CSS, JavaScript ve görselleri içerir. `data/world.json`, `app.js`, `styles.css` veya `assets/` yüklemek gerekmez.

## Yayınlama

1. GitHub'da `eceoyun-cyber/skopse` repository sayfasını aç.
2. `index.html` dosyasını repository kök dizinine (`main` dalına) yükle. Var olan `index.html` üzerine yazılacak.
3. İstersen `eski-hikaye-haritasi.html` dosyasını da köke yükle; arşiv bağlantısı için gerekir.
4. Settings → Pages → Build and deployment → Deploy from a branch → `main` + `/(root)` → Save.
5. https://eceoyun-cyber.github.io/skopse/?v=2 sayfasını aç; Ctrl+F5 ile yenile.
6. Sayfa altında `BAĞIMSIZ HTML · DÜZELTME 02` yazdığını doğrula.

**Eğer aynı 404 hatasını görürsen:** GitHub Pages halen eski bir index.html yayınlıyor demektir. Repository ana sayfasından index.html dosyasını aç, arama yap: `BAĞIMSIZ HTML`. Bulamıyorsan dosya yanlış dala veya klasöre yüklenmiştir. Bulabiliyorsan Pages bölümündeki yayınlama dalını ve kök klasörünü kontrol et. Actions sekmesinde GitHub Pages dağıtımının başarıyla tamamlandığından emin ol.

Bu sürüm tek dosya olduğu için `index.html` üzerine çift tıklayarak bilgisayarda da çalışır. Önceki harita bağlantısı için ayrıca `eski-hikaye-haritasi.html` gerekir.
