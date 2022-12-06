import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, Image, Text, StatusBar } from 'react-native';
import FlatButton from './componentes/flatButton';

export default function App() {
  const [hasWon, setHasWon] = useState(false); //Verifica si ya acerto la palabra
  const [hasLost, setHasLost] = useState(false); //Verifica si ya perdio la partida
  const [palabra, setPalabra] = useState(""); //La palabra que se tiene a adivinar en el momento
  const [intento, setIntento] = useState(0); //Los intentos que lleva
  const [cantAcertadas, setCantAcertadas] = useState(0); //Cantidad de palabras acertadas
  const [cantFalladas, setCantFalladas] = useState(0); //Cantidad de palabras falladas
  const [progreso, setProgreso] = useState([]); //Representara las letras acertadas en sus respectivas posiciones
  const [erroneas, setErroneas] = useState([]); //Representara las letras erroneas introducidas
  
  const palabras = ["California","Naturaleza","Sagrado","Iztapalapa","Pantera","Caballo","Armadura","Maestro","Anciano",
                    "Escondite","Sandalias","Capucha","Chaqueta","Martillo","Cuchillo","Resistencia","Tortilla","Tlaxcala",
                    "Blindado","Demolicion","Espectro","Mercenario","Anguila","Guardian","Conocimiento","Explosion","Lingote",
                    "Reliquia","Pergamino","Corrompido","Caballero","Trabajador","Guadalajara","Biblioteca","Inventario"];
  
  const getRandomWord = () => {
    setErroneas("");
    setHasWon(false);
    setHasLost(false);
    setIntento(0);
    let newPalabra = "";
    do{
      newPalabra = palabras[Math.floor(Math.random()*palabras.length)];
    }while(palabra == newPalabra);
    setPalabra(newPalabra);
    //Rellenar la representacion de los aciertos de letras
    setProgreso(Array(newPalabra.length).fill("-"));
  }

  const matchLetterInWord = (letter) => {
    let coincidencias = 0;
    let nextProgreso = [];
    //Verifica si la letra esta en una o mas posiciones
    for(let i=0; i<palabra.length; i++){
      if(palabra[i] == letter || palabra[i] == letter.toLowerCase()){
        nextProgreso = progreso.map((value, index) => {
          if(index == i){
            return letter;
          }else if(nextProgreso[index] == letter){
            return letter;
          }else{
            return value;
          }
        });
        coincidencias++;
      }
    }
    if(coincidencias == 0){
      setErroneas(erroneas + letter);
      setIntento(intento + 1);
      setIntento((state) => {
        if(state > 2){
          setCantFalladas(cantFalladas + 1);
          setHasLost(true);
        }
        return state;
      });
    }else{
      setProgreso(nextProgreso);
      setProgreso((state) => {
        let correctos = 0;
        for(let i=0; i<state.length; i++){
          if(state[i] != "-"){
            correctos++;
          }
        }
        if(correctos == state.length){
          setCantAcertadas(cantAcertadas + 1);
          setHasWon(true);
        }
        return state;
      });
    }
  }

  const keyboardAvailable = (letter) => {
    //Verifica si la letra ya ha sido introducida erroneamente
    if(erroneas.includes(letter) || progreso.includes(letter.toLowerCase())){
      return true;
    }
    //Verifica si la letra ya fue introducida correctamente
    if(progreso.includes(letter) || progreso.includes(letter.toLowerCase())){
      return true;
    }
    //Verifica las condiciones de ganar o perder
    if((hasLost && !hasWon) || (!hasLost && hasWon)){
      return true;
    }
  }

  useEffect(() => {
    getRandomWord();
  }, [])

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar backgroundColor="#A8D3C2" barStyle='default'/>
      <View style={styles.container}>
        <View style={styles.rowView}>
          <Text style={{
              marginVertical: 8,
              borderRadius: 12,
              fontWeight: 'bold',
              fontSize: 22,
              textAlign: 'center',
          }}>Aciertos: {cantAcertadas}</Text>
          <Text style={{
              marginVertical: 8,
              borderRadius: 12,
              fontWeight: 'bold',
              fontSize: 22,
              textAlign: 'center',
          }}>Incorrectas: {cantFalladas}</Text>
        </View>
        {(intento==0) && <Image style={styles.image} source={require("./assets/hangedman/Ahorcado_Parte1.png")}/>}
        {(intento==1) && <Image style={styles.image} source={require("./assets/hangedman/Ahorcado_Parte2.png")}/>}
        {(intento==2) && <Image style={styles.image} source={require("./assets/hangedman/Ahorcado_Parte3.png")}/>}
        {(intento==3) && <Image style={styles.image} source={require("./assets/hangedman/Ahorcado_Parte4.png")}/>}
        <View style={styles.buttonView}>
          <FlatButton isDisabled={(!hasWon && !hasLost)} onPress={() => getRandomWord()} text="Nueva palabra aleatoria" width='80%'
                      textForm='uppercase' textSize={16} bgColor='#0D324D' textColor='#FFFFFF' />
        </View>
        <Text style={{
            marginVertical: 6,
            fontWeight: 'bold',
            fontSize: 24,
            textAlign: 'center',
        }}>{progreso}</Text>
        {hasLost && <Text style={{
            marginVertical: 6,
            fontWeight: 'bold',
            fontSize: 24,
            textAlign: 'center',
        }}>{palabra}</Text>}
        <View style={styles.rowView}>
          <FlatButton isDisabled={keyboardAvailable("Q")} onPress={() => matchLetterInWord("Q")} width='9%'
            text="Q" textForm='uppercase' textSize={16} bgColor='#0D324D' textColor='#FFFFFF'/>
          <FlatButton isDisabled={keyboardAvailable("W")} onPress={() => matchLetterInWord("W")} width='9%'
            text="W" textForm='uppercase' textSize={16} bgColor='#0D324D' textColor='#FFFFFF'/>
          <FlatButton isDisabled={keyboardAvailable("E")} onPress={() => matchLetterInWord("E")} width='9%'
            text="E" textForm='uppercase' textSize={16} bgColor='#0D324D' textColor='#FFFFFF'/>
          <FlatButton isDisabled={keyboardAvailable("R")} onPress={() => matchLetterInWord("R")} width='9%'
            text="R" textForm='uppercase' textSize={16} bgColor='#0D324D' textColor='#FFFFFF'/>
          <FlatButton isDisabled={keyboardAvailable("T")} onPress={() => matchLetterInWord("T")} width='9%'
            text="T" textForm='uppercase' textSize={16} bgColor='#0D324D' textColor='#FFFFFF'/>
          <FlatButton isDisabled={keyboardAvailable("Y")} onPress={() => matchLetterInWord("Y")} width='9%'
            text="Y" textForm='uppercase' textSize={16} bgColor='#0D324D' textColor='#FFFFFF'/>
          <FlatButton isDisabled={keyboardAvailable("U")} onPress={() => matchLetterInWord("U")} width='9%'
            text="U" textForm='uppercase' textSize={16} bgColor='#0D324D' textColor='#FFFFFF'/>
          <FlatButton isDisabled={keyboardAvailable("I")} onPress={() => matchLetterInWord("I")} width='9%'
            text="I" textForm='uppercase' textSize={16} bgColor='#0D324D' textColor='#FFFFFF'/>
          <FlatButton isDisabled={keyboardAvailable("O")} onPress={() => matchLetterInWord("O")} width='9%'
            text="O" textForm='uppercase' textSize={16} bgColor='#0D324D' textColor='#FFFFFF'/>
          <FlatButton isDisabled={keyboardAvailable("P")} onPress={() => matchLetterInWord("P")} width='9%'
            text="P" textForm='uppercase' textSize={16} bgColor='#0D324D' textColor='#FFFFFF'/>
        </View>
        <View style={styles.rowView}>
          <FlatButton isDisabled={keyboardAvailable("A")} onPress={() => matchLetterInWord("A")} width='9%'
            text="A" textForm='uppercase' textSize={16} bgColor='#0D324D' textColor='#FFFFFF'/>
          <FlatButton isDisabled={keyboardAvailable("S")} onPress={() => matchLetterInWord("S")} width='9%'
            text="S" textForm='uppercase' textSize={16} bgColor='#0D324D' textColor='#FFFFFF'/>
          <FlatButton isDisabled={keyboardAvailable("D")} onPress={() => matchLetterInWord("D")} width='9%'
            text="D" textForm='uppercase' textSize={16} bgColor='#0D324D' textColor='#FFFFFF'/>
          <FlatButton isDisabled={keyboardAvailable("F")} onPress={() => matchLetterInWord("F")} width='9%'
            text="F" textForm='uppercase' textSize={16} bgColor='#0D324D' textColor='#FFFFFF'/>
          <FlatButton isDisabled={keyboardAvailable("G")} onPress={() => matchLetterInWord("G")} width='9%'
            text="G" textForm='uppercase' textSize={16} bgColor='#0D324D' textColor='#FFFFFF'/>
          <FlatButton isDisabled={keyboardAvailable("H")} onPress={() => matchLetterInWord("H")} width='9%'
            text="H" textForm='uppercase' textSize={16} bgColor='#0D324D' textColor='#FFFFFF'/>
          <FlatButton isDisabled={keyboardAvailable("J")} onPress={() => matchLetterInWord("J")} width='9%'
            text="J" textForm='uppercase' textSize={16} bgColor='#0D324D' textColor='#FFFFFF'/>
          <FlatButton isDisabled={keyboardAvailable("K")} onPress={() => matchLetterInWord("K")} width='9%'
            text="K" textForm='uppercase' textSize={16} bgColor='#0D324D' textColor='#FFFFFF'/>
          <FlatButton isDisabled={keyboardAvailable("L")} onPress={() => matchLetterInWord("L")} width='9%'
            text="L" textForm='uppercase' textSize={16} bgColor='#0D324D' textColor='#FFFFFF'/>
        </View>
        <View style={styles.rowView}>
          <FlatButton isDisabled={keyboardAvailable("Z")} onPress={() => matchLetterInWord("Z")} width='9%'
            text="Z" textForm='uppercase' textSize={16} bgColor='#0D324D' textColor='#FFFFFF'/>
          <FlatButton isDisabled={keyboardAvailable("X")} onPress={() => matchLetterInWord("X")} width='9%'
            text="X" textForm='uppercase' textSize={16} bgColor='#0D324D' textColor='#FFFFFF'/>
          <FlatButton isDisabled={keyboardAvailable("C")} onPress={() => matchLetterInWord("C")} width='9%'
            text="C" textForm='uppercase' textSize={16} bgColor='#0D324D' textColor='#FFFFFF'/>
          <FlatButton isDisabled={keyboardAvailable("V")} onPress={() => matchLetterInWord("V")} width='9%'
            text="V" textForm='uppercase' textSize={16} bgColor='#0D324D' textColor='#FFFFFF'/>
          <FlatButton isDisabled={keyboardAvailable("B")} onPress={() => matchLetterInWord("B")} width='9%'
            text="B" textForm='uppercase' textSize={16} bgColor='#0D324D' textColor='#FFFFFF'/>
          <FlatButton isDisabled={keyboardAvailable("N")} onPress={() => matchLetterInWord("N")} width='9%'
            text="N" textForm='uppercase' textSize={16} bgColor='#0D324D' textColor='#FFFFFF'/>
          <FlatButton isDisabled={keyboardAvailable("M")} onPress={() => matchLetterInWord("M")} width='9%'
            text="M" textForm='uppercase' textSize={16} bgColor='#0D324D' textColor='#FFFFFF'/>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen:{
      flex: 1,
      backgroundColor: "#A8D3C2"
  },
  container:{
      flex: 1,
      marginHorizontal: '6%',
      alignItems: 'center',
      justifyContent: 'center'
  },
  image:{
    width: '50%',
    height: '30%',
    resizeMode: 'stretch',
    marginVertical: 8,
  },
  buttonView:{
    width: '90%',
    height: '6%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rowView:{
    width: '90%',
    height: '5%',
    minHeight: 40,
    marginVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
})