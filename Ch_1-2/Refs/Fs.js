const fs = require('fs');
const path = require('path');

 //Создание папки 'notes' в текущей дирректории асинхронно
function makeFolder() {
  fs.mkdir(path.join(__dirname, 'notes'), err => {
    if(err) throw err;
    console.log("Папка создана ...");
  })
}
 //Запись в файл 'MyNotes.txt'
function writeInFile() {
  fs.writeFile(path.join(__dirname, 'notes', 'MyNotes.txt'), 'Hello World !!!', err => {
    if(err) throw err;
    console.log('Файл создан ...');
  })
}
 //Добавление в файл 'MyNotes.txt'
function appendInFile() {
  fs.appendFile(path.join(__dirname, 'notes', 'MyNotes.txt'), '\nAdd note', err => {
    if(err) throw err;
    console.log('Строка добавлена ...');
  })
}
 //Файл 'notes' читается ассинхронно
function readFileAsync() {
  fs.readFile(path.join(__dirname, 'notes', 'MyNotes.txt'), 'utf-8', (err, data) => {
    if(err) throw err;
    console.log('Вывод через буфер => ', Buffer.from(data).toString());//Или 'utf-8' или Buffer.from()
    console.log(data);
  })
}
 //Переименование файла 'notes' => 'MyNotes'
function renameFile() {
  fs.rename(
    path.join(__dirname, 'notes', 'MyNotes.txt'),
    path.join(__dirname, 'notes', 'Notes.txt'),
    err => { if(err) throw err; console.log('Файл переименован...') }
  )
}
// Удаление файла или папки 'notes'
function deleteFile() {
  fs.rm(path.join(__dirname, 'notes', 'MyNotes.txt'), err => {
    if(err) throw err;
    console.log('Файл удален ...');
  })
}

// makeFolder()
// writeInFile()
// appendInFile()
// readFileAsync()
// renameFile()
// deleteFile()