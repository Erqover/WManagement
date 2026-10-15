# WManagment
Projekt symulatora pracy magazyniera przyjmującego dostawy towarów (mechanika w stylu *Papers, Please*). Gracz wciela się w pracownika rampy, którego zadaniem jest weryfikacja dokumentów przewozowych, sprawdzanie towaru i podejmowanie decyzji o przyjęciu lub odrzuceniu transportu pod presją uciekającego czasu.

Projekt realizowany w metodyce **Specification-Driven Development (SDD)** w oparciu o standard **BMAD** oraz normę jakościową **ISO/IEC 25002 (SQuaRE)**. Na obecnym etapie projekt stanowi specyfikację inżynierską z prototypem wizualnym (makiety ekranów).

---
##  Pętla rozgrywki
1. Przyjeżdża ciężarówka z towarem i kierowca przekazuje manifest dostawy.

2. Gracz sprawdza w **Dzienniku zasad** wytyczne obowiązujące w danym dniu (np. wymagany podpis, zgodność pieczęci, terminy ważności).

3. Gracz weryfikuje dane z dokumentu, a opcjonalnie zagląda do naczepy i sprawdza fizyczne etykiety ładunku.

4. Przybija stempel: **PRZYJMIJ** lub **ODRZUĆ**.

5. Zmiana trwa od 06:00 do 12:00 czasu gry (dokładnie 5 minut czasu rzeczywistego).

6. Po 12:00 system wyświetla raport dobowy: podsumowuje wypłatę, premie za bezbłędne przyjęcia oraz potrącenia za pomyłki.

---

## Makiety prototypu

Wizualna koncepcja interfejsu została podzielona na trzy główne ekrany:
* **Biurko dyspozytora (![[docs/prototypes/01_desktop.png]]):** główny widok gry z zegarem, manifestem, dziennikiem reguł i stemplami decyzyjnymi.

* **Wnętrze naczepy (![[docs/prototypes/02_truck_inside.png]]):** podgląd ładunku umożliwiający inspekcję skrzyń i beczek.

* **Raport końcowy (![[docs/prototypes/03_end_report.png]]):** podsumowanie finansowe po zakończeniu 5-minutowej zmiany.
---
## Struktura dokumentacji
```text
├── docs/
│   ├── prd.md                     # Wymagania biznesowe, funkcjonalne i NFR wg ISO/IEC 25002
│   ├── user-stories.md            # 5x User Stories
│   ├── diagrams/
│   │   ├── use-case.png           # Diagram przypadków użycia UML
│   │   └── sysml-requirements.png # Diagram wymagań SysML
│   └── prototypes/
│       ├── 01_desktop.png         # Widok biurka
│       ├── 02_truck_inside.png    # Widok paki
│       └── 03_end_report.png      # Raport dzienny
└── README.md
```
