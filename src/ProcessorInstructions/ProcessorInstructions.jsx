import "./processorInstructions.css"

function ProcessorInstructions () {


    return (
        <div class="container">
        <h1>Úvod</h1>
        <div class="instruction">
            <h3>Syntax</h3>
            <pre>
{`instrukce argumenty            // komentář`}
            </pre>
        </div>
        <div class="instruction">
            <h3>Formát čísla</h3>
            <pre>
{`desítkově: 200
hexadecimálně: 0xC8
binárně: 11001000`}
            </pre>
        </div>
        <h1>Program Hello!</h1>
        <h1>Program Cyklus</h1>
        <h1>Instrukce</h1>
        <div class="instruction">
            <h3>Bez operace</h3>
            <pre>
{`NOP           // No Operation`}
            </pre>
            <p>Neudělá nic</p>
        </div>
        <div class="instruction">
            <h3>Sčítání a odčítání</h3>
            <pre>
{`ADD reg num           // Addition
ADD reg reg
SUB reg num           // Subtraction
SUB reg reg`}
            </pre>
            <p>Sečtě nebo odečte dvě čísla dohromady a výsledek uloží do prvního registru</p>
        </div>
        <div class="instruction">
            <h3>Násobení a dělení</h3>
            <pre>
{`MUL reg num           // Multiplication
MUL reg reg
DIV reg num           // Division
DIV reg reg`}
            </pre>
            <p>Vynásobí nebo vydělí dvě čísla dohromady a výsledek uloží do prvního registru</p>
        </div>
        <div class="instruction">
            <h3>Inkrementace a dekrementace</h3>
            <pre>
{`INC reg           // Increase
DEC reg           // Decrease`}
            </pre>
            <p>Zvýší nebo sníží hodnotu registru o 1</p>
        </div>
        <div class="instruction">
            <h3>Cyklus</h3>
            <pre>
{`LOOP address`}
            </pre>
            <p>Skočí na číslo řádku</p>
        </div>
        <div class="instruction">
            <h3>Vložení hodnoty do registru</h3>
            <pre>
{`MOV reg          // Move to registr`}
            </pre>
            <p>Vloží do registru konstantu zapsanou desítkově</p>
        </div>
        <div class="instruction">
            <h3>Práce se zásobníkem</h3>
            <pre>
{`PUSH reg
PUSH num
POP reg`}
            </pre>
            <p>Vtlačí hodnotu registru nebo konstantu do zásobníku a nebo vybere ze zásobníku hodnotu a vloží ji do registru</p>
        </div>
        <div class="instruction">
            <h3>Prohození</h3>
            <pre>
{`SWAP reg reg`}
            </pre>
            <p>Prohodí hodnoty registrů</p>
        </div>
        <div class="instruction">
            <h3>Práce se vstupem a výstupem</h3>
            <pre>
{`GET
PUT`}
            </pre>
            <p>Vezme znak ze vstupu a vloží ho na zásobník nebo vyjme hodnotu ze zásobníku a vytiskne ji na výstup</p>
        </div>
        <div class="instruction">
            <h3>Porovnávání</h3>
            <pre>
{`CMP reg reg           // Compare
CMP reg num`}
            </pre>
            <p>Porovná dvě hodnoty a nastaví příznaky</p>
        </div>
        <div class="instruction">
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
        <div class="instruction">
            <h3>Binární posun</h3>
            <pre>
{`SHL reg         // Shift Left
SHR reg         // Shift Right`}
            </pre>
            <p>Posune hodnotu registru o 1 bit doleva nebo doprava</p>
        </div>
        <div class="instruction">
            <h3>Skoky</h3>
            <pre>
{`JZ num          // Jump if Zero
JNZ num         // Jump if Not Zero
JS num          // Jump if Sign
JNS num         // Jump if Not Sign`}
            </pre>
            <p>Pokud je splněna podmínka tak skočí na číslo řádku</p>
        </div>
        <div class="instruction">
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
