/*
=====================================================
            JAVASCRIPT EXECUTION CONTEXT
=====================================================

Execution Context = Environment where JavaScript code executes.

Types:
1. Global Execution Context (GEC)
2. Function Execution Context (FEC)
3. Eval Execution Context (Rarely Used)

-----------------------------------------------------
EXAMPLE
-----------------------------------------------------

let val1 = 10;
let val2 = 5;

function addNum(num1, num2){
    let total = num1 + num2;
    return total;
}

let result1 = addNum(val1, val2);
let result2 = addNum(10, 2);

-----------------------------------------------------
STEP 1 : GLOBAL EXECUTION CONTEXT CREATED
-----------------------------------------------------

When JS starts running:

this -> window (Browser)
this -> global (Node.js)

Only ONE Global Execution Context exists.

-----------------------------------------------------
STEP 2 : MEMORY CREATION PHASE
-----------------------------------------------------

JS scans the complete code before execution.

Memory Allocation:

val1     -> undefined
val2     -> undefined
addNum   -> function definition
result1  -> undefined
result2  -> undefined

Visual:

┌──────────────────────┐
│      GEC MEMORY      │
├──────────────────────┤
│ val1    -> undefined │
│ val2    -> undefined │
│ addNum  -> function  │
│ result1 -> undefined │
│ result2 -> undefined │
└──────────────────────┘

-----------------------------------------------------
STEP 3 : EXECUTION PHASE
-----------------------------------------------------

Code executes line by line.

val1 = 10
val2 = 5

Memory becomes:

┌───────────────────┐
│   GEC EXECUTION   │
├───────────────────┤
│ val1 -> 10        │
│ val2 -> 5         │
│ addNum -> func    │
│ result1 ->  ?     │
│ result2 -> ?      │
└───────────────────┘

-----------------------------------------------------
FUNCTION CALL : addNum(val1,val2)
-----------------------------------------------------

A NEW Function Execution Context (FEC) is created.

-----------------------------------------------------
FUNCTION MEMORY PHASE
-----------------------------------------------------

num1  -> undefined
num2  -> undefined
total -> undefined

┌──────────────────────┐
│      FEC MEMORY      │
├──────────────────────┤
│ num1  -> undefined   │
│ num2  -> undefined   │
│ total -> undefined   │
└──────────────────────┘

-----------------------------------------------------
FUNCTION EXECUTION PHASE
-----------------------------------------------------

num1 = 10
num2 = 5

total = num1 + num2
total = 15

return total

┌──────────────────────┐
│    FEC EXECUTION     │
├──────────────────────┤
│ num1  -> 10          │
│ num2  -> 5           │
│ total -> 15          │
└──────────────────────┘

Returned Value = 15

result1 = 15

Function Execution Context is deleted.

-----------------------------------------------------
SECOND FUNCTION CALL
-----------------------------------------------------

addNum(10,2)

New FEC Created

num1 = 10
num2 = 2

total = 12

return 12

result2 = 12

Function Context Deleted

-----------------------------------------------------
CALL STACK
-----------------------------------------------------

START

┌───────┐
│ GEC   │
└───────┘

addNum(10,5)

┌─────────────┐
│ addNum FEC  │
├─────────────┤
│ GEC         │
└─────────────┘

Return 15

┌───────┐
│ GEC   │
└───────┘

addNum(10,2)

┌─────────────┐
│ addNum FEC  │
├─────────────┤
│ GEC         │
└─────────────┘

Return 12

┌───────┐
│ GEC   │
└───────┘

END

EMPTY STACK

-----------------------------------------------------
WHAT'S INSIDE AN EXECUTION CONTEXT?
-----------------------------------------------------

1. Variable Environment
   - Variables
   - Functions

2. Lexical Environment
   - Scope Chain
   - Outer Environment Reference

3. this Keyword

-----------------------------------------------------
EVAL EXECUTION CONTEXT
-----------------------------------------------------

eval("let x = 10");

Creates a special execution context for code
inside eval().

Rarely used because:
- Slow
- Hard to debug
- Security risks

-----------------------------------------------------
FLOW OF EXECUTION
-----------------------------------------------------

JS Starts
   ↓
Global Execution Context
   ↓
Memory Creation Phase
   ↓
Execution Phase
   ↓
Function Call?
   ↓
Create Function Execution Context
   ↓
Memory Phase
   ↓
Execution Phase
   ↓
Return Value
   ↓
Delete Function Context
   ↓
Back To Global Context

-----------------------------------------------------
INTERVIEW REVISION
-----------------------------------------------------

✓ JavaScript is Single Threaded.
✓ Every Execution Context has:
      1. Memory Phase
      2. Execution Phase
✓ Function call creates a new Function Execution Context.
✓ Contexts are managed using Call Stack.
✓ After return, Function Context is destroyed.
✓ Only one Global Execution Context exists.
✓ Eval creates Eval Execution Context.

=====================================================
END OF NOTES
=====================================================
*/