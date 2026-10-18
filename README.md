# SKOPSE — Dünya Atlası

SKOPSE roman evreni için statik bir dünya atlası. Tamamı **HTML, CSS, JavaScript ve JSON** ile hazırlandı. Derleme, sunucu tarafı program veya ücretli barındırma gerektirmez. GitHub Pages'te çalışır.

## Hemen yayınla

1. GitHub'da `skopse-atlas` adında yeni bir **repository** aç.
2. Bu klasörün **içindeki** `index.html`, `app.js`, `styles.css`, `data/`, `assets/` ve `eski-hikaye-haritasi.html` dosyalarını repoya yükle. (Klasörü tek üst klasör olarak yükleme, `index.html` kökte kalsın.)
3. Repository içinde **Settings → Pages → Build and deployment → Deploy from a branch** seç.
4. **Branch: `main`**, klasör: **`/(root)`** ve **Save** seç.
5. Site genellikle `https://KULLANICI-ADIN.github.io/skopse-atlas/` üzerinden açılır.

`README.md` ve kaynak dosyalar GitHub'da da düzenlenebilir.

## İçerik nasıl değiştirilir?

Bütün güncel bilgiler **`data/world.json`** içindedir. Bunun için kod yazman gerekmiyor: dosyayı metin editöründe veya GitHub'da açıp değiştirebilirsin.

- `entities`: karakterler, yerler, şirketler, topluluklar ve dünya dosyaları.
- `timeline`: zaman çizelgesindeki olaylar.
- `glossary`: sokak sözlüğü.
- `authorNotes`: yazım notları.
- `featureGallery`: vitrinde gösterilmesi planlanan görseller. (Şimdiki sürümde galeriler içerik türüne göre düzenlenmiştir.)
- Yeni bir görsel için resmi `assets/` klasörüne koy ve ilgili kaydın `image` alanına `assets/resim.webp` yaz.

JSON formatında tüm değerler çift tırnak içinde olmalı, son öğeden sonra virgül bırakılmamalıdır.

## Kullanım

- Üst menüden şehir, karakterler, bölgeler, topluluklar, şirketler, zaman çizelgesi ve notlara geç.
- Sol taraftan kişi veya mekan seç.
- Sağdaki **Genel Bilgi / Geçmiş / İlişkiler / Yetenekler / Ek Notlar** sekmelerini kullan.
- İlgili dosya etiketlerine tıkla; doğrudan bağlantı açılır.
- Arama alanında isim veya anahtar kelime ara, kısayol olarak `/` tuşunu kullan.
- `eski-hikaye-haritasi.html` bağlantısıyla önceki interaktif haritayı aç.

## Yerelde önizleme

GitHub'a yüklemeden önce terminalde bu klasörde:

```bash
python -m http.server 8000
```

Sonra tarayıcıda `http://localhost:8000` aç. `index.html` dosyasını doğrudan çift tıklamak bazı tarayıcılarda JSON erişimini engeller.

## Görseller hakkında

- Önceki HTML'de dosyanın içinde gömülü olan görüntüler yerel `assets/` klasörüne çıkarıldı. Aras'ın özgün portresi, Nadejda ve bazı mekan resimleri bunlar arasında.
- Nil'in bu sürümdeki görseli, sevilen ilk tasarım konseptinden alınan bir taslak portredir. Nihai karakter görünümü yerine geçmek zorunda değil.
- Eski haritada uzaktaki görsel sitelerine bağlı fotoğraflar vardı. Bunların bazıları geçici/korumalı URL olduğundan yeni atlasın *ana sayfasına zorunlu uzaktan görsel bağımlılığı eklenmedi*. Portresi eksik karakterler stilize monogramla gösterilir. Kendi seçtiğin görseli `assets/` içine eklemek en kalıcı yöntemdir.
- Eski harita bir **taslak arşivi** olarak korunur; arşivdeki eski karakter yaşları ve meslekleri güncel kanon olarak okunmamalıdır.

## Önemli not

Kaynak görsellerin bir kısmı üçüncü taraf görüntülerinden veya önceki tasarım çalışmalarından geliyor. Sitenin **herkese açık** yayınlanması düşünülüyorsa görsel hakları kontrol edilmeli veya kullanım izni bulunan kendi görsellerin kullanılmalıdır.

Üretilen site, görsel ve metin içerikleri `data/world.json` ve `assets/` üzerinde değiştirilerek genişletilebilir.
