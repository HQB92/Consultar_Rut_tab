import React, {useEffect, useState} from 'react';
import { StyleSheet, TextInput, Button } from 'react-native';
import Colors from '../constants/Colors';
import { Text, View } from './Themed';
import { useRut } from 'react-rut-formatter';

export default function EditScreenInfo({ path }: { path: string }) {
 //formatiar rut a continuacion




  const [rut2, setRut2] = useState("");
  const [data, setData] = useState({
    name: "",
    rut: "",
    activities: [
      {
        name: "",
        date: "",
      } 
    ]
  });

  const handleChange = async (e:any) => {

    setRut2(e);
    
  }
  const postPetition = async () => {
    console.log(rut2);
   setData({name: "", rut: "", activities: [{name: "", date: ""}]});
    fetch(`https://api.libreapi.cl/rut/activities?rut=${rut2}`, {
      method: 'GET',
      redirect: 'follow'
    })
      .then(response => response.json())
      .then(result => setData(result.data))
      .catch(error => setData({name: "", rut: "", activities: [{name: "", date: ""}]}));
  }
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Consulta {path}
        </Text>
      </View>
      <View style={styles.textInput}>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={handleChange}
          value={rut2}
        />
      </View>
      <View >
        <Button
          title="Consultar"
          color={'#841584'}
          onPress={postPetition}
        />

      </View>
      {data.name ? <View style={styles.helpContainer}>
        <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
          {"Nombre: " +data?.name}
        </Text>
        <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
          {"RUT: " +data?.rut}
        </Text>
        {data?.activities.map((activity, index) => (
          <><Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
            {"Actividad "+ (index+1) +": " +activity?.name}
          </Text><Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
              {"Fecha de solicitud "+ (index+1) +": "+activity?.date.split("T")[0]}
            </Text></>
        ))}
      </View> : ""}


    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    // alinear a la izquierda
    alignItems: 'flex-start',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'left',
  },
  textInput: {
    backgroundColor: 'lightgray',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    whith: 100,
    margin: 10
  },
  textInput2: {
    color: '#000000',
    backgroundColor: 'green',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    whith: 100,
    margin: 10
  }
});
