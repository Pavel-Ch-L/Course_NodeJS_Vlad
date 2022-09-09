/* Параметры консоли (аргументы командной строки)

node console a=1 b=2 c=3  // => { a: '1', b: '2', c: '3' }

process.argv  

 */

function consoleJson() {
  const cons = {}
  for (let i = 2; i < process.argv.length; i++) {
    const arg = process.argv[i].split('=')
    cons[arg[0]] = arg[1] ? arg[1] : true
  }
  return cons
}
console.log(process.argv);
console.log(consoleJson())