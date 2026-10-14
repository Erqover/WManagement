\### US-01: Zarządzanie czasem

\* \*\*Priorytet (MoSCoW):\*\* Must Have

\* \*\*Estymacja:\*\* 2 Story Points



\*\*Jako\*\* gracz,  

\*\*chcę\*\* widzieć na ekranie stale aktualizujący się licznik czasu oraz numer dnia,  

\*\*aby\*\* kontrolować tempo pracy i wiedzieć, ile czasu zostało do końca zmiany.



\*\*Kryteria Akceptacji:\*\*

\* \*\*Given:\*\* Rozpoczyna się nowy dzień pracy i ładuje się pierwsza dostawa.

\* \*\*When:\*\* Trwa właściwa rozgrywka.

\* \*\*Then:\*\* Zegar w rogu ekranu wyświetla numer dnia oraz odlicza czas w górę (np. od 6AM do 12PM), a po osiągnięciu zera blokuje możliwość stemplowania kolejnych dostaw i wymusza zakończenie dnia.



\---



\### US-02: Sprawdzenie poprawności dostarczonych produktów

\* \*\*Priorytet (MoSCoW):\*\* Must Have

\* \*\*Estymacja:\*\* 3 Story Points



\*\*Jako\*\* gracz,  

\*\*chcę\*\* mieć stały dostęp do interaktywnego dziennika zasad obowiązujących w danym dniu,  

\*\*aby\*\* weryfikować dokumenty przewoźnika pod kątem aktualnych wytycznych.



\*\*Kryteria Akceptacji:\*\*

\* \*\*Given:\*\* Gracz analizuje manifest przewozowy, a każdy dzień (lub zestaw dni) wprowadza nowe lub zmodyfikowane reguły weryfikacji.

\* \*\*When:\*\* Gracz wchodzi w interakcję z dziennikiem na biurku w trakcie trwania zmiany.

\* \*\*Then:\*\* Na ekranie rozwija się czytelna lista aktualnych reguł odbioru towaru (np. wymagane pieczątki, limity wagowe, terminy ważności).



\---



\### US-03: Podejmowanie decyzji – stemple

\* \*\*Priorytet (MoSCoW):\*\* Must Have

\* \*\*Estymacja:\*\* 5 Story Points



\*\*Jako\*\* gracz,  

\*\*chcę\*\* zatwierdzać lub odrzucać dostawy za pomocą interaktywnych stempli "PRZYJMIJ" i "ODRZUĆ",  

\*\*aby\*\* sprawnie podejmować decyzje magazynowe i odsyłać pojazdy.



\*\*Kryteria Akceptacji:\*\*

\* \*\*Given:\*\* Gracz zakończył proces weryfikacji dokumentu i podjął decyzję co do losu dostawy.

\* \*\*When:\*\* Gracz klika stempel "PRZYJMIJ" lub "ODRZUĆ" i zatwierdza manifest.

\* \*\*Then:\*\* Decyzja zostaje transakcyjnie zapisana w stanie gry (wraz ze statusem poprawności), naczepa zostaje odprawiona, a system generuje i ładuje kolejną dostawę bez przeładowania aplikacji.



\---



\### US-04: Weryfikacja szczegółów ładunku

\* \*\*Priorytet (MoSCoW):\*\* Could Have

\* \*\*Estymacja:\*\* 8 Story Points



\*\*Jako\*\* gracz,  

\*\*chcę\*\* przełączać widok na wnętrze naczepy i badać fizyczne obiekty (skrzynie, beczki),  

\*\*aby\*\* skonfrontować rzeczywisty stan towaru i oznaczenia ostrzegawcze z deklaracją w manifeście.



\*\*Kryteria Akceptacji:\*\*

\* \*\*Given:\*\* Gracz przechodzi do widoku wnętrza naczepy z wygenerowanym towarem.

\* \*\*When:\*\* Gracz najeżdża kursorem i klika w dany obiekt ładunku (beczka, paleta, karton).

\* \*\*Then:\*\* Pojawia się modal/tooltip prezentujący parametry fizyczne przedmiotu (kod partii, data przydatności, klasa zagrożenia), umożliwiający wykrycie rozbieżności z dokumentem.



\---



\### US-05: Otrzymywanie informacji zwrotnej (Raport końcowy)

\* \*\*Priorytet (MoSCoW):\*\* Should Have

\* \*\*Estymacja:\*\* 3 Story Points



\*\*Jako\*\* gracz,  

\*\*chcę\*\* zobaczyć raport podsumowujący trafne decyzje, błędy oraz bilans finansowy po upływie zmiany,  

\*\*aby\*\* poznać wynik swojej pracy i skutki nałożonych kar lub premii.



\*\*Kryteria Akceptacji:\*\*

\* \*\*Given:\*\* Licznik czasu bieżącego dnia osiągnął wartość 0:00.

\* \*\*When:\*\* System automatycznie blokuje stemplowanie i zamyka widok roboczy.

\* \*\*Then:\*\* Wyświetla się ekran podsumowujący (Raport Końcowy) prezentujący: płacę bazową, premię za bezbłędne przyjęcia, potrącenia za przepuszczone anomalie oraz sumaryczne saldo przechodzące na kolejny dzień.

