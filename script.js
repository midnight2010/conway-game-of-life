let container = document.querySelector('.container');
let button = document.querySelector('button')

let arr = [];
let n = 12;

document.querySelector('.container').style.width = (22 * n ) + 'px';

for(let i = 1; i <=n*n; i++) {
    arr.push('');
    let div = document.createElement('div');
    div.classList.add('cell');
    container.append(div);
}

let cells = document.querySelectorAll('.cell');

cells.forEach((cell,index)=> {
    cell.addEventListener('click',()=> {
        cell.classList.add('clicked')
        arr[index] = 'clicked';
        
    })
   
})


button.addEventListener('click',()=> {
    for(let i = 0; i < cells.length; i++) {
    let row = parseInt(i / n);
    let col = i % n;
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
        k+= check(cells[i + cells.length - n]);
        if(col === 0) {
            k+= check(cells[i+1],cells[i+n],cells[i+(n+1)],cells[i+(n-1)]);
            
        }
        else if(col === (n-1)) {
            k+= check(cells[i-1],cells[i+n],cells[i+(n-1)],cells[i-(n-1)])
        }
        else {
            k+= check(cells[i-1],cells[i+1],cells[i+(n-1)],cells[i+n],cells[i+(n+1)])
        }

    }
    else if(row === (n-1)) {
        k += check(cells[i % n]);
        if(col === 0) {
            k+= check(cells[i-n],cells[i-(n-1)],cells[i+1],cells[i+(n-1)]);
        }
        if(col === (n-1)) {
         k+= check(cells[i-n],cells[i-(n+1)],cells[i-1],cells[i-(n-1)])
        }
        else {
            k+= check(cells[i-1],cells[i+1],cells[i-(n-1)],cells[i-n],cells[i-(n+1)])
        }
    }
    
    else {
        if(col === 0) {
            k+= check(cells[i+n],cells[i+(n+1)],cells[i+1],cells[i-n],cells[i-(n-1)],cells[i+(n-1)]);
        }
        else if(col === (n-1)) {
            k+= check(cells[i+n],cells[i+(n-1)],cells[i-1],cells[i-n],cells[i-(n+1)],cells[i-(n-1)]);
        }
        else {
            k+= check(cells[i+1],cells[i-1],cells[i-(n-1)],cells[i-n],cells[i-(n+1)],cells[i+(n-1)],cells[i+n],cells[i+(n+1)])
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