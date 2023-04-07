import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Behavior,
  Platform,
  ScrollView,
  KeyboardVerticaOffset,
} from 'react-native';

const MENSAGEM_EMAIL = 'Digite o seu e-mail.';
const MENSAGEM_SENHA = 'Digite a sua senha.';
const EMAIL = 'Email@hotmail.com';
const SENHA = 'cityslicka';

const ValidateLogin = async (email, senha, status, activity, ) => {
  if (email.trim().length === 0) {
    alert(MENSAGEM_EMAIL);
    return;
  }

  if (senha.trim().length === 0) {
    alert(MENSAGEM_SENHA);
    return;
  }

  activity(true);

  let usuario = {
    email: email,
    password: senha,
  };

  await fetch('https://reqres.in/api/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(usuario),
  })
    .then((response) => {
      if (response.status === 200) {
        response.text().then(function (result) {
          status('Usuário autenticado com sucesso.');
          console.log(result);
        });
      } else {
        status(`Usuário ou senha inválidos => código: ${response.status}`);
      }
      activity(false);
    })
    .catch(() => status('Não foi possivel executar o login.'));
};

export default () => {
  const [user, setUser] = useState('meuemail@hotmail.com');
  const [password, setPassword] = useState('cityslicka');
  const [status, setStatus] = useState('');
  const [activity, setActivity] = useState(false);

  return (
    <KeyboardAvoidingView
     Behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={Estilos.containerTop} 
    KeyboardVerticaOffset={80}>
    <ScrollView style={{with: "100%"}}>
    <Image source={require('./assets/logo')} style={Estilos.imageLogo}/>
      <Text style={Estilos.paragraph}>Login</Text>
    <View
     style={Estilos.container}>
      <Text style={Estilos.label}>E-mail:</Text>
      <TextInput
        autoCorrect={false}
        placeholder={MENSAGEM_EMAIL}
        placeholderTextColor="grey"
        style={Estilos.textInput}
        clearButtonMode="always"
        defaultValue={EMAIL}
        onChangeText={(value) => setUser(value)}
      />

      <Text style={Estilos.label}>Senha:</Text>
      <TextInput
        autoCorrect={false}
        placeholder={MENSAGEM_SENHA}
        placeholderTextColor="grey"
        secureTextEntry={true}
        style={Estilos.textInput}
        clearButtonMode="always"
        defaultValue={SENHA}
        onChangeText={(value) => setPassword(value)}
      />

      <TouchableOpacity
        onPress={() => ValidateLogin(user, password, setStatus, setActivity)}>
        <Text style={Estilos.button}>Login</Text>
      </TouchableOpacity>
      <View style={{ marginTop: 10 }}>
        <ActivityIndicator size="large" animating={activity} />
      </View>
      <Text style={Estilos.loginLabel}>{status}</Text>
    </View>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

const Estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
    padding: 6,
    marginTop: 50
  },

containerTop: {
  flex: 1,
 justifyContent: 'center',
 padding: 5,
 backgroundColor: '#fffff',
 borderRadius: 200,
},

  paragraph: {
    fontSize: 18,
    color: 'Black',
    marginTop: 20,
    textAlign: 'center'
  },

  label: {
    color: '#C0C0C0',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
  },

  button: {
    backgroundColor: '#FF4500',
    color: 'black',
    fontSize: 15,
    width: 200,
    height: 40,
    marginTop: 80,
    textAlign: 'center',
    alignSelf: 'center',
    borderRadius: 200,
  },

  textInput: {
    backgroundColor: '#ffffff',
    color: 'black',
    fontSize: 15,
    height: 40,
    width: 250,
    marginTop: 15,
    marginHorizontal: 30,
    paddingHorizontal: 10,
    alignSelf: 'center',
    borderRadius: 100,
  },
   imageLogo: {
     alignSelf: 'center',
     width: 80,
    height: 60,
    marginTop: 100
  }
});
