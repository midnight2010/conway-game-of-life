let container = document.querySelector('.container');
let button = document.querySelector('button')

let arr = [];


for(let i = 1; i <=144; i++) {
    arr.push('');
    let div = document.createElement('div');
    div.classList.add('cell');
    container.append(div)
}

let cells = document.querySelectorAll('.cell');

cells.forEach((cell,index)=> {
    cell.addEventListener('click',()=> {
        cell.classList.add('clicked')
        arr[index] = 'clicked';
        console.log(arr)
    })
   
})


button.addEventListener('click',()=> {
    for(let i = 0; i < cells.length; i++) {
    let row = parseInt(i / 12);
    let col = i % 12;
        if(cells[i].classList.contains('clicked')) {
            let result = neighbours(i,col,row);
            if(result < 2) {
                arr[i] = '';
            }
            if(result === 2 || result === 3) {
                arr[i] = 'clicked';
            }
            if(result > 3) {    
                arr[i] = '';
            }
        }
        else arr[i] = neighbours(i,col,row) === 3 ? 'clicked' : arr[i];     
    }
    update();
})


function neighbours(i,col,row) {
    let k = 0;
    if(row === 0) {
        k+= check(cells[i + cells.length - 12]);
        if(col === 0) {
            k+= check(cells[i+1],cells[i+12],cells[i+13],cells[i+11]);
            
        }
        else if(col === 11) {
            k+= check(cells[i-1],cells[i+12],cells[i+11],cells[i-11])
        }
        else {
            k+= check(cells[i-1],cells[i+1],cells[i+11],cells[i+12],cells[i+13])
        }

    }
    else if(row === 11) {
        k += check(cells[i % 12]);
        if(col === 0) {
            k+= check(cells[i-12],cells[i-11],cells[i+1],cells[i+11]);
        }
        if(col === 11) {
         k+= check(cells[i-12],cells[i-13],cells[i-1],cells[i-11])
        }
        else {
            k+= check(cells[i-1],cells[i+1],cells[i-11],cells[i-12],cells[i-13])
        }
    }
    
    else {
        if(col === 0) {
            k+= check(cells[i+12],cells[i+13],cells[i+1],cells[i-12],cells[i-11],cells[i+11]);
        }
        else if(col === 11) {
            k+= check(cells[i+12],cells[i+11],cells[i-1],cells[i-12],cells[i-13],cells[i-11]);
        }
        else {
            k+= check(cells[i+1],cells[i-1],cells[i-11],cells[i-12],cells[i-13],cells[i+11],cells[i+12],cells[i+13])
        }
    
    }    

    return k;
}

function check(...rest) {
 let sum = 0;
 for(let i = 0; i < rest.length; i++) {
     if(rest[i].classList.contains('clicked')) {
         sum+=1;
     }
 }
  return sum;
}

function update() {
    cells.forEach((cell,index)=>{ 
        if(arr[index] === 'clicked') {
            cell.classList.add('clicked')
        }
        else {
            cell.classList.remove('clicked')
        }
    })
  
}