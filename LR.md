# Step one

Create a augmented grammar:

```
S -> if E then C | C
E -> a
C -> b
```

Becomes:

```
S' -> S
S -> if E then C | C
E -> a
C -> b
```

# Step two

Create a items set for the augmented grammar:

```
S' -> .S
S -> .if E then C
S -> .C
C -> .b
```

Table for production S':
| index | item |
| ---------- | ---- |
| 0 | S' -> .S |
| 1 | S -> .if E then C |
| 2 | S -> .C|
| 3 | C -> .b |

# Step three

Create a closure for the grammar:

S' closure:
closure({S' -> .S}) = {[S' -> .S], [S -> .if E then C], [S -> .C], [C -> .b]}

# Step four:

Input the table based on clousure states.

State 0
| Rows | Input | Action |
| ---- | ----- | ----- |
| 0 | if | shift 2 |
| 1 | then | |
| 2 | a | |
| 3 | b | shift 4 |
| 4 | $ | |
| 5 | S | 1 |
| 6 | C | 3 |
| 7 | E | |

State 1
| Rows | Input | Action |
| ---- | ----- | ----- |
| 0 | if | |
| 1 | then | |
| 2 | a | |
| 3 | b | |
| 4 | $ | |
| 5 | S | |
| 6 | C | |
| 7 | E | |

State 2
| Rows | Input | Action |
| ---- | ----- | ----- |
| 0 | if | |
| 1 | then | |
| 2 | a | Shift 6|
| 3 | b | |
| 4 | $ | |
| 5 | S | |
| 6 | C | |
| 7 | E | |

State 3
| Rows | Input | Action |
| ---- | ----- | ----- |
| 0 | if | |
| 1 | then | |
| 2 | a | |
| 3 | b | |
| 4 | $ | Reduce 2 |
| 5 | S | |
| 6 | C | |
| 7 | E | |

State 4
| Rows | Input | Action |
| ---- | ----- | ----- |
| 0 | if | |
| 1 | then | |
| 2 | a | |
| 3 | b | |
| 4 | $ | Reduce 4|
| 5 | S | |
| 6 | C | |
| 7 | E | |

State 5
| Rows | Input | Action |
| ---- | ----- | ----- |
| 0 | if | |
| 1 | then | Shift 7 |
| 2 | a | |
| 3 | b | |
| 4 | S | |
| 5 | $ | |
| 6 | C | |
| 7 | E | |

State 6
| Rows | Input | Action |
| ---- | ----- | ----- |
| 0 | if | |
| 1 | then | Reduce 3|
| 2 | a | |
| 3 | b | |
| 4 | $ | |
| 5 | S | |
| 6 | C | |
| 7 | E | |

State 7
| Rows | Input | Action |
| ---- | ----- | ----- |
| 0 | if | |
| 1 | then | |
| 2 | a | |
| 3 | b | Shift 4 |
| 4 | $ | |
| 5 | S | |
| 6 | C | 8 |
| 7 | E | |

State 8
| Rows | Input | Action |
| ---- | ----- | ----- |
| 0 | if | |
| 1 | then | |
| 2 | a | |
| 3 | b | |
| 4 | $ |Reduce 1|
| 5 | S | |
| 6 | C | |
| 7 | E | |

# Step five:

Calculate the follow and first sets:

Follow(S') = {$}

Follow(S) = {$}

Follow(E) = {then}

Follow(C) = {$}

# Create lr table for the grammar:

| States | if  | a   | then | b   | $      | S   | C   | E   |
| ------ | --- | --- | ---- | --- | ------ | --- | --- | --- |
| 0      | S2  |     |      | S4  |        | 1   | 3   |     |
| 1      |     |     |      |     | Accept |     |     |     |
| 2      |     | S6  |      |     |        |     |     | 5   |
| 3      |     |     |      |     | R2     |     |     |     |
| 4      |     |     |      |     | R4     |     |     |     |
| 5      |     |     | S7   |     |        |     |     |     |
| 6      |     |     | R3   |     |        |     |     |     |
| 7      |     |     |      | S4  |        |     | 8   |     |
| 8      |     |     |      |     | R1     |     |     |     |
