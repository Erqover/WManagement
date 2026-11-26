# User Journey

User Journey projektu WManagement

ChemZero to symulator kontroli dostaw w magazynie chemicznym. Gracz sprawdza dokumenty, decyduje o przyjęciu lub odrzuceniu transportu i poznaje wynik finansowy swoich decyzji. Zmiana od 06:00 do 12:00 trwa pięć rzeczywistych minut.

### Przyjęty cel biznesowy

Gracz kończy pierwszą zmianę, rozumie swoje rozliczenie i rozpoczyna następny dzień z zachowanym postępem.

## Persony i cele rozgrywki

| Persona | Sytuacja | Pożądany rezultat |
| --- | --- | --- |
| Nikodem | Pierwszy raz w grze | Samodzielna odprawa, zrozumiały raport i rozpoczęcie dnia 2. |
| Maja | Próba poprawy poprzedniego wyniku z gry | Więcej trafnych decyzji i świadomy wybór, na co wydać zarobione środki. |
| Zosia | Powrót po kilku dniach | Wczytanie własciwego save'a i zachowanie postępu między sesjami. |

## User Journey 1 - Nikodem poznaje zasady pierwszej zmiany

Lubi krótkie gry logiczne. Pierwszy raz siada przy biurku inspektora i chce nauczyć się zasad na przykładzie jednej dostawy, zanim zacznie pracować na czas.

### Cel gracza

Samodzielnie odprawić dostawę, zrozumieć rozliczenie i rozpocząć dzień 2.

| Etap i działanie gracza | Touchpoints (makieta High-Fi) | Pain Points | Opportunities |
| --- | --- | --- | --- |
| **1. Wchodzi do gry.** Wybiera „GRAJ”, żeby rozpocząć pierwszą zmianę. | 1. Main Menu · GRAJ | Przed startem trudno ocenić, czy zdąży ukończyć sesję. | Przy „GRAJ” podać czas jednej zmiany. |
| **2. Tworzy zapis.** W „Rejestrze zmian” wybiera pusty slot. Rozpoczyna dzień 1. | 2. Save Slots · kafelek [PUSTY SLOT] | Określenie „pusty slot” nie wyjaśnia, co zrobi kliknięcie. | Pod pustym miejscem dopisać „Rozpocznij dzień 1”. |
| **3. Czyta reguły.** O 06:00 odnajduje zegar i sprawdza wytyczne przed pierwszą odprawą. | 3. Game Screen · zegar i „Wytyczne dnia 1” | Kilka dokumentów jednocześnie przyciąga uwagę, a czas już płynie. | Przy pierwszej dostawie wskazać wytyczne i godzinę zakończenia zmiany. |
| **4. Weryfikuje dostawę.** Porównuje 9 500 kg z limitem 12 000 kg. Sprawdza wymaganą pieczęć i numer seryjny na kwicie celnym. | 3. Game Screen · wytyczne, dokument przewozowy i kwit celny | Zgodna waga może skłonić ją do pominięcia osobnego wymogu pieczęci dla klasy III. | Przy regułach dodać listę pól do sprawdzenia dla danej klasy ładunku. |
| **5. Podejmuje decyzję.** Stempluje manifest, sprawdza skutek i powtarza kontrolę przy kolejnych dostawach. | 3. Game Screen · „ZATWIERDŹ”, „ODRZUĆ” i pole na stempel | W prototypie pojedyncze kliknięcie stempla dopiero wyświetla podpowiedź o przeciąganiu. | Przed pierwszą próbą pokazać, dokąd przeciągnąć stempel. |
| **6. Odczytuje wynik.** O 12:00 kończy odprawy. W raporcie odczytuje liczbę poprawnych i błędnych decyzji oraz saldo. | 4. Day Summary · rozliczenie finansowe | Zbiorcza kwota kary nie wskazuje, przy której dostawie popełniła błąd. | Przy potrąceniu podać numer manifestu i naruszoną regułę. |
| **7. Rozpoczyna dzień 2.** Zapisuje wynik i sprawdza numer dnia oraz saldo na biurku. | 4. Day Summary · „ZAPISZ I ROZPOCZNIJ DZIEŃ 2”<br>3. Game Screen · dzień i saldo | Po zmianie ekranu może mieć wątpliwość, czy pierwszy wynik się zapisał. | Po rozpoczęciu dnia krótko potwierdzić zapis, numer slotu i przeniesione saldo. |

### Kryterium sukcesu

Ola odprawia co najmniej jedną dostawę, w raporcie potrafi wyjaśnić jedną zmianę salda i rozpoczyna dzień 2 na tym samym zapisie.

## User Journey 2 - Maja poprawia wynik i zastanawia się na co wydać pieniądze

Zna podstawy gry i wraca do własnego zapisu. Stara się sprawdzać więcej dostaw bez utraty trafności. Rozważa, czy kupić tańszą lupę, czy odłożyć zarobki na skaner.

### Cel gracza

Poprawić trafność decyzji i świadomie przeznaczyć zarobione środki na ulepszenie.

| Etap i działanie gracza | Touchpoints (makieta High-Fi) | Pain Points | Opportunities |
| --- | --- | --- | --- |
| **1. Wznawia profil.** Wybiera „GRAJ” i otwiera zajęty slot z zapisanym dniem oraz saldem. | 1. Main Menu · GRAJ<br>2. Save Slots · zajęty slot z dniem i saldem | Dwa zapisy na podobnym etapie mogą wyglądać tak samo. | Obok dnia i salda pokazać datę ostatniej gry. |
| **2. Sprawdza reguły dnia.** Przed odprawami czyta wytyczne i ustala, które dane sprawdzi w pierwszej kolejności. | 3. Game Screen · dziennik zasad i zegar | Z przyzwyczajenia może zastosować wczorajszą regułę. | Wyróżnić zasady dodane lub zmienione od poprzedniego dnia. |
| **3. Wyjaśnia wątpliwość.** Porównuje manifest z kwitem. W opcjonalnym wariancie ogląda etykietę w naczepie i wraca do biurka. | 3. Game Screen · dokument i kwit<br>02_truck_inside  · etykieta ładunku i powrót | Odczytywanie na przemian kodu z dokumentu i etykiety zabiera czas. | Pozwolić przypiąć wybrane pole manifestu obok oglądanej etykiety. |
| **4. Odprawia kolejne auta.** Zatwierdza zgodne dostawy, odrzuca błędne i śledzi skutki decyzji do końca zmiany. | 3. Game Screen · stemple, saldo i zegar | Przy szybkim tempie łatwo przeoczyć przyczynę potrącenia i powtórzyć błąd. | Zachować krótki wykaz ostatnich decyzji z przyczynami kar. |
| **5. Ocenia trafność.** O 12:00 odczytuje raport. Cztery poprawne odprawy i jedna błędna dają na raporice 80% trafności. | 4. Day Summary · wiersze odpraw i aktualne saldo | Większa liczba odpraw sama nie mówi, czy poprawił trafność. | Pokazać odsetek trafnych decyzji wraz z wynikiem z poprzedniego dnia. |
| **6. Rozważa zakup.** Na koncie ma 800 monet. Może kupić lupę za 500 monet lub odkładać na skaner za 1 000 monet. | 3. Day Summary · „KUP” oraz „BRAK ŚRODKÓW” | Do podjęcia decyzji musi sam policzyć brakującą kwotę i saldo po zakupie. | Przy skanerze wyświetlić brakujące 200 monet , a przy lupie przewidywane saldo po zakupie 300 monet. |
| **7. Zachowuje postęp.** Zapisuje i uruchamia następny dzień z saldem po rozliczeniu i ewentualnym zakupie. | 4. Day Summary · zapis i kolejny dzień<br>3. Game Screen · pasek dnia i salda | Po powrocie do biurka samo saldo słabo przypomina, na co wydał środki. | Po zakupie potwierdzić nazwę zapisanego narzędzia i końcowe saldo. |

### Kryterium sukcesu

Przy co najmniej tylu odprawach co poprzednio rośnie udział trafnych decyzji. W kolejnym dniu saldo odpowiada rozliczeniu, a kupione narzędzie pozostaje dostępne.

## User Journey 3 - Zosia wraca do gry po przerwie

Gra po jednej zmianie co kilka dni. Zwykle pamięta ostatni dzień kampanii, ale nie numer slotu. Zanim rozpocznie nową zmianę, chce mieć pewność, że wczytała właściwy profil.

### Cel gracza

Wznowić właściwy profil, ukończyć zmianę i odnaleźć zachowany wynik podczas następnej wizyty.

| Etap i działanie gracza | Touchpoints (makieta High-Fi) | Pain Points | Opportunities |
| --- | --- | --- | --- |
| **1. Wraca po przerwie.** Uruchamia grę i wybiera „GRAJ”, żeby znaleźć wcześniejszy zapis. | 1. Main Menu · GRAJ | Etykieta nie podpowiada, że tędy wznawia się wcześniejszą sesję. | Pokazać skrót do ostatniej rozgrywki z numerem dnia. |
| **2. Rozpoznaje zapis.** Po dniu i saldzie rozpoznaje profil. Sprawny zapis prowadzi do kroku 4, a uszkodzony do kroku 3. | 2. Save Slots · zajęty slot, dzień, saldo i kosz<br>2. Save Slots - Error State · stan błędu | Kliknięcie kosza obok kafelka może rozpocząć usuwanie zamiast wczytywania. | Odsunąć kosz od obszaru wczytania i podpisać akcję „Usuń zapis”. |
| **3. Reaguje na błąd.** Uszkodzony slot jest zablokowany. Wybiera inny poprawny zapis, jeśli istnieje, lub wraca do menu. | 2. Save Slots - Error State · komunikat, ✓ / ✕ i powrót do menu<br>2. Save Slots · wybór slotu | Komunikat o sumie kontrolnej może sugerować, że utracone są wszystkie profile. | Wskazać numer uszkodzonego slotu oraz dostępne inne zapisy. |
| **4. Przypomina sobie stan gry.** Po wczytaniu sprawdza dzień i saldo, czyta bieżące wytyczne i sięga po manifest. | 3. Game Screen · dzień, saldo, wytyczne i manifest | Po kilku dniach przerwy trudno odtworzyć zasady poprzedniej sesji. | Przy wznowieniu krótko przypomnieć reguły obowiązujące w tym dniu. |
| **5. Kończy zmianę.** Porównuje dokumenty i stempluje kolejne dostawy do 12:00. Przechodzi do raportu. | 3. Game Screen · kwit, stemple i zegar<br>4. Day Summary · raport zmiany | Przy wcześniejszym wyjściu do menu może błędnie założyć, że dzienne decyzje już się zapisały. | Przed wyjściem w trakcie zmiany podać moment ostatniego zapisu. |
| **6. Zapisuje i kończy sesję.** Czyta raport, pomija sklep i zapisuje wynik. Po rozpoczęciu kolejnego dnia wraca do menu. | 4. Day Summary · zapis i kolejny dzień | Chce skończyć tuż po raporcie, lecz zapis od razu uruchamia następną zmianę. | Dodać w raporcie opcję „Zapisz i wróć do menu”. |
| **7. Sprawdza wynik po powrocie.** Przy następnej wizycie wybiera ten sam slot i sprawdza przeniesiony dzień oraz saldo. | 1. Main Menu · GRAJ<br>2. Save Slots · ten sam slot<br>3. Game Screen · dzień i saldo | Przy podobnych profilach trudno rozpoznać ten zapisany ostatnio. | W rejestrze oznaczyć ostatnio używany slot i czas udanego zapisu. |

### Kryterium sukcesu

Przy następnej wizycie Iga odnajduje w tym samym slocie oczekiwany dzień i saldo.

### Los uszkodzonego zapisu

Po kliknięciu kosza ✕ anuluje usunięcie, a ✓ je potwierdza. Pusty slot rozpoczyna dzień 1. Inny profil ma własny postęp. Jeśli jedyny zapis kampanii jest uszkodzony, jej ścieżka kończy się w kroku 3.
