;;;========================================================================
;;; KaynakSembol.lsp - Profesyonel Kaynak Sembolu Yerlestirme Sistemi
;;; AutoCAD 2025 icin - AWS A2.4 Standardi
;;; 
;;; Komut: KS
;;; Ozellikler: LEADER tabanli, Kontur secenekleri, Cift tiklama duzenleme
;;;========================================================================

(vl-load-com)

;;;========================================================================
;;; GLOBAL DEGISKENLER VE BASLATMA
;;;========================================================================

(setq *KAYNAK-APP-ID* "KAYNAK

SYM")
(setq *KAYNAK-REACTOR* nil)
(setq *KAYNAK-SAYAC* 0)

;; Uygulamayi baslatma
(defun kaynak-basla ()
  ;; XDATA uygulama kaydini yap
  (if (not (tblsearch "APPID" *KAYNAK-APP-ID*))
    (regapp *KAYNAK-APP-ID*)
  )
  
  ;; Katman yoksa olustur
  (if (not (tblsearch "LAYER" "KAYNAK_SYM"))
    (command "._LAYER" "_N" "KAYNAK_SYM" "_C" "5" "KAYNAK_SYM" "")
  )
  
  ;; Reactor kur
  (kaynak-reactor-kur)
  
  (princ)
)

;;;========================================================================
;;; ANA KOMUT: KS
;;;========================================================================

(defun C:KS (/ oldecho olderror oldlayer oldosmode scl pt1 pt2)
  
  ;; Ortami kaydet
  (setq oldecho (getvar "CMDECHO"))
  (setq olderror *error*)
  (setq oldlayer (getvar "CLAYER"))
  (setq oldosmode (getvar "OSMODE"))
  (setvar "CMDECHO" 0)
  
  ;; Hata yakalayici
  (setq *error* kaynak-hata)
  
  ;; Sistemi baslat
  (kaynak-basla)
  
  ;; Olcek faktoru al
  (setq scl (getvar "DIMSCALE"))
  (if (or (null scl) (<= scl 0))
    (setq scl 1.0)
  )
  
  ;; Katmani sec
  (command "._LAYER" "_S" "KAYNAK_SYM" "")
  
  ;; Ana dongu
  (princ "\n========================================")
  (princ "\nKAYNAK SEMBOLU YERLESTIRME SISTEMI")
  (princ "\nAWS A2.4 Standardi")
  (princ "\n========================================")
  (princ "\nKaynak konumu sec <Cikmak icin ENTER>: ")
  
  (while (setq pt1 (getpoint))
    
    (setq pt2 (getpoint pt1 "\nLeader bitis noktasi: "))
    
    (if pt2
      (progn
        ;; Dialog goster ve parametreleri al
        (if (kaynak-dialog nil)
          (progn
            ;; Benzersiz ID olustur
            (setq *KAYNAK-SAYAC* (1+ *KAYNAK-SAYAC*))
            (setq kaynak-id (itoa *KAYNAK-SAYAC*))
            
            ;; Kaynak sembolunu olustur
            (kaynak-sembolu-olustur pt1 pt2 scl kaynak-id)
            
            (princ "\nKaynak sembolu basariyla yerlestirildi.")
          )
        )
      )
    )
    
    (princ "\nKaynak konumu sec <Cikmak icin ENTER>: ")
  )
  
  ;; Ortami eski haline getir
  (setvar "OSMODE" oldosmode)
  (setvar "CMDECHO" oldecho)
  (command "._LAYER" "_S" oldlayer "")
  (setq *error* olderror)
  (princ "\nKaynak sembolu komutu tamamlandi.")
  (princ)
)

;;;========================================================================
;;; HATA YAKALAYICI
;;;========================================================================

(defun kaynak-hata (msg)
  (if (and msg 
           (not (member msg '("console break" 
                              "Function cancelled" 
                              "quit / exit abort"))))
    (princ (strcat "\nHata: " msg))
  )
  (princ)
)

;;;========================================================================
;;; DIALOG FONKSIYONLARI
;;;========================================================================

(defun kaynak-dialog (duzen-modu / dcl-id durum)
  
  ;; Global degiskenleri varsayilanlarla baslat
  (if (not *UST-YONTEM*) (setq *UST-YONTEM* "0"))
  (if (not *ALT-YONTEM*) (setq *ALT-YONTEM* "0"))
  (if (not *UST-OLCU*) (setq *UST-OLCU* ""))
  (if (not *ALT-OLCU*) (setq *ALT-OLCU* ""))
  (if (not *UST-KONTUR*) (setq *UST-KONTUR* "0"))
  (if (not *ALT-KONTUR*) (setq *ALT-KONTUR* "0"))
  (if (not *UST-YUZEY*) (setq *UST-YUZEY* "0"))
  (if (not *ALT-YUZEY*) (setq *ALT-YUZEY* "0"))
  (if (not *WPS-NO*) (setq *WPS-NO* ""))
  (if (not *SANTIYE-FLAG*) (setq *SANTIYE-FLAG* "0"))
  (if (not *CEVRE-FLAG*) (setq *CEVRE-FLAG* "0"))
  (if (not *TAM-NUF-FLAG*) (setq *TAM-NUF-FLAG* "0"))
  (if (not *NDT-FLAG*) (setq *NDT-FLAG* "0"))
  (if (not *NOT1*) (setq *NOT1* ""))
  (if (not *NOT2*) (setq *NOT2* ""))
  (if (not *NOT3*) (setq *NOT3* ""))
  
  ;; DCL yukle
  (setq dcl-id (load_dialog "KaynakSembol.dcl"))
  
  (if (not (new_dialog "KaynakSembol" dcl-id))
    (progn
      (alert "HATA: KaynakSembol.dcl dosyasi bulunamadi!\nDCL dosyasinin AutoCAD support dizininde oldugunu kontrol edin.")
      (exit)
    )
  )
  
  ;; Listeleri doldur
  (start_list "ust_yontem")
  (mapcar 'add_list '("YOK" "FILLET" "V-GROOVE" "BEVEL" "U-GROOVE" "J-GROOVE" "SQUARE" "PLUG"))
  (end_list)
  
  (start_list "alt_yontem")
  (mapcar 'add_list '("YOK" "FILLET" "V-GROOVE" "BEVEL" "U-GROOVE" "J-GROOVE" "SQUARE" "PLUG"))
  (end_list)
  
  (start_list "ust_kontur")
  (mapcar 'add_list '("YOK" "DUZ" "DIS BOMBE" "IC BOMBE"))
  (end_list)
  
  (start_list "alt_kontur")
  (mapcar 'add_list '("YOK" "DUZ" "DIS BOMBE" "IC BOMBE"))
  (end_list)
  
  (start_list "ust_yuzey")
  (mapcar 'add_list '("YOK" "G" "M" "C" "R" "H" "P"))
  (end_list)
  
  (start_list "alt_yuzey")
  (mapcar 'add_list '("YOK" "G" "M" "C" "R" "H" "P"))
  (end_list)
  
  ;; Varsayilan degerleri ayarla
  (set_tile "ust_yontem" *UST-YONTEM*)
  (set_tile "alt_yontem" *ALT-YONTEM*)
  (set_tile "ust_olcu" *UST-OLCU*)
  (set_tile "alt_olcu" *ALT-OLCU*)
  (set_tile "ust_kontur" *UST-KONTUR*)
  (set_tile "alt_kontur" *ALT-KONTUR*)
  (set_tile "ust_yuzey" *UST-YUZEY*)
  (set_tile "alt_yuzey" *ALT-YUZEY*)
  (set_tile "wps_no" *WPS-NO*)
  (set_tile "santiye_kaynak" *SANTIYE-FLAG*)
  (set_tile "cevre_kaynak" *CEVRE-FLAG*)
  (set_tile "tam_nufuziyet" *TAM-NUF-FLAG*)
  (set_tile "ndt_gerekli" *NDT-FLAG*)
  (set_tile "not1" *NOT1*)
  (set_tile "not2" *NOT2*)
  (set_tile "not3" *NOT3*)
  
  ;; Action tiles
  (action_tile "ust_yontem" "(setq *UST-YONTEM* $value)")
  (action_tile "alt_yontem" "(setq *ALT-YONTEM* $value)")
  (action_tile "ust_olcu" "(setq *UST-OLCU* $value)")
  (action_tile "alt_olcu" "(setq *ALT-OLCU* $value)")
  (action_tile "ust_kontur" "(setq *UST-KONTUR* $value)")
  (action_tile "alt_kontur" "(setq *ALT-KONTUR* $value)")
  (action_tile "ust_yuzey" "(setq *UST-YUZEY* $value)")
  (action_tile "alt_yuzey" "(setq *ALT-YUZEY* $value)")
  (action_tile "wps_no" "(setq *WPS-NO* $value)")
  (action_tile "santiye_kaynak" "(setq *SANTIYE-FLAG* $value)")
  (action_tile "cevre_kaynak" "(setq *CEVRE-FLAG* $value)")
  (action_tile "tam_nufuziyet" "(setq *TAM-NUF-FLAG* $value)")
  (action_tile "ndt_gerekli" "(setq *NDT-FLAG* $value)")
  (action_tile "not1" "(setq *NOT1* $value)")
  (action_tile "not2" "(setq *NOT2* $value)")
  (action_tile "not3" "(setq *NOT3* $value)")
  
  (action_tile "accept" "(done_dialog 1)")
  (action_tile "cancel" "(done_dialog 0)")
  (action_tile "help" "(kaynak-yardim-goster)")
  
  ;; Dialog goster
  (setq durum (start_dialog))
  (unload_dialog dcl-id)
  
  (= durum 1)
)

;; Yardim dialog goster
(defun kaynak-yardim-goster (/ dcl-id)
  (setq dcl-id (load_dialog "KaynakSembol.dcl"))
  (if (new_dialog "KaynakYardim" dcl-id)
    (start_dialog)
  )
  (unload_dialog dcl-id)
)

;;;========================================================================
;;; SEMBOL OLUSTURMA FONKSIYONLARI
;;;========================================================================

(defun kaynak-sembolu-olustur (pt1 pt2 scl kaynak-id / aci ref-yon ref-baslangic ref-bitis obje-listesi)
  
  (setq obje-listesi '())
  
  ;; Aci ve yon hesapla
  (setq aci (angle pt1 pt2))
  
  ;; Referans cizgisi yonunu belirle (yatay sag veya sol)
  (if (or (<= aci (/ pi 2)) (>= aci (* 1.5 pi)))
    (setq ref-yon 0)
    (setq ref-yon pi)
  )
  
  (setq ref-baslangic pt2)
  (setq ref-bitis (polar ref-baslangic ref-yon (* scl 3.0)))
  
  ;; Mevcut katmani ayarla
  (command "._LAYER" "_S" "KAYNAK_SYM" "")
  
  ;; LEADER olustur
  (command "._LEADER" pt1 pt2 "" "")
  (if (setq ent (entlast))
    (setq obje-listesi (append obje-listesi (list ent)))
  )
  
  ;; Referans cizgisini ciz
  (command "._LINE" ref-baslangic ref-bitis "")
  (if (setq ent (entlast))
    (setq obje-listesi (append obje-listesi (list ent)))
  )
  
  ;; Ust taraf sembolunu ciz (referans cizgisinin ustunde)
  (if (/= *UST-YONTEM* "0")
    (progn
      (setq ust-pt (polar ref-baslangic (+ ref-yon (/ pi 2)) (* scl 0.0)))
      (setq obje-listesi (append obje-listesi 
        (kaynak-sembol-ciz ust-pt ref-yon scl *UST-YONTEM* T)))
      
      ;; Olcu metni ekle
      (if (/= *UST-OLCU* "")
        (setq obje-listesi (append obje-listesi 
          (kaynak-olcu-metni-ekle ust-pt ref-yon scl *UST-OLCU* T)))
      )
      
      ;; Kontur ekle
      (if (/= *UST-KONTUR* "0")
        (setq obje-listesi (append obje-listesi 
          (kaynak-kontur-ekle ust-pt ref-yon scl *UST-KONTUR* *UST-YUZEY* T)))
      )
    )
  )
  
  ;; Alt taraf sembolunu ciz (referans cizgisinin altinda)
  (if (/= *ALT-YONTEM* "0")
    (progn
      (setq alt-pt (polar ref-baslangic (- ref-yon (/ pi 2)) (* scl 0.0)))
      (setq obje-listesi (append obje-listesi 
        (kaynak-sembol-ciz alt-pt ref-yon scl *ALT-YONTEM* nil)))
      
      ;; Olcu metni ekle
      (if (/= *ALT-OLCU* "")
        (setq obje-listesi (append obje-listesi 
          (kaynak-olcu-metni-ekle alt-pt ref-yon scl *ALT-OLCU* nil)))
      )
      
      ;; Kontur ekle
      (if (/= *ALT-KONTUR* "0")
        (setq obje-listesi (append obje-listesi 
          (kaynak-kontur-ekle alt-pt ref-yon scl *ALT-KONTUR* *ALT-YUZEY* nil)))
      )
    )
  )
  
  ;; Ozel sembolleri ekle
  (if (= *CEVRE-FLAG* "1")
    (setq obje-listesi (append obje-listesi (kaynak-cevre-ekle ref-baslangic scl)))
  )
  
  (if (= *SANTIYE-FLAG* "1")
    (setq obje-listesi (append obje-listesi (kaynak-bayrak-ekle ref-bitis ref-yon scl)))
  )
  
  (if (= *TAM-NUF-FLAG* "1")
    (setq obje-listesi (append obje-listesi (kaynak-tam-nufuz-ekle ref-bitis ref-yon scl)))
  )
  
  (if (= *NDT-FLAG* "1")
    (setq obje-listesi (append obje-listesi (kaynak-ndt-ekle ref-bitis ref-yon scl)))
  )
  
  ;; WPS ve notlari ekle
  (setq obje-listesi (append obje-listesi (kaynak-metinler-ekle ref-baslangic ref-bitis ref-yon scl)))
  
  ;; Tum objelere XDATA ekle
  (kaynak-xdata-ekle obje-listesi kaynak-id ref-baslangic ref-bitis)
  
  (princ)
)

;;;========================================================================
;;; KAYNAK SEMBOLU CIZIM FONKSIYONLARI (AWS A2.4 STANDARDI)
;;;========================================================================

;; Kaynak sembolunu tipe gore ciz
(defun kaynak-sembol-ciz (pt yon scl tip ust-taraf / ent-listesi)
  (setq ent-listesi '())
  (cond
    ((= tip "1") (setq ent-listesi (kaynak-fillet pt yon scl ust-taraf)))
    ((= tip "2") (setq ent-listesi (kaynak-vgroove pt yon scl ust-taraf)))
    ((= tip "3") (setq ent-listesi (kaynak-bevel pt yon scl ust-taraf)))
    ((= tip "4") (setq ent-listesi (kaynak-ugroove pt yon scl ust-taraf)))
    ((= tip "5") (setq ent-listesi (kaynak-jgroove pt yon scl ust-taraf)))
    ((= tip "6") (setq ent-listesi (kaynak-square pt yon scl ust-taraf)))
    ((= tip "7") (setq ent-listesi (kaynak-plug pt yon scl ust-taraf)))
  )
  ent-listesi
)

;; FILLET kaynak sembolu (ucgen)
(defun kaynak-fillet (pt yon scl ust-taraf / p1 p2 p3)
  (setq p1 (polar pt yon (* scl -0.125)))
  (setq p2 (polar p1 yon (* scl 0.25)))
  (if ust-taraf
    (setq p3 (polar p1 (+ yon (/ pi 2)) (* scl 0.25)))
    (setq p3 (polar p1 (- yon (/ pi 2)) (* scl 0.25)))
  )
  (command "._PLINE" p1 p2 p3 "_C")
  (command "")
  (list (entlast))
)

;; V-GROOVE kaynak sembolu
(defun kaynak-vgroove (pt yon scl ust-taraf / p1 p2 p3 aci ent-listesi)
  (setq p1 pt)
  (setq aci (/ pi 6))  ; 30 derece
  (if ust-taraf
    (progn
      (setq p2 (polar p1 (+ yon aci) (* scl 0.18)))
      (setq p3 (polar p1 (- yon aci) (* scl 0.18)))
    )
    (progn
      (setq p2 (polar p1 (+ yon (- pi aci)) (* scl 0.18)))
      (setq p3 (polar p1 (- yon (- pi aci)) (* scl 0.18)))
    )
  )
  (command "._LINE" p2 p1 "")
  (setq ent-listesi (list (entlast)))
  (command "._LINE" p1 p3 "")
  (setq ent-listesi (append ent-listesi (list (entlast))))
  ent-listesi
)

;; BEVEL kaynak sembolu
(defun kaynak-bevel (pt yon scl ust-taraf / p1 p2 p3 ent-listesi)
  (setq p1 pt)
  (if ust-taraf
    (progn
      (setq p2 (polar p1 (+ yon (/ pi 4)) (* scl 0.18)))
      (setq p3 (polar p1 (+ yon (/ pi 2)) (* scl 0.18)))
    )
    (progn
      (setq p2 (polar p1 (+ yon (* 3 (/ pi 4))) (* scl 0.18)))
      (setq p3 (polar p1 (- yon (/ pi 2)) (* scl 0.18)))
    )
  )
  (command "._LINE" p2 p1 "")
  (setq ent-listesi (list (entlast)))
  (command "._LINE" p1 p3 "")
  (setq ent-listesi (append ent-listesi (list (entlast))))
  ent-listesi
)

;; U-GROOVE kaynak sembolu
(defun kaynak-ugroove (pt yon scl ust-taraf / p1 p2 merkez ent-listesi)
  (setq p1 (polar pt yon (* scl -0.09)))
  (setq p2 (polar pt yon (* scl 0.09)))
  (if ust-taraf
    (setq merkez (polar pt (+ yon (/ pi 2)) (* scl 0.09)))
    (setq merkez (polar pt (- yon (/ pi 2)) (* scl 0.09)))
  )
  
  (if ust-taraf
    (progn
      (command "._LINE" p1 (polar p1 (+ yon (/ pi 2)) (* scl 0.05)) "")
      (setq ent-listesi (list (entlast)))
      (command "._ARC" "_C" merkez (polar p1 (+ yon (/ pi 2)) (* scl 0.05)) 
               (polar p2 (+ yon (/ pi 2)) (* scl 0.05)))
      (setq ent-listesi (append ent-listesi (list (entlast))))
      (command "._LINE" (polar p2 (+ yon (/ pi 2)) (* scl 0.05)) p2 "")
      (setq ent-listesi (append ent-listesi (list (entlast))))
    )
    (progn
      (command "._LINE" p1 (polar p1 (- yon (/ pi 2)) (* scl 0.05)) "")
      (setq ent-listesi (list (entlast)))
      (command "._ARC" "_C" merkez (polar p1 (- yon (/ pi 2)) (* scl 0.05)) 
               (polar p2 (- yon (/ pi 2)) (* scl 0.05)))
      (setq ent-listesi (append ent-listesi (list (entlast))))
      (command "._LINE" (polar p2 (- yon (/ pi 2)) (* scl 0.05)) p2 "")
      (setq ent-listesi (append ent-listesi (list (entlast))))
    )
  )
  ent-listesi
)

;; J-GROOVE kaynak sembolu
(defun kaynak-jgroove (pt yon scl ust-taraf / p1 p2 merkez ent-listesi)
  (setq p1 (polar pt yon (* scl -0.09)))
  (setq p2 (polar pt yon (* scl 0.09)))
  
  (if ust-taraf
    (progn
      (command "._LINE" p1 (polar p1 (+ yon (/ pi 2)) (* scl 0.18)) "")
      (setq ent-listesi (list (entlast)))
      (setq merkez (polar p2 (+ yon (/ pi 2)) (* scl 0.09)))
      (command "._ARC" "_C" merkez (polar p1 (+ yon (/ pi 2)) (* scl 0.18)) p2)
      (setq ent-listesi (append ent-listesi (list (entlast))))
    )
    (progn
      (command "._LINE" p1 (polar p1 (- yon (/ pi 2)) (* scl 0.18)) "")
      (setq ent-listesi (list (entlast)))
      (setq merkez (polar p2 (- yon (/ pi 2)) (* scl 0.09)))
      (command "._ARC" "_C" merkez (polar p1 (- yon (/ pi 2)) (* scl 0.18)) p2)
      (setq ent-listesi (append ent-listesi (list (entlast))))
    )
  )
  ent-listesi
)

;; SQUARE kaynak sembolu
(defun kaynak-square (pt yon scl ust-taraf / p1 p2 p3 p4)
  (setq p1 (polar pt yon (* scl -0.09)))
  (setq p2 (polar pt yon (* scl 0.09)))
  (if ust-taraf
    (progn
      (setq p3 (polar p1 (+ yon (/ pi 2)) (* scl 0.18)))
      (setq p4 (polar p2 (+ yon (/ pi 2)) (* scl 0.18)))
    )
    (progn
      (setq p3 (polar p1 (- yon (/ pi 2)) (* scl 0.18)))
      (setq p4 (polar p2 (- yon (/ pi 2)) (* scl 0.18)))
    )
  )
  (command "._PLINE" p1 p3 p4 p2 "")
  (command "")
  (list (entlast))
)

;; PLUG kaynak sembolu
(defun kaynak-plug (pt yon scl ust-taraf / p1 p2 p3 p4)
  (setq p1 (polar pt yon (* scl -0.15)))
  (setq p2 (polar pt yon (* scl 0.15)))
  (if ust-taraf
    (progn
      (setq p3 (polar p1 (+ yon (/ pi 2)) (* scl 0.15)))
      (setq p4 (polar p2 (+ yon (/ pi 2)) (* scl 0.15)))
    )
    (progn
      (setq p3 (polar p1 (- yon (/ pi 2)) (* scl 0.15)))
      (setq p4 (polar p2 (- yon (/ pi 2)) (* scl 0.15)))
    )
  )
  (command "._PLINE" p1 p3 p4 p2 "_C")
  (command "")
  (list (entlast))
)

;;;========================================================================
;;; OLCU METNI VE KONTUR FONKSIYONLARI
;;;========================================================================

;; Olcu metni ekle
(defun kaynak-olcu-metni-ekle (pt yon scl olcu-str ust-taraf / txt-pt txt-aci)
  (if ust-taraf
    (setq txt-pt (polar pt (+ yon (/ pi 2)) (* scl 0.3)))
    (setq txt-pt (polar pt (- yon (/ pi 2)) (* scl 0.3)))
  )
  
  (if (or (<= yon (/ pi 2)) (>= yon (* 1.5 pi)))
    (setq txt-aci 0)
    (setq txt-aci pi)
  )
  
  (command "._TEXT" "_J" "_MC" txt-pt (* scl 0.125) 
           (/ (* txt-aci 180.0) pi) olcu-str)
  (list (entlast))
)

;; Kontur sembolu ekle
(defun kaynak-kontur-ekle (pt yon scl kontur yuzey ust-taraf / kont-pt kont-listesi txt-pt)
  (setq kont-listesi '())
  
  (if ust-taraf
    (setq kont-pt (polar pt (+ yon (/ pi 2)) (* scl 0.45)))
    (setq kont-pt (polar pt (- yon (/ pi 2)) (* scl 0.45)))
  )
  
  (cond
    ;; DUZ - duz cizgi
    ((= kontur "1")
     (command "._LINE" 
              (polar kont-pt yon (* scl -0.15))
              (polar kont-pt yon (* scl 0.15)) "")
     (setq kont-listesi (list (entlast)))
    )
    
    ;; DIS BOMBE - disa dogru yay
    ((= kontur "2")
     (if ust-taraf
       (command "._ARC" 
                (polar kont-pt yon (* scl -0.15))
                "_C" (polar kont-pt (- yon (/ pi 2)) (* scl 0.08))
                (polar kont-pt yon (* scl 0.15)))
       (command "._ARC" 
                (polar kont-pt yon (* scl -0.15))
                "_C" (polar kont-pt (+ yon (/ pi 2)) (* scl 0.08))
                (polar kont-pt yon (* scl 0.15)))
     )
     (setq kont-listesi (list (entlast)))
    )
    
    ;; IC BOMBE - ice dogru yay
    ((= kontur "3")
     (if ust-taraf
       (command "._ARC" 
                (polar kont-pt yon (* scl -0.15))
                "_C" (polar kont-pt (+ yon (/ pi 2)) (* scl 0.08))
                (polar kont-pt yon (* scl 0.15)))
       (command "._ARC" 
                (polar kont-pt yon (* scl -0.15))
                "_C" (polar kont-pt (- yon (/ pi 2)) (* scl 0.08))
                (polar kont-pt yon (* scl 0.15)))
     )
     (setq kont-listesi (list (entlast)))
    )
  )
  
  ;; Yuzey bitirme harfi ekle
  (if (/= yuzey "0")
    (progn
      (if ust-taraf
        (setq txt-pt (polar kont-pt (+ yon (/ pi 2)) (* scl 0.15)))
        (setq txt-pt (polar kont-pt (- yon (/ pi 2)) (* scl 0.15)))
      )
      
      (command "._TEXT" "_J" "_MC" txt-pt (* scl 0.1) 0 
               (nth (atoi yuzey) '("" "G" "M" "C" "R" "H" "P")))
      (setq kont-listesi (append kont-listesi (list (entlast))))
    )
  )
  
  kont-listesi
)

;;;========================================================================
;;; OZEL SEMBOLLER
;;;========================================================================

;; Cevre kaynak dairesi
(defun kaynak-cevre-ekle (pt scl)
  (command "._CIRCLE" pt (* scl 0.15))
  (list (entlast))
)

;; Santiye kaynagi bayragi
(defun kaynak-bayrak-ekle (pt yon scl / bayrak-pt1 bayrak-pt2 bayrak-pt3 ent-listesi)
  (setq bayrak-pt1 (polar pt (+ yon (/ pi 2)) (* scl 0.5)))
  (setq bayrak-pt2 (polar bayrak-pt1 yon (* scl 0.25)))
  (setq bayrak-pt3 (polar bayrak-pt1 (+ yon (/ pi 2)) (* scl 0.15)))
  
  (command "._LINE" pt bayrak-pt1 "")
  (setq ent-listesi (list (entlast)))
  
  (command "._SOLID" bayrak-pt1 bayrak-pt2 bayrak-pt3 "")
  (command "")
  (setq ent-listesi (append ent-listesi (list (entlast))))
  
  ent-listesi
)

;; Tam nufuziyet sembolu
(defun kaynak-tam-nufuz-ekle (pt yon scl / fp-pt daire-pt txt-aci ent-listesi)
  (setq fp-pt (polar pt yon (* scl 0.4)))
  (setq daire-pt (polar fp-pt (+ yon (/ pi 2)) (* scl 0.3)))
  
  (command "._CIRCLE" daire-pt (* scl 0.15))
  (setq ent-listesi (list (entlast)))
  
  (if (or (<= yon (/ pi 2)) (>= yon (* 1.5 pi)))
    (setq txt-aci 0)
    (setq txt-aci 180)
  )
  
  (command "._TEXT" "_J" "_MC" daire-pt (* scl 0.1) txt-aci "F.P.")
  (setq ent-listesi (append ent-listesi (list (entlast))))
  
  ent-listesi
)

;; NDT gerekli sembolu
(defun kaynak-ndt-ekle (pt yon scl / ndt-pt daire-pt txt-aci ent-listesi)
  (setq ndt-pt (polar pt yon (* scl 0.8)))
  (setq daire-pt (polar ndt-pt (+ yon (/ pi 2)) (* scl 0.3)))
  
  (command "._CIRCLE" daire-pt (* scl 0.15))
  (setq ent-listesi (list (entlast)))
  
  (if (or (<= yon (/ pi 2)) (>= yon (* 1.5 pi)))
    (setq txt-aci 0)
    (setq txt-aci 180)
  )
  
  (command "._TEXT" "_J" "_MC" daire-pt (* scl 0.08) txt-aci "NDT")
  (setq ent-listesi (append ent-listesi (list (entlast))))
  
  ent-listesi
)

;;;========================================================================
;;; METIN VE NOTLAR
;;;========================================================================

(defun kaynak-metinler-ekle (ref-baslangic ref-bitis yon scl / txt-pt txt-aci kuyruk-pt ent-listesi 
                              kutu-p1 kutu-p2 kutu-p3 kutu-p4)
  (setq ent-listesi '())
  
  (if (or (<= yon (/ pi 2)) (>= yon (* 1.5 pi)))
    (setq txt-aci 0)
    (setq txt-aci 180)
  )
  
  ;; WPS numarasi ile KUTU
  (if (/= *WPS-NO* "")
    (progn
      (setq kuyruk-pt (polar ref-bitis yon (* scl 0.2)))
      
      ;; Kuyruk cizgileri
      (if (= txt-aci 0)
        (progn
          (command "._LINE" ref-bitis (polar kuyruk-pt (/ pi 4) (* scl 0.15)) "")
          (setq ent-listesi (append ent-listesi (list (entlast))))
          (command "._LINE" ref-bitis (polar kuyruk-pt (- 0 (/ pi 4)) (* scl 0.15)) "")
          (setq ent-listesi (append ent-listesi (list (entlast))))
        )
        (progn
          (command "._LINE" ref-bitis (polar kuyruk-pt (* 3 (/ pi 4)) (* scl 0.15)) "")
          (setq ent-listesi (append ent-listesi (list (entlast))))
          (command "._LINE" ref-bitis (polar kuyruk-pt (- 0 (* 3 (/ pi 4))) (* scl 0.15)) "")
          (setq ent-listesi (append ent-listesi (list (entlast))))
        )
      )
      
      ;; WPS KUTUSU - bu cok onemli!
      (setq txt-pt (polar kuyruk-pt yon (* scl 0.3)))
      
      ;; Kutu noktalarini hesapla
      (setq kutu-p1 (polar txt-pt (+ yon (/ pi 2)) (* scl 0.15)))
      (setq kutu-p1 (polar kutu-p1 (+ yon pi) (* scl 0.05)))
      (setq kutu-p2 (polar kutu-p1 yon (* scl 0.6)))
      (setq kutu-p3 (polar kutu-p2 (- yon (/ pi 2)) (* scl 0.3)))
      (setq kutu-p4 (polar kutu-p3 (+ yon pi) (* scl 0.6)))
      
      ;; Kutuyu ciz
      (command "._PLINE" kutu-p1 kutu-p2 kutu-p3 kutu-p4 "_C")
      (command "")
      (setq ent-listesi (append ent-listesi (list (entlast))))
      
      ;; WPS metni
      (command "._TEXT" "_J" "_MC" txt-pt (* scl 0.125) txt-aci 
               (strcat "WPS:" *WPS-NO*))
      (setq ent-listesi (append ent-listesi (list (entlast))))
    )
  )
  
  ;; Ek notlari ekle
  (setq txt-pt (polar ref-baslangic (- yon (/ pi 2)) (* scl 0.4)))
  
  (if (/= *NOT1* "")
    (progn
      (if (= txt-aci 0)
        (command "._TEXT" "_J" "_ML" txt-pt (* scl 0.1) txt-aci *NOT1*)
        (command "._TEXT" "_J" "_MR" txt-pt (* scl 0.1) txt-aci *NOT1*)
      )
      (setq ent-listesi (append ent-listesi (list (entlast))))
      (setq txt-pt (polar txt-pt (- yon (/ pi 2)) (* scl 0.15)))
    )
  )
  
  (if (/= *NOT2* "")
    (progn
      (if (= txt-aci 0)
        (command "._TEXT" "_J" "_ML" txt-pt (* scl 0.1) txt-aci *NOT2*)
        (command "._TEXT" "_J" "_MR" txt-pt (* scl 0.1) txt-aci *NOT2*)
      )
      (setq ent-listesi (append ent-listesi (list (entlast))))
      (setq txt-pt (polar txt-pt (- yon (/ pi 2)) (* scl 0.15)))
    )
  )
  
  (if (/= *NOT3* "")
    (progn
      (if (= txt-aci 0)
        (command "._TEXT" "_J" "_ML" txt-pt (* scl 0.1) txt-aci *NOT3*)
        (command "._TEXT" "_J" "_MR" txt-pt (* scl 0.1) txt-aci *NOT3*)
      )
      (setq ent-listesi (append ent-listesi (list (entlast))))
    )
  )
  
  ent-listesi
)

;;;========================================================================
;;; XDATA YONETIMI
;;;========================================================================

(defun kaynak-xdata-ekle (obje-listesi kaynak-id pt1 pt2 / ent xdata-listesi)
  (foreach ent obje-listesi
    (if ent
      (progn
        (setq xdata-listesi 
          (list 
            (cons -3 
              (list 
                (cons *KAYNAK-APP-ID* 
                  (list 
                    (cons 1000 "KAYNAK_SEMBOLU")
                    (cons 1000 kaynak-id)
                    (cons 1000 *UST-YONTEM*)
                    (cons 1000 *ALT-YONTEM*)
                    (cons 1000 *UST-OLCU*)
                    (cons 1000 *ALT-OLCU*)
                    (cons 1000 *UST-KONTUR*)
                    (cons 1000 *ALT-KONTUR*)
                    (cons 1000 *UST-YUZEY*)
                    (cons 1000 *ALT-YUZEY*)
                    (cons 1000 *WPS-NO*)
                    (cons 1000 *SANTIYE-FLAG*)
                    (cons 1000 *CEVRE-FLAG*)
                    (cons 1000 *TAM-NUF-FLAG*)
                    (cons 1000 *NDT-FLAG*)
                    (cons 1000 *NOT1*)
                    (cons 1000 *NOT2*)
                    (cons 1000 *NOT3*)
                    (cons 1010 pt1)
                    (cons 1010 pt2)
                  )
                )
              )
            )
          )
        )
        (setq ent (entmod (append (entget ent) xdata-listesi)))
      )
    )
  )
  (princ)
)

;; XDATA oku
(defun kaynak-xdata-oku (ent / xdata)
  (setq xdata (assoc -3 (entget ent (list *KAYNAK-APP-ID*))))
  (if xdata
    (setq xdata (cdr (assoc *KAYNAK-APP-ID* (cdr xdata))))
  )
  xdata
)

;; Parametreleri XDATA'dan cikart
(defun kaynak-parametreleri-cikart (xdata / pt1 pt2)
  (if xdata
    (progn
      (setq *UST-YONTEM* (cdr (nth 2 xdata)))
      (setq *ALT-YONTEM* (cdr (nth 3 xdata)))
      (setq *UST-OLCU* (cdr (nth 4 xdata)))
      (setq *ALT-OLCU* (cdr (nth 5 xdata)))
      (setq *UST-KONTUR* (cdr (nth 6 xdata)))
      (setq *ALT-KONTUR* (cdr (nth 7 xdata)))
      (setq *UST-YUZEY* (cdr (nth 8 xdata)))
      (setq *ALT-YUZEY* (cdr (nth 9 xdata)))
      (setq *WPS-NO* (cdr (nth 10 xdata)))
      (setq *SANTIYE-FLAG* (cdr (nth 11 xdata)))
      (setq *CEVRE-FLAG* (cdr (nth 12 xdata)))
      (setq *TAM-NUF-FLAG* (cdr (nth 13 xdata)))
      (setq *NDT-FLAG* (cdr (nth 14 xdata)))
      (setq *NOT1* (cdr (nth 15 xdata)))
      (setq *NOT2* (cdr (nth 16 xdata)))
      (setq *NOT3* (cdr (nth 17 xdata)))
      (setq pt1 (cdr (nth 18 xdata)))
      (setq pt2 (cdr (nth 19 xdata)))
      (list pt1 pt2)
    )
    nil
  )
)

;;;========================================================================
;;; CIFT TIKLAMA ILE DUZENLEME - REACTOR SISTEMI
;;;========================================================================

(defun kaynak-reactor-kur ()
  (if *KAYNAK-REACTOR*
    (vlr-remove *KAYNAK-REACTOR*)
  )
  (setq *KAYNAK-REACTOR*
    (vlr-editor-reactor nil '((:vlr-commandWillStart . kaynak-komut-oncesi)))
  )
  (princ)
)

(defun kaynak-komut-oncesi (reactor komut-listesi / komut ss ent xdata kaynak-id pts scl)
  (setq komut (car komut-listesi))
  
  ;; DBLCLICKEDIT komutunu yakala
  (if (= (strcase komut) "DBLCLICKEDIT")
    (progn
      ;; Secili objeyi al
      (if (setq ss (ssget "_I"))
        (progn
          (setq ent (ssname ss 0))
          (setq xdata (kaynak-xdata-oku ent))
          
          (if xdata
            (progn
              ;; Kaynak ID'sini ve noktalari al
              (setq kaynak-id (cdr (nth 1 xdata)))
              (setq pts (kaynak-parametreleri-cikart xdata))
              
              ;; Dialog goster
              (if (kaynak-dialog T)
                (progn
                  ;; Ayni kaynak-id'ye sahip tum objeleri bul ve sil
                  (setq ss (ssget "_X" 
                    (list (cons -3 (list *KAYNAK-APP-ID*)))))
                  
                  (if ss
                    (progn
                      (setq i 0)
                      (repeat (sslength ss)
                        (setq ent (ssname ss i))
                        (setq xdata (kaynak-xdata-oku ent))
                        (if (and xdata 
                                 (= (cdr (nth 1 xdata)) kaynak-id))
                          (entdel ent)
                        )
                        (setq i (1+ i))
                      )
                    )
                  )
                  
                  ;; Olcek al
                  (setq scl (getvar "DIMSCALE"))
                  (if (or (null scl) (<= scl 0))
                    (setq scl 1.0)
                  )
                  
                  ;; AYNI NOKTALARDA yeni sembol olustur
                  (kaynak-sembolu-olustur (car pts) (cadr pts) scl kaynak-id)
                  
                  (princ "\nKaynak sembolu guncellendi.")
                )
              )
            )
          )
        )
      )
    )
  )
  (princ)
)

;;;========================================================================
;;; BASLATMA MESAJI
;;;========================================================================

(princ "\n========================================")
(princ "\nKAYNAK SEMBOLU SISTEMI YUKLENDI")
(princ "\n========================================")
(princ "\nKomut: KS")
(princ "\nAWS A2.4 Standardi Uyumlu")
(princ "\n")
(princ "\nOzellikler:")
(princ "\n- LEADER tabanli yerlestirme")
(princ "\n- 8 kaynak tipi")
(princ "\n- Kontur secenekleri (Duz/Dis Bombe/Ic Bombe)")
(princ "\n- Yuzey bitirme yontemleri (G/M/C/R/H/P)")
(princ "\n- Cift tiklama ile duzenleme")
(princ "\n- XDATA veri saklama sistemi")
(princ "\n- WPS kutusu")
(princ "\n- Bayrak, F.P., NDT sembolleri")
(princ "\n")
(princ "\nKullanim:")
(princ "\n1. KS komutunu yaz")
(princ "\n2. Kaynak konumunu sec")
(princ "\n3. Leader bitis noktasini sec")
(princ "\n4. Dialog parametrelerini doldur")
(princ "\n5. Sembole cift tikla ve duzenle")
(princ "\n========================================")
(princ)

;; Otomatik baslat
(kaynak-basla)
