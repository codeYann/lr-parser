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
S' -> S.
S -> .if E then C
S -> if.E then C
S -> if E.then C
S -> if E then.C
S -> if E then C.
S -> .C
S -> C.
E -> .a
E -> a.
C -> .b
C -> b.
```

# Step three

Create a closure for the grammar:

$ I\_{0} = Closure(\{[S' \rightarrow .S]\}) = \{[S' \rightarrow .S], [\text{.if E then C}], [.C], [.b]\}$

$I_{1} = Closure(\{[\})$
