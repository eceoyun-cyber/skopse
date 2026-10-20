# SKOPSE — Dünya Atlası

## Güncel sürüm ve çalışma kaynağı

**Atlas 4.1 · 21 Ekim 2026**. Güncel atlasın ana verisi `world.json`, görünümü `styles.css`, uygulama mantığı `app.js`, giriş sayfası `index.html` dosyalarındadır. Hepsi depo **kökünde** bulunur. `index.html` bunları dış dosyalar olarak yükler; eski tek dosyalı sürümün README'sindeki yönergeler bu sürüm için geçerli değildir.

26 seçilmiş portre/mekân illüstrasyonu `_KESIN.webp` ekiyle işaretlenmiştir. Silme/karıştırma riski açısından `SECILI_GORSELLER.md` dosyasını kullanın. **`NEXARIEL_KESIN.webp` kesin seçilmiş görseldir**.

## Hikâye kanonu

- `world.json` — tüm karakterler, mekânlar, zaman çizelgesi, kavramlar ve **12 bölümün 59 ayrı sahnesi** (`chapters[].scenes`). Sahne alanları: `characters`, `location`, `atmosphere`, `events`; gerektiğinde `dialogue`, `notes`, `open`, `authorSecret`.
- `KITAP_I_SAHNE_ATLASI.md` — 12 bölümün her sahnesinin **karakterler / mekân / atmosfer / olaylar** başlıklarıyla tam yazılı arşivi, replik notları, açık sorular, yazar sırları.
- `KARAKTER_MEKAN_ATMOSFER_ATLASI.md` — karakter, yeni ve eski mekân, ilgili atmosfer ve kurgu kararlarının tam metin referansı.
- `KANON_KARARLARI_2026-10-20.md` — 12 bölümün kesin kararları, Hamlet–Ophelia ve Clark–Bella kanonu, açıklanmaması gereken yazar sırları; `world.json` ile birlikte güncel tutulur.
- `eski-hikaye-haritasi.html` — daha eski taslak ve tarihsel arşiv; güncel kanonun yerine geçmez.
- `image-manifest.json` — görsel kaynak listesi; yollar depo köküne göredir.

## Yayınlama

GitHub Pages için yayımlama kaynağı olarak **en güncel değişiklikleri içeren dal** ve **`/(root)`** seçilmeli. GitHub Pages yapılandırmasının hangi dalı kullandığını GitHub → Settings → Pages kısmında kontrol edin.

Projenin herkese açık GitHub Pages adresi: https://eceoyun-cyber.github.io/skopse/

**Dikkat:** `index.html`, `world.json`, `app.js`, `styles.css` ve bağlantılı `.webp` görselleri aynı dal/kök konumunda birlikte bulunmalıdır. Sayfa `world.json` dosyasını tarayıcıda `fetch` ile aldığı için yerel `file://` açılışında çalışmayabilir; GitHub Pages gibi HTTP sunucusu üzerinden açın.

## Dosya güvenliği

GitHub'daki `_KESIN` görsel adları ile ChatGPT Kütüphanesi'ndeki `image-gen-...` dosyaları ayrı şeylerdir. Depodaki adlandırma, Kütüphane'deki orijinalleri otomatik olarak yeniden adlandırmaz.

## Sahne sahne kullanım

Sitede **Bölümler & Sahneler** sayfasını açın. Bölüm özetinin altındaki her sahne kartı tıklanarak **Karakterler / Mekân / Atmosfer / Olaylar** alanlarına açılır. Açık kalan kararlar ve yazar sırları ayrı işaretlidir; arama sahnelerin adlarını ve içeriklerini de tarar.

**Görseller korunmuştur.** Önceden seçilmiş 16 `_KESIN.webp` görseli değiştirilmedi. 10 yeni mekân görseli `_KESIN.webp` adıyla eklendi, mekân kartlarına ve `image-manifest.json` içine bağlandı. Görselsiz kalan mekânlardan biri 100. kat ofisi, diğeri Daniil'in muayenehanesidir. Yeni karakterlerin bazıları hâlâ görselsizdir. Birinci kitap sonu: çip çıkarılmaz, Clark bulunmaz, üçlü ittifaka devam eder.

**Uyarı:** Atlas yaratıcı çalışma ve yazar sırları içerir; GitHub'daki açık dosyalar ve GitHub Pages metinleri okura spoiler verebilir.
