# Интерфейс для сайта Hacker News (https://news.ycombinator.com/news)
Запуск на локалхосте: npm run dev
Подробнее под спойлером в самом низу.

# Запуск докер-контейнера
docker run -dti -p 3000:3000 --restart always --name hacker-news feverus/hacker-news

## Перед запуском на сервере прописать проброс порта, на котором будет висеть контейнер:

sudo nano /etc/apache2/sites-available/{ваш_домен}.conf

__Добавить__

ProxyPreserveHost On

ProxyPass / http://127.0.0.1:3000/

ProxyPassReverse / http://127.0.0.1:3000/

__И выполнить:__

sudo systemctl restart apache2

## Заметки

- Remix.run не работает в некорневой директории (если вы смогли решить эту проблему, пожалуйста сообщите мне)
- Также очень вероятно, что Remix.run работает только на 3000 порту, поэтому докер нужно запускать на нём.
- Есть проблема гидратации, связанная с отличием даты на сервере и у клиента в браузере. Для решения нужно избавиться от генерации дат на статике, оборачивая присвоение в useEffect (пример в \app\components\newsList\newsItemBlock.tsx).

<details>
  <summary>Стандартное readme от Remix.run</summary>

  # Welcome to Remix!

  - [Remix Docs](https://remix.run/docs)

  ## Development

  From your terminal:

  ```sh
  npm run dev
  ```

  This starts your app in development mode, rebuilding assets on file changes.

  ## Deployment

  First, build your app for production:

  ```sh
  npm run build
  ```

  Then run the app in production mode:

  ```sh
  npm start
  ```

  Now you'll need to pick a host to deploy it to.

  ### DIY

  If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

  Make sure to deploy the output of `remix build`

  - `build/`
  - `public/build/`

  ### Using a Template

  When you ran `npx create-remix@latest` there were a few choices for hosting. You can run that again to create a new project, then copy over your `app/` folder to the new project that's pre-configured for your target server.

  ```sh
  cd ..
  # create a new project, and pick a pre-configured host
  npx create-remix@latest
  cd my-new-remix-app
  # remove the new project's app (not the old one!)
  rm -rf app
  # copy your app over
  cp -R ../my-old-remix-app/app app
  ```
  
</details>
