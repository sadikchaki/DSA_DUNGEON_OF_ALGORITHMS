"""Boss helpers: BFS-based difficulty scaling (DSA in backend)."""
from collections import deque


def bfs_reachable_count(grid, start=(1, 1)):
    rows, cols = len(grid), len(grid[0])
    seen = {start}
    q = deque([start])
    while q:
        r, c = q.popleft()
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and (nr, nc) not in seen:
                if grid[nr][nc] != 1:
                    seen.add((nr, nc))
                    q.append((nr, nc))
    return len(seen)


def boss_stats(level=4, reachable=50):
    hp = 120 + level * 20 + min(reachable, 100)
    damage = 12 + level * 2
    return {"hp": hp, "damage": damage, "type": "boss"}
