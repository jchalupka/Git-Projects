#!/usr/bin/python


M = [[1,2,3],
     [4,5,6],
     [7,8,9]]
for i in range(3):
    print M[i]


tb1 = []
for i in range(3):
    row = []
    for j in range(3):
        row.append(M[i][j]*2)
    tb1.append(row)

print tb1
