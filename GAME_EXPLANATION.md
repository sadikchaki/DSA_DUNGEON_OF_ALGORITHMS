# Dungeon Arcade — Game Explanation

## What is the game?
Dungeon Arcade is a 2D top-down arcade dungeon crawler. You play a knight trapped in a dungeon of 4 levels (3 dungeons + a boss arena). In every level you must defeat all the monsters with your sword, collect coins, open treasure chests to heal yourself, and then step into the portal to enter the next level. Touching a monster hurts you, and losing all your health ends the game. Your score, coins and top-5 high scores are saved. Controls: WASD or Arrow keys to move, SPACE to attack, E to open chests and enter portals. Anyone can pick it up and play — there are no theory questions. All the DSA (data structures and algorithms) lives hidden inside the source code: it powers the enemies, the dungeon and the scoreboard.

## Where DSA is implemented in the code

**1. Queue — used for enemy pathfinding**
The game uses a Queue (first-in-first-out) with an O(1) dequeue. A normal list `shift()` re-indexes every element, which is O(n); this version uses a head pointer so removing is O(1), with occasional memory cleanup.
```js
class Queue {
  constructor(){ this.a=[]; this.h=0; }
  enqueue(x){ this.a.push(x); }
  dequeue(){
    const x=this.a[this.h++];
    if(this.h>64 && this.h*2>this.a.length){ this.a=this.a.slice(this.h); this.h=0; }
    return x;
  }
  isEmpty(){ return this.h>=this.a.length; }
}
```

**2. BFS (Breadth-First Search) — how enemies chase you**
Every half second each enemy runs BFS from its own tile to the player's tile. BFS spreads outward level by level, so the first time it reaches the player, the path it found is the shortest walkable route around walls. The enemy then walks one step along it.
```js
function bfsPath(grid,sx,sy,tx,ty){
  const prev=new Map(), seen=new Set([sy*C+sx]);
  const q=new Queue(); q.enqueue([sx,sy]);
  while(!q.isEmpty()){
    const [cx,cy]=q.dequeue();
    if(cx===tx && cy===ty) break;                 // reached the player
    for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){
      const nx=cx+dx, ny=cy+dy, k=ny*C+nx;
      if(wall||outside||seen.has(k)) continue;    // skip walls/visited
      seen.add(k); prev.set(k,cy*C+cx); q.enqueue([nx,ny]);
    }
  }
  // path is rebuilt backwards from target to start using prev
}
```
Time and space: O(rows × cols).

**3. Stack — player motion trail (LIFO)**
A Stack (last-in-first-out) stores the knight's recent positions to draw fading after-images. Only the newest 14 positions are kept; the oldest is discarded — newest data matters most.
```js
class Stack {
  constructor(){ this.a=[]; }
  push(x){ this.a.push(x); }
  pop(){ return this.a.pop(); }
  peek(){ return this.a[this.a.length-1]; }
}
```

**4. QuickSort + Binary Search — Top-5 leaderboard**
Scores are sorted with QuickSort (divide and conquer around a pivot; average O(n log n)), then the player's rank is found with Binary Search in O(log n) instead of scanning the list.
```js
function quickSort(arr,score){
  if(arr.length<=1) return arr.slice();
  const p=arr[arr.length>>1], L=[],M=[],R=[];
  for(const x of arr){
    if(score(x)>score(p))L.push(x); else if(score(x)<score(p))R.push(x); else M.push(x);
  }
  return quickSort(L,score).concat(M,quickSort(R,score));
}
function binarySearchDesc(arr,val,score){
  let lo=0,hi=arr.length-1;
  while(lo<=hi){
    const m=(lo+hi)>>1, s=score(arr[m]);
    if(s===val) return m; if(s<val) hi=m-1; else lo=m+1;
  }
  return lo;
}
```

**5. Backend DSA — dungeon generation**
On the server, an explicit Stack drives iterative DFS to carve dungeon walls, BFS checks that a path from spawn to exit actually exists (if not, a corridor is cleared), and QuickSort ranks coin spots by distance. The same ideas as above, written in Python.
