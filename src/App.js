import React from 'react';
import ReactDOM from 'react-dom'
import logo from './logo.svg';
import deimos from './deimos.png';
import earth from './earth.png';
import red_dot from './red_dot.png'
import './App.css';

var instance = 0; // delete this later

// HTML export functions

export function App() {
  const app = (
    <div className="App">
    <header className="App-header">
      {/* <script type="text/javascript" src="PrimeFunctions.js"></script> */}
      <p>
        Prime Number Calculator and Visualiser
      </p>
      {/* <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a> */}
    </header><br></br><br></br>
  </div>
  )

  return (app);
}

export function PlanetsVisualisation(arg){
  let bPrimePlanet = true;
  if (!arg){
    console.log("Error: when calling up planet visualisation, no boolean value passed. Assuming boolean is true.");
  } else{
    if (arg.value == 'false') bPrimePlanet = false;
  }

  if (bPrimePlanet){
    return (
    <div className="item">
      <img src={red_dot} id = "primePlanet" className="App-logo" alt="logo" />
      <span className="Caption">Text below image 1</span>
    </div>);
  } else{
    return (
      <div className="item">
        {/* <img src={deimos} id = "referencePlanet" className="Test-Class" alt="logo" /> */}
        <img src={deimos} id = "referencePlanet" alt="logo" />
        <span className="Caption">Text below image 2</span>
      </div>
    );
  }
}

export function ReactLogo() {
  const reactLogo = (
    <div>
      <p> This is instance {instance}</p>
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  )
  instance++;
  return (reactLogo);
}

export function CurrentNumberDisplay(){
  const numDisplay = (
    <div>
      <br></br>
      <table>
        <tr>
            <td><p id = "prevprevNum">2</p></td>
            <td><p id = "previousNum">3</p></td>
            <td><p id = "currentNum">5</p></td>
            <td><p id = "nextNum">7</p></td>
            <td><p id = "nextnextNum">11</p></td>
        </tr>
      </table>

      <p id="NumberDescription">This is a prime number.</p>

      <form id = "NumberEntry"> 
        Enter a number: 
        <input type="int" id = "EnteredNum" size="20"/>
      </form>
      <br></br>

      <button onClick={prevTwinButton}>Find Previous Twin</button>
      <button onClick={previousButton}>Find Previous</button>
      <button onClick={checkButton}>Check</button>
      <button onClick={nextButton}>Find Next</button>
      <button onClick={nextTwinButton}>Find Next Twin</button>
    </div>
  )
  return numDisplay;
}

// Button functions & classes
function checkButton(){
  var Num = Number(document.getElementById("EnteredNum").value);
  if (Num == NaN || Num <= 0){
      document.getElementById("NumberDescription").innerHTML = "Invalid Entry. Type in a non-negative non-zero whole number.";
      // make it go red
      return;
  }
  updateDisplay(Num);
}

function nextButton(){
  var currentNum = getCurrentNum();
  if (currentNum == NaN){
      setErrorMessage();
      return;
  }
  currentNum = findNextPrime(currentNum);
  updateDisplay(currentNum);
}

function nextTwinButton(){
  var currentNum = getCurrentNum();
  if (currentNum == NaN){
      setErrorMessage();
      return;
  }
  currentNum = findNextTwin(currentNum);
  updateDisplay(currentNum);
}

function previousButton(){
  var currentNum = getCurrentNum();
  if (currentNum == NaN){
      setErrorMessage();
      return;
  }
  currentNum = findPreviousPrime(currentNum);
  updateDisplay(currentNum);
}

function prevTwinButton(){
  var currentNum = getCurrentNum();
  if (currentNum == NaN){
      setErrorMessage();
      return;
  }
  currentNum = findPrevTwin(currentNum);
  updateDisplay(currentNum);
}

// Prime functions & classes

function isPrime(numToCheck){
  // early return special cases
  if (numToCheck == 1) return false;
  if (numToCheck == 2) return true;
  if (numToCheck%2 == 0) return false;
  let currentNum = 3;
  if (numToCheck < 555444333222111){
      let maxCheck = Math.floor(Math.sqrt(numToCheck));

      while (currentNum <= maxCheck){
          if (numToCheck%currentNum == 0) return false;
          currentNum += 2;
      }
      return true;
  }
  else{
      // probabilistic checks
      while (currentNum <= 10000){
          if (numToCheck%currentNum == 0) return false;
          currentNum += 2;
      }
      // fermat

      return true;
  }
}


// This is probs broken.
function getCurrentNum(){
  return Number(document.getElementById("currentNum").innerHTML);
}

function setErrorMessage(){
  document.getElementById("NumberDescription").innerHTML = "Enter a number first.";
}

function displayNumDescription(Num){
  if (isPrime(Num)){
      document.getElementById("NumberDescription").innerHTML = "This is a prime number.";
  }
  else{
      document.getElementById("NumberDescription").innerHTML = "This is not a prime number.";
  }
}

function displayNum(Num){
  document.getElementById("currentNum").innerHTML = Num;
}

function updateDisplay(Num){
  displayNum(Num);
  displayPreviousAndNext(Num);
  displayNumDescription(Num);
  if (isPrime(Num)){
      checkIfTwinsAndDisplay(Num);
  }
  visualisePrime(Num);
}

function visualisePrime(Num){
  var currentNum = getCurrentNum();
  if (currentNum == NaN){
      setErrorMessage();
      return;
  }

  var primePlanet = document.getElementById("primePlanet");
  var referencePlanet = document.getElementById("referencePlanet");
  // var referencePlanet = document.getElementsByClassName("Test-Class")[0];
  if (primePlanet && referencePlanet){
    var referencewidth = 0;
    var referencelength = 0;
    var primewidth = 0;
    var primelength = 0;
    if (currentNum < 1000000000){
        // case 2: reference planet greater. prime planet = 800px
        referencewidth = 800;
        referencelength = 800;
        const scale = referencewidth/(2*1000000000);
        let widlen = scale * Math.ceil(Math.pow((3/4)*currentNum*Math.PI,(1/3)));
        primewidth = widlen;
        primelength = widlen;
    }
    else{
        // case 2: prime planet greater. prime planet = 800px
        primewidth = 800;
        primelength = 800;
        const scale = primewidth/(2*1000000000);
        let widlen = scale * Math.ceil(Math.pow((3/4)*currentNum*Math.PI,(1/3)));
        referencewidth = widlen;
        referencelength = widlen;
    }

    // earth is 1 trillion cubic km
    // vol of a sphere is 4*pi/3 * r^3
    // Earth's radius will be.. 400px
    // given vol, to get radius you: r = (3/4pi vol)^(1/3)
    // then scale radius down. So radius *= earth img radius (400) / earth actual radius
    // Initially: big earth (800px?).
    // while volume is less than half of earth, alter the red dot.
    // while volume is less than 5x of earth, alter earth.
    
    // When setting, must be in the format specified below.
    console.log(referencewidth);  
    console.log(primewidth);
    console.log(typeof(referencePlanet));
    // referencePlanet.style.height = convertNumToPX(150);
    // referencePlanet.style.width = convertNumToPX(4);
    // referencePlanet.style.maxWidth = 10;
    // referencePlanet.style.minWidth = 10;
    
    // referencePlanet.style.width = convertNumToPX(referencewidth);
    // referencePlanet.style.height = convertNumToPX(referencelength);
    // primePlanet.style.width = convertNumToPX(primewidth);
    // primePlanet.style.height = convertNumToPX(primelength);
  }
}

function checkIfTwinsAndDisplay(Num){
  if (isPrime(Num+2)){
      document.getElementById("NumberDescription").innerHTML = Num + " is twin primes with " + (Num+2) + ".";
  }
  if (isPrime(Num-2)){
      document.getElementById("NumberDescription").innerHTML = Num + " is twin primes with " + (Num-2) + ".";
  }
}

function displayPreviousAndNext(Num){
  let nextNum = findNextPrime(Num);
  let nextnextNum = findNextPrime(nextNum);
  let prevNum = findPreviousPrime(Num);
  let prevprevNum = findPreviousPrime(prevNum);
  document.getElementById("prevprevNum").innerHTML = prevprevNum;
  document.getElementById("previousNum").innerHTML = prevNum;
  document.getElementById("nextNum").innerHTML = nextNum;
  document.getElementById("nextnextNum").innerHTML = nextnextNum;
}

function findNextPrime(Num){
  Num += 1;
  while (!isPrime(Num)) Num++;
  return Num;
}

function findPreviousPrime(Num){
  if (Num > 2){
      Num -= 1;
      while (!isPrime(Num)) Num--;
  }
  return Num;
}

function findNextTwin(Num){
  Num = findNextPrime(Num);
  while (!isPrime(Num+2)){
      Num = findNextPrime(Num);
  }
  return Num;
}

function findPrevTwin(Num){
  Num = findPreviousPrime(Num);
  while (!isPrime(Num-2)){
      Num = findPreviousPrime(Num);
      if (Num == 2) return 2;
  }
  return Num;
}

function convertNumToPX(inNum){
  return Number.toString(inNum) + "px";
}