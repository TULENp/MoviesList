# Список фильмов

Это простое мобильное приложение, позволяющее просматривать список фильмов и информацию о них. Фильмы получены с TMDP API.

## Требования:
- Node.js
- Npm
- Expo Go
- expo-cli (можно установить командой ```npm install -g expo-cli```)
- TMDB api key 
- VPN на смартфоне (Если в вашей стране заблокирован TMDB)

## Инструкция по запуску

1. Клонируйте репозиторий:

```
git clone https://github.com/TULENp/MoviesList.git
```

2. Перейдите в папку проекта:

```
cd MoviesList
```

3. Установите все зависимости:

```
npm install
```

4. Вставьте свой TMD api key в поле ```const token = '';``` по пути :

```
├── src
    ├── services
        └── api.ts
```
5. Запустите приложение:

```
npm start
```
6. Отсканируйте QR-код из консоли с помощью вашего смартфона и приложения Expo Go
7. Дождитесь сборки. Готово!

## Функции 
- Просмотр списка фильмов (постранично)
- Сортировка 
- Просмотр информации о фильме

![moviesList](https://github.com/TULENp/MoviesList/assets/83094079/77c02cfb-a39b-4fc4-8cd7-910da0ab9d3d)

  
