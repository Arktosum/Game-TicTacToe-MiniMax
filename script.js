let CELLS = document.getElementsByClassName('cell')
let turn = -1
for(let cell of CELLS) {
    cell.addEventListener('click',()=>{
        if(cell.innerText != '') return
        // cell.innerText = turn < 0 ? 'X' : 'O'
        // turn=turn*-1;
        cell.innerText = 'X';
        let state = checkWin()
        setTimeout(()=>{
            if(state != -2){
                if ( state == 0) alert("X wins!");
                else if (state == 1) alert("O wins!");
                else if (state == -1) alert("Tie!");
            }
        },100)  
        let aiCell = MiniMax(true,-Infinity,Infinity,1);
        aiCell.innerText = 'O';
        state = checkWin();
        setTimeout(()=>{
            if(state != -2){
                if ( state == 0) alert("X wins!");
                else if (state == 1) alert("O wins!");
                else if (state == -1) alert("Tie!");
            }
        },100)     
    })
}

// -1 tie/indeterminate
// 0  - X
// 1 - O 
// Maximizing Player ( AI ) -> Positive evaluation
// Minimizing Player ( User ) -> Negative evaluation
function MiniMax(isMaximizingPlayer,alpha,beta,depth){
    let state = checkWin();
    console.log(isMaximizingPlayer,depth);
    if(depth == 9 || state != -2){
        if(state == 0) return -100/depth;
        if(state == 1) return 100/depth;
        if(state == -1) return 1/depth;
    }
    let possiblePositions = [];
    for(let cell of CELLS){
        if(cell.innerText == '') possiblePositions.push(cell);
    }
    if(isMaximizingPlayer){
        let score = -Infinity;
        let bestPos = undefined
        for(let pos of possiblePositions){
            pos.innerText = 'O'
            eval = MiniMax(false,alpha,beta,depth+1);
            if(eval > score){
                score = eval;
                bestPos = pos
            }
            pos.innerText = ''
            alpha = Math.max(eval,alpha);
            if(beta <= alpha) break;
        }
        if(depth == 1) return bestPos
        return score;
    }
    else{
        let score = Infinity;
        for(let pos of possiblePositions){
            pos.innerText = 'X'
            eval = MiniMax(false,alpha,beta,depth+1);
            score = Math.min(score,eval);
            pos.innerText = ''
            beta = Math.min(eval,beta);
            if(beta <= alpha) break;
        }
        return score;
    }
}
function Grid(x,y){
    return CELLS[3*x+y];
}


// -1 tie/indeterminate
// 0  - X
// 1 - O
function checkWin(){
    let grid = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]]
    
    let can_tie = true;
    for(let i = 0 ; i < 3 ; i++){
        for(let j = 0 ; j < 3 ; j++){
            let state;
            if(Grid(i,j).innerText == ''){
                state = -1;
                can_tie = false;
            }
            if(Grid(i,j).innerText == 'X') state = 0; 
            if(Grid(i,j).innerText == 'O') state = 1; 
            grid[i][j] = state;
        }
    }
    //     R 0 1 2 C 0 1 2
    let x = [0,0,0,0,0,0]
    let o = [0,0,0,0,0,0]
    for(let i = 0 ; i < 3 ; i++){
        for(let j = 0 ; j < 3 ; j++){
            if(grid[i][j] == 0) x[i]++
            if(grid[i][j] == 1) o[i]++

            if(grid[j][i] == 0) x[i+3]++
            if(grid[j][i] == 1) o[i+3]++
        }
    }
    for(let i = 0 ; i < 6 ; i++){
        if (x[i] == 3) return 0; // X wins;
        if (o[i] == 3) return 1; // O wins;
    }

    if(grid[0][0] == 0 && grid[1][1] == 0 && grid[2][2] == 0) return 0;
    if(grid[0][0] == 1 && grid[1][1] == 1 && grid[2][2] == 1) return 1;

    if(grid[0][2] == 0 && grid[1][1] == 0 && grid[2][0] == 0) return 0;
    if(grid[0][2] == 1 && grid[1][1] == 1 && grid[2][0] == 1) return 1;

    if(can_tie) return -1;
    return -2;
}

