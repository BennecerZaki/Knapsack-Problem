import React, { useState } from "react";
import Tilt from "react-vanilla-tilt";
import "./App.css";
import Card from "./Card";

function App() {
  const [max, setMax] = useState("");
  const [displayMax, setDisplayMax] = useState(false);
  const [maxGain, setMaxGain] = useState(0);
  const [tab, setTab] = useState([]);

  const [value, setValue] = useState("");
  const [gain, setGain] = useState("");
  const [items, setItems] = useState([]);

  const maxKnapsack = (myTable, W) => {
    let cache = [];
    for (let g = 0; g < myTable.length + 1; g++) {
      cache[g] = [];
      for (let h = 0; h < W + 1; h++) {
        cache[g][h] = 0;
      }
    }
    let weights = myTable.map((item) => item.weight);
    console.log(weights);
    let values = myTable.map((item) => item.value);
    console.log(values);
    for (let i = 0; i < myTable.length + 1; i++) {
      for (let j = 0; j < W + 1; j++) {
        if (i === 0 || j === 0) cache[i][j] = 0;
        else if (weights[i - 1] <= j) {
          let included = values[i - 1] + cache[i - 1][j - weights[i - 1]];

          let excluded = cache[i - 1][j];
          cache[i][j] = Math.max(included, excluded);
        } else cache[i][j] = cache[i - 1][j];
      }
    }

    console.log(cache);
    let tab = [];
    let i = myTable.length - 1;
    let j = W;
    let m = myTable.length;

    while (m > 0) {
      console.log("/////////////////////////////");
      console.log("cache[i - 1][j] : " + cache[m - 1][j]);
      console.log("cache[i][j] : " + cache[m][j]);
      console.log("/////////////////////////////");
      if (cache[m][j] !== cache[m - 1][j]) {
        tab.push({
          value: values[i],
          weight: weights[i],
        });
        console.log(tab);
        for (let k = 0; k < j; k++) {
          if (cache[m - 1][k] === cache[m][j] - values[i]) {
            console.log("J before : " + j);
            console.log("I : " + i);
            console.log("cache[i - 1][k] : " + cache[i - 1][k]);
            console.log("cache[i][j] : " + cache[i][j]);
            console.log("values[i] : " + values[i]);
            j = k;
            console.log("J after : " + j);
          }
        }
      }
      m--;
      i--;
    }
    setTab(tab);
    setMaxGain(cache[myTable.length][W]);
  };

  const handleMax = ({ target }) => {
    console.log(`max 👉 :`, target.value);
    setMax(target.value);
  };
  const handleValue = ({ target }) => {
    setValue(target.value);
  };
  const handleGain = ({ target }) => {
    setGain(target.value);
  };

  const handleValidMax = () => {
    console.log(`max : 💯`, max);
    setDisplayMax(true);
    document.getElementById("valeur").focus();
    document.getElementById("max").disabled = true;
  };

  const handleAddItem = () => {
    if (gain && value) {
      setItems(
        items.concat({
          value: Number(value),
          weight: Number(gain),
        })
      );
      setGain("");
      setValue("");
    }
    console.log(items);
  };

  return (
    <div className="app">
      <h1>
        TP1 TPGO :<br />
        Problème du Sac à dos
      </h1>
      <div className="container">
        <br />
        <Tilt>
          <div className="card">
            <div className="content">
              <h2>01</h2>
              <h3>Première Etape</h3>
              <p>Définir La taille maximale du sac-à-dos.</p>
              <div>
                <label htmlFor="">🔢</label>
                <input
                  id="max"
                  type="number"
                  placeholder="Entrez le max du sac-à-dos"
                  min="0"
                  value={max}
                  onChange={handleMax}
                />
              </div>
              {displayMax && (
                <p className="result">
                  Max : <strong>{max}</strong>
                </p>
              )}
              <button onClick={handleValidMax}>Valider Max</button>
            </div>
          </div>
        </Tilt>
        <Tilt>
          <div className="card">
            <div className="content">
              <h2>02</h2>
              <h3>Deuxième Etape</h3>
              <p>Ajouter des éléments avec une valeur et un gain</p>
              <div>
                <label>💰</label>
                <input
                  id="valeur"
                  type="number"
                  placeholder="Entrez la valeur de l'élément"
                  min="0"
                  value={value}
                  onChange={handleValue}
                />
              </div>
              <div>
                <label>⚖️</label>
                <input
                  id="gain"
                  type="number"
                  placeholder="Entrez le poid de l'élément"
                  min="0"
                  value={gain}
                  onChange={handleGain}
                />
              </div>
              <button onClick={handleAddItem}>Ajouter Element</button>
            </div>
          </div>
        </Tilt>
        <Tilt>
          <div className="card">
            <div className="content">
              <h2>03</h2>
              <h3>Troisième Etape</h3>
              <p>
                Le résultat de l'algorithme est <br />
                👇👇👇
              </p>
              <h3>{maxGain}</h3>
              <button onClick={() => maxKnapsack(items, max)}>
                Voir le Résultat
              </button>
            </div>
          </div>
        </Tilt>
        {items.map((item, index) => {
          if (
            tab.some((e) => e.value === item.value && e.weight === item.weight)
          ) {
            console.log("true");
            return (
              <Tilt>
                <Card
                  key={index}
                  value={item.value}
                  weight={item.weight}
                  color={true}
                />
              </Tilt>
            );
          } else {
            console.log("ff");
            return (
              <Tilt>
                <Card
                  key={index}
                  value={item.value}
                  weight={item.weight}
                  color={false}
                />
              </Tilt>
            );
          }
        })}
      </div>
    </div>
  );
}

export default App;
