//подключенные библеотеки
const express = require('express');
const XMLHttpRequest = require('xhr2');
var checkers = require('./checkers.json') //обращение к файлу
const hostname = '127.0.0.1';
const port = 3000;

const app = express();
app.use(express.json());

//гет запрос к которому обратится клиент для получения checkers.json
app.get('/', (req, res) => {
  //Вернуть все данные о шашках с их цветами и их координатами на поле
  res.status(200).json(checkers)
})
//пост запрос для вывод получения статускода от клиента
app.post('/', (req, res) => {
 
  const json = JSON.stringify({ status: "no answer" }); //изначальное значение если ответ еще не пришел
  const request = new XMLHttpRequest();
  //обращение к клиенту для получение статус кода
  request.open("GET", 'http://localhost:4000/statuscode'); 
  request.setRequestHeader('Content-Type', 'application/json');
  request.send(json);

  request.onload = (e) => { //вывод статус кода
    if (request.response) {
      //статус код пришел
      console.log(request.response);
      res.status(200).json(JSON.parse(request.response));
    }
    else {
      //статус код не пришел
      console.log(json);
      res.status(400).json(JSON.parse(json));
    }
  }
})

app.listen(port, () => { //сервер запущен
  console.log(`Server active on port ${port}`)
})