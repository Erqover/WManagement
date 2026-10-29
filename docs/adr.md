# Raporty Decyzji Architektonicznych (ADR) – Projekt WManagment

# ADR-01: Wybór ekosystemu JavaScript jako jednolitego języka projektu

## Status: 
* Zaakceptowany

## Kontekst: 
* Realizacja gry wymaga stworzenia warstwy klienta, serwera oraz komunikacji z bazą. Zespół potrzebował technologii minimalizującej 
czas przełączania kontekstu między frontendem a backendem w kilkuosobowym zespole oraz języka, z którym kazdy miał styczność.

## Decyzja: 
* Zastosowanie języka JavaScript (ES6+) zarówno w warstwie klienta, jak i serwera.

## Konsekwencje:

### Pozytywne: 
* Wspólny ekosystem 
* Szybsze tempo pracy
### Negatywne: 
* Brak statycznego typowania i ryzyko błędów typu runtime 
* Konieczność restrykcyjnego stosowania lintera

---

# ADR-02: Wykorzystanie środowiska Node.js oraz frameworka Express.js w warstwie backendu

## Status: 
* Zaakceptowany
## Kontekst: 
* Konieczność udostępnienia REST API do zarządzania slotami zapisu gry, game loop'em oraz asynchronicznej komunikacji z bazą danych PostgreSQL.

## Decyzja: 
Budowa lekkiego backendu opartego o platformę Node.js i minimalistyczny framework Express.js z modularnym podziałem na routing, kontrolery i moduł bazy danych.   

## Konsekwencje:
### Pozytywne: 
* Prosta konfiguracja endpointów REST 
* Natywna obsługa formatu JSON, co pomoze w przekazywaniu danych do gry na podstawie progresu
### Negatywne: 
* Brak narzuconej odgórnie struktury architektonicznej, co wymusza samodzielne dbanie o modularność kodu.

---

# ADR-03: Wybór biblioteki React (z narzędziem Vite) jako silnika UI
## Status: 
* Zaakceptowany
## Kontekst: 
* Interfejs gry inspirowany mechanikami symulacyjnymi (np. Papers, Please) wymaga dynamicznego aktualizowania wielu niezależnych elementów: dokumentów manifestu, zegara czasu gry, notatnika z zasadami oraz stempli.   

## Decyzja: 
* Użycie biblioteki React opartej o komponenty funkcyjne i hooki stanu (useState, useEffect), wspieranej przez środowisko deweloperskie Vite.   

## Konsekwencje:

### Pozytywne: 
* Deklaratywne zarządzanie stanem biurka inspektora
* Szybkie odświeżanie modułów podczas pracy  
* Możliwość łatwego rozbicia biurka na niezależne komponenty 

### Negatywne: 
* Konieczność zarządzania re-renderami przy częstych zmianach stanu (np. tykający co ułamek sekundy zegar) 
* Potencjalne komplikacje przy wprowadzaniu fizyki przesuwania elementów (drag-and-drop)

---

# ADR-04: Konteneryzacja bazy danych PostgreSQL za pomocą Docker Compose
## Status: 
* Zaakceptowany

## Kontekst: 
* Wieloosobowy zespół pracujący na różnych maszynach lokalnych potrzebował spójnego środowiska bazy danych bez konieczności ręcznej, podatnej na błędy instalacji serwera PostgreSQL bezpośrednio w systemie operacyjnym.

## Decyzja: 
* Uruchamianie relacyjnej bazy danych PostgreSQL w kontenerze Docker za pośrednictwem pliku konfiguracyjnego docker-compose.yml.   

## Konsekwencje:

### Pozytywne: 
* Identyczne środowisko bazy u każdego członka zespołu 
* Natychmiastowe uruchamianie jedną komendą

### Negatywne: 
* Wymóg posiadania i uruchamiania w tle aplikacji Docker Desktop 

---
 
# ADR-05: Wykorzystanie Electrona do budowy aplikacji desktopowej z perspektywą plików .exe
## Status: 
* Zaakceptowany

## Kontekst: 
* Gra symulacyjna docelowo ma funkcjonować jako samodzielna aplikacja na komputer użytkownika (klimat gry okienkowej bez pasków przeglądarki, z perspektywą dystrybucji gotowego pliku wykonywalnego .exe).

## Decyzja: 
* Zastosowanie frameworka Electron jako powłoki desktopowej uruchamiającej aplikację Reactową w oknie Chromium.   

## Konsekwencje:

### Pozytywne: 
* Dostęp do pełnego ekranu i zachowania natywnej aplikacji desktopowej 
* Możliwość późniejszego spakowania gry do pojedynczego pliku instalacyjnego

### Negatywne: 
* Większy rozmiar końcowej paczki wynikowej 
* Konieczność jednoczesnej orkiestracji procesów frontendu i backendu w fazie deweloperskiej 

# ADR-06: Zapisywanie stanów gry w statycznych pliku JSON i ewentualny backup w bazie
## Status:
* W trakcie dyskusji

## Kontekst:
* Gra musi gdzieś przechowywać dane zapisu, aby mogła śledzić progres gracza.

## Decyzja:
Obecnie planem jest przechowywanie danych zapisu w statycznym pliku JSON, z ewentualną mozliwością backupu tych danych w bazie. Decyzja jeszcze nie zapadła.

## Konsekwencje:
### Pozytywne:
* Mozliwość obsługi zapisów konkretnego uzytkownika na róznych urządzeniach
* Kopia w bazie stanowi backup danych zapisu w przypadku uszkodzenia danych pliku JSON

### Negatywne:
* Większy nakład pracy
* Konieczność postawienia bazy na oficjalnym serwerze