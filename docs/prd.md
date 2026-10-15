# Product Requirements Document (PRD) — WManagment
* **Status:** Prototyp koncepcyjny
* **Standard:** ISO/IEC 25002 (SQuaRE) + SysML v1.6

---

## 1. Opis projektu
WManagment to webowy symulator 2D stanowiska kontroli dostaw magazynowych. Gra łączy logikę procedur magazynowych (WMS) z prostą mechaniką decyzyjną. Gracz musi sprawnie wyłapywać błędy formalne w dokumentach oraz niezgodności towaru, balansując między dokładnością, a uciekającym czasem.

---

## 2. Architektura prototypu
Aktualny etap skupia się na specyfikacji i makietach wizualnych. Prototyp składa się z 3 widoków:
1. **Biurko robocze:** obsługa manifestu, stempli decyzyjnych oraz podgląd zegara i notatnika z zasadami.
2. **Wnętrze naczepy:** interaktywny podgląd ładunku (skrzynie, beczki, oznaczenia towarów).
3. **Raport dobowy:** ekran podsumowania dnia z naliczaniem wypłaty, kar i premii.

---

## 3. Wymagania Funkcjonalne FR
| ID | Moduł | Powiązanie | Opis |
| :---: | --- | :---: | :--- |
| **REQ-F01** | Czas zmiany | US-01 | Symulacja zmiany od 06:00 do 12:00 (5 minut realnego czasu). O 12:00 blokada stemplowania. |
| **REQ-F02** | Dziennik zasad | US-02 | Podgląd notatnika z aktualnymi regułami weryfikacji na dany dzień roboczy. |
| **REQ-F03** | Stemplowanie | US-03 | Podjęcie decyzji stemplem PRZYJMIJ / ODRZUĆ, zapis wyniku i podstawienie kolejnej dostawy. |
| **REQ-F04** | Inspekcja ładunku | US-04 | Przełączenie widoku na naczepę i sprawdzanie etykiet (kody partii, daty, ADR). |
| **REQ-F05** | Raport dobowy | US-05 | Wyliczenie salda gracza (podstawa + premie - kary) po zakończeniu zmiany. |

*Szczegółowe kryteria akceptacji (Given-When-Then) i priorytety MoSCoW znajdują się w [pliku](./auser-stories.md).*

---

## 4. Wymagania Niefunkcjonalne NFR wg ISO/IEC 25002
Wymagania jakościowe powiązano z mierzalnymi wskaźnikami inżynierskimi:

|      ID       | Kategoria ISO              | Wymaganie                                                                   | Metryka i cel                        |
| :-----------: | :--------------------------: | :--------------------------------------------------------------------------- | :-----------------------------------: |
| **REQ-NFR01** | **Performance Efficiency** | Płynne stemplowanie i ładowanie nowej naczepy bez widocznego zacięcia.      | **Latency (p95) $\le 150text{ ms}$** |
| **REQ-NFR02** | **Reliability**            | Stabilność działania aplikacji podczas sesji bez krytycznych crashy.        | **MTBF $\ge 720text{ h}$**           |
| **REQ-NFR03** | **Reliability**            | Dostępność serwera i logiki reguł dla użytkownika.                          | **Availability $\ge 99.5%$**         |
| **REQ-NFR04** | **Reliability**            | Czas automatycznego restartu środowiska i powrotu do stanu sesji po awarii. | **MTTR $\le 30text{ s}$**            |

---

## 5. Powiązanie z diagramami

* Przypadki użycia (kto co robi w systemie) zostały zdefiniowane w [diagramie UML](./diagrams/use-cases.png):
![diagramie UML](./diagrams/use-cases.png)
* Zależności między wymaganiami a metrykami SQuaRE przedstawiono w [diagramie SysML](./diagrams/sysml-requirements.png):
![diagramie SysML](./diagrams/sysml-requirements.png)
