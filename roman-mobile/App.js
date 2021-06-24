import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import api from  './src/services/api';

export default class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      listaProjetos: []
    }
  }

  buscarProjeto = async () => {
    const resposta = api.get('/projeto')
    const dadosDaApi = (await resposta).data
    this.setState ({listaProjetos: dadosDaApi})
  }

  componentDidMount () {
    this.buscarProjeto();
  }

    render() {
      return(
        <View>
          <FlatList
             data = {this.state.listaProjetos}
             keyExtractor = {item => item.idProjeto}
             renderItem = {this.renderItem}
          />
        </View>
      )
    }

    renderItem = ({item}) => ( 
      <View style={styles.estilo}>
        <Text>{item.idProjeto}</Text>
        <Text>{item.nomeProjeto}</Text>
        <Text>{item.idTemaNavigation.nomeTema}</Text>
      </View>
    )

}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  estilo: {
    flexDirection: 'row',
    marginTop: 30,
    padding: 20
  }
});
