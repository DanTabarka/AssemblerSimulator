import "./processorInstructions.css"

function ProcessorInstructions () {


    return (
        <div className="container">
        <h1>Úvod</h1>
        <div className="instruction">
            <h3>Syntax</h3>
            <pre>
{`instrukce argumenty            // komentář`}
            </pre>
        </div>
        <div className="instruction">
            <h3>Formát čísla</h3>
            <pre>
{`desítkově: 200
hexadecimálně: 0xC8
binárně: 11001000`}
            </pre>
        </div>
        <div className="instruction">
            <h1>Program Hello world!</h1>
            <pre>
{`movr a 111
movr b 108
movr c 101
movr d 72
push a		// o
push b		// l
push b		// l
push c		// e
push d		// H
put
put
put
put
put
push 32		// mezera
put
push 100	// d
push 108	// l
push 114	// r
push 111	// o
push 119	// w
put
put
put
put
put
push 33		// !
put
push 32		// mezera
put
push 41		// )
push 58		// :
put
put
halt`}
            </pre>
        </div>
        <div className="instruction">
            <h1>Program Cyklus</h1>
            <pre>
{`movr c 5	// pocet cyklu

// zacatek cyklu
push c		// vtlaci hodnotu reg C do zasobniku
dec c		// snizi reg C o jedna
cmp c 0		// porovnani
jz 10		// pokud Zero tak vyskoci ven z cyklu
loop 3		// cyklus

halt		// konec`}
            </pre>
        </div>
        <div className="instruction">
            <h1>Program Tutorial</h1>
            <pre>
{`// Inicializace zásobníku
PUSH 10      // Push první číslo na zásobník
PUSH 20      // Push druhé číslo na zásobník

// Načíst čísla ze zásobníku do registrů
POP B        // Registr B = 20
POP C        // Registr C = 10

// Sčítání čísel
ADD B C      // Registr B = 20 + 10 = 30

// Rozdělení výsledku na 2
MOVR D 10       // Nastavit registr D na 10
PUSH 2       // Push číslo 2 na zásobník
POP D        // Registr D = 2

// Dělení
DIV B D      // Registr B = 30 / 2 = 15

// Prohození hodnot registrů
SWAP D B      // Registr D <=> B

// Zvýšení hodnoty v registru D
INC D        // Registr D = 15 + 1 = 16

// Srovnání
CMP D 16     // Porovnat registr D (16) s číslem 16
JZ 24       // Skok, pokud jsou stejné
LOOP 32     // preskoci HALT
HALT                    // Ukončit program

// Logické operace
MOVR A 5      // Nastavit registr A na 5
MOVR B 3      // Nastavit registr B na 3

AND A B      // Logický AND mezi registry A a B (101 & 011 = 001)
OR A B       // Logický OR mezi registry A a B (001 | 011 = 011)
XOR A B      // Logický XOR mezi registry A a B (011 ^ 011 = 000)

// Posun bitů
PUSH 4       // Push číslo 4 na zásobník
POP D        // Registr D = 4
SHL D        // Posun vlevo (4 << 1 = 8)

// Skočit na konec programu
LOOP 30       // Skok na konec programu

HALT                    // Ukončit program`}
            </pre>
        </div>
        <h1>Instrukce</h1>
        <div className="instruction">
            <h3>Bez operace</h3>
            <pre>
{`NOP           // No Operation`}
            </pre>
            <p>Neudělá nic</p>
        </div>
        <div className="instruction">
            <h3>Sčítání a odčítání</h3>
            <pre>
{`ADD reg num           // Addition
ADD reg reg
SUB reg num           // Subtraction
SUB reg reg`}
            </pre>
            <p>Sečtě nebo odečte dvě čísla dohromady a výsledek uloží do prvního registru</p>
        </div>
        <div className="instruction">
            <h3>Násobení a dělení</h3>
            <pre>
{`MUL reg num           // Multiplication
MUL reg reg
DIV reg num           // Division
DIV reg reg`}
            </pre>
            <p>Vynásobí nebo vydělí dvě čísla dohromady a výsledek uloží do prvního registru</p>
        </div>
        <div className="instruction">
            <h3>Inkrementace a dekrementace</h3>
            <pre>
{`INC reg           // Increase
DEC reg           // Decrease`}
            </pre>
            <p>Zvýší nebo sníží hodnotu registru o 1</p>
        </div>
        <div className="instruction">
            <h3>Cyklus</h3>
            <pre>
{`LOOP address`}
            </pre>
            <p>Skočí na číslo řádku</p>
        </div>
        <div className="instruction">
            <h3>Vložení hodnoty do registru</h3>
            <pre>
{`MOVR reg          // Move to registr`}
            </pre>
            <p>Vloží do registru konstantu zapsanou desítkově</p>
        </div>
        <div className="instruction">
            <h3>Práce se zásobníkem</h3>
            <pre>
{`PUSH reg
PUSH num
POP reg`}
            </pre>
            <p>Vtlačí hodnotu registru nebo konstantu do zásobníku a nebo vybere ze zásobníku hodnotu a vloží ji do registru</p>
        </div>
        <div className="instruction">
            <h3>Prohození</h3>
            <pre>
{`SWAP reg reg`}
            </pre>
            <p>Prohodí hodnoty registrů</p>
        </div>
        <div className="instruction">
            <h3>Práce se vstupem a výstupem</h3>
            <pre>
{`GET
PUT`}
            </pre>
            <p>Vezme znak ze vstupu a vloží ho na zásobník nebo vyjme hodnotu ze zásobníku a vytiskne ji na výstup</p>
        </div>
        <div className="instruction">
            <h3>Porovnávání</h3>
            <pre>
{`CMP reg reg           // Compare
CMP reg num`}
            </pre>
            <p>Porovná dvě hodnoty a nastaví příznaky</p>
        </div>
        <div className="instruction">
            <h3>Logické instrukce</h3>
            <pre>
{`AND reg reg
AND reg num
OR reg reg
OR reg num
XOR reg reg
XOR reg num
NOT reg`}
            </pre>
            <p>Logický součin, logický součet, výlučná disjunkce, negace</p>
        </div>
        <div className="instruction">
            <h3>Binární posun</h3>
            <pre>
{`SHL reg         // Shift Left
SHR reg         // Shift Right`}
            </pre>
            <p>Posune hodnotu registru o 1 bit doleva nebo doprava</p>
        </div>
        <div className="instruction">
            <h3>Skoky</h3>
            <pre>
{`JZ num          // Jump if Zero
JNZ num         // Jump if Not Zero
JS num          // Jump if Sign
JNS num         // Jump if Not Sign`}
            </pre>
            <p>Pokud je splněna podmínka tak skočí na číslo řádku</p>
        </div>
        <div className="instruction">
            <h3>Zastavení procesoru</h3>
            <pre>
{`HALT`}
            </pre>
            <p>Zastaví procesor</p>
        </div>
        


    </div>
    )

}

export default ProcessorInstructions;
