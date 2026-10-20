# SKOPSE — Dünya Atlası

## Güncel sürüm ve çalışma kaynağı

**Atlas 3.8 · 20 Ekim 2026**. Güncel atlasın ana verisi `world.json`, görünümü `styles.css`, uygulama mantığı `app.js`, giriş sayfası `index.html` dosyalarındadır. Hepsi depo **kökünde** bulunur. `index.html` bunları dış dosyalar olarak yükler; eski tek dosyalı sürümün README'sindeki yönergeler bu sürüm için geçerli değildir.

16 seçilmiş portre/mekân illüstrasyonu `_KESIN.webp` ekiyle işaretlenmiştir. Silme/karıştırma riski açısından `SECILI_GORSELLER.md` dosyasını kullanın. **`NEXARIEL_KESIN.webp` kesin seçilmiş görseldir**.

## Hikâye kanonu

- `world.json` — karakterler, dünyadaki ilişkiler, zaman çizelgesi, sözlük, yazar notları ve 12 bölümün özetleri.
- `KANON_KARARLARI_2026-10-20.md` — yeni kararların ayrıntıları, kesinlik düzeyi ve açıklanmaması gereken yazar sırları.
- `eski-hikaye-haritasi.html` — daha eski taslak ve tarihsel arşiv; güncel kanonun yerine geçmez.
- `image-manifest.json` — görsel kaynak listesi; yollar depo köküne göredir.

## Yayınlama

GitHub Pages için yayımlama kaynağı olarak **en güncel değişiklikleri içeren dal** ve **`/(root)`** seçilmeli. GitHub Pages yapılandırmasının hangi dalı kullandığını GitHub → Settings → Pages kısmında kontrol edin.

Projenin herkese açık GitHub Pages adresi: https://eceoyun-cyber.github.io/skopse/

**Dikkat:** `index.html`, `world.json`, `app.js`, `styles.css` ve bağlantılı `.webp` görselleri aynı dal/kök konumunda birlikte bulunmalıdır. Sayfa `world.json` dosyasını tarayıcıda `fetch` ile aldığı için yerel `file://` açılışında çalışmayabilir; GitHub Pages gibi HTTP sunucusu üzerinden açın.

## Dosya güvenliği

GitHub'daki `_KESIN` görsel adları ile ChatGPT Kütüphanesi'ndeki `image-gen-...` dosyaları ayrı şeylerdir. Depodaki adlandırma, Kütüphane'deki orijinalleri otomatik olarak yeniden adlandırmaz.
