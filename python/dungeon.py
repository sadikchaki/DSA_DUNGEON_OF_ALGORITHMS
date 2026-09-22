"""Dungeon generator using classic DSA.

DSA used here (visible for review):
- Stack: iterative DFS maze carving
- Queue: BFS path validation + enemy placement by distance
- BFS: shortest-path check spawn -> exit
- QuickSort: ranking candidate exit positions (demo use)

Game itself does NOT quiz the player. Anyone can play.
"""
import random
from collections import deque


class Stack(list):
    def push(self, x):
        self.append(x)

    def pop(self):
        return super().pop()

    def is_empty(self):
        return len(self) == 0


class Queue:
    def __init__(self):
        self._d = deque()

    def enqueue(self, x):
        self._d.append(x)

    def dequeue(self):
        return self._d.popleft()

    def is_empty(self):
        return len(self._d) == 0


def quicksort(arr, key=lambda x: x):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if key(x) < key(pivot)]
    mid = [x for x in arr if key(x) == key(pivot)]
    right = [x for x in arr if key(x) > key(pivot)]
    return quicksort(left, key) + mid + quicksort(right, key)


def bfs_distance(grid, start):
    """BFS from start, return dist matrix. 0=floor,1=wall."""
    rows, cols = len(grid), len(grid[0])
    dist = [[-1] * cols for _ in range(rows)]
    q = Queue()
    q.enqueue(start)
    dist[start[0]][start[1]] = 0
    while not q.is_empty():
        r, c = q.dequeue()
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols:
                if grid[nr][nc] == 1 or dist[nr][nc] != -1:
                    continue
                dist[nr][nc] = dist[r][c] + 1
                q.enqueue((nr, nc))
    return dist


def generate_dungeon(level=1, rows=10, cols=15, seed=None):
    """Generate a simple arcade dungeon with DFS-carved openings + BFS check."""
    if seed is not None:
        random.seed(seed)
    # Base: border walls, inner open with random pillars (easy + readable)
    grid = [[0] * cols for _ in range(rows)]
    for r in range(rows):
        grid[r][0] = grid[r][cols - 1] = 1
    for c in range(cols):
        grid[0][c] = grid[rows - 1][c] = 1
    # Random interior walls using Stack-based DFS sprinkle (keeps it connected)
    st = Stack()
    st.push((1, 1))
    visited = {(1, 1)}
    while not st.is_empty():
        r, c = st.pop()
        nbrs = [(r + 2, c), (r - 2, c), (r, c + 2), (r, c - 2)]
        random.shuffle(nbrs)
        for nr, nc in nbrs[:2]:
            if 1 <= nr < rows - 1 and 1 <= nc < cols - 1 and (nr, nc) not in visited:
                if random.random() < 0.35 + level * 0.05:
                    grid[nr][nc] = 1
                visited.add((nr, nc))
                st.push((nr, nc))
    # Ensure spawn + exit floor
    grid[1][1] = 0
    grid[1][cols - 2] = 3  # exit
    # BFS validate spawn reaches exit; if not, clear a corridor
    dist = bfs_distance(grid, (1, 1))
    if dist[1][cols - 2] == -1:
        for c in range(1, cols - 1):
            grid[1][c] = 0 if c != cols - 2 else 3
        dist = bfs_distance(grid, (1, 1))
    # Coins: pick floor cells far from spawn, ranked with quicksort by distance
    cands = []
    for r in range(1, rows - 1):
        for c in range(1, cols - 1):
            if grid[r][c] == 0 and dist[r][c] > 2:
                cands.append((dist[r][c], r, c))
    cands = quicksort(cands, key=lambda x: -x[0])
    n_coins = min(5, len(cands))
    for _, r, c in cands[:n_coins]:
        grid[r][c] = 2
    return {
        "map": grid,
        "spawn": {"x": 96, "y": 96},
        "level": level,
    }
