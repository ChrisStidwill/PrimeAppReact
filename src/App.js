import React, {useState} from 'react';
import ReactDOM from 'react-dom'
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
      <p>Prime Number Calculator and Visualiser</p>
    </header><br></br><br></br>
  </div>
  )

  return (app);
}

//Commented functions are where functionality is being implemented.
export function PlanetsVisualisation(arg){
  // const [bShouldShowEarth, setbShouldShowEarth] = useState(false)
  let bPrimePlanet = true;
  const imageRef=React.useRef();
  if (!arg){
    console.log("Error: when calling up planet visualisation, no boolean value passed. Assuming boolean is true.");
  } else{
    if (arg.value == 'false') bPrimePlanet = false;
  }

  if (bPrimePlanet){
    return (
    <div className="item">
      <img src={red_dot} id = "primePlanet" className="App-logo" alt="logo" />
      <span className="Caption">Prime number as cubic km</span>
    </div>);
  } else{
    //edit here
    let bShouldShowEarth = true;
    return (
      <div className="item">
        {bShouldShowEarth ? (
          <img src={earth} id = "referencePlanet" ref={imageRef} className="App-logo" alt="logo" />
        ) : (
          <img src={deimos} id = "referencePlanet" ref={imageRef} className="App-logo" alt="logo" />
        )}
        {bShouldShowEarth ? (
          <span className="Caption">Earth</span>
        ) : (
          <span className="Caption">Deimos, moon of Mars</span>
        )}
      </div>
    );
  }
}

// old return
//<div className="item">
//{/* <img src={deimos} id = "referencePlanet" className="Test-Class" alt="logo" /> */}
//<img src={earth} id = "referencePlanet" ref={imageRef} className="App-logo" alt="logo" />
//<span className="Caption">Earth</span>
//</div>

export function CurrentNumberDisplay(){
  const numDisplay = (
    <div>
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

// Prime functions

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
    const defaultDimensions = 250;
    //find radius of referenceplanet
    var referencePlanetRadius;// where 1000 is the km^3 of deimos
    let primePlanetRadius = (Math.pow((3/4)*currentNum/Math.PI,(1/3)));
    if (currentNum < 100000){
        // case 1: Deimos used as reference.
        referencePlanetRadius = (Math.pow((3/4)*1000/Math.PI,(1/3)));
        // referencePlanet.src.innerHTML = deimos;

        if (currentNum < 1000){
          //Deimos set to 250px
          referencewidth = defaultDimensions;
          referencelength = defaultDimensions;
          const scale = primePlanetRadius/referencePlanetRadius; //scale such that 1000 km^3 represents 'defaultDimensions' pixels
          let newDimensions = scale * defaultDimensions;
          primewidth = newDimensions;
          primelength = newDimensions;
        } else{
          // prime planet set to 250px
          primewidth = defaultDimensions;
          primelength = defaultDimensions;
          const scale = referencePlanetRadius/primePlanetRadius; //scale such that 1000 km^3 represents 'defaultDimensions' pixels
          let newDimensions = scale * defaultDimensions;
          referencewidth = newDimensions;
          referencelength = newDimensions;
        }
    } else{
        // case 2: Earth used as reference.
        referencePlanetRadius = (Math.pow((3/4)*1000000000000/Math.PI,(1/3)));
        let bDisplayEarth = (currentNum < 100000)
        // imageRef.current.src = bDisplayEarth === 'true' ? {earth} : {deimos};

        if (currentNum < 1000000000000){
          referencewidth = defaultDimensions;
          referencelength = defaultDimensions;
          const scale = primePlanetRadius/referencePlanetRadius; //scale such that 1000 km^3 represents 'defaultDimensions' pixels
          let newDimensions = scale * defaultDimensions;
          primewidth = newDimensions;
          primelength = newDimensions;
        }
        else{
          primewidth = defaultDimensions;
          primelength = defaultDimensions;
          const scale = referencePlanetRadius/primePlanetRadius; //scale such that 1000 km^3 represents 'defaultDimensions' pixels
          let newDimensions = scale * defaultDimensions;
          referencewidth = newDimensions;
          referencelength = newDimensions;
        }
    }

    referencePlanet.style.width = convertNumToPX(referencewidth);
    referencePlanet.style.height = convertNumToPX(referencelength);
    primePlanet.style.width = convertNumToPX(primewidth);
    primePlanet.style.height = convertNumToPX(primelength);
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
  return inNum + "px";
}