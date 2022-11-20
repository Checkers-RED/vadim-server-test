const express = require('express');

//Характеристики шашки:
//Цвет
//Координата 1
//Координата 2
var checkers = require('./checkers.json')

const hostname = '127.0.0.1';
const port = 3000;

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  //Вернуть все данные о шашках с их цветами и их координатами на поле

  res.status(200).json(checkers)
})

app.post('/', function (req, res) {
//Принять цвет шашки, координаты шашки, координаты места перемещения шашки
  try {
    color = req.body.color
    coordinate_x = req.body.coordinate_x
    coordinate_y = req.body.coordinate_y
    new_coordinate_x = req.body.new_coordinate_x
    new_coordinate_y = req.body.new_coordinate_y
    console.log('Coordinates of', color, 'will be changed:\nfrom:', 
    coordinate_x, coordinate_y, '\nto:', new_coordinate_x, new_coordinate_y)
  }
  catch (err) {
    console.log(err)
    res.status(400).json({ status: "error: unable to parse given data" })
    return
  }

//Провести валидацию, возможно ли двинуть шашку на это место

active_color = []
//Валидация цвета
  if (color == "white") {
    active_color = checkers.white
    console.log('Before:', checkers.white)
  }
  else 
  if (color == "black") {
    active_color = checkers.black 
    console.log('Before:', checkers.black)
  }
  else {
    res.status(400).json({ status: "error: no such color" })
    return
  }

//Ищем шашку и меняем параметры
  for (var i = 0; i < active_color.length; i++) {
    if (active_color[i].coordinate_x == coordinate_x)
      if (active_color[i].coordinate_y == coordinate_y) 
      {
        //Функция валидации хода
        busy = false
        for (var j = 0; j < active_color.length; j++)
          if (active_color[j].coordinate_x == new_coordinate_x)
            if (active_color[j].coordinate_y == new_coordinate_y)
              busy = true
        if (busy == false) {
          active_color[i].coordinate_x = new_coordinate_x
          active_color[i].coordinate_y = new_coordinate_y
          console.log('After:', active_color)
          //Вернуть статус-код выполнения задачи
          res.status(200).send({ status: "ok" });
          return
        }
        else {
          console.log('After: No changes')
          //Вернуть статус-код ошибки выбора новых координат
          res.status(400).send({ status: "error: this coordinates are already occupied" });
          return
        }
      }
  }

//Вернуть статус-код ошибки выполнения задачи
  res.status(400).send({ status: "error: no such checker" });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})