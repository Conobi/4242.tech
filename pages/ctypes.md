# The different types in C

| Type                   | Lower bound          | Upper bound          | Bits    |
|------------------------|----------------------|----------------------|---------|
| **signed char**        | -128                 | 127                  | 8 bits  |
| **unsigned char**      | 0                    | 255                  | 8 bits  |
| **short**              | -32768               | 32767                | 16 bits |
| **unsigned short**     | 0                    | 65535                | 16 bits |
| **int**                | -2147483648          | 2147483647           | 32 bits |
| **unsigned int**       | 0                    | 4294967295           | 32 bits |
| **long**               | -2147483648          | 2147483647           | 32 bits |
| **unsigned long**      | 0                    | 4294967295           | 32 bits |
| **long long**          | −9223372036854775807 | 9223372036854775807  | 64 bits |
| **unsigned long long** | 0                    | 18446744073709552000 | 64 bits |

> **Note :** On 16 bits CPU, `int` and `unsigned int` are stored on 16 bits. In this case, they got the same bounds as short on this table.

## Tip : How to get these values using `bc`
With `x` the size in `bits - 1` of the type,  ; you can calculate these values using bc, doing:  
`echo 2^x-1 | bc` ←  Will give you the upper bound  
`echo -2^x | bc` ←  Will give you the lower bound  
For e.g: `echo -2^31 | bc` will return you `-2147483648`.
