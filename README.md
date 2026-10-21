# SKOPSE — Dünya Atlası

## Güncel sürüm ve çalışma kaynağı

**Atlas 4.7 · 21 Ekim 2026**. Güncel atlasın ana verisi `world.json`, görünümü `styles.css`, uygulama mantığı `app.js`, giriş sayfası `index.html` dosyalarındadır. Hepsi depo **kökünde** bulunur. `index.html` bunları dış dosyalar olarak yükler; eski tek dosyalı sürümün README'sindeki yönergeler bu sürüm için geçerli değildir.

34 seçilmiş portre/mekân illüstrasyonu `_KESIN.webp` ekiyle işaretlenmiştir. Silme/karıştırma riski açısından `SECILI_GORSELLER.md` dosyasını kullanın. **`NEXARIEL_KESIN.webp` kesin seçilmiş görseldir**.

## Hikâye kanonu

- `world.json` — tüm karakterler, mekânlar, zaman çizelgesi, kavramlar ve **12 bölümün 66 ayrı sahnesi** (`chapters[].scenes`). Sahne alanları: `characters`, `location`, `atmosphere`, `events`; gerektiğinde `dialogue`, `notes`, `open`, `authorSecret`.
- `KITAP_I_SAHNE_ATLASI.md` — 12 bölümün her sahnesinin **karakterler / mekân / atmosfer / olaylar** başlıklarıyla tam yazılı arşivi, replik notları, açık sorular, yazar sırları.
- `KARAKTER_MEKAN_ATMOSFER_ATLASI.md` — karakter, yeni ve eski mekân, ilgili atmosfer ve kurgu kararlarının tam metin referansı.
- `KANON_KARARLARI_46_76.md` — ikinci taslak öncesinde verilen 46–76 numaralı kesin kararların ve yazım kurallarının ayrıntılı kaydı.
- `KANON_KARARLARI_2026-10-20.md` — 12 bölümün kesin kararları, Hamlet–Ophelia ve Clark–Bella kanonu, açıklanmaması gereken yazar sırları; `world.json` ile birlikte güncel tutulur.
- `eski-hikaye-haritasi.html` — daha eski taslak ve tarihsel arşiv; güncel kanonun yerine geçmez.
- `image-manifest.json` — görsel kaynak listesi; yollar depo köküne göredir.

## Yayınlama

GitHub Pages'in 21 Ekim 2026 itibarıyla yayımladığı dal **`sürüm2umarm`** (`/(root)`) dalıdır. **`main` dalındaki değişiklikler siteye otomatik yansımaz.** Yeni kanon düzenlemelerini yayına almak için `sürüm2umarm` dalıyla da senkronize edin veya Pages kaynağını değiştirin. Yayın dalını GitHub → Settings → Pages kısmında kontrol edin.

Projenin herkese açık GitHub Pages adresi: https://eceoyun-cyber.github.io/skopse/

**Dikkat:** `index.html`, `world.json`, `app.js`, `styles.css` ve bağlantılı `.webp` görselleri aynı dal/kök konumunda birlikte bulunmalıdır. Sayfa `world.json` dosyasını tarayıcıda `fetch` ile aldığı için yerel `file://` açılışında çalışmayabilir; GitHub Pages gibi HTTP sunucusu üzerinden açın.

## Dosya güvenliği

GitHub'daki `_KESIN` görsel adları ile ChatGPT Kütüphanesi'ndeki `image-gen-...` dosyaları ayrı şeylerdir. Depodaki adlandırma, Kütüphane'deki orijinalleri otomatik olarak yeniden adlandırmaz.

## Sahne sahne kullanım

Sitede **Bölümler & Sahneler** sayfasını açın. Bölüm özetinin altındaki her sahne kartı tıklanarak **Karakterler / Mekân / Atmosfer / Olaylar** alanlarına açılır. Açık kalan kararlar ve yazar sırları ayrı işaretlidir; arama sahnelerin adlarını ve içeriklerini de tarar.

**Görseller korunmuştur.** Önceden seçilmiş 16 `_KESIN.webp` görseli değiştirilmedi. 12 yeni mekân görseli `_KESIN.webp` adıyla eklendi; 100. kat ofisi ve Daniil'in eski yeraltı kliniği 1200 × 900 yüksek kaliteli WebP görselleriyle tamamlandı. İkisi de Yeni Şehir / Eski Şehir'in mat illüstratif estetiğini temel alır; mekân kartlarına ve `image-manifest.json` içine bağlandı. Yeni karakterlerin bazıları hâlâ görselsizdir. Birinci kitap sonu: çip çıkarılmaz, Clark bulunmaz, üçlü ittifaka devam eder.

**Uyarı:** Atlas yaratıcı çalışma ve yazar sırları içerir; GitHub'daki açık dosyalar ve GitHub Pages metinleri okura spoiler verebilir.

**Karakter portreleri (Atlas 4.3):** Kemal, Cen.net özel güvenlik şefi, sanat hamisi, hizmetçisi ve üniversite hocası için ayrı, yazısız, 1024 × 1536 çözünürlüklü beş yeni `_KESIN.webp` dosyası eklendi. Önceden seçilmiş karakter ve mekân görselleri değiştirilmedi. Hamlet, Ophelia, Daniil ve Aurelian henüz portresiz bırakıldı.

## Atlas 4.4 — kullanım ve bakım iyileştirmeleri

- Karakter/mekân kartlarında teknik resim dosyası adları ve boş görsel alanları meta bilgi olarak gösterilmez. Dosya eşleştirmeleri `entity.image`, `world.images` ve `image-manifest.json` içinde tutulur; karakterlerin gerçek fiziksel tarifleri korunur.
- Bölümler & Sahneler sayfasında 12 bölümlük yatay hızlı gezinme, bölüm başına **Tüm sahneleri aç/kapat** ve **Bölüm seçimi** dönüşü vardır.
- Karakter ve mekânın bilgi sekmeleri, bütün sayfa yeniden oluşturulmadan değiştirilir. Sol/sağ ok ile sekmeler arasında geçilebilir.
- Arama 12 sonuç sınırına ulaştığında toplam eşleşme sayısını açıkça belirtir. Mobilde yatay karakter/mekân listesini kaydırma işareti bulunur.
- İçeriğe geç bağlantısı mevcut sayfayı değiştirmez; menü ve arama odağı/klavye etkileşimleri iyileştirildi. Eski, artık kullanılmayan arama penceresi CSS'i kaldırıldı.
- **Değişmeyenler:** Kanon, 12 bölümün 59 sahnesi, 34 seçilmiş karakter/mekân görseli ve ilgili `_KESIN.webp` dosyaları.

## Atlas 4.5 — yayımlama ve kanon eşitliği

- Karar 01–36 ve 38–45 kesinleşmiş sahne, karakter, mekân, zaman çizelgesi ve kanon kayıtlarına işlendi. Karar 37 (sanat hamisi/hizmetçi isimleri) açık kaldı.
- Bölüm 03 sahne 03.01'de Prof. Dr. Lejla Hadžić, üniversitenin tarihî okuma salonu ve alt kattaki iklim kontrollü arşiv açıkça yer alır. Daniil'in 12.04 sahnesinde ekran görüşmesine katıldığı kesinleşmiştir.
- Yayınlanan `world.json` için önbellek yenileme sürümü kullanılır. Yeni sürümü görmek için sayfayı yeniden açın veya Ctrl+Shift+R ile zorunlu yenileyin.
- Seçilmiş tüm `_KESIN.webp` görselleri değiştirilmeden korunmuştur.


## Atlas 4.6 — ikinci taslak öncesi kesin kararlar

- Karar 46–76; karakterler, mekanlar, 12 bölümün özet ve 59 mevcut sahnesi ile 25 maddelik zaman çizelgesine işlendi. **Yeni sahne eklenmedi; bu sonraki ayrı adımdır.**
- Nil–Blake–Julian romantik geçmiş ve ilk öpüşme; Nephilim yasağı ve Julian'ın inancı; Sifon'un haftalara yayılan toparlanması; Kemal ve Daniil'in geçmişi/sorumlulukları dahil.
- Türkçe anlatım ve diyalog üslubu kuralları `world.json → authorNotes` ve [karar kaydı](KANON_KARARLARI_46_76.md) içindedir.
- **Yayın uyarısı:** `main` ile Pages'in `sürüm2umarm` dalı farklı tarihsel içeriklere sahip ve ayrışmış durumdadır. Bu adım yalnız `main` üzerinde yapıldı; yayın dalı üstüne yazılmadı.


## Atlas 4.7 — ikinci taslak yeni sahne planı

- Karar 46–76 korunarak **7 yeni ara sahne** eklendi. Güncel: 12 bölüm / **66 sahne**. Kimlikler: `06.03a`, `07.01a`, `07.04a`, `07.07a`, `08.02a`, `08.03a`, `09.02a`.
- Eklenenler Sifon gece yaşamı, Kemal'in tehlikeli takibi, Yeni Şehir sosyal/sanat hayatı, villadaki operasyon ve yaşam dengesi, balodaki ilk öpüşmedir. Var olan 59 sahne numarası değiştirilmedi.
- Ana plan: `world.json`. Ayrıntılar: `KITAP_I_SAHNE_ATLASI.md`; önceki kararların bağımsız kaydı: `KANON_KARARLARI_46_76.md`.
- Siteyi yayınlayan `sürüm2umarm` dalıyla `main` geçmişi ayrışmıştır; bu işlem yalnız `main` dalındadır. Görsellere ve kod dosyalarına dokunulmadı.
