"""Sorting algorithms (DSA library used by backend + reference).

Pure DSA, no gameplay dependency. Anyone can play the game
without knowing these; they exist to satisfy the DSA-in-code rule
and power leaderboards.
"""
import random


def bubble_sort(arr):
    a = list(arr)
    n = len(a)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]
                swapped = True
        if not swapped:
            break
    return a


def quick_sort(arr):
    if len(arr) <= 1:
        return list(arr)
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    mid = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + mid + quick_sort(right)


def binary_search(sorted_arr, target):
    lo, hi = 0, len(sorted_arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if sorted_arr[mid] == target:
            return mid
        if sorted_arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1


def generate_sorting_demo():
    arr = random.sample(range(1, 50), 6)
    return {
        "topic": "Sorting (demo)",
        "question": f"Sorted: {quick_sort(arr)}",
        "array": arr,
        "sorted": quick_sort(arr),
    }
